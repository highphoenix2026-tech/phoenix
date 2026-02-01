"use client";

import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FaShieldAlt } from "react-icons/fa";

interface Props {
  title: string;
  categoryName: string;
}

export default function CourseDetailHero({ title, categoryName }: Props) {
  const locale = useLocale() as "en" | "ar";

  useGSAP(() => {
    gsap.from(".hero-line", { width: 0, duration: 1.2, ease: "power3.out" });
    gsap.from(".hero-text", { opacity: 0, x: -20, stagger: 0.2, duration: 1 });
  }, []);

  return (
    <section className="relative py-24 px-6 md:px-24 bg-[#0b1236] text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#c9a24d]/5 skew-x-[-15deg] translate-x-20" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col gap-6 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c9a24d]/30 pl-8 rtl:pr-8">
          
          <div className="hero-text flex items-center gap-3">
            <FaShieldAlt className="text-[#c9a24d] text-xs" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase">
              Training_Module // {categoryName}
            </span>
            <div className="hero-line h-[1px] flex-1 bg-gradient-to-r from-[#c9a24d]/40 to-transparent" />
          </div>

          <h1 className="hero-text text-5xl md:text-7xl font-[1000] uppercase italic tracking-tighter leading-none">
            {title}
          </h1>

          <div className="hero-text flex gap-8 pt-4 opacity-50 font-mono text-[9px] tracking-widest uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Status: Active_Program
            </span>
            <span>Security_Level: L3</span>
            <span>Auth: Specialized_Training</span>
          </div>
        </div>
      </div>
    </section>
  );
}