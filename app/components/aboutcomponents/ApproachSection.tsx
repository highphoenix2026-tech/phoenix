"use client";

import { FaShieldAlt, FaCheck, FaStar, FaSchool } from "react-icons/fa";
import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ApproachSection() {
  const locale = useLocale() as "en" | "ar";
  const { approach } = aboutData[locale];
  const icons = [FaShieldAlt, FaCheck, FaStar, FaSchool];
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set(".approach-card", { opacity: 0, y: 30, scale: 0.95 });
    gsap.set(".approach-header", { opacity: 0, y: -20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      }
    });

    tl.to(".approach-header", { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: "power3.out" 
    })
    .to(".approach-card", { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      stagger: 0.2, 
      duration: 0.7, 
      ease: "back.out(1.2)" 
    }, "-=0.4");

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative bg-white py-32 px-6 md:px-24 overflow-hidden border-t border-slate-100">
      
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#0b1236 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="approach-header flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#c9a24d]" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
              {approach.badge || "Methodology"}
            </span>
            <div className="w-8 h-[1px] bg-[#c9a24d]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter">
            {approach.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {approach.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div 
                key={i} 
                className="approach-card group opacity-0 relative bg-white border border-slate-100 p-8 transition-all duration-500 hover:border-[#c9a24d] hover:shadow-[0_30px_60px_-15px_rgba(11,18,54,0.1)]"
              >
                <div className="absolute -top-3 left-6 bg-[#0b1236] text-[#c9a24d] font-mono text-[9px] px-3 py-1 tracking-[0.2em] font-bold z-20">
                  PHASE_0{i + 1}
                </div>

                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#c9a24d]/10 group-hover:border-[#c9a24d] transition-colors duration-500" />

                <div className="flex flex-col items-center text-center space-y-5">
                  <div className="w-16 h-16 flex items-center justify-center bg-slate-50 text-[#c9a24d] text-2xl group-hover:bg-[#0b1236] transition-all duration-500 rounded-sm">
                    <Icon className="no-flip" />
                  </div>
                  
                  <h4 className="font-black text-sm uppercase tracking-wider text-[#0b1236] group-hover:text-[#c9a24d]">
                    {item.title}
                  </h4>
                  
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 h-[1px] bg-slate-100 w-full relative">
                  <div className="absolute top-0 left-0 h-full bg-[#c9a24d] w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-10 left-10 opacity-[0.05] hidden lg:block">
        <div className="font-mono text-[10px] tracking-widest text-[#0b1236] rotate-90 origin-left uppercase">
          Phoenix_Tactical_Approach_v2.0
        </div>
      </div>
    </section>
  );
}