import { z } from "zod";

export const courseSchema = z
  .object({
    id: z.string().optional(),

    course_title_en: z.string().min(3, "English course title is required"),

    course_title_ar: z.string().min(3, "Arabic course title is required"),

    course_description_en: z
      .string()
      .min(10, "English description must be at least 10 characters")
      .nullable(),

    course_description_ar: z
      .string()
      .min(10, "Arabic description must be at least 10 characters")
      .nullable(),

    target_audience_en: z
      .array(z.string().min(3))
      .min(1, "Add at least one target audience (EN)"),

    target_audience_ar: z
      .array(z.string().min(3))
      .min(1, "Add at least one target audience (AR)"),

    duration: z.string().min(1, "Duration is required").nullable(),
    category_id: z.string().min(1, "Category is required"),

    start_date: z.string(),
    end_date: z.string(),

    slug: z.string().min(3, "Slug is required"),

    course_image: z.string().min(1, "Course image is required"),
  })
  .refine((data) => data.end_date >= data.start_date, {
    message: "End date must be after start date",
    path: ["end_date"],
  });
