"use server";

import { register } from "@/app/[locale]/server/users/services";
import { type NewUser } from "@/types";

export const registerAction = async (data: NewUser) => {
  try {
    const result = await register(data);

    if (!result.success) {
      return { success: false, data: null, message: result.message };
    }

    return { success: true, data: result.data, message: result.message };
  } catch (error) {
    console.error(error);
    return { success: false, errors: { _errors: ["Internal server error"] } };
  }
};
