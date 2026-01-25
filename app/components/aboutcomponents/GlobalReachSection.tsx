"use client";

import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function GlobalReachSection() {
  const locale = useLocale() as "en" | "ar";
  const { globalReach } = aboutData[locale];
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".reach-content > *", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#0b1236] py-32 px-6 md:px-24 overflow-hidden border-t border-white/5"
    >
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none bg-center bg-no-repeat bg-contain scale-110 md:scale-100"
        style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }} 
      />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-[40%] left-[60%] w-2 h-2 bg-[#c9a24d] rounded-full animate-ping" />
        <div className="absolute top-[35%] left-[20%] w-2 h-2 bg-[#c9a24d] rounded-full animate-ping [animation-delay:1s]" />
        <div className="absolute top-[60%] left-[45%] w-2 h-2 bg-[#c9a24d] rounded-full animate-ping [animation-delay:2s]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 reach-content flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c9a24d]" />
          <span className="text-[#c9a24d] font-mono text-xs tracking-[0.5em] font-bold uppercase">
            {globalReach.badge || "Network_Status"}
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c9a24d]" />
        </div>

        <h2 className="text-4xl md:text-6xl font-[1000] text-white uppercase italic tracking-tighter mb-8 leading-none">
          {globalReach.title}
        </h2>

        <div className="relative p-8 md:p-12 backdrop-blur-sm bg-[#0b1236]/40 border border-white/10 max-w-3xl">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a24d]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a24d]" />
          
          <p className="text-lg md:text-xl text-slate-300 font-medium leading-relaxed italic">
            {globalReach.desc}
          </p>

          <div className="absolute -bottom-16 left-0 right-0 hidden md:flex justify-between px-4 opacity-30">
            <div className="flex gap-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-1 h-3 bg-white/40" />
              ))}
            </div>
            <span className="font-mono text-[9px] text-white tracking-widest uppercase">
              Global_Expansion_Index: 94.2
            </span>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0b1236] via-transparent to-[#0b1236] pointer-events-none" />
    </section>
  );
}