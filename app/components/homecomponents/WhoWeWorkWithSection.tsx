"use client"
import { FaUniversity, FaPlaneDeparture, FaPlaneArrival, FaSchool, FaBuilding } from "react-icons/fa";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WhoWeWorkWithSection() {
  const locale = useLocale() as "en" | "ar";
  const { whoWeWorkWith } = homeData[locale];
  const container = useRef(null);
  const [radius, setRadius] = useState(260);

  const icons = [FaUniversity, FaPlaneDeparture, FaPlaneArrival, FaSchool, FaBuilding];

  useEffect(() => {
    const updateRadius = () => {
      if (window.innerWidth < 480) setRadius(130);
      else if (window.innerWidth < 768) setRadius(190);
      else setRadius(260);
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    tl.from(".radar-center", { scale: 0, opacity: 0, duration: 1, ease: "back.out(1.7)" })
      .from(".radar-node", { 
        scale: 0, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.5, 
        ease: "power2.out" 
      }, "-=0.5");
  }, { scope: container });

  return (
    <section ref={container} className="py-24 md:py-36 px-4 bg-[#0b1236] overflow-hidden flex items-center justify-center relative">
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,162,77,0.05)_0%,transparent_70%)]" />
        {[1, 1.4, 1.8, 2.2].map((i) => (
          <div key={i} className="absolute border border-[#c9a24d]/10 rounded-full shadow-[0_0_15px_rgba(201,162,77,0.02)]" 
               style={{ width: radius * i, height: radius * i }} />
        ))}
      </div>

      <div className="relative flex items-center justify-center scale-90 md:scale-100 transition-all duration-700" 
           style={{ width: radius * 2.5, height: radius * 2.5 }}>
        
        <div className="absolute inset-0 w-full h-full z-30">
          {whoWeWorkWith.map((item, i) => {
            const IconComponent = icons[i] || FaBuilding;
            const angle = (i * 360) / whoWeWorkWith.length;

            return (
              <div
                key={i}
                className="radar-node absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                }}
              >
                <div className="group flex flex-col items-center relative">
                  <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#0b1236] shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-[#c9a24d]/40 flex items-center justify-center text-[#c9a24d] text-xl md:text-2xl transition-all duration-500 group-hover:bg-[#c9a24d] group-hover:text-[#0b1236] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(201,162,77,0.4)]">
                    <IconComponent className="no-flip" />
                    <div className="absolute inset-0 rounded-full border border-[#c9a24d] animate-ping opacity-0 group-hover:opacity-30" />
                  </div>

                  <div className="absolute top-full mt-4 bg-[#0b1236]/90 backdrop-blur-md border border-[#c9a24d]/30 px-5 py-2 shadow-2xl group-hover:bg-[#c9a24d] transition-all duration-300">
                    <p className="text-[8px] md:text-[10px] font-mono font-bold text-[#c9a24d] group-hover:text-[#0b1236] text-center whitespace-nowrap tracking-[0.15em] uppercase">
                      {item}
                    </p>
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#c9a24d] group-hover:border-[#0b1236]" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#c9a24d] group-hover:border-[#0b1236]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute inset-[-180px] z-0 pointer-events-none animate-[spin_10s_linear_infinite]">
            <div className="absolute inset-[180px]"
                 style={{
                   background: `conic-gradient(from 0deg at 50% 50%, transparent 270deg, rgba(201, 162, 77, 0.3) 360deg)`,
                   borderRadius: '50%',
                 }} />
            <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[2px] h-[calc(50%-180px)] bg-[#c9a24d] shadow-[0_0_20px_#c9a24d,0_0_40px_rgba(201,162,77,0.5)]" />
        </div>

        <div className="radar-center relative z-50 w-32 h-32 md:w-52 md:h-52 rounded-full bg-[#c9a24d] text-[#0b1236] flex items-center justify-center shadow-[0_0_100px_rgba(201,162,77,0.25)] border-[8px] border-[#0b1236] text-center overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]" />
          <div className="absolute inset-0 w-full h-full rounded-full animate-ping bg-[#c9a24d]/10 -z-10" />
          <h2 className="relative z-10 text-[10px] centert md:text-xl font-[1000] uppercase tracking-tighter leading-tight px-4 italic text-center drop-shadow-sm">
            {locale === "en" ? "Strategic\nPartners" : "شركاء\nالنجاح"}
          </h2>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-[#c9a24d]/20 rounded-tl-xl" />
      <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-[#c9a24d]/20 rounded-br-xl" />
    </section>
  );
}