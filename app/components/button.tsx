import React from 'react';
import Link from "next/link";
import { FaPlane } from "react-icons/fa";
import { useLocale } from 'next-intl';

interface PhoenixButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const PhoenixButton = ({ href = "#", children, className = "" }: PhoenixButtonProps) => {
    const locale = useLocale() as "en" | "ar";
  return (
    <div className={`group relative inline-block w-full sm:w-auto ${className}`}>
      <div 
        className="absolute 
                   -inset-1 sm:-inset-2 md:-inset-3 lg:-inset-4
                   border border-[#c9a24d]/40 group-hover:border-[#0b1236]/20 
                   transition-colors duration-500 pointer-events-none"
        style={{ transform: locale === "ar" ? 'skewX(-25deg)' :'skewX(25deg)' }}
      />

      <Link
        href={href}
        className="relative flex items-center justify-between sm:justify-center 
                   bg-[#c9a24d] text-[#0b1236] 
                   /* تدرج العرض الجانبي */
                   px-4 sm:px-8 md:px-12 lg:px-16 xl:!px-20 
                   /* تدرج الارتفاع */
                   py-4 sm:py-4 md:py-5 lg:!py-6 
                   transition-all duration-500 hover:bg-[#0b1236] hover:text-white 
                   shadow-2xl w-full sm:w-fit mx-auto sm:overflow-visible overflow-hidden"
        style={{ transform:  locale === "ar" ? 'skewX(-25deg)' :'skewX(25deg)' }}
      >
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10" style={{ transform:  locale === "ar" ? 'skewX(25deg)' :'skewX(-25deg)' }}>
          
          <span className="font-[1000] uppercase italic 
                           tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] 
                           text-[11px] sm:text-[13px] md:text-[16px] lg:text-[18px] xl:text-[20px] 
                           whitespace-nowrap">
            {children}
          </span>

          <div className="relative w-5 h-5 sm:w-5 md:w-6 lg:w-7 overflow-hidden flex items-center justify-center shrink-0">
            <FaPlane className="text-sm sm:text-base no-flip md:text-xl lg:text-2xl -rotate-45 transition-transform duration-500 group-hover:translate-x-12 group-hover:-translate-y-12" />
            <FaPlane className="text-sm sm:text-base no-flip  md:text-xl lg:text-2xl absolute -left-12 top-12 -rotate-45 transition-transform duration-500 group-hover:translate-x-12 group-hover:-translate-y-12" />
          </div>
        </div>

      </Link>
    </div>
  );
};

export default PhoenixButton;