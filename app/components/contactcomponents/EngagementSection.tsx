"use client";

import { useLocale } from "next-intl";
import { contactData } from "@/app/data/contactData";
import { FaBusinessTime, FaLaptop, FaHubspot } from "react-icons/fa";
import { JSX, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EngagementSection() {
  const locale = useLocale() as "en" | "ar";
  const { engagement } = contactData[locale];
  const { Engagementde } = contactData[locale];  
  const containerRef = useRef(null);

  const icons: Record<string, JSX.Element> = {
    FaBusinessTime: <FaBusinessTime className="text-[#c9a24d] text-4xl no-flip" />,
    FaLaptop: <FaLaptop className="text-[#c9a24d] text-4xl no-flip" />,
    FaHubspot: <FaHubspot className="text-[#c9a24d] text-4xl no-flip" />
  };

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
        .fromTo(".engage-header", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(".engage-card", 
          { opacity: 0, scale: 0.95 }, 
          { opacity: 1, scale: 1, stagger: 0.2, duration: 0.7, ease: "power2.out" },
          "-=0.4"
        );
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section 
      ref={containerRef} 
      className="bg-white py-28 px-6 md:px-24 overflow-hidden border-t border-slate-50 opacity-0 invisible"
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="engage-header text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-slate-200" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.5em] font-black uppercase">Engagement_Protocol</span>
            <div className="w-10 h-[1px] bg-slate-200" />
          </div>
          <h2 className="text-4xl md:text-6xl centert font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-none mb-8">
            {locale === "ar" ? "كيفية التعامل" : "How We Engage"}
          </h2>
          <p className="mt-6 text-slate-500 centert font-medium max-w-3xl mx-auto leading-relaxed italic text-lg border-l-4 border-slate-100 pl-6 py-2">
{Engagementde.descreption}          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-slate-100">
          {engagement.map((item, i) => (
            <div 
              key={i} 
              className="engage-card group relative p-12 bg-white transition-all duration-500 hover:bg-[#0b1236] border-r last:border-r-0 border-slate-100 overflow-hidden"
            >
              <span className="absolute -top-4 -right-2 text-7xl font-black text-slate-50 group-hover:text-white/[0.03] transition-colors italic">
                0{i + 1}
              </span>

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-8 transform group-hover:scale-110 transition-transform duration-500 group-hover:drop-shadow-[0_0_15px_rgba(201,162,77,0.3)]">
                  {icons[item.icon]}
                </div>
                
                <h4 className="font-black text-xl text-[#0b1236] group-hover:text-white uppercase italic tracking-tight mb-4 transition-colors">
                  {item.title}
                </h4>
                
                <div className="w-8 h-[2px] bg-[#c9a24d] mb-6 group-hover:w-full transition-all duration-700" />
                
                <p className="text-slate-500 group-hover:text-slate-300 text-sm leading-relaxed font-medium transition-colors">
                  {item.desc}
                </p>

                <div className="mt-auto pt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="font-mono text-[8px] text-[#c9a24d] tracking-[0.4em] uppercase">Active_Track_0{i+1}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center opacity-[0.05]">
           <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#0b1236] to-transparent" />
        </div>

      </div>
    </section>
  );
}