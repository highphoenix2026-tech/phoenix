"use client";

import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  title: string;
  categoryName: string;
  courseId?: string; 
}

export default function CourseHero({ title, categoryName, courseId = "TR-99" }: Props) {
  const locale = useLocale() as "en" | "ar";

  useGSAP(() => {
    gsap.from(".hero-content", {
      opacity: 0,
      scale: 0.99,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="relative py-20 px-6 md:px-24 bg-[#0b1236] text-white">
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[#c9a24d]/30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-[#c9a24d]/30 pointer-events-none" />

      <div className="max-w-6xl mx-auto hero-content relative z-10 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c9a24d]/20 pl-8 rtl:pr-8">
        <div className="flex flex-col gap-6">
          
          <div className="flex items-center gap-3">
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase">
              Training_Module // {categoryName}
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#c9a24d]/40 to-transparent" />
          </div>

          <h1 className="text-4xl md:text-6xl font-[1000] uppercase italic tracking-tighter leading-none">
            {title}
          </h1>

          <div className="flex flex-wrap gap-8 pt-6 opacity-40 font-mono text-[9px] tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#c9a24d] rounded-full animate-pulse" />
              Status: Operational
            </div>
            <span>Module_ID: {courseId}</span>
            <span>Auth: Specialized_Access</span>
            <span className="hidden md:inline">Loc: Training_Sector</span>
          </div>

        </div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('/grid.png')] opacity-[0.03] pointer-events-none" />
    </section>
  );
}