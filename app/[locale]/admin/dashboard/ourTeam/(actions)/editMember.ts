"use server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authoptions";
import {   NewMember } from "@/types";
import { updatMember } from "@/app/server/ourTeam/services";

export async function editMemberAction(memberId:string,data: Partial<NewMember>) {
  try {
    const session = await getServerSession(authOptions);
    // ❗ Not logged in
    if (!session) {
      return {
        success: false,
        status: 401,
        message: "Please log in first.",
      };
    }

    // ❗ Not admin
    if (session.user.role !== "admin") {
      return {
        success: false,
        status: 403,
        message: "You are not allowed to perform this action.",
      };
    }

    const result = await updatMember(memberId, data);

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/ourTeam`);
      revalidatePath(`/ar/admin/dashboard/ourTeam`);
      return { success: true, message: result.message, status: result.status };
    }
    return { success: false, message: result.message, status: result.status };
  } catch (error) {    
    return {success:false, message: "Error In Updating The Member", status: 500 };
  }
}
