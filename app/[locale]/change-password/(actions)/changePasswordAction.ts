"use server";
import { authOptions } from "@/app/auth/authoptions";
import { changePassword } from "@/app/server/users/services";
import { getServerSession } from "next-auth";

export const changePasswordAction = async (
  oldPassword: string,
  newPassword: string,
  user_id: string
) => {
  try {
    const session= await getServerSession(authOptions)
   if (!session)
      return {
        message: "Please Login",
        status: 401,
      };
    const result = await changePassword(oldPassword, newPassword, user_id);
    return {
      message: result.message,
      status: result.status,
    };
  } catch (error) {
    return {
      message: "Error in changing the password",
      status: 500,
    };
  }
};
