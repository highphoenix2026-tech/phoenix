"use client";
import Link from "next/link";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { FaArrowRight, FaHeadset } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EngageSection() {
  const locale = useLocale() as "en" | "ar";
  const { engage } = homeData[locale];
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    tl.to(".engage-white-animate", { 
      opacity: 1, 
      y: 0, 
      stagger: 0.2, 
      duration: 0.8, 
      ease: "power3.out" 
    })
    .to(".side-line", { height: "100%", duration: 1, ease: "power2.inOut" }, "-=0.5");
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-white py-32 px-6 overflow-hidden border-t border-slate-100">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#0b1236 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-12 items-center gap-12">
        
        <div className="hidden md:block md:col-span-1 h-full min-h-[200px] relative">
           <div className="side-line absolute top-0 left-1/2 w-[1px] h-0 bg-[#c9a24d]/40" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-4 text-[#c9a24d]">
              <FaHeadset size={20} className="animate-pulse" />
           </div>
        </div>

        <div className="md:col-span-7 space-y-8">
          <div className="engage-white-animate opacity-0 translate-y-6">
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase font-black border-b border-[#c9a24d]/20 pb-2">
              Ready_To_Proceed?
            </span>
          </div>

          <h2 className="engage-white-animate opacity-0 translate-y-6 text-4xl md:text-6xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-tight">
            {engage.title}
          </h2>

          <p className="engage-white-animate opacity-0 translate-y-6 text-slate-500 text-lg md:text-xl max-w-xl leading-relaxed font-medium border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c9a24d]/20 pl-6 rtl:pr-6">
            {engage.desc}
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col items-center md:items-end">
          <div className="engage-white-animate opacity-0 translate-y-10 w-full max-w-[280px]">
            <Link
              href="/contact"
              className="group relative flex items-center justify-between w-full px-8 py-6 bg-[#0b1236] text-white overflow-hidden shadow-2xl transition-all duration-500"
            >
              <div className="absolute inset-0 w-0 bg-[#c9a24d] group-hover:w-full transition-all duration-500 ease-out" />
              
              <span className="relative z-10 font-black uppercase tracking-widest text-sm group-hover:text-[#0b1236] transition-colors">
                {engage.cta}
              </span>
              
              <div className="relative z-10 bg-white/10 p-2 group-hover:bg-[#0b1236]/10 transition-colors">
                <FaArrowRight className="group-hover:translate-x-2 transition-transform rtl:rotate-180 group-hover:text-[#0b1236]" />
              </div>
            </Link>
            
            <p className="mt-4 font-mono text-[9px] text-slate-400 text-center md:text-right uppercase tracking-tighter">
              *Response time within 24 operational hours
            </p>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-slate-50 opacity-50 clip-path-diagonal hidden md:block" 
           style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }} />
    </section>
  );
}