"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function PartnerSection() {
  const locale = useLocale() as "en" | "ar";
  const { partner } = advisoryData[locale];
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".partner-content", {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 px-6 bg-white relative overflow-hidden border-t border-slate-50">
      
      <div className="absolute inset-0 opacity-[0.3] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-3xl mx-auto text-center relative z-10 partner-content">
        
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-6 h-[1px] bg-[#c9a24d]" />
          <span className="text-[#c9a24d] font-mono text-[9px] tracking-[0.4em] font-black uppercase">
            Direct_Contact
          </span>
          <div className="w-6 h-[1px] bg-[#c9a24d]" />
        </div>

        <h2 className="text-3xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-none mb-6">
          {partner.title}
        </h2>

        <p className="text-slate-500 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed mb-10">
          {partner.desc}
        </p>

        <div className="flex justify-center">
          <Link
            href="/contact"
            className="group relative flex items-center gap-4 bg-[#c9a24d] px-10 py-4 text-[#0b1236] font-black uppercase italic tracking-widest text-xs transition-all duration-300 hover:bg-[#b8933f]"
          >
            {partner.cta}
            <div className={`transition-transform duration-500 group-hover:translate-x-2 ${locale === 'ar' ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            <div className="absolute -top-[2px] -right-[2px] w-1 h-1 bg-[#0b1236]" />
            <div className="absolute -bottom-[2px] -left-[2px] w-1 h-1 bg-[#0b1236]" />
          </Link>
        </div>

        <div className="mt-12 flex justify-center items-center gap-6 opacity-[0.15]">
            <span className="font-mono text-[7px] text-[#0b1236] tracking-[0.3em] uppercase">PHX_Global_Connect</span>
            <div className="w-6 h-[1px] bg-[#0b1236]" />
            <span className="font-mono text-[7px] text-[#0b1236] tracking-[0.3em] uppercase">Ready_For_Launch</span>
        </div>
      </div>
    </section>
  );
}