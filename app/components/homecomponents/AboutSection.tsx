"use client"
import { FaShieldVirus, FaCheckCircle, FaBuilding, FaSchool, FaArrowRight } from "react-icons/fa";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const locale = useLocale() as "en" | "ar";
  const { about } = homeData[locale];
  const icons = [FaShieldVirus, FaCheckCircle, FaBuilding, FaSchool];
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    tl.to(".about-content", { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" })
      .to(".about-card", { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.15, 
        ease: "power2.out" 
      }, "-=0.4");
  }, { scope: container });

  return (
    <section ref={container} className="relative py-32 px-6 md:px-24 bg-white overflow-hidden">
      
      <div className="absolute top-0 right-0 h-full w-24 opacity-[0.03] pointer-events-none hidden md:flex items-center justify-center">
        <span className="rotate-90 text-8xl font-black text-[#0b1236] tracking-[0.2em] whitespace-nowrap">
          ESTABLISHED 1994
        </span>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        <div className="about-content opacity-0 -translate-x-10 rtl:translate-x-10 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
                {locale === "en" ? "Identity_Brief" : "ملخص_الهوية"}
              </span>
              <div className="h-[1px] w-12 bg-[#c9a24d]/40" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-[1.1]">
              {about.title}
            </h2>
          </div>

          <p className="text-slate-600 text-lg leading-relaxed border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#c9a24d]/20 pl-8 rtl:pr-8 font-medium italic">
            {about.desc}
          </p>

          <button className="flex items-center gap-4 text-[#0b1236] font-mono text-xs tracking-widest uppercase group transition-all">
            <span className="bg-[#0b1236] text-white p-3 group-hover:bg-[#c9a24d] transition-colors">
                <FaArrowRight className="group-hover:translate-x-1 no-flip  transition-transform rtl:rotate-180" />
            </span>
            <span className="font-bold border-b border-[#0b1236]/10 pb-1 group-hover:border-[#c9a24d]">
                {locale === "en" ? "Read Full History" : "اقرأ التاريخ الكامل"}
            </span>
          </button>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -left-6 w-20 h-20 border-t-2 border-l-2 border-[#c9a24d]/10" />
          <div className="absolute -bottom-6 -right-6 w-20 h-20 border-b-2 border-r-2 border-[#c9a24d]/10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {about.items.map((item, i) => {
              const IconComponent = icons[i];
              return (
                <div
                  key={i} 
                  className="about-card opacity-0 translate-y-8 bg-slate-50 p-8 relative group hover:bg-[#0b1236] transition-all duration-500 border border-slate-100 shadow-sm"
                >
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-[#c9a24d] opacity-0 group-hover:w-4 group-hover:h-4 group-hover:opacity-100 transition-all duration-300" />
                  
                  <div className="text-[#c9a24d] text-3xl mb-4 transition-transform group-hover:scale-110 group-hover:-translate-y-1">
                    <IconComponent className="no-flip" />
                  </div>
                  
                  <h4 className="text-[#0b1236] font-black text-sm uppercase tracking-tight group-hover:text-white transition-colors">
                    {item}
                  </h4>
                  
                  <div className="mt-4 w-6 h-[1px] bg-[#c9a24d] group-hover:w-12 transition-all" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}