"use client";

import { useLocale } from "next-intl";
import { homeData } from "@/app/data/homedata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FounderSection() {
  const locale = useLocale() as "en" | "ar";
  const { founder } = homeData[locale];

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".founder-section",
        start: "top 75%",
      }
    });

    tl.from(".bracket-tl", { x: -50, y: -50, opacity: 0, duration: 1 })
      .from(".bracket-br", { x: 50, y: 50, opacity: 0, duration: 1 }, "-=1")
      
      .from(".founder-img-box", { 
        clipPath: "inset(100% 0% 0% 0%)", 
        duration: 1.2, 
        ease: "power4.out" 
      }, "-=0.8")

      .from(".founder-info", { 
        x: locale === "ar" ? 50 : -50, 
        opacity: 0, 
        duration: 0.8 
      }, "-=0.5")
      .from(".founder-text", { 
        opacity: 0, 
        y: 20, 
        duration: 0.8 
      }, "-=0.4");
  }, [locale]);

  return (
    <section className="founder-section relative bg-[#f8f9fa] py-28 px-6 md:px-24 overflow-hidden border-t border-slate-200">
      
      <div className="absolute top-10 left-10 opacity-[0.04] pointer-events-none select-none hidden md:block">
        <h2 className="text-[12rem] font-black text-[#0b1236]">VISION</h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-16 items-center relative z-10">
        
        <div className="md:col-span-4 relative">
          <div className="bracket-tl absolute -top-5 -left-5 w-20 h-20 border-t-2 border-l-2 border-[#c9a24d] z-20" />
          <div className="bracket-br absolute -bottom-5 -right-5 w-20 h-20 border-b-2 border-r-2 border-[#c9a24d] z-20" />
          
          <div className="founder-img-box relative aspect-[4/5] bg-[#0b1236] rounded-sm overflow-hidden shadow-2xl">
            <img 
              src="	https://www.highphoenix.com/assets/founder_profile.jpg" 
              className="object-cover grayscal hover:grayscale-0 transition-all duration-1000" 
              alt={founder.name}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1236]/60 to-transparent" />
          </div>
        </div>

        <div className="md:col-span-8 space-y-8">
          <div className="founder-info space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[1px] bg-[#c9a24d]" />
              <span className="text-[#c9a24d] font-mono text-xs tracking-[0.4em] uppercase">
                Commander_In_Chief
              </span>
            </div>
            
            <h3 className="text-4xl md:text-6xl font-black text-[#0b1236] uppercase italic tracking-tighter leading-none">
              {founder.name}
            </h3>
            <p className="text-xl font-bold text-[#c9a24d] tracking-widest uppercase">
              {founder.role}
            </p>
          </div>

          <div className="founder-text relative">
            <span className="absolute -top-10 -left-6 text-8xl text-[#c9a24d]/10 font-serif">“</span>
            <p className="text-slate-600 leading-relaxed text-lg md:text-2xl font-medium italic border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#c9a24d]/20 pl-8 rtl:pr-8">
              {founder.desc}
            </p>
            
            <div className="mt-10 flex gap-6 opacity-30 font-mono text-[10px] tracking-widest uppercase border-t border-slate-200 pt-6">
              <span>Verified_Leadership</span>
              <span>SINCE_1994</span>
              <span className="hidden md:inline">ID: AC-FOUNDER-01</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}