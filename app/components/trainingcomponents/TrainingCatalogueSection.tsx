"use client";

import { useState, useRef, useMemo } from "react";
import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { TranslatedCategory, TranslatedCourse } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  dbCourses: TranslatedCourse[];
  dbCategories: TranslatedCategory[];
}

export default function TrainingCatalogueSection({ dbCourses, dbCategories }: Props) {
  const locale = useLocale() as "en" | "ar";
  const { catalogue } = trainingData[locale];
  const [selected, setSelected] = useState<string>("all");
  const containerRef = useRef(null);

  const filteredCourses = useMemo(() => {
    if (selected === "all") return dbCourses;
    return dbCourses.filter((c) => c.categoryId === selected);
  }, [selected, dbCourses]);

  useGSAP(() => {
    gsap.fromTo(".course-card", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }
    );
  }, { dependencies: [selected] });

  return (
    <section ref={containerRef} className="bg-white py-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-[#c9a24d] centert font-mono text-[10px] tracking-[0.5em] uppercase block mb-2">
            System_Archive // 04
          </span>
          <h2 className="text-4xl centert md:text-6xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter">
            {catalogue.title}
          </h2>
          <div className="w-24 h-1 bg-[#c9a24d] mx-auto mt-4" />
        </div>

        <div className="flex flex-col items-center mb-20">
          <div className="flex flex-wrap justify-center items-center gap-0 border border-slate-200 p-1 bg-slate-50 shadow-inner">
            {["all", ...dbCategories.map(c => c.id)].map((id) => {
              const name = id === "all" ? (locale === "ar" ? "الكل" : "ALL_FILES") : dbCategories.find(c => c.id === id)?.name;
              const isActive = selected === id;
              return (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className={`relative px-6 py-3 text-[9px] font-mono tracking-[0.2em] uppercase transition-all duration-300
                    ${isActive 
                      ? "bg-[#0b1236] text-white z-10 shadow-lg" 
                      : "text-slate-500 hover:text-[#0b1236] hover:bg-slate-100"
                    }`}
                >
                  {isActive && (
                    <span className="absolute top-1 right-1 w-1 h-1 bg-[#c9a24d] animate-pulse" />
                  )}
                  {name}
                </button>
              );
            })}
          </div>
          <div className="w-[1px] h-10 bg-gradient-to-b from-slate-200 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {filteredCourses.map((course, idx) => (
            <div key={course.id} className="course-card relative group flex flex-col">
              
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[#c9a24d] opacity-0 group-hover:opacity-100 transition-all z-10" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[#c9a24d] opacity-0 group-hover:opacity-100 transition-all z-10" />

              <div className="bg-slate-50 border border-slate-200 p-2 flex flex-col flex-grow transition-colors group-hover:bg-white group-hover:border-[#c9a24d]/30">
                
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1236] shrink-0">
                  <Image
                    fill
                    src={course.image ?? "/placeholder.jpg"}
                    alt={course.title}
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-2 left-2 bg-[#c9a24d] text-[#0b1236] text-[8px] font-mono px-2 py-0.5 z-20">
                    ID: {idx + 101}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4 shrink-0">
                    <div className="w-1.5 h-1.5 bg-[#c9a24d] rotate-45" />
                    <span className="text-[9px] font-mono text-slate-400 tracking-tighter uppercase">Operational_Module</span>
                  </div>

                  <h3 className="text-[#0b1236] font-black text-xl uppercase italic leading-[1.1] mb-4 min-h-[3rem]">
                    {course.title}
                  </h3>

                  <div className="border-l rtl:border-l-0 rtl:border-r border-slate-200 pl-4 rtl:pr-4 mb-8">
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3 min-h-[3rem]">
                      {course.description}
                    </p>
                  </div>

                  <Link
                    href={`/${locale}/training/${course.slug}`}
                    className="mt-auto group/btn flex items-center justify-between bg-transparent border border-[#0b1236]/10 p-4 transition-all hover:bg-[#0b1236] hover:text-white"
                  >
                    <span className="text-[10px] font-black uppercase italic tracking-widest">
                      {locale === "ar" ? "عرض البيانات" : "ACCESS_DETAILS"}
                    </span>
                    <span className="text-[#c9a24d] font-mono group-hover/btn:translate-x-2 rtl:group-hover/btn:-translate-x-2 transition-transform">
                      {locale === "ar" ? "←" : "→"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}