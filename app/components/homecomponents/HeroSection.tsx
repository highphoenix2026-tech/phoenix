"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import plane from "@/public/plane.png";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";

export default function HeroSection() {
  const locale = useLocale() as "en" | "ar";
  const { hero } = homeData[locale];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-bg-svg", { opacity: 0, scale: 1.01, duration: 1 })
      .from(".hero-tag", { opacity: 0, y: 10, duration: 0.5 }, "-=0.6")
      .from(".hero-title", { opacity: 0, y: 15, duration: 0.6 }, "-=0.4")
      .from(".hero-desc", { opacity: 0, x: locale === "ar" ? 15 : -15, duration: 0.5 }, "-=0.4")
      .from(".hero-cta-fixed", {  translateX: locale=="ar"?1000:-1000, duration: 0.6 }, "-=0.3")
      .from(".plane", {
        opacity: 0,
        x: locale === "ar" ? 400 : -400,
        y: 60,
        rotate: locale === "ar" ? -3 : 3,
        duration: 1.8,
        ease: "power4.out",
      }, "+=0.1");

  }, [locale]);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      <div className="relative w-full max-w-[1440px] h-[80vh] flex items-center justify-center">
        
        <div className="hero-bg-svg absolute inset-0 z-0 flex justify-center items-center">
          <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="w-[96%] h-full drop-shadow-xl">
            <path d="M40,0 H960 Q1000,0 1000,40 V410 Q1000,450 960,450 H620 Q590,450 570,430 L530,390 Q510,370 480,370 H40 Q0,370 0,330 V40 Q0,0 40,0 Z" fill="#0b1236" />
          </svg>
        </div>

        <div className={`hero-cta-fixed absolute z-30 bottom-[14%] md:bottom-[12%] 
                        ${locale === "ar" ? "right-[10%] md:right-[15%]" : "left-[10%] md:left-[15%]"}`}>
          <Link
            href="/enroll"
            className="group relative inline-flex items-center justify-center overflow-hidden bg-[#c9a24d] text-[#0b1236] px-8 py-3.5 rounded-xl text-sm md:text-base font-black shadow-2xl transition-all duration-300 active:scale-95"
          >
            <span className="relative z-10 uppercase tracking-[0.1em]">{hero.cta}</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </Link>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-4 w-full h-full items-center px-8 md:px-24 pb-32 pt-8">
          
          <div className="flex flex-col justify-center space-y-4 text-center md:text-start">
            <div className="space-y-1">
              <span className="hero-tag text-[#c9a24d] font-mono text-[9px] tracking-[0.3em] uppercase opacity-80 block">
                Aviation Excellence
              </span>
              <h1 className="hero-title text-3xl md:text-[2.6rem] font-black tracking-tighter leading-[1.1] text-white uppercase italic">
                {hero.title.split(",")[0]}, <br />
                <span className="text-[#c9a24d] inline-block mt-1">
                  {hero.highlight}
                </span>
              </h1>
            </div>

            <p className="hero-desc text-xs md:text-sm text-slate-300 max-w-sm mx-auto md:mx-0 font-medium leading-relaxed border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c9a24d]/40 pl-4 rtl:pr-4">
              {hero.desc}
            </p>
          </div>

          <div className="flex items-center justify-center p-4">
            <Image 
              src={plane} 
              alt="Aviation Hero" 
              className="plane w-full max-w-lg md:max-w-xl object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" 
              priority 
            />
          </div>
        </div>
      </div>
    </section>
  );
}