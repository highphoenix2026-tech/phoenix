"use client"
import { FaUserTie, FaBuilding, FaShieldVirus, FaCheckCircle, FaGlobe } from "react-icons/fa";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhyUsSection() {
  const locale = useLocale() as "en" | "ar";
  const { whyUs } = homeData[locale];
  const icons = [FaUserTie, FaBuilding, FaShieldVirus, FaCheckCircle, FaGlobe];
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    tl.to(".why-header-white", { opacity: 1, y: 0, duration: 0.8 })
      .to(".why-item-white", { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.15, 
        ease: "power2.out" 
      }, "-=0.4");
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-white py-32 px-6 md:px-24 overflow-hidden">
      
      <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none select-none hidden md:block">
        <span className="text-[15rem] font-black text-[#0b1236]">02</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="why-header-white opacity-0 translate-y-8 flex flex-col items-center text-center mb-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-[#c9a24d]" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
              Why_Choose_Us
            </span>
            <div className="w-10 h-[1px] bg-[#c9a24d]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter">
            {whyUs.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {whyUs.items.map((item, i) => {
            const IconComponent = icons[i];
            return (
              <div
                key={i} 
                className="why-item-white opacity-0 translate-y-8 relative group flex flex-col items-center text-center p-8 bg-slate-50/50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-[#0b1236]/5 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#c9a24d]/20 group-hover:border-[#c9a24d] transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#c9a24d]/20 group-hover:border-[#c9a24d] transition-colors duration-500" />

                <div className="mb-6 w-16 h-16  rounded-full bg-[#0b1236] flex items-center justify-center text-[#c9a24d] text-2xl group-hover:scale-110 transition-transform duration-500 shadow-lg">
                  <IconComponent className="no-flip" />
                </div>

                <h4 className="font-black text-xs md:text-sm uppercase tracking-widest text-[#0b1236] mb-3 group-hover:text-[#c9a24d] transition-colors">
                  {item.title}
                </h4>
                
                <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-medium">
                  {item.desc}
                </p>

                <div className="mt-6 flex items-center gap-1 opacity-10 group-hover:opacity-30 transition-opacity">
                  <div className="w-1 h-1 bg-[#c9a24d] rounded-full" />
                  <div className="w-10 h-[1px] bg-[#0b1236]" />
                  <span className="font-mono text-[8px]">VAL_0{i+1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}