import { z } from "zod";
import { Locale } from "@/types/index";

export const applicationSchema = (locale: Locale) =>
  z.object({
    first_name: z
      .string()
      .min(1, locale === "en" ? "First Name is required" : "الاسم الأول مطلوب"),
    last_name: z
      .string()
      .min(1, locale === "en" ? "Last Name is required" : "الاسم الثاني مطلوب"),
    email: z
      .string()
      .min(1, locale === "en" ? "Email is required" : "البريد الإلكتروني مطلوب")
      .email(
        locale === "en"
          ? "Invalid email address"
          : "البريد الإلكتروني غير صالح",
      ),

    phone_number: z
      .string()
      .min(
        1,
        locale === "en" ? "Phone number is required" : "رقم الهاتف مطلوب",
      ),

    country: z
      .string()
      .min(1, locale === "en" ? "Country is required" : "الدولة مطلوبة"),
    course_id: z
      .string()
      .min(1, locale === "en" ? "Course is required" : "الدورة مطلوبة"),

    sponsorship_type: z.string(),
  });
