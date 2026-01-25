"use client"
import { FaUserTie, FaGavel, FaMapMarkedAlt, FaSchool, FaPaperPlane, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PrimaryFocusSection() {
  const locale = useLocale() as "en" | "ar";
  const { primaryFocus } = homeData[locale];
  const icons = [FaUserTie, FaGavel, FaMapMarkedAlt, FaSchool];
  const container = useRef(null); 

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    tl.to(".animate-me", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative py-24 px-6 md:px-24 bg-[#0b1236] text-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="animate-me opacity-0 translate-y-8 flex flex-col gap-6 mb-16 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c9a24d]/20 pl-8 rtl:pr-8">
          <div className="flex items-center gap-3">
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase">
              Operational_Scope
            </span>
            <div className="h-[1px] w-20 bg-gradient-to-r from-[#c9a24d]/40 to-transparent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none max-w-3xl">
            {primaryFocus.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="animate-me opacity-0 translate-y-8 focus-card md:col-span-8 relative p-10 bg-white/5 group">
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-[#c9a24d]/40 group-hover:border-[#c9a24d] transition-colors duration-500" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-[#c9a24d]/40 group-hover:border-[#c9a24d] transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="text-[#c9a24d] mb-6"><FaUserTie size={35} /></div>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic mb-4">{primaryFocus.services[0].title}</h3>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mb-8 border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c9a24d]/20 pl-6 rtl:pr-6">
                {primaryFocus.services[0].desc}
              </p>
              <Link href="/services" className="flex items-center gap-2 text-[#c9a24d] font-mono text-[10px] tracking-[0.2em] uppercase hover:gap-4 transition-all">
                Access_Full_Brief <FaChevronRight size={8} />
              </Link>
            </div>
          </div>

          <div className="animate-me opacity-0 translate-y-8 focus-card md:col-span-4 relative bg-[#c9a24d] p-10 text-[#0b1236]">
            <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#0b1236]/30" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#0b1236]/30" />
            
            <FaGavel size={40} className="mb-8 opacity-80" />
            <h4 className="text-xl font-[1000] uppercase italic leading-tight mb-4">{primaryFocus.services[1].title}</h4>
            <p className="text-sm font-bold leading-relaxed">{primaryFocus.services[1].desc}</p>
          </div>

          {primaryFocus.services.slice(2, 4).map((item, i) => {
            const Icon = icons[i + 2];
            return (
              <div key={i} className="animate-me opacity-0 translate-y-8 focus-card md:col-span-6 relative p-8 bg-white/5 group border-l-2 border-[#c9a24d]/10 hover:border-[#c9a24d] transition-all duration-500">
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#c9a24d]/20 group-hover:border-[#c9a24d] transition-colors" />
                <div className="flex gap-6 items-start">
                  <div className="text-[#c9a24d] mt-1"><Icon size={24} /></div>
                  <div>
                    <h4 className="text-lg font-black uppercase italic text-white mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="animate-me opacity-0 translate-y-8 flex justify-center mt-16">
          <Link href="/services" className="group relative px-10 py-3 bg-transparent border border-[#c9a24d]/40 text-[#c9a24d] font-mono text-xs tracking-[0.3em] uppercase hover:bg-[#c9a24d] hover:text-[#0b1236] transition-all duration-500 shadow-xl">
            {primaryFocus.cta}
          </Link>
        </div>

      </div>
    </section>
  );
}