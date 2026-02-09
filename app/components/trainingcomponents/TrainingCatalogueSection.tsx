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

export default function TrainingCatalogueSection({
  dbCourses,
  dbCategories
}: Props) {
  const locale = useLocale() as "en" | "ar";
  const { catalogue } = trainingData[locale];
  console.log("locale: ",locale);
  console.log("dbCourses: ",dbCourses);
  

  const [selected, setSelected] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState<number>(3);

  const containerRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef<number>(0);
  const isFilterChangeRef = useRef<boolean>(true);


  const allFiltered = useMemo(() => {
    if (selected === "all") return dbCourses;
    return dbCourses.filter(c => c.categoryId === selected);
  }, [selected, dbCourses]);

  const displayedCourses = useMemo(() => {
    return allFiltered.slice(0, visibleCount);
  }, [allFiltered, visibleCount]);

  const hasMore = visibleCount < allFiltered.length;

  const loadMore = () => {
    isFilterChangeRef.current = false;
    setVisibleCount(prev => prev + 3);
  };


  useEffect(() => {
    isFilterChangeRef.current = true;
    prevCountRef.current = 0;
    setVisibleCount(3);
  }, [selected]);


  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".course-card");

        if (!cards.length) return;

        const targets = isFilterChangeRef.current
          ? cards
          : cards.slice(prevCountRef.current); 

        gsap.from(targets, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          stagger: 0.15,
          duration: 0.6,
          ease: "expo.out",
          clearProps: "opacity,transform"
        });

        prevCountRef.current = cards.length;
        isFilterChangeRef.current = false;
      }, containerRef);

      return () => ctx.revert();
    },
    { dependencies: [displayedCourses] }
  );


  return (
    <section ref={containerRef} className="bg-white py-24 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          
          <h2 className="text-4xl md:text-6xl centert font-[1000] text-[#0b1236] uppercase italic tracking-tighter">
            {catalogue.title}
          </h2>
          <div className="w-24 h-1 bg-[#c9a24d] mx-auto mt-4" />
        </div>

        <div className="flex flex-col items-center mb-20">
          <div className="flex flex-wrap justify-center items-center border border-slate-200 p-1 bg-slate-50 shadow-inner">
            {["all", ...dbCategories.map(c => c.id)].map(id => {
              const name =
                id === "all"
                  ? locale === "ar"
                    ? "الكل"
                    : "ALL_FILES"
                  : dbCategories.find(c => c.id === id)?.name;

              const isActive = selected === id;

              return (
                <button
                  key={id}
                  onClick={() => setSelected(id)}
                  className={`relative px-6 py-3 text-[9px] font-mono tracking-[0.2em] uppercase transition-all
                    ${
                      isActive
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedCourses.map((course, idx) => (
            <div
              key={course.id}
              className="course-card relative group flex flex-col"
            >
              <div className="bg-slate-50 border border-slate-200 p-2 flex flex-col flex-grow group-hover:bg-white group-hover:border-[#c9a24d]/30">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1236]">
                  <Image
                    fill
                    src={course.image ?? "/placeholder.jpg"}
                    alt={course.title}
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-2 left-2 bg-[#c9a24d] text-[#0b1236] text-[8px] font-mono px-2 py-0.5">
                    ID: {idx + 101}
                  </div>
                </div>

                <div className="p-6 flex flex-col grow">
                  <h3 className="text-[#0b1236] font-black text-xl uppercase italic mb-4">
                    {course.title}
                  </h3>

                  <p className="text-slate-700 text-base mb-8 line-clamp-3">
                    {course.description}
                  </p>

                  <Link
                    href={`/${locale}/training/${course.slug}`}
                    className="mt-auto flex items-center justify-between border border-[#0b1236]/10 p-4 hover:bg-[#0b1236] hover:text-white"
                  >
                    <span className="text-[12px] font-black uppercase italic tracking-widest">
                      {locale === "ar" ? "عرض البيانات" : "ACCESS_DETAILS"}
                    </span>
                    <span className="text-[#c9a24d]">
                      {locale === "ar" ? "←" : "→"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hasMore && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={loadMore}
              className="px-12 py-4 border border-slate-200 font-mono text-[15px] tracking-[0.3em] hover:border-[#c9a24d]"
            >
              {locale === "ar"
                ? "تحميل المزيد من الدورات"
                : "LOAD_MORE_COURSES"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
