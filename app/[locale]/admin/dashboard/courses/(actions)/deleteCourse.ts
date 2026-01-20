"use server";

import { authOptions } from "@/app/auth/authoptions";
import { deleteCourse } from "@/app/server/courses/services";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deleteCourseAction = async (courseId: string) => {
  const session = await getServerSession(authOptions);
  try {
    if (!session)
      return {
        success: false,
        status: 401,
        message: "Please login",
      };

    if (session.user.role !== "admin")
      return {
        success: false,
        status: 403,
        message: "You are not allowed to perfor this action",
      };

    const result = await deleteCourse(courseId);
    if (result.status === 201){
       revalidatePath("/admin/dashboard/courses")
      return {
        success: true,
        status: result.status,
        message: result.message,
      };
    }

    return {
      success: false,
      status: result.status,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Error in adding the course",
    };
  }
};
