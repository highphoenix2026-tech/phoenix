"use client";

import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Phone } from "lucide-react";

interface PhoneInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  locale: "en" | "ar";
  className?: string;
  placeholder?: string;
}

export default function PhoneInput({
  label,
  register,
  error,
  locale,
  className = "",
  placeholder,
}: PhoneInputProps) {
  const isArabic = locale === "ar";
  const id = register?.name;

  return (
    <div className={`group flex flex-col w-full ${className} ${isArabic ? "rtl" : "ltr"}`} dir={isArabic ? "rtl" : "ltr"}>
      <label 
        htmlFor={id} 
        className={`block text-sm font-semibold text-gray-700 mb-1 ${isArabic ? "mr-2" : "ml-2"}`}
      >
        {label}
      </label>

      <div className="relative flex items-center">
        <div className={`absolute pointer-events-none text-slate-400 group-focus-within:text-[#c9a24d] transition-colors duration-300 ${isArabic ? "right-4" : "left-4"}`}>
          <Phone size={18} strokeWidth={1.5} />
        </div>

        <input
          id={id}
          type="tel"
          {...register}
          placeholder={placeholder || (isArabic ? "+966 50 000 0000" : "+1 234 567 890")}
          className={`
            w-full appearance-none bg-white font-medium text-slate-700
            py-3.5 border-2 rounded-2xl outline-none transition-all duration-300
            placeholder:text-slate-300
            ${isArabic ? "pr-12 pl-4" : "pl-12 pr-4"}
            ${error 
              ? "border-red-200 bg-red-50/30 focus:border-red-500" 
              : "border-slate-100 bg-slate-50/50 focus:border-[#0b1236] focus:bg-white focus:shadow-xl focus:shadow-[#0b1236]/10"
            }
          `}
        />
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