"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, Controller, FieldError } from "react-hook-form";

interface Option {
  label: string;
  value: string ;
}

interface FormSelectProps {
  name: string;
  label: string;
  control: Control<any>;
  options: Option[];
  error?: FieldError;
  placeholder?: string;
  className?: string;
  description?: string;
  triggerClassName?: string;
}

export default function FormSelect({
  name,
  label,
  control,
  options,
  error,
  placeholder = "Select option",
  className = "",
  description,
  triggerClassName = "w-[180px]",
}: FormSelectProps) {
  const id = name;
  const errorId = `${id}-error`;

  return (
    <div className={`mb-4 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-1 ml-2"
      >
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
         <Select
  value={field.value}
  onValueChange={field.onChange}
  defaultValue={field.value}
>

            <SelectTrigger
            
              id={id}
              aria-invalid={!!error}
              aria-describedby={
                error ? errorId : description ? `${id}-desc` : undefined
              }
              className={`bg-white shadow-sm transition
                focus:outline-none focus:ring-2 focus:ring-blue-500
                
                ${triggerClassName}
                ${error ? "border-red-600 focus:ring-red-500" : "border-gray-200"}`}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-2">
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="mt-1 text-xs text-red-600 ml-2"
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
