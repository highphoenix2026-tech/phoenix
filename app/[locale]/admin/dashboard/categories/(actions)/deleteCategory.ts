"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { deleteCategory } from "@/app/server/categories/services";

export async function deleteCategoryAction(categoryId: string) {
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

    const result = await deleteCategory(categoryId);
    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/categories`);
      revalidatePath(`/ar/admin/dashboard/categories`);
      return { success: true, message: result.message, status: result.status };
    }
    return { success: false, message: result.message, status: result.status };
  } catch (error) {
    return {
      success: false,
      message: "Error In Deleting Category",
      status: 500,
    };
  }
}
