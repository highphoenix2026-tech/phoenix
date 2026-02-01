"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { deleteMember } from "@/app/server/ourTeam/services";

export async function deleteMemberAction(memberId:string) {
  try {
      const session = await getServerSession(authOptions);
      if (!session) {
        return {
          success:false,
          status: 401,
          message: "Please log in first.",
        };
      }
  
      if (session.user.role !== "admin") {
        return {
          success:false,
          status: 403,
          message: "You are not allowed to perform this action.",
        };
      }
  
      const result = await deleteMember(memberId);
      if (result.status === 201) {
        revalidatePath(`/admin/dashboard/ourTeam`);
      revalidatePath(`/ar/admin/dashboard/ourTeam`);
        return {success:true, message: result.message, status: result.status };
      }
      return {success:false, message: result.message, status: result.status };
    } catch (error) {      
      return {success:false, message: "Error In Deleting Member", status: 500 };
    }
}
