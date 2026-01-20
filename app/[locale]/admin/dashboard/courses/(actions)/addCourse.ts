"use server";

import { authOptions } from "@/app/auth/authoptions";
import { addNewCourse } from "@/app/server/courses/services";
import {  NewCourse } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const addCourseAction = async (data: NewCourse) => {
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

    const result = await addNewCourse(data);
    if (result.status === 201){
       revalidatePath("/admin/dashboard/courses")
      return {
        success: true,
        status: result.status,
        message: result.message,
      };
    }
     
console.log("error course: ",result);
    return {
      success: false,
      status: result.status,
      message: result.message,
    };
  } catch (error) {
    console.log("error course: ",error);
    
    return {
      success: false,
      status: 500,
      message: "Error in adding the Course",
    };
  }
};
