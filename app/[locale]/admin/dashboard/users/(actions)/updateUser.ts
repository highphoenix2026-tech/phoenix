"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { Role, updateRole } from "@/app/server/users/services";

export async function updateUserRole(data: {
  userId:string, newRole:Role
}) {
  const session = await getServerSession(authOptions);
 

  try {
    // ❗ Not logged in
   if (!session)
      return {
        message: "Please Login",
        status: 401,
      };

    // ❗ Not admin
    if (session?.user.role !== "admin")
      return {
        message: "You are not allowed to perform this action.",
        status: 403,
      };

   const result =  await updateRole(data.userId, data.newRole);

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
      message: "Error In Updating User Role",
      status: 500,
    };
  }
}
