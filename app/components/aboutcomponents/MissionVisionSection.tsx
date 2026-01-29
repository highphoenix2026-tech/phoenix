"use client";

import { FaFlag, FaEye } from "react-icons/fa";
import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MissionVisionSection() {
  const locale = useLocale() as "en" | "ar";
  const { missionVision } = aboutData[locale];
  const icons = [FaFlag, FaEye];
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.set(".info-card", { opacity: 0, y: 40 });

    gsap.to(".info-card", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: containerRef }); 

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-24 bg-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#0b1236 1px, transparent 1px), linear-gradient(90deg, #0b1236 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 relative z-10">
        {missionVision.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={i}
              className="info-card group relative flex flex-col items-start gap-8 bg-white p-12 border border-slate-100 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(11,18,54,0.1)]"
            >
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[#c9a24d]/20 group-hover:border-[#c9a24d] transition-all duration-500" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#c9a24d]/20 group-hover:border-[#c9a24d] transition-all duration-500" />

              <span className="absolute top-8 right-10 text-8xl font-black text-[#0b1236]/[0.02] select-none italic font-mono uppercase tracking-tighter">
                0{i + 1}
              </span>

              <div className="relative z-10 w-16 h-16 flex items-center justify-center bg-[#0b1236] shadow-xl group-hover:bg-[#c9a24d] transition-all duration-500">
                <Icon className="text-[#c9a24d] no-flip group-hover:text-[#0b1236] text-2xl" />
              </div>

              <div className="space-y-4 max-w-md relative z-10">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-[#c9a24d]" />
                   <h3 className="text-3xl font-[1000] text-[#0b1236] tracking-tighter uppercase italic">
                    {item.title}
                  </h3>
                </div>
                <div className="h-[2px] w-12 bg-[#c9a24d] transition-all duration-700 group-hover:w-full opacity-40 group-hover:opacity-100" />
                <p className="text-slate-500 text-lg leading-relaxed font-medium transition-colors duration-500 group-hover:text-[#0b1236]">
                  {item.desc}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-4 relative z-10 w-full border-t border-slate-100">
                <div className="w-1.5 h-1.5 bg-[#c9a24d] animate-pulse" />
                <span className="text-[9px] font-mono font-bold tracking-[0.3em] text-[#0b1236]/40 uppercase">
                  Vector_Status: Stable
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}