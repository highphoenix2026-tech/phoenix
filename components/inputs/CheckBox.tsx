"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CheckboxInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  description?: string;
  className?: string;
  dir?: boolean; // rtl if true
}

/**
 * Minimal, clean, native-first checkbox.
 * Uses accent-color for a modern look with zero visual noise.
 */
export default function CheckboxInput({
  label,
  register,
  error,
  description,
  className = "",
  dir = false,
}: CheckboxInputProps) {
  const id =
    register?.name ?? `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;

  const align = dir ? "text-right" : "text-left";
  const gap = dir ? "mr-7" : "ml-7";

  return (
    <div className={`mb-3 ${className}`} dir={dir ? "rtl" : "ltr"}>
      <label
        htmlFor={id}
        className={`flex items-start gap-2 cursor-pointer select-none ${align}`}
      ><span className="text-sm font-medium text-gray-800 leading-snug mt-0.5">
          {label} 
        </span>
        <input
          id={id}
          type="checkbox"
          {...register}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : description ? `${id}-desc` : undefined}
          className={`mt-1 h-4 w-4 rounded border border-gray-300
            accent-[#397a34]
            focus:outline-none focus:ring-2 focus:ring-[#397a34]/30
            ${error ? "border-red-500 accent-red-600 focus:ring-red-500/30" : ""}`}
        />

        
      </label>

      {description && (
        <p id={`${id}-desc`} className={`mt-1 text-xs text-gray-500 ${gap} ${align}`}>
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className={`mt-1 text-xs text-red-600 ${gap} ${align}`}>
          {error.message}
        </p>
      )}
    </div>
  );
}
