"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Control, Controller, FieldError, Merge } from "react-hook-form";

interface FormCourseTargetInputProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: Merge<FieldError, (FieldError | undefined)[]>;
  placeholder?: string;
  className?: string;
  description?: string;
}

export default function FormCourseTargetInput({
  name,
  label,
  control,
  error,
  placeholder = "What will students learn or achieve?",
  className = "",
  description,
}: FormCourseTargetInputProps) {
  const id = name;
  const errorId = `${id}-error`;

  // Increased max length for truncate since textareas usually hold longer strings
  const truncate = (text: string, max = 50) =>
    text.length > max ? `${text.slice(0, max)}…` : text;

  return (
    <div className={`mb-6 w-full ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-gray-700 mb-1 ml-2"
      >
        {label}
      </label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const [input, setInput] = useState("");

          const addTarget = () => {
            const trimmed = input.trim();
            if (!trimmed) return;

            field.onChange([...(field.value || []), trimmed]);
            setInput("");
          };

          const removeTarget = (index: number) => {
            field.onChange(
              (field.value || []).filter((_: string, i: number) => i !== index)
            );
          };

          return (
            <>
              <div className="flex flex-col gap-2">
                <Textarea
                  id={id}
                  placeholder={placeholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    // Logic: Enter adds the target, Shift+Enter allows a new line in the box
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      addTarget();
                    }
                  }}
                  aria-invalid={!!error}
                  aria-describedby={
                    error ? errorId : description ? `${id}-desc` : undefined
                  }
                  className={`w-full bg-white shadow-sm transition min-h-[80px]
                    focus:outline-none focus:ring-2
                    ${
                      error
                        ? "border-red-600 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                    }`}
                />

                <div className="flex justify-end">
                  <Button
                    type="button"
                    onClick={addTarget}
                    className="w-full sm:w-auto"
                    size="sm"
                  >
                    + Add Target
                  </Button>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(field.value || []).map((item: string, index: number) => (
                  <Badge
                    key={`${item}-${index}`}
                    variant="secondary"
                    className="flex items-center gap-2 px-3 py-2 text-sm max-w-full"
                  >
                    <span className="whitespace-normal break-words">
                      {truncate(item)}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeTarget(index)}
                      className="text-muted-foreground hover:text-destructive shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Badge>
                ))}
              </div>
            </>
          );
        }}
      />

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-2">
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