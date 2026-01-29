"use client";

import { useLocale } from "next-intl";
import { teamData } from "@/app/data/teamdata";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";






import {translatedMembers}from "@/types/index"
import Image from "next/image";



interface Props {
  memberData: translatedMembers[];
}


 






if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StaffCards({memberData}: Props) {

  const locale = useLocale() as "en" | "ar";
  const { staff } = teamData[locale];
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
        .fromTo(".staff-header", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(".staff-member-card", 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section 
      ref={containerRef} 
      className="bg-slate-50 py-32 px-6 overflow-hidden border-t border-slate-100 opacity-0 invisible"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="staff-header text-center mb-24">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[1px] bg-slate-200" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.5em] font-black uppercase">Core_Team</span>
            <div className="w-12 h-[1px] bg-slate-200" />
          </div>
          <h2 className="text-4xl md:text-6xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-none">
            {locale === "ar" ? "فريق العمل" : "Our Team"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {memberData.map((member, i) => (
            <div 
              key={i} 
              className="staff-member-card group bg-white border border-slate-100 flex flex-col transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(11,18,54,0.1)] relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#0b1236]">
                <Image 
                  src={member.image} 
                  alt={member.name}
                  fill 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1236] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                
                <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-[#c9a24d] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
              </div>

              <div className="p-8 flex-1 flex flex-col items-start text-left rtl:items-end rtl:text-right">
                <h3 className="text-2xl font-black text-[#0b1236] uppercase italic tracking-tighter leading-none mb-2">
                  {member.name}
                </h3>
                <h4 className="text-[#c9a24d] font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  {member.position}
                </h4>
                
                <div className="w-full h-[1px] bg-slate-50 mb-6" />
                
                <p className="text-slate-500 text-sm leading-relaxed font-medium line-clamp-4 group-hover:text-slate-700 transition-colors">
                  {member.description}
                </p>

                <div className="mt-8 pt-6 border-t border-slate-50 w-full flex justify-between items-center opacity-20">
                    <span className="font-mono text-[8px] font-bold tracking-widest uppercase italic">Staff_No. {i + 101}</span>
                    <div className="w-1.5 h-1.5 bg-[#0b1236] rotate-45" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}