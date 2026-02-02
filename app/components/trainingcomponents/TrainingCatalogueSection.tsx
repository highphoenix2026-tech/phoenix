"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import type { TranslatedCategory, TranslatedCourseFiltered } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  dbCourses: TranslatedCourseFiltered[];
  dbCategories: TranslatedCategory[];
}

export default function TrainingCatalogueSection({ dbCourses, dbCategories }: Props) {
  const locale = useLocale() as "en" | "ar";
  const { catalogue } = trainingData[locale];
  
  const [selected, setSelected] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(3);
  
  // Track the previous count to identify "new" items
  const prevCountRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const allFiltered = useMemo(() => {
    if (selected === "all") return dbCourses;
    return dbCourses.filter((c) => c.categoryId === selected);
  }, [selected, dbCourses]);

  const displayedCourses = useMemo(() => {
    return allFiltered.slice(0, visibleCount);
  }, [allFiltered, visibleCount]);

  const hasMore = visibleCount < allFiltered.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // Reset counters when category changes
  useEffect(() => {
    setVisibleCount(3);
    prevCountRef.current = 0; // Reset tracking so first 3 animate again on filter
  }, [selected]);

  useGSAP(() => {
    // 1. Get all cards within our container
    const allCards = gsap.utils.toArray<HTMLElement>(".course-card");
    
    // 2. Identify only the "new" cards by slicing from the previous count
    const newCards = allCards.slice(prevCountRef.current);

    if (newCards.length > 0) {
      gsap.fromTo(newCards, 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.95 
        }, 
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          stagger: 0.15, 
          duration: 0.6, 
          ease: "expo.out",
          onComplete: () => {
            // 3. Update the ref after animation so we know where we left off
            prevCountRef.current = visibleCount;
          }
        }
      );
    }
  }, { dependencies: [displayedCourses], scope: containerRef });

  return (
    <section ref={containerRef} className="bg-white py-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-[#c9a24d] font-mono text-[10px] tracking-[0.5em] uppercase block mb-2">
            System_Archive // 04
          </span>
          <h2 className="text-4xl md:text-6xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter">
            {catalogue.title}
          </h2>
          <div className="w-24 h-1 bg-[#c9a24d] mx-auto mt-4" />
        </div>

        {/* Filter Navigation */}
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
                  {isActive && <span className="absolute top-1 right-1 w-1 h-1 bg-[#c9a24d] animate-pulse" />}
                  {name}
                </button>
              );
            })}
          </div>
          <div className="w-[1px] h-10 bg-gradient-to-b from-slate-200 to-transparent" />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {displayedCourses.map((course, idx) => (
            <div 
              key={course.id} 
              className="course-card relative group flex flex-col"
              // Initial opacity 0 prevents flicker before GSAP kicks in
              style={{ opacity: 0 }} 
            >
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

                <div className="p-6 flex flex-col grow">
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

        {/* See More Trigger */}
        {hasMore && (
          <div className="mt-20 flex flex-col items-center">
            <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-slate-200 mb-4" />
            <button
              onClick={loadMore}
              className="group relative px-12 py-4 bg-white border border-slate-200 text-[#0b1236] overflow-hidden transition-all hover:border-[#c9a24d]"
            >
              <div className="absolute inset-0 bg-slate-50 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10 font-mono text-[10px] font-black tracking-[0.3em] uppercase italic">
                {locale === "ar" ? "تحميل المزيد من الدورات" : "LOAD_MORE_COURSES"}
              </span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#c9a24d]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#c9a24d]" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}