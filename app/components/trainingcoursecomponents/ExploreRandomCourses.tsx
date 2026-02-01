"use client";
import Image from "next/image";
import Link from "next/link";
import { TranslatedCourse } from "@/types";

interface Props {
  allCourses: TranslatedCourse[];
  currentCourseId: string;
  locale: "ar" | "en";
}

export default function ExploreRandomCourses({
  allCourses,
  currentCourseId,
  locale,
}: Props) {
  // تصفية الكورس الحالي واختيار 3 عشوائياً
  const randomCourses = [...allCourses]
    .filter((course) => course.id !== currentCourseId)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (randomCourses.length === 0) return null;

  return (
    <section className="py-24 bg-white border-t border-slate-100 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <span className="text-[#c9a24d] centert font-mono text-[10px] tracking-[0.5em] uppercase block mb-2">
            Discovery_Protocol // 07
          </span>
          <h2 className="text-4xl centert md:text-6xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter">
            {locale === "ar" ? "استكشف المزيد" : "Explore_Other_Files"}
          </h2>
          <div className="w-24 h-1 bg-[#c9a24d] mx-auto mt-4" />
          
          <div className="flex flex-col items-center mt-6">
             <div className="w-[1px] h-12 bg-gradient-to-b from-[#0b1236]/20 to-transparent" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {randomCourses.map((course, idx) => (
            <div
              key={course.id}
              className="course-card relative group flex flex-col cursor-pointer"
            >
              <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-[#c9a24d] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 group-hover:-translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-[#c9a24d] opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 group-hover:translate-x-1 group-hover:translate-y-1" />

              <div className="bg-slate-50 border border-slate-200 p-2 flex flex-col flex-grow transition-all duration-500 group-hover:bg-white group-hover:border-[#c9a24d]/30 group-hover:shadow-2xl">
                
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0b1236] shrink-0">
                  <Image
                    fill
                    src={course.image ?? "/placeholder.jpg"}
                    alt={course.title}
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-2 left-2 bg-[#c9a24d] text-[#0b1236] text-[8px] font-mono px-2 py-0.5 z-20">
                    ID: {idx + 100}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4 shrink-0">
                    <div className="w-1.5 h-1.5 bg-[#c9a24d] rotate-45" />
                    <span className="text-[9px] font-mono text-slate-400 tracking-tighter uppercase">
                      Operational_Module
                    </span>
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
                    className="mt-auto flex items-center justify-between p-4 transition-all duration-500
                               bg-transparent border border-[#0b1236]/10 
                               group-hover:bg-[#0b1236] group-hover:border-[#0b1236]"
                  >
                    <span className="text-[10px] font-black uppercase italic tracking-widest text-black group-hover:text-white transition-colors duration-500">
                      {locale === "ar" ? "عرض البيانات" : "ACCESS_DETAILS"}
                    </span>
                    <span className="text-[#c9a24d] font-mono  group-hover:opacity-100 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-all duration-500">
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