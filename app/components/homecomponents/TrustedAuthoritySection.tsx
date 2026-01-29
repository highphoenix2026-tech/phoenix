"use client";

import { FaCheckCircle } from "react-icons/fa";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrustedAuthoritySection() {
  const locale = useLocale() as "en" | "ar";
  const { trustedAuthority } = homeData[locale];
  const container = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 85%",
        toggleActions: "play none none none",
      }
    });

    tl.to(".trust-badge", { 
      scale: 1, 
      opacity: 1, 
      duration: 0.8, 
      ease: "back.out(1.7)" 
    })
    .to(".trust-line", { 
      width: "60px", 
      opacity: 1, 
      duration: 0.6 
    }, "-=0.3")
    .to(".trust-content", { 
      y: 0, 
      opacity: 1, 
      duration: 0.8, 
      ease: "power3.out" 
    }, "-=0.4");
  }, { scope: container });

  return (
    <section ref={container} className="relative bg-white py-24 px-6 overflow-hidden border-t border-slate-100">
      
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <span className="text-[20vw] font-black text-[#0b1236] tracking-tighter">CERTIFIED</span>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        <div className="trust-badge opacity-0 scale-50 mb-8 relative">
          <div className="absolute inset-0 border-2 border-[#c9a24d]/20 rounded-full animate-spin-slow" />
          
          <div className="w-20 h-20 bg-[#0b1236] rounded-full flex items-center justify-center text-[#c9a24d] shadow-2xl relative">
             <FaCheckCircle className="no-flip" size={32} />
             <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#c9a24d]" />
             <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#c9a24d]" />
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="trust-line opacity-0 w-0 h-[1px] bg-[#c9a24d]" />
          <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase font-bold">
            Authority_Verification
          </span>
          <div className="trust-line opacity-0 w-0 h-[1px] bg-[#c9a24d]" />
        </div>

        <div className="trust-content opacity-0 translate-y-8 space-y-6">
          <h3 className="text-3xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-tight">
            {trustedAuthority.title}
          </h3>
          
          <div className="flex flex-wrap justify-center gap-6 opacity-40 font-mono text-[9px] tracking-widest uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#0b1236] rotate-45" /> Official_Accreditation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#0b1236] rotate-45" /> License: #AC-99420
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#0b1236] rotate-45" /> Verified_Status
            </span>
          </div>
        </div>

      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}