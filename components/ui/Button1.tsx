import React, { ReactNode, ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  className?: string;
}

export default function SecondaryButton({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        px-4 py-2 text-sm
        sm:px-5 sm:py-2.5 sm:text-base
        md:px-6 md:py-3 md:text-lg
        lg:px-4 lg:py-2 lg:text-lg

        rounded-full font-bold
        border-2 border-[#c9a24d] text-[#c9a24d]
        bg-white relative overflow-hidden

        /* Standard states */
        disabled:opacity-50 disabled:cursor-not-allowed

        /* Hover effect */
        before:absolute before:top-0 before:left-0 before:h-full before:w-0
        before:bg-[#c9a24d]/10 before:transition-all before:duration-300
        hover:before:w-full

        transition-all duration-300
        ${className}
      `}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}