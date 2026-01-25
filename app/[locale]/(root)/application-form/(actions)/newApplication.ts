"use server"
import {addNewApplcation} from "@/app/server/applications/services"

import { NewApplication } from "@/types"

export const newApplicationAction= async (data:NewApplication)=>{
    try {

        const result= await addNewApplcation(data)
        
        return {
            success:true,
            message:"Application Submitted Successfully",
            status:201
        }
        
    } catch (error) {
        return {
            success:false,
            message:"Error In Submitting The Application",
            status:500
        }
    }
}