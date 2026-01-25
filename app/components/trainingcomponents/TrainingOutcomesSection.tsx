"use client";

import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FaCheck } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrainingOutcomesSection() {
  const locale = useLocale() as "en" | "ar";
  const { outcomes } = trainingData[locale];
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
        .fromTo(".outcome-header", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo(".outcome-item", 
          { opacity: 0, x: locale === 'en' ? -20 : 20 }, 
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        );
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section 
      ref={containerRef} 
      className="bg-white py-24 px-6 overflow-hidden border-t border-slate-50 opacity-0 invisible"
    >
      <div className="max-w-5xl mx-auto">
        
        <div className="outcome-header text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-1 h-1 bg-[#c9a24d] rounded-full" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] font-black uppercase">
              Mission_Success_Criteria
            </span>
            <div className="w-1 h-1 bg-[#c9a24d] rounded-full" />
          </div>
          <h2 className="text-4xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter">
            {outcomes.title}
          </h2>
          <div className="mt-6 flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-[2px] bg-slate-100" />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {outcomes.items.map((item, i) => (
            <div 
              key={i} 
              className="outcome-item group flex items-center gap-4 p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors duration-300"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#c9a24d] group-hover:bg-[#c9a24d]/5 transition-all">
                <FaCheck className="text-[#c9a24d] text-[10px] opacity-40 group-hover:opacity-100 transition-opacity" />
              </div>

              <p className="text-[#0b1236] text-lg font-bold italic tracking-tight uppercase leading-tight group-hover:translate-x-1 transition-transform">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-between opacity-[0.05]">
          <span className="font-mono text-[8px] font-bold tracking-[0.5em] uppercase">Ref_Protocol_99.0</span>
          <div className="h-[1px] flex-1 mx-8 bg-[#0b1236]" />
          <span className="font-mono text-[8px] font-bold tracking-[0.5em] uppercase">Ready_For_Deployment</span>
        </div>

      </div>
    </section>
  );
}