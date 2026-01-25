"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { deleteApplicationById } from "@/app/server/applications/services";

export async function deleteApplicationAction(applicationId:string) {
  try {
      const session = await getServerSession(authOptions);
      // ❗ Not logged in
      if (!session) {
        return {
          success:false,
          status: 401,
          message: "Please log in first.",
        };
      }
  
      // ❗ Not admin
      if (session.user.role !== "admin") {
        return {
          success:false,
          status: 403,
          message: "You are not allowed to perform this action.",
        };
      }
  
      const result = await deleteApplicationById(applicationId);
      if (result.status === 201) {
        revalidatePath(`/admin/dashboard/applications`);
        revalidatePath(`/ar/admin/dashboard/applications`);
        return {success:true, message: result.message, status: result.status };
      }
      return {success:false, message: result.message, status: result.status };
    } catch (error) {      
      return {success:false, message: "Error In Deleting Application", status: 500 };
    }
}
