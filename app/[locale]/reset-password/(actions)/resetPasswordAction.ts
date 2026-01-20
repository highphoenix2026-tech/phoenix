"use server"
import { resetPassword } from "@/app/server/users/services";

export const resetPasswordAction = async (
  token: string,
  newPassword: string
) => {
  try {
    const result = await resetPassword(token, newPassword);
    return { 
  message: result.message, 
  status: result.status, 
  data: result.data 
};

  } catch (error) {
    return { message: "Error while updating the password", status:500 };
  }
};
