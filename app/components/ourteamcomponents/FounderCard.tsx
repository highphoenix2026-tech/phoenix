"use client";

import { useLocale } from "next-intl";
import { teamData } from "@/app/data/teamdata";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FounderCard() {
  const locale = useLocale() as "en" | "ar";
  const { founder } = teamData[locale];
  const containerRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      });

      tl.to(containerRef.current, { autoAlpha: 1, duration: 0.1 })
        .fromTo(".founder-image-wrap", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 })
        .fromTo(".founder-info", { opacity: 0, x: locale === 'en' ? 40 : -40 }, { opacity: 1, x: 0, duration: 0.8 }, "-=0.5");
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section 
      ref={containerRef} 
      className="py-32 px-6 overflow-hidden bg-white opacity-0 invisible"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          <div className="founder-image-wrap relative w-full lg:w-2/5">
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-[#c9a24d] hidden lg:block" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-[#0b1236] hidden lg:block" />
            
            <div className="relative z-10 overflow-hidden shadow-[0_50px_100px_rgba(11,18,54,0.15)] bg-[#0b1236]">
              <img
                src={founder.image}
                alt={founder.name}
                className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1236]/40 to-transparent" />
            </div>
            
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-[-20%] lg:translate-x-0 z-20">
                <span className="font-mono text-[10px] text-[#c9a24d] font-black uppercase tracking-[0.5em] bg-white px-6 py-2 shadow-sm border border-slate-100">
                    Lead_Strategist
                </span>
            </div>
          </div>

          <div className="founder-info lg:w-3/5 text-center lg:text-left rtl:lg:text-right">
            <div className="inline-flex items-center gap-3 mb-6">
               <div className="w-8 h-[2px] bg-[#c9a24d]" />
               <span className="text-[#c9a24d] font-mono text-[10px] font-black uppercase tracking-widest">Leadership_Profile</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-none mb-4">
              {founder.name}
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-[#c9a24d] uppercase italic tracking-tight mb-8">
              {founder.role}
            </h3>

            <div className="relative">
              <span className="absolute -top-10 -left-6 text-9xl text-slate-50 font-serif opacity-50 select-none">“</span>
              <p className="relative z-10 text-slate-600 text-lg md:text-xl leading-relaxed font-medium italic">
                {founder.bio}
              </p>
            </div>

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale">
                <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-widest mb-1">Status</span>
                    <span className="font-black text-xs uppercase italic tracking-tighter text-[#0b1236]">Active_Founder</span>
                </div>
                <div className="w-[1px] h-8 bg-slate-200" />
                <div className="flex flex-col">
                    <span className="font-mono text-[8px] uppercase tracking-widest mb-1">Expertise</span>
                    <span className="font-black text-xs uppercase italic tracking-tighter text-[#0b1236]">Global Aviation Management</span>
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}