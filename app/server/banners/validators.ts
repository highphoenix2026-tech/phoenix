import {z} from "zod"

export const bannerSchema= z.object({
    id:z.string().optional(),
    name:z.string().min(1,"Name is requried"),
    image:z.string().min(1,"Image is required"),
    description_en:z.string().min(1,"English description is required"),
    description_ar:z.string().min(1,"Arabic description is required")
})