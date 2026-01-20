"use client";

import  { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
  className?: string;
  description?: string;
}

export default function PasswordInput({
  label,
  register,
  error,
  placeholder,
  className = "",
  description,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const id = register?.name ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1 ml-2">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          {...register}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : description ? `${id}-desc` : undefined}
          className={`w-full pr-10 pl-3 py-2 border rounded-md bg-white shadow-sm transition
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:scale-101
            ${error ? "border-red-600 focus:ring-red-500" : "border-gray-200"}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <EyeSlashIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-3">
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
