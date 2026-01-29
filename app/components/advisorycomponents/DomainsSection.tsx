"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import Image from "next/image";
import a from "@/public/images/a.jpg";
import b from "@/public/images/b.jpg";

import c from "@/public/images/c.jpg";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DomainsSection() {
  const locale = useLocale() as "en" | "ar";
  const { domains } = advisoryData[locale];
  const containerRef = useRef(null);

  const realImages = [
    c, 
    b, 
    a 
  ];

  useGSAP(() => {
    gsap.utils.toArray(".domain-block").forEach((block: any) => {
      gsap.from(block.querySelector(".domain-img-container"), {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.2,
        ease: "power4.inOut",
        scrollTrigger: { trigger: block, start: "top 85%" }
      });
      gsap.from(block.querySelector(".domain-info"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        scrollTrigger: { trigger: block, start: "top 85%" }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-20 bg-white border-t border-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="mb-20 text-center md:text-start flex flex-col md:flex-row md:items-end gap-4 border-b border-slate-100 pb-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
              <div className="w-2 h-2 bg-[#c9a24d]" />
              <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">   {locale === "ar" ?"مجال_الخبرة" :"Expertise_Fields" }</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#0b1236] uppercase italic tracking-tighter">
               {locale === "ar" ?"مجال الخدمات الاستشارية" :" Advisory Service Domains" }
            </h2>
          </div>
          <p className="text-slate-400 font-mono text-[9px] uppercase tracking-widest hidden md:block">
            Phoenix_Operational_Matrix_v2.0
          </p>
        </div>

        <div className="space-y-24">
          {domains.map((domain, i) => (
            <div 
              key={i} 
              className={`domain-block flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16`}
            >
              <div className="w-full md:w-1/2">
                <div className="domain-img-container aspect-video overflow-hidden shadow-xl border border-slate-100 relative group">
                  <Image 
                    src={ realImages[i % realImages.length]} 
                    alt={domain.title}
                    fill
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/50" />
                </div>
              </div>

              <div className="domain-info w-full md:w-1/2 space-y-5">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-black text-[#c9a24d]/30 italic font-mono">0{i+1}</span>
                  <h3 className="text-2xl font-black text-[#0b1236] uppercase italic tracking-tight">
                    {domain.title}
                  </h3>
                </div>
                
                <p className="text-slate-500 text-base leading-relaxed font-medium">
                  {domain.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-4">
                  {domain.items.map((item, j) => (
                    <span key={j} className="text-[10px] font-bold text-[#0b1236] uppercase tracking-widest bg-slate-50 border border-slate-100 px-3 py-1.5 flex items-center gap-2 hover:border-[#c9a24d] transition-colors cursor-default">
                      <div className="w-1 h-1 bg-[#c9a24d]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}