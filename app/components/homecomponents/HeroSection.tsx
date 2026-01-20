"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";


import Link from "next/link";
import Image from "next/image";
import plane from "@/public/plane.png";
import { homeData } from "@/app/data/homedata";

import { useLocale } from "next-intl";


export default function HeroSection() {
  useGSAP(()=>{
    gsap.from(".plane",{
      opacity:0,
      x:-500,
      duration:2,
      y:200
    })
        gsap.from(".button",{
 
      translateX:-1000,
      duration:2
 
 
    })
  })
  const locale = useLocale() as "en" | "ar";
  const { hero } = homeData[locale];

  return (
    <section className="relative w-full  min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="relative mt-7 w-full aspect-[16/9] md:aspect-auto md:h-[80vh] flex items-center justify-center group">
        <div className="absolute  inset-0 z-0">
          <svg viewBox="0 0 1000 500" preserveAspectRatio="none" className="w-[95%] justify-self-center h-full transition-all duration-700">
            <path d="M40,0 H960 Q1000,0 1000,40 V410 Q1000,450 960,450 H620 Q590,450 570,430 L530,390 Q510,370 480,370 H40 Q0,370 0,330 V40 Q0,0 40,0 Z" fill="#0b1236" />
          </svg>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-8 w-full h-full items-center px-6 sm:px-12 md:px-20 pb-32 md:pb-40 pt-12">
          <div className="flex flex-col justify-center space-y-4 md:space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-4xl font-black tracking-tight leading-tight text-white">
              {hero.title.split(",")[0]}, <br />
              <span className="text-[#c9a24d] inline-block mt-1">
                {hero.highlight}
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-md mx-auto md:mx-0 font-medium leading-relaxed">
              {hero.desc}
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Image src={plane} alt="Aviation Hero" className= "plane   w-full max-w-2xl object-cover rounded-xl" priority />
          </div>
        </div>

        <div className="absolute button bottom-8 md:bottom-20 left-1/2 md:start-[200px] transform -translate-x-1/2 md:translate-x-0 z-20">
          <Link
            href="/enroll"
            className=" relative inline-flex items-center justify-center
                       bg-[#c9a24d] text-[#0b1236]
                       px-6 py-3 md:px-10 md:py-4
                       rounded-xl md:rounded-2xl
                       text-sm md:text-lg
                       font-black shadow-xl
                       hover:bg-white hover:text-yellow-400 transition-all duration-300 active:scale-95"
          >
            <span className="relative z-10">{hero.cta}</span>
            <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-white scale-x-0 group-hover/btn:scale-x-100 origin-left transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
