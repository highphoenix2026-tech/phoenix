"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";
import { FaCheck } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function OutcomesSection() {
  const locale = useLocale() as "en" | "ar";
  const { outcomes } = advisoryData[locale];
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.fromTo(".outcome-header", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(".outcome-item", 
      { opacity: 0, x: locale === "en" ? -20 : 20 }, 
      { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#0b1236] py-24 relative overflow-hidden border-t border-white/5">
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 right-10 font-mono text-[8px] text-white/10 rotate-90 tracking-[1em] uppercase">
          Outcome_Deployment_Success
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="outcome-header opacity-0 mb-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-[#c9a24d]" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
              Strategic_Impact
            </span>
            <div className="w-10 h-[1px] bg-[#c9a24d]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-[1000] text-white uppercase italic tracking-tighter">
            Advisory Outcomes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
          {outcomes.map((item, i) => (
            <div 
              key={i} 
              className="outcome-item opacity-0 group flex items-start gap-5 p-5 bg-white/5 border-l-2 border-[#c9a24d]/30 hover:border-[#c9a24d] hover:bg-white/10 transition-all duration-300"
            >
              <div className="mt-1 flex items-center justify-center w-6 h-6 rounded-sm border border-[#c9a24d] group-hover:bg-[#c9a24d] transition-colors duration-300 shadow-[0_0_10px_rgba(201,162,77,0.2)]">
                <FaCheck className="text-[10px] text-[#c9a24d] group-hover:text-[#0b1236] no-flip" />
              </div>

              <div className="space-y-1">
                <p className="text-white text-lg font-bold tracking-tight leading-tight group-hover:text-[#c9a24d] transition-colors">
                  {item}
                </p>
                <span className="block font-mono text-[8px] text-white/20 uppercase tracking-widest">
                  Log_Ref: PHX-OUT-0{i+1}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex items-center gap-6">
             <div className="flex gap-1">
                {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 bg-[#c9a24d] rotate-45" />)}
             </div>
             <span className="font-mono text-[9px] text-white/30 tracking-[0.3em] uppercase">
               Mission_Accomplished_Framework
             </span>
             <div className="flex gap-1">
                {[...Array(4)].map((_, i) => <div key={i} className="w-1 h-1 bg-[#c9a24d] rotate-45" />)}
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}