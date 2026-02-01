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
        message: "Please Login",
        status: 401,
      };

    if (session?.user.role !== "admin")
      return {
        message: "You are not allowed to perform this action.",
        status: 403,
      };

    const result = await deleteUser(userId);
    revalidatePath(`/admin/dashboard/users`);
    if (result.status !== 201)
      return {
        message: result.message,
        status: result.status,
      };

    return {
      message: result.message,
      status: result.status,
    };
  } catch (error) {
    return {
      message: "Error In Deleting User Role",
      status: 500,
    };
  }
}
