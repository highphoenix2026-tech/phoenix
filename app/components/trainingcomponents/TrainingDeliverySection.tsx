"use client";

import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrainingDeliverySection() {
  const locale = useLocale() as "en" | "ar";
  const { delivery } = trainingData[locale];
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
        .fromTo(".delivery-header", 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo(".delivery-card", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, ease: "back.out(1.2)" },
          "-=0.4"
        )
        .fromTo(".delivery-method", 
          { opacity: 0, y: 10 }, 
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.4 },
          "-=0.2"
        );
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section 
      ref={containerRef} 
      className="bg-[#f8f9fa] py-24 px-6 overflow-hidden border-t border-slate-100 opacity-0 invisible"
    >
      <div className="max-w-6xl mx-auto">
        
        <div className="delivery-header text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-[#c9a24d] rotate-45" />
            <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] font-black uppercase">
              Deployment_Systems
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter mb-4">
            {delivery.title}
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            {delivery.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {delivery.models.map((model, i) => (
            <div 
              key={i} 
              className="delivery-card group relative bg-white border border-slate-200 p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-2 overflow-hidden"
            >
              <span className="absolute -top-4 -right-2 text-6xl font-black text-slate-50 group-hover:text-slate-100 transition-colors italic">
                0{i + 1}
              </span>

              <div className="relative z-10">
                <h3 className="font-black text-[#0b1236] text-xl uppercase italic tracking-tight group-hover:text-[#c9a24d] transition-colors mb-3">
                  {model.title}
                </h3>
                <div className="w-8 h-[2px] bg-[#c9a24d] mb-4 group-hover:w-full transition-all duration-500" />
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {model.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-8 border-t border-slate-200 pt-16">
          <span className="font-mono text-[9px] text-slate-400 tracking-[0.5em] uppercase font-bold">
            Authorized_Delivery_Methods
          </span>
          <div className="flex flex-wrap justify-center gap-3">
            {delivery.methods.map((method, i) => (
              <span 
                key={i} 
                className="delivery-method px-6 py-2 border border-slate-200 bg-white text-[#0b1236] font-bold text-xs uppercase tracking-widest hover:border-[#c9a24d] hover:text-[#c9a24d] transition-all cursor-default"
              >
                {method}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}