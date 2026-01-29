"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EngageSection() {
  const locale = useLocale() as "en" | "ar";
  const { engage } = aboutData[locale];
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    tl.set(".eng-element", { opacity: 0, y: 15 })
      .to(".eng-element", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out"
      });
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-white py-20 px-6 overflow-hidden border-t border-slate-50">
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-slate-50 hidden md:block" />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        
        <div className="eng-element mb-6 relative w-12 h-12 flex items-center justify-center">
          <div className="absolute inset-0 border border-[#c9a24d]/20" />
          <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t border-l border-[#c9a24d]" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b border-r border-[#c9a24d]" />
          <div className="w-1 h-1 bg-[#c9a24d] rounded-full animate-pulse" />
        </div>

        <div className="text-center space-y-4 mb-10">
          <span className="eng-element block text-[#c9a24d] centert font-mono text-[9px] tracking-[0.5em] font-bold uppercase">
            Protocol: Engagement
          </span>

          <h2 className="eng-element centert text-3xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-tight">
            {engage.title}
          </h2>
          
          <p className="eng-element centert text-slate-500 text-base md:text-lg max-w-lg mx-auto font-medium leading-relaxed italic opacity-80">
            {engage.desc}
          </p>
        </div>

        <div className="eng-element group relative">
          <div className="absolute -inset-2 border border-slate-100 group-hover:border-[#c9a24d]/30 transition-colors duration-500" />
          
          <Link
            href="/contact"
            className="relative flex items-center gap-6 bg-[#0b1236] text-white px-8 py-4 transition-all duration-500 hover:bg-[#c9a24d] hover:text-[#0b1236] shadow-xl"
          >
            <span className="font-black uppercase tracking-[0.2em] text-xs">
              {engage.cta}
            </span>
            <div className="relative w-5 h-5 overflow-hidden">
               <HiOutlineArrowUpRight className="text-lg transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6" />
               <HiOutlineArrowUpRight className="text-lg absolute -left-6 top-6 transition-transform duration-500 group-hover:translate-x-6 group-hover:-translate-y-6" />
            </div>
          </Link>
        </div>

        <div className="mt-12 flex gap-10 font-mono text-[7px] text-slate-300 uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-[#c9a24d] rounded-full" /> 
            Ready_For_Contact
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1 h-1 bg-[#c9a24d] rounded-full" /> 
            HQ_Direct_Link
          </span>
        </div>
      </div>
    </section>
  );
}