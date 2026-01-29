"use client";

import { useLocale } from "next-intl";
import { homeData } from "@/app/data/homedata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SafetySection() {
  const locale = useLocale() as "en" | "ar";
  const { safety } = homeData[locale];
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });

    tl.to(".safety-line", { width: "100%", duration: 1, ease: "power4.inOut" })
      .to(".safety-animate", { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.5")
      .to(".safety-bracket", { 
        scale: 1.1, 
        repeat: -1, 
        yoyo: true, 
        duration: 1.5, 
        ease: "sine.inOut" 
      });
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-[#0b1236] py-32 px-6 overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{ backgroundImage: 'linear-gradient(#c9a24d 1px, transparent 1px), linear-gradient(90deg, #c9a24d 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>

      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c9a24d]/40 to-transparent animate-scan" />

      <div className="max-w-4xl mx-auto relative">
        
        <div className="safety-bracket absolute -top-8 -left-8 w-12 h-12 border-t-2 border-l-2 border-[#c9a24d]" />
        <div className="safety-bracket absolute -bottom-8 -right-8 w-12 h-12 border-b-2 border-r-2 border-[#c9a24d]" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          
          <div className="safety-animate opacity-0 translate-y-4 flex items-center gap-4">
            <span className="w-2 h-2 bg-[#c9a24d] animate-pulse rounded-full" />
            <span className="text-[#c9a24d] font-mono text-xs tracking-[0.5em] uppercase font-bold">
              Protocol_Status: Active
            </span>
            <span className="w-2 h-2 bg-[#c9a24d] animate-pulse rounded-full" />
          </div>

          <div className="space-y-4 w-full">
            <h2 className="safety-animate centert opacity-0 translate-y-6 text-4xl md:text-6xl font-[1000] text-white uppercase italic tracking-tighter leading-none">
              {safety.title}
            </h2>
            <div className="safety-line w-0 h-[1px] bg-[#c9a24d]/30 mx-auto" />
          </div>

          <p className="safety-animate centert opacity-0 translate-y-6 text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl font-medium italic">
            {safety.desc}
          </p>

          <div className="safety-animate opacity-0 translate-y-4 pt-8 flex gap-8 font-mono text-[10px] text-white/30 tracking-widest uppercase">
            <div className="flex flex-col">
              <span>Security_Level</span>
              <span className="text-[#c9a24d]">MAXIMUM</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10" />
            <div className="flex flex-col">
              <span>Compliance</span>
              <span className="text-[#c9a24d]">ICAO_STD</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
}