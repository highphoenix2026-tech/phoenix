"use client";

import { useLocale } from "next-intl";
import { contactData } from "@/app/data/contactData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function HeroSection() {
  const locale = useLocale() as "en" | "ar";
  const { hero } = contactData[locale];

  useGSAP(() => {
    gsap.from(".hero-content", {
      opacity: 0,
      scale: 0.98,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="relative py-20 px-6 md:px-24 bg-[#0b1236] text-white">
      
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[#c9a24d]/30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-[#c9a24d]/30 pointer-events-none" />

      <div className="max-w-5xl mx-auto hero-content relative z-10 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c9a24d]/20 pl-8 rtl:pr-8">
        <div className="flex flex-col gap-6">
          
          <div className="flex items-center gap-3">
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase">
              Global_Communication_Hub
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#c9a24d]/40 to-transparent" />
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            {hero.title}
          </h1>

          <p className="max-w-3xl text-base md:text-xl text-slate-300 leading-relaxed font-medium">
            {hero.desc}
          </p>

          <div className="flex gap-10 pt-4 opacity-40 font-mono text-[9px] tracking-widest uppercase">
            <span>FREQ: 121.5 MHZ</span>
            <span>Signal: Clear</span>
            <span className="hidden md:inline">Protocol: Secure_Line</span>
          </div>
        </div>
      </div>
    </section>
  );
}