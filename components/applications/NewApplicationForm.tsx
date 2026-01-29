"use client";
import { NewApplication, NewCourse } from "@/types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { applicationSchema } from "@/app/server/applications/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
// Added Calendar and Clock icons
import { Loader2, Send, GraduationCap, Calendar, Clock } from "lucide-react";
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import CountrySelect from "../inputs/CountrySelect";
import FormSelect from "../inputs/SelectorInput";
import SponsorshipSelect from "../inputs/SponsorshipSelect";
import { da } from "zod/v4/locales";

type ApplicationFormValue = z.infer<ReturnType<typeof applicationSchema>>;

interface Props {
  course: NewCourse;
  action: (
    data: NewApplication,
  ) => Promise<{ success: boolean; status: number; message: string }>;
  locale: "en" | "ar";
}

function NewApplicationForm({ action, locale, course }: Props) {
  const isArabic = locale === "ar";

  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ApplicationFormValue>({
    resolver: zodResolver(applicationSchema(locale)),
  });
  setValue("course_id", course.id!);

  const onSubmit: SubmitHandler<ApplicationFormValue> = async (data) => {
    console.log("data: ", data);

    try {
      const result = await action(data as NewApplication);
      if (result.status === 201) {
        toast.success(
          isArabic
            ? "تم تقديم طلبك بنجاح"
            : "Application submitted successfully!",
          {
            style: {
              border: "1px solid #c9a24d",
              background: "#0b1236",
              color: "#fff",
            },
          },
        );
        return;
      }
      toast.error(result.message);
    } catch (error) {
      toast.error(
        isArabic ? "خطأ في تقديم الطلب" : "Error submitting the application",
      );
    }
  };

  return (
    <div
      className={`w-full max-w-3xl my-24 mx-auto p-8 bg-white rounded-3xl shadow-xl border border-slate-100 ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Header Section */}
      <div className="mb-10 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#c9a24d]/5 rounded-full blur-3xl" />

        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#0b1236] text-[#c9a24d] mb-6 shadow-lg shadow-[#0b1236]/20 transition-transform hover:scale-110 duration-300">
          <GraduationCap size={40} strokeWidth={1.5} />
        </div>

        <h2 className="text-3xl font-extrabold text-[#0b1236] tracking-tight">
          {isArabic ? "نموذج تقديم التدريب" : "Training Application"}
        </h2>

        <div className="w-20 h-1 bg-[#c9a24d]  mt-3 rounded-full" />
      </div>

      {/* --- NEW COURSE DATA SECTION --- */}
      {/* --- UPDATED COURSE DATA SECTION --- */}
      <div className="mb-10 p-6 rounded-2xl bg-slate-50 border border-slate-100 relative overflow-hidden group">
        <div
          className={`absolute top-0 bottom-0 w-1.5 bg-[#c9a24d] ${isArabic ? "right-0" : "left-0"}`}
        />

        <h3 className="text-xl font-bold text-[#0b1236] mb-3">
          {isArabic ? course.course_title_ar : course.course_title_en}
        </h3>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          {isArabic
            ? course.course_description_ar
            : course.course_description_en}
        </p>

        <div className="flex flex-wrap gap-6 text-sm font-semibold">
          {/* Optimized Date Display */}
          {(course.start_date || course.end_date) && (
            <div className="flex items-center gap-2 text-slate-700">
              <Calendar size={18} className="text-[#c9a24d]" />
              <span>
                {(() => {
                  const options: Intl.DateTimeFormatOptions = {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  };
                  const formatLocale = isArabic ? "ar-EG" : "en-US";

                  const start = course.start_date
                    ? new Date(course.start_date).toLocaleDateString(
                        formatLocale,
                        options,
                      )
                    : null;
                  const end = course.end_date
                    ? new Date(course.end_date).toLocaleDateString(
                        formatLocale,
                        options,
                      )
                    : null;

                  if (start && end && start !== end) {
                    return isArabic ? `${start} - ${end}` : `${start} — ${end}`;
                  }
                  return start || end; // Shows just one date if they are the same or one is missing
                })()}
              </span>
            </div>
          )}

          {/* Duration */}
          {course.duration && (
            <div className="flex items-center gap-2 text-slate-700">
              <Clock size={18} className="text-[#c9a24d]" />
              <span>
                {course.duration} {isArabic ? "أيام" : "Days"}
              </span>
            </div>
          )}
        </div>
      </div>
      {/* --- END COURSE DATA SECTION --- */}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <TextInput
            register={register("first_name")}
            error={errors.first_name}
            label={isArabic ? "الاسم الأول" : "First Name"}
            className="text-gray-700"
          />
          <TextInput
            register={register("last_name")}
            error={errors.last_name}
            label={isArabic ? "اسم العائلة" : "Last Name"}
            className="text-gray-700"
          />

          <EmailInput
            register={register("email")}
            error={errors.email}
            label={isArabic ? "البريد الإلكتروني" : "Email Address"}
            className="text-gray-700"
          />

          <TextInput
            register={register("phone_number")}
            label={isArabic ? " (مع رمز الدولة) رقم الهاتف" : "Phone Number (With Country Code)"}
            error={errors.phone_number}
            className="text-gray-700"
          />
        
          
          <div className="col-span-1 lg:col-span-2">
            <CountrySelect
              register={register("country")}
              locale={locale}
              error={errors.country}
              label={isArabic ? "الجنسية" : "Nationality"}
              className="text-gray-700"
            />
          </div>
          <div className="col-span-1 lg:col-span-2">
          <SponsorshipSelect
            register={register("sponsorship_type")}
            error={errors.sponsorship_type}
            locale={locale}
            label={isArabic ? "نوع الرعايةF" : "Sponsorship Type"}
          />
        </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full flex items-center justify-center gap-3 bg-[#0b1236] text-white py-4 rounded-xl font-bold text-lg overflow-hidden transition-all hover:bg-[#121b4a] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#0b1236]/20"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={22} />
          ) : (
            <>
              <span className="relative z-10 text-[#c9a24d]">
                {isArabic ? "تأكيد التسجيل" : "Confirm Registration"}
              </span>
              <Send
                size={20}
                className={`relative text-[#c9a24d] z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isArabic ? "rotate-180" : ""}`}
              />
            </>
          )}

          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </button>

        <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold">
            HighPhoenix Aviation Consultancy
          </span>
        </div>
      </form>
    </div>
  );
}

export default NewApplicationForm;
