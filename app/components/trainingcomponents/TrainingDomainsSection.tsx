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
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        }
      });

      tl.to(containerRef.current, { autoAlpha: 1, duration: 0.1 })
        .fromTo(".domain-header", 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo(".domain-pillar", 
          { opacity: 0, y: 50 }, 
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power4.out" },
          "-=0.5"
        );
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section 
      ref={containerRef} 
      className="bg-white py-24 px-6 overflow-hidden border-t border-slate-50 opacity-0 invisible"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="domain-header text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-[#c9a24d]" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.5em] font-black uppercase">Expertise_Sectors</span>
            <div className="w-10 h-[1px] bg-[#c9a24d]" />
          </div>
          <h2 className="text-4xl md:text-6xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-none">
            {domains.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {domains.items.map((item, i) => (
            <div 
              key={i} 
              className="domain-pillar group relative flex flex-col bg-slate-50 border-t-4 border-slate-200 p-8 pt-12 min-h-[320px] transition-all duration-500 hover:bg-[#0b1236] hover:border-[#c9a24d] hover:-translate-y-4 shadow-sm"
            >
              <div className="absolute top-6 left-8 font-mono text-[10px] font-bold text-slate-300 group-hover:text-[#c9a24d]/50 transition-colors">
                SECTOR_0{i + 1}
              </div>

              <div className="mt-auto space-y-4">
                <h4 className="font-black text-[#0b1236] text-xl uppercase italic tracking-tight group-hover:text-white transition-colors leading-tight">
                  {item.title}
                </h4>
                <div className="w-6 h-[2px] bg-[#c9a24d] group-hover:w-12 transition-all duration-500" />
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-300 transition-colors font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none bg-gradient-to-b from-[#c9a24d] to-transparent" />
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center items-center gap-10 opacity-[0.05]">
           <div className="h-[1px] flex-1 bg-[#0b1236]" />
           <span className="font-mono text-[8px] font-black tracking-[1em] uppercase">Phoenix_Certified_Domains</span>
           <div className="h-[1px] flex-1 bg-[#0b1236]" />
        </div>

      </div>
    </section>
  );
}