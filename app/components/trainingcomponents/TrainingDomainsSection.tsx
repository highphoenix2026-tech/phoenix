"use client";

import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrainingDomainsSection() {
  const locale = useLocale() as "en" | "ar";
  const { domains } = trainingData[locale];
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    tl.fromTo(".domain-header", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".domain-pillar", 
      { 
        opacity: 0, 
        y: 60, 
        scale: 0.9,
        visibility: "hidden" 
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        visibility: "visible",
        duration: 0.8, 
        stagger: 0.15, 
        ease: "power4.out" 
      }, 
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-[#0b1236] relative overflow-hidden border-t border-white/5">
      
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#c9a24d 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="domain-header opacity-0 mb-20 flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-[#c9a24d]" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
               {locale === "ar" ?"قطاعات_الخبرة" :"Expertise_Sectors" }
            </span>
            <div className="w-10 h-[1px] bg-[#c9a24d]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-[1000] text-white uppercase italic tracking-tighter leading-none">
            {domains.title}
          </h2>
          <div className="mt-6 h-[1px] w-20 bg-[#c9a24d]/30" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {domains.items.map((item, i) => (
            <div 
              key={i} 
              className="domain-pillar invisible opacity-0 group relative bg-[#121a3d] border border-white/10 p-8 h-[320px] flex flex-col justify-between transition-all duration-500 hover:bg-[#c9a24d] overflow-hidden shadow-2xl"
            >
              <div className="flex justify-between items-start relative z-10">
                <span className="font-mono text-[10px] font-bold text-[#c9a24d] group-hover:text-[#0b1236] transition-colors">
                  SECTOR_0{i + 1}
                </span>
                <div className="w-4 h-[1px] bg-[#c9a24d]/30 group-hover:bg-[#0b1236]/30 transition-colors" />
              </div>

              <div className="relative z-10 space-y-3">
                <h3 className="text-xl font-black text-white uppercase italic leading-tight tracking-tight group-hover:text-[#0b1236] transition-colors">
                  {item.title}
                </h3>
                <div className="w-6 h-[2px] bg-[#c9a24d] group-hover:bg-[#0b1236] group-hover:w-full transition-all duration-500" />
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium group-hover:text-[#0b1236]/80 transition-colors line-clamp-4">
                  {item.desc}
                </p>
              </div>

              <span className="absolute -bottom-6 -right-4 text-9xl font-black text-white/[0.03] select-none pointer-events-none group-hover:text-[#0b1236]/10 transition-colors italic">
                {i + 1}
              </span>

              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#c9a24d] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#c9a24d] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center opacity-20">
          <div className="flex items-center gap-4 font-mono text-[8px] text-white tracking-[0.5em] uppercase">
            <span>Phoenix_Certified_Domains</span>
            <div className="w-2 h-2 bg-[#c9a24d] rounded-full animate-pulse" />
            <span>Operational_Verified</span>
          </div>
        </div>

      </div>
    </section>
  );
}