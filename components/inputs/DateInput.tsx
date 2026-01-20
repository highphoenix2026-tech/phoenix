"use client";

import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface DateInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  description?: string;
  min?: string;
  max?: string;
  initialValue?: Date | string | null; 
  dir?:boolean
}

export default function DateInput({
  label,
  register,
  error,
  placeholder,
  className = "",
  description,
  min,
  max,
  initialValue,
  dir
}: DateInputProps) {
  const id =
    register?.name ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;

  // Convert initialValue to yyyy-mm-dd string for input
  const formattedValue = initialValue
    ? new Date(initialValue).toISOString().split("T")[0]
    : "";

  return (
    <div className={`mb-4 ${className}`} >
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-1 ml-2"
      >
        {label}
      </label>
<input
dir={dir?"rtl":"ltr"}
  id={id}
  type="date"
  {...register}
  min={min}
  max={max}
  aria-invalid={!!error}
  defaultValue={formattedValue}
  aria-describedby={error ? errorId : description ? `${id}-desc` : undefined}
  className={`w-full px-3 py-2 border rounded-md bg-white shadow-sm transition
    focus:outline-none focus:ring-2 focus:ring-blue-500
    ${error ? "border-red-600 focus:ring-red-500" : "border-gray-200"}`}
/>

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-3">
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 ml-2">
          {error.message}
        </p>
      )}
    </div>
  );
}
