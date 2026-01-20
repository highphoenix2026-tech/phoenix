"use client";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface EmailInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  className?: string;
  placeholder?: string;
  description?: string;
}

export default function EmailInput({
  label,
  register,
  error,
  className = "",
  placeholder,
  description,
}: EmailInputProps) {
  // use the registered field name as id when available (better a11y)
  const id = register?.name ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1 ml-2">
        {label}
      </label>

      <div >
        <input
          id={id}
          {...register}
          type="email"
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : description ? `${id}-desc` : undefined}
          className={`w-full pl-3 pr-3 py-2 border rounded-md bg-white shadow-sm transition
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:scale-101
            ${error ? "border-red-600 focus:ring-red-500" : "border-gray-200"}`}
        />
      </div>

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-2">
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2">
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
}
