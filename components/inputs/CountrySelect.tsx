"use client";

import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Globe } from "lucide-react";

// Full Arab League list + Major International Countries
const countries = [
  // --- Arab League Countries ---
  { code: "DZ", en: "Algeria", ar: "الجزائر" },
  { code: "BH", en: "Bahrain", ar: "البحرين" },
  { code: "KM", en: "Comoros", ar: "جزر القمر" },
  { code: "DJ", en: "Djibouti", ar: "جيبوتي" },
  { code: "EG", en: "Egypt", ar: "مصر" },
  { code: "IQ", en: "Iraq", ar: "العراق" },
  { code: "JO", en: "Jordan", ar: "الأردن" },
  { code: "KW", en: "Kuwait", ar: "الكويت" },
  { code: "LB", en: "Lebanon", ar: "لبنان" },
  { code: "LY", en: "Libya", ar: "ليبيا" },
  { code: "MR", en: "Mauritania", ar: "موريتانيا" },
  { code: "MA", en: "Morocco", ar: "المغرب" },
  { code: "OM", en: "Oman", ar: "عمان" },
  { code: "PS", en: "Palestine", ar: "فلسطين" },
  { code: "QA", en: "Qatar", ar: "قطر" },
  { code: "SA", en: "Saudi Arabia", ar: "المملكة العربية السعودية" },
  { code: "SO", en: "Somalia", ar: "الصومال" },
  { code: "SD", en: "Sudan", ar: "السودان" },
  { code: "SY", en: "Syria", ar: "سوريا" },
  { code: "TN", en: "Tunisia", ar: "تونس" },
  { code: "AE", en: "United Arab Emirates", ar: "الإمارات العربية المتحدة" },
  { code: "YE", en: "Yemen", ar: "اليمن" },
  
  // --- Major International ---
  { code: "US", en: "United States", ar: "الولايات المتحدة" },
  { code: "GB", en: "United Kingdom", ar: "المملكة المتحدة" },
  { code: "CA", en: "Canada", ar: "كندا" },
  { code: "FR", en: "France", ar: "فرنسا" },
  { code: "DE", en: "Germany", ar: "ألمانيا" },
  { code: "TR", en: "Turkey", ar: "تركيا" },
  { code: "CN", en: "China", ar: "الصين" },
  { code: "IN", en: "India", ar: "الهند" },
  { code: "MY", en: "Malaysia", ar: "ماليزيا" },
  { code: "SG", en: "Singapore", ar: "سنغافورة" },
  { code: "CH", en: "Switzerland", ar: "سويسرا" },
].sort((a, b) => (a.en > b.en ? 1 : -1));

interface CountrySelectProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  locale: "en" | "ar";
  className?: string;
}

export default function CountrySelect({
  label,
  register,
  error,
  locale,
  className = "",
}: CountrySelectProps) {
  const isArabic = locale === "ar";
  const id = register?.name;

  return (
    <div className={`group flex flex-col w-full ${className} ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      {/* Label with brand Navy */}
      <label 
        htmlFor={id} 
        className={`block text-sm font-semibold text-gray-700 mb-1 ml-2`}
      >
        {label}
      </label>

      <div className="relative flex items-center">
        {/* Decorative Globe Icon */}
        <div className={`absolute pointer-events-none text-slate-400 group-focus-within:text-[#c9a24d] transition-colors duration-300 ${isArabic ? "right-4" : "left-4"}`}>
          <Globe size={18} strokeWidth={1.5} />
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
            {isArabic ? "-- اختر البلد --" : "-- Select Country --"}
          </option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {isArabic ? c.ar : c.en}
            </option>
          ))}
        </select>

        {/* Custom Gold Chevron Arrow */}
        <div className={`absolute pointer-events-none flex items-center transition-transform group-focus-within:rotate-180 duration-500 ${isArabic ? "left-4" : "right-4"}`}>
          <svg className="w-5 h-5 text-[#c9a24d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Modern Error Layout */}
      {error && (
        <p className={`mt-2 text-xs font-bold text-red-500 flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 ${isArabic ? "mr-1" : "ml-1"}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          {error.message}
        </p>
      )}
    </div>
  );
}