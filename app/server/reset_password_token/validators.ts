import {z} from "zod"

export const resetPasswordSchema= z.object({
    oldPassword:z.string().min(6,"Password must be at least 6 characters long."),
    newPassword: z.string().min(6,"Password must be at least 6 characters long."),
     confirmPassword: z.string().min(6,"Password must be at least 6 characters long."),
}) 