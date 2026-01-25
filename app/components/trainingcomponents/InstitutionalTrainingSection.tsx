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

export default function TrainingObjectivesSection() {
  const locale = useLocale() as "en" | "ar";
  const { objectives } = trainingData[locale];
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
        
        .fromTo(".obj-sidebar-content", 
          { opacity: 0, x: locale === "en" ? -30 : 30 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        )

        .fromTo(".obj-card-unit", 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [locale]); 

  return (
    <section 
      ref={containerRef} 
      className="bg-white py-24 px-6 overflow-hidden border-t border-slate-50 opacity-0 invisible" // مخفي افتراضياً بـ CSS
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        
        <div className="obj-sidebar-content lg:w-1/3 sticky top-24">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#c9a24d]" />
              <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] font-black uppercase">Directives</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-[0.9]">
              {objectives.title}
            </h2>
            <div className="h-[1px] w-full bg-slate-100 mt-8" />
          </div>
        </div>

        <div className="lg:w-2/3 w-full space-y-3">
          {objectives.items.map((item, i) => (
            <div 
              key={i} 
              className="obj-card-unit group opacity-0 relative flex items-center bg-slate-50 border border-slate-100 p-5 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50"
            >
              <div className="flex flex-col items-center justify-center border-r border-slate-200 pr-6 mr-6 min-w-[50px]">
                <span className="font-mono text-[10px] font-bold text-slate-300 group-hover:text-[#c9a24d]">
                  0{i + 1}
                </span>
                <div className="h-4 w-[1px] bg-slate-100 mt-2" />
              </div>

              <div className="flex-1">
                <p className="text-[#0b1236] text-lg font-bold uppercase italic tracking-tight leading-snug">
                  {item}
                </p>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg className="w-5 h-5 text-[#c9a24d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}