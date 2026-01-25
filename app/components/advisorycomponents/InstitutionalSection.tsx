"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function InstitutionalSection() {
  const locale = useLocale() as "en" | "ar";
  const { institutional } = advisoryData[locale];
  const containerRef = useRef(null);

  const placeholderImage = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop";

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    tl.from(".inst-text", { x: locale === "en" ? -50 : 50, opacity: 0, duration: 1, ease: "power4.out" })
      .from(".inst-image", { scale: 1.1, opacity: 0, duration: 1.2, ease: "expo.out" }, "-=0.8");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-24 bg-white relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#0b1236 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
        
        <div className="inst-text space-y-8 order-2 md:order-1">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-[#c9a24d]" />
              <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
                Institutional_Division
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-[1.1]">
              {institutional.title}
            </h2>
          </div>

          <div className="relative p-8 bg-slate-50 border-l-4 border-[#c9a24d]">
             <p className="text-slate-600 text-lg leading-relaxed font-medium italic">
               {institutional.desc}
             </p>
             <div className="mt-6 flex gap-4 opacity-20">
                <div className="w-12 h-[1px] bg-[#0b1236]" />
                <div className="w-4 h-[1px] bg-[#0b1236]" />
             </div>
          </div>
        </div>

        <div className="inst-image relative order-1 md:order-2">
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#c9a24d] z-20" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#c9a24d] z-20" />
          
          <div className="relative aspect-video md:aspect-[4/5] overflow-hidden shadow-[0_50px_100px_-20px_rgba(11,18,54,0.2)] border border-slate-100">
            <img 
              src={institutional.image || placeholderImage} 
              alt={institutional.title} 
              className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-1000" 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1236]/40 to-transparent pointer-events-none" />
            
            <div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
                <div className="w-2 h-2 bg-[#c9a24d] animate-pulse rounded-full" />
                <span className="font-mono text-[9px] tracking-[0.3em] font-bold uppercase">System_Active: Verified</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}