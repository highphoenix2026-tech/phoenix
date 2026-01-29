"use client";

import { useState, useRef, useMemo } from "react";
import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaChevronDown, FaUsers, FaClock } from "react-icons/fa";
import type { TranslatedCategory, TranslatedCourse } from "@/types";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  dbCourses: TranslatedCourse[];
  dbCategories: TranslatedCategory[];
}

export default function TrainingCatalogueSection({
  dbCourses,
  dbCategories,
}: Props) {
  const locale = useLocale() as "en" | "ar";
  const { catalogue } = trainingData[locale];

  const [activeCourse, setActiveCourse] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const filteredCourses = useMemo(() => {
    if (selected === "all") return dbCourses;
    return dbCourses.filter((course) => course.categoryId === selected);
  }, [selected, dbCourses]);

  useGSAP(
    () => {
      gsap.fromTo(
        ".course-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.4,
          ease: "back.out(1.2)",
        }
      );
    },
    { dependencies: [selected] }
  );

  const formatAudience = (audience: string | string[]) => {
    if (Array.isArray(audience)) return audience.join("، ");
    return audience;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return locale === "ar" ? "غير محدد" : "TBA";
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <section
      ref={containerRef}
      className="bg-white py-24 px-6 overflow-hidden border-t border-slate-50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl centert md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter mb-4">
            {catalogue.title}
          </h2>
          <p className="text-slate-400 centert italic text-sm">{catalogue.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => {
              setSelected("all");
              setActiveCourse(null);
            }}
            className={`px-8 py-3 text-[10px] font-[1000] uppercase italic tracking-[0.2em]
              ${
                selected === "all"
                  ? "bg-[#c9a24d] text-[#0b1236] shadow-[4px_4px_0px_#0b1236]"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            style={{ transform: "skewX(-15deg)" }}
          >
            <span style={{ transform: "skewX(15deg)" }}>
              {locale === "ar" ? "الكل" : "All"}
            </span>
          </button>

          {dbCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelected(cat.id);
                setActiveCourse(null);
              }}
              className={`px-8 py-3 text-[10px] font-[1000] uppercase italic tracking-[0.2em]
                ${
                  selected === cat.id
                    ? "bg-[#c9a24d] text-[#0b1236] shadow-[4px_4px_0px_#0b1236]"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              style={{ transform: "skewX(-15deg)" }}
            >
              <span style={{ transform: "skewX(15deg)" }}>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* الكورسات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="course-card group bg-white border border-slate-100 flex flex-col transition hover:shadow-xl"
            >
              {/* الصورة */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  fill
                  src={course.image ?? "/placeholder.jpg"}
                  alt={course.title}
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1236] to-transparent opacity-80" />
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-white  font-black text-xl uppercase italic leading-tight">
                    {course.title}
                  </h3>
                </div>
              </div>

              {/* المحتوى */}
              <div className="p-6 flex flex-col">
                <p className="text-slate-500 text-sm mb-6 line-clamp-3">
                  {course.description ?? (locale === "ar" ? "لا يوجد وصف" : "No description")}
                </p>

                {/* زر التفاصيل */}
                <button
                  onClick={() =>
                    setActiveCourse(activeCourse === course.id ? null : course.id)
                  }
                  className="mt-auto py-3 flex items-center justify-center gap-2 font-black uppercase italic text-[10px] border-2 border-[#0b1236] hover:bg-[#0b1236] hover:text-white transition"
                >
                  {activeCourse === course.id
                    ? locale === "ar"
                      ? "إغلاق"
                      : "Close"
                    : locale === "ar"
                    ? "التفاصيل"
                    : "Details"}
                  <FaChevronDown
                    className={`transition ${activeCourse === course.id ? "rotate-180" : ""}`}
                  />
                </button>

                {/* التفاصيل الموسعة */}
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    activeCourse === course.id ? "max-h-96 mt-4" : "max-h-0"
                  }`}
                >
                  <div className="p-4 bg-slate-50 border-r-4 border-[#c9a24d] space-y-3 text-[11px]">
                    <p className="flex items-center gap-2">
                      <FaUsers className="text-[#c9a24d]" />
                      <strong>{locale === "ar" ? "الجمهور:" : "Audience:"}</strong>
                      {formatAudience(course.target_audience)}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaClock className="text-[#c9a24d]" />
                      <strong>{locale === "ar" ? "من:" : "From:"}</strong>
                      {formatDate(course.start_date)}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaClock className="text-[#c9a24d]" />
                      <strong>{locale === "ar" ? "إلى:" : "To:"}</strong>
                      {formatDate(course.end_date)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
