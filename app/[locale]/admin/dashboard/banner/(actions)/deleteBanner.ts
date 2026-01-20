"use server";

import { authOptions } from "@/app/auth/authoptions";
import { deleteBanner } from "@/app/server/banners/services";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const deleteBannerAction = async (bannerId: string) => {
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
        message: "Your not allowed to perform this action",
      };

    const result = await deleteBanner(bannerId);

   if (result.status === 201){
          revalidatePath("/admin/dashboard/banner")
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
      message: "Error in deleting the banner",
    };
  }
};
