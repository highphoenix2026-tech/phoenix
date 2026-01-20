"use server";
import { revalidatePath } from "next/cache";
import {  getMemberNameIdAndImage } from "@/app/server/ourTeam/services";

export async function getMemberIdAction() {
  try {
    const result = await getMemberNameIdAndImage();
    if (result.status === 200) {
      revalidatePath(`/admin/dashboard/ourTeam`);
      revalidatePath(`/ar/admin/dashboard/ourTeam`);
      return { success:true,message: result.message, status: result.status };
    }

  } catch (error) {
    console.log("lkdfj error: 0:",error);
    
    return {success:false, message: "Error In Adding Member", status: 500 };
  }
}
