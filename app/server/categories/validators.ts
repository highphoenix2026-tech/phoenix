import {z} from "zod"

export const categorySchema= z.object({
    id: z.string().optional(),
    category_name_en: z.string(),
    category_name_ar: z.string(),
    category_description_en: z.string().nullable(),
    category_description_ar: z.string().nullable(),
    slug:z.string(),
    logo:z.string(),

})