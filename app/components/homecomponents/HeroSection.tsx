"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import plane from "@/public/plane.png";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";

import Button from "../button3";
import Button2 from "../Button1";
export default function HeroSection() {
  const locale = useLocale() as "en" | "ar";
  const { hero } = homeData[locale];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(".hero-bg-svg", { opacity: 0, scale: 1.01, duration: 1 })
      .from(".hero-tag", { opacity: 0, y: 10, duration: 0.5 }, "-=0.6")
      .from(".hero-title", { opacity: 0, y: 15, duration: 0.6 }, "-=0.4")
      .from(
        ".hero-desc",
        { opacity: 0, x: locale === "ar" ? 15 : -15, duration: 0.5 },
        "-=0.4",
      )
      .fromTo(
        ".hero-cta-piece",
        {
          x: locale === "ar" ? "100vw" : "-100vw",
        },
        {
          x: locale === "ar" ? "right-1/6" : "-left-1/6",
          duration: 1.2,
          ease: "power4.out",
        },
        "-=0.3",
      )
      .from(
        ".plane",
        {
          opacity: 0,
          x: locale === "ar" ? -400 : -400,
          y: 60,
          rotate: locale === "ar" ? -3 : 3,
          duration: 1.8,
          ease: "power4.out",
        },
        "-=0.8",
      );
  }, [locale]);

  return (
    <section className="relative w-full    min-h-[90vh] overflow-hidden bg-white pt-5">
      <div className="relative w-full max-w-[1840px] mx-auto px-4">
        <div className="relative w-full  h-[70vh]    md:min-h-[80vh] md:h-[80vh] flex items-center justify-center">
          <div
            className={`hero-cta-piece absolute z-40 bottom-3 ${locale === "ar" ? "right-1/6" : "left-1/6"} transform-gpu translate-y-[5px] `}
          >
            <Button> {locale === "ar" ? "انضم الآن" : "Enroll Now"}</Button>
          </div>
          <div
            className={`hero-cta-piece absolute z-40 -bottom-8 transform-gpu  translate-y-[5px] `}
          >
            <Button2 className="md:hidden">
              {" "}
              {locale === "ar" ? "انضم الآن" : "Enroll Now"}
            </Button2>
          </div>

          <div className="hero-bg-svg absolute inset-0 z-0 flex justify-center items-center">
            <svg
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
              className="w-[96%] h-full drop-shadow-2xl"
            >
              <path
                className="hidden md:block"
                d="M0,0 H1000 V410 L960,495 H560 L520,410 H40 L0,370 Z"
                fill="#0b1236"
              />

              <path
                className="block md:hidden"
                d="M0,0 H1000 V410 L960,450 H40 L0,370 Z"
                fill="#0b1236"
              />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-[80vh] items-center px-6 md:px-24 pt-8 pb-20 sm:pb-28 md:pb-20">
            <div className="flex flex-col justify-center space-y-4 text-center md:text-start mt-4 md:mt-0">
              <div className="space-y-1">
                <span className="hero-tag text-[#c9a24d] font-mono text-[10px] tracking-[0.4em] uppercase opacity-90 block mb-2"></span>
                <h1 className="hero-title text-3xl sm:text-3xl md:text-[2.3rem] lg:text-[2.8rem] font-black italic text-white uppercase leading-tight md:leading-none">
                  {hero.title.split(",")[0]},<br />
                  <span className="text-[#c9a24d] inline-block mt-2">
                    {hero.highlight}
                  </span>
                </h1>
              </div>

              <p className="hero-desc text-[11px] sm:text-xs md:text-sm text-slate-300 max-w-sm mx-auto md:mx-0 leading-relaxed border-l-2 rtl:border-l-0 rtl:border-r-2 border-[#c9a24d] pl-4 rtl:pr-4">
                {hero.desc}
              </p>
            </div>

            <div className=" hidden      md:flex justify-center items-center">
              <Image
                src={plane}
                alt="Aviation Hero"
                className="plane w-full max-w-[220px] sm:max-w-[280px] md:max-w-xl object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
