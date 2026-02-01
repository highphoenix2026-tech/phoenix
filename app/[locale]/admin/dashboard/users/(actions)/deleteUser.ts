"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { deleteUser } from "@/app/server/users/services";
export async function deleteUserAction(userId: string) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return {
        success: false,
        message: "Please Login",
        status: 401,
      };

    if (session?.user.role !== "admin")
      return {
    success: false,
        message: "You are not allowed to perform this action.",
        status: 403,
      };

    const result = await deleteUser(userId);
    revalidatePath(`/admin/dashboard/users`);
    if (result.status !== 201)
      return {
    success: false,
        message: result.message,
        status: result.status,
      };

    return {
      success: true,
      message: result.message,
      status: result.status,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Deleting User Role",
      status: 500,
    };
  }
}
