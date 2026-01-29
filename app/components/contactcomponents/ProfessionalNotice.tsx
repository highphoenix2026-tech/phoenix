"use client";

import { useLocale } from "next-intl";
import { contactData } from "@/app/data/contactData";
import { FaShieldAlt } from "react-icons/fa";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProfessionalNotice() {
  const locale = useLocale() as "en" | "ar";
  const { professional } = contactData[locale];
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      tl.to(containerRef.current, { autoAlpha: 1, duration: 0.1 })
        .fromTo(".notice-content", 
          { opacity: 0, scale: 0.98 }, 
          { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
        );
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section 
      ref={containerRef} 
      className="py-24 px-6 md:px-24 bg-white border-t border-slate-100 opacity-0 invisible"
    >
      <div className="max-w-4xl mx-auto text-center notice-content">
        
        <div className="relative  mb-10 w-full flex items-center justify-center">
          <div className="absolute inset-0  blur-xl rounded-full" />
          <div className="relative w-20 h-20 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center">
            <FaShieldAlt className="text-[#c9a24d] text-3xl no-flip" />
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-slate-300" />
            <span className="text-[#c9a24d] font-mono text-[9px] tracking-[0.4em] font-black centert uppercase"> {locale === "ar" ?"إشعار رسمي" :" Official_Notice" }</span>
            <span className="w-6 h-[1px] bg-slate-300" />
          </div>
          <h2 className="text-3xl md:text-5xl centert font-[1000] text-[#0b1236] uppercase italic tracking-tighter">
            {professional.title}
          </h2>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto">
          <p className="text-slate-600 centert text-lg font-medium leading-relaxed italic">
            {professional.desc1}
          </p>
          <div className="flex justify-center py-2">
            <div className="w-12 h-[1px] bg-[#c9a24d]" />
          </div>
          <p className="text-slate-500 centert text-sm md:text-base leading-relaxed font-medium">
            {professional.desc2}
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 opacity-30">
           <div className="h-10 w-[1px] bg-gradient-to-b from-[#0b1236] to-transparent" />
           <p className="font-mono text-[8px] font-black tracking-[0.8em] uppercase italic text-[#0b1236]">
             Phoenix_Aviation_Compliance
           </p>
        </div>

      </div>
    </section>
  );
}