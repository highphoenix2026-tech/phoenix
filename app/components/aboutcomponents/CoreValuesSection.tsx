"use client";

import { FaShieldAlt, FaCheck, FaStar, FaSchool, FaLeaf } from "react-icons/fa";
import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CoreValuesSection() {
  const locale = useLocale() as "en" | "ar";
  const { values } = aboutData[locale];
  const icons = [FaShieldAlt, FaCheck, FaStar, FaSchool, FaLeaf];
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set(".value-card", { opacity: 0, y: 50 });
    gsap.set(".values-title", { opacity: 0, x: -30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    tl.to(".values-title", { opacity: 1, x: 0, duration: 0.8 })
      .to(".value-card", { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: "power4.out" 
      }, "-=0.4");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-24 bg-[#0b1236] relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-[#c9a24d]" />
        <div className="absolute top-0 left-2/4 w-[1px] h-full bg-[#c9a24d]" />
        <div className="absolute top-0 left-3/4 w-[1px] h-full bg-[#c9a24d]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="values-title flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-[#c9a24d]" />
              <span className="text-[#c9a24d] font-mono text-xs tracking-[0.4em] uppercase font-bold">
                {values.badge || "Core_Assets"}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-[1000] text-white uppercase italic tracking-tighter leading-none">
              {values.title}
            </h2>
          </div>
          
          <div className="hidden md:block text-right">
            <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
              System_Integrity: 100% <br />
              Operational_Standards_Active
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {values.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div 
                key={i} 
                className="value-card group relative bg-white/5 border border-white/10 p-8 flex flex-col items-center text-center transition-all duration-500 hover:bg-white hover:shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#c9a24d]/0 group-hover:border-[#c9a24d]/100 group-hover:w-full group-hover:h-full transition-all duration-700" />
                
                <div className="mb-8 relative">
                  <div className="w-16 h-16 rounded-full border border-[#c9a24d]/30 flex items-center justify-center text-[#c9a24d] text-2xl group-hover:bg-[#0b1236] group-hover:border-[#0b1236] transition-all duration-500">
                    <Icon className="no-flip relative z-10" />
                  </div>
                  <div className="absolute inset-0 border-t border-[#c9a24d] rounded-full animate-spin opacity-0 group-hover:opacity-100 duration-1000" />
                </div>

                <h4 className="font-black text-xs md:text-sm uppercase tracking-widest text-[#c9a24d] mb-4 group-hover:text-[#0b1236] transition-colors">
                  {item.title}
                </h4>
                
                <p className="text-[11px] centert md:text-xs text-slate-400 leading-relaxed font-medium group-hover:text-slate-600 transition-colors">
                  {item.desc}
                </p>

                <div className="mt-8 pt-4 border-t border-white/5 w-full flex justify-between items-center opacity-20 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[8px] text-white group-hover:text-[#0b1236]">VAL_{i+1}</span>
                  <div className="w-1 h-1 bg-[#c9a24d] rounded-full group-hover:animate-ping" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a24d]/20 to-transparent" />
    </section>
  );
}