"use client"
import { NewApplication } from "@/types";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { applicationSchema } from "@/app/server/applications/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2, Send, GraduationCap, Building2, Globe } from "lucide-react"; 
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";

type ApplicationFormValue = z.infer<ReturnType<typeof applicationSchema>>;

interface Props {
  action: (
    data: NewApplication,
  ) => Promise<{ success: boolean; status: number; message: string }>;
  locale: "en" | "ar";
}

function NewApplicationForm({ action, locale }: Props) {
  const isArabic = locale === "ar";

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ApplicationFormValue>({
    resolver: zodResolver(applicationSchema(locale)),
  });

  const onSubmit: SubmitHandler<ApplicationFormValue> = async (data) => {
    try {
      const result = await action(data as NewApplication);
      if (result.status === 201) {
        toast.success(
          isArabic ? "تم تقديم طلبك بنجاح" : "Application submitted successfully!",
          { style: { border: '1px solid #c9a24d', background: '#0b1236', color: '#fff' } }
        );
        return;
      }
      toast.error(result.message);
    } catch (error) {
      toast.error(isArabic ? "خطأ في تقديم الطلب" : "Error submitting the application");
    }
  };

  return (
    <div
      className={`w-full max-w-3xl my-14 mx-auto p-8 bg-white rounded-3xl shadow-xl border border-slate-100 ${isArabic ? "rtl" : "ltr"}`}
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
        <div className="w-12 h-1 bg-[#c9a24d] mx-auto mt-3 rounded-full" />
        
        <p className="mt-4 text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
          {isArabic
            ? "بناء القدرات المؤسسية من خلال حلول تدريب الطيران المتكاملة."
            : "Building institutional capability through integrated aviation training solutions."}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Inputs with custom focus styling */}
          <TextInput
            register={register("first_name")}
            error={errors.first_name}
            label={isArabic ? "الاسم الأول" : "First Name"}
          />
          <TextInput
            register={register("last_name")}
            error={errors.last_name}
            label={isArabic ? "اسم العائلة" : "Last Name"}
          />
          
          <EmailInput
            register={register("email")}
            error={errors.email}
            label={isArabic ? "البريد الإلكتروني" : "Email Address"}
          />

          <TextInput
            register={register("phone_number")}
            label={isArabic ? "رقم الهاتف" : "Phone Number"}
            error={errors.phone_number}
          />
          
          <div className="md:col-span-2">
            <TextInput
              register={register("country")}
              label={isArabic ? "البلد" : "Country"}
              error={errors.country}
            />
          </div>
        </div>

        {/* Course Selection */}
        <div className="space-y-2 group">
          <label className="text-sm font-bold text-[#0b1236] flex items-center gap-2 transition-colors group-focus-within:text-[#c9a24d]">
            <Building2 size={16} />
            {isArabic ? "المسار التدريبي الاستراتيجي" : "Strategic Training Track"}
          </label>
          <div className="relative">
            <select
              {...register("course" as any)}
              className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#c9a24d] focus:ring-4 focus:ring-[#c9a24d]/10 outline-none appearance-none bg-white transition-all text-slate-700 font-medium cursor-pointer"
            >
              <option value="leadership">{isArabic ? "القيادة والحوكمة" : "Leadership & Governance"}</option>
              <option value="operational">{isArabic ? "الممارسة التشغيلية" : "Operational Practice"}</option>
              <option value="regulatory">{isArabic ? "المتطلبات التنظيمية" : "Regulatory Requirements"}</option>
            </select>
            <div className={`absolute inset-y-0 ${isArabic ? 'left-4' : 'right-4'} flex items-center pointer-events-none text-slate-400`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
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
              <span className="relative z-10">
                {isArabic ? "تأكيد التسجيل" : "Confirm Registration"}
              </span>
              <Send
                size={20}
                className={`relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isArabic ? "rotate-180" : ""}`}
              />
            </>
          )}
          
          {/* Hover highlight effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
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