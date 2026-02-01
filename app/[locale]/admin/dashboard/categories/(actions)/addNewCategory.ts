"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import {  NewCategory } from "@/types/index";
import { addNewCategory } from "@/app/server/categories/services";

export async function createCategoryAction(data: NewCategory) {
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

    const result = await addNewCategory(data);

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/categories`);
      revalidatePath(`/ar/admin/dashboard/categories`);
      return { success:true,message: result.message, status: result.status };
    }
    return { success:false,message: result.message, status: result.status };

  } catch (error) {
    console.log("lkdfj error: 0:",error);
    
    return {success:false, message: "Error In Adding Category", status: 500 };
  }
}
