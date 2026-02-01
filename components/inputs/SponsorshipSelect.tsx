"use client";

import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { HandCoins } from "lucide-react";

const sponsorshipTypeOptions = [
  { label_en: "Self funded", label_ar: "تمويل ذاتي", value: "self_funded" },
  {
    label_en: "Sponsored by an international organization",
    label_ar: "مدعوم من منظمة دولية",
    value: "sponsored_by_international_organization",
  },
];

interface SponsorshipSelectProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  locale: "en" | "ar";
  className?: string;
}

export default function SponsorshipSelect({
  label,
  register,
  error,
  locale,
  className = "",
}: SponsorshipSelectProps) {
  const isArabic = locale === "ar";
  const id = register?.name;

  return (
    <div className={`group flex flex-col w-full ${className} ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <label 
        htmlFor={id} 
        className={`text-sm font-semibold text-gray-700 mb-1 ${isArabic ? "mr-2" : "ml-2"}`}
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <div className={`absolute pointer-events-none text-slate-400 group-focus-within:text-[#c9a24d] transition-colors duration-300 ${isArabic ? "right-4" : "left-4"}`}>
          <HandCoins size={18} strokeWidth={1.5} />
        </div>

        <select
          id={id}
          {...register}
          className={`
            w-full appearance-none bg-white font-medium text-slate-700
            py-3.5 border-2 rounded-2xl outline-none transition-all duration-300
            ${isArabic ? "pr-12 pl-10" : "pl-12 pr-10"}
            ${error 
              ? "border-red-200 bg-red-50/30 focus:border-red-500" 
              : "border-slate-100 bg-slate-50/50 focus:border-[#0b1236] focus:bg-white focus:shadow-xl focus:shadow-[#0b1236]/10"
            }
          `}
        >
          <option value="" className="text-slate-400">
            {isArabic ? "-- اختر نوع التمويل --" : "-- Select Sponsorship Type --"}
          </option>
          {sponsorshipTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {isArabic ? option.label_ar : option.label_en}
            </option>
          ))}
        </select>

        <div className={`absolute pointer-events-none flex items-center transition-transform group-focus-within:rotate-180 duration-500 ${isArabic ? "left-4" : "right-4"}`}>
          <svg className="w-5 h-5 text-[#c9a24d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && (
        <p className={`mt-2 text-xs font-bold text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 ${isArabic ? "mr-1" : "ml-1"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          {error.message}
        </p>
      )}
    </div>
  );
}