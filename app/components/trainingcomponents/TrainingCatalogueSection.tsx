"use client";

import { useState, useRef } from "react";
import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaClock, FaUsers, FaGraduationCap, FaChevronDown } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TrainingCatalogueSection() {
  const locale = useLocale() as "en" | "ar";
  const { courses, catalogue } = trainingData[locale];
  const [activeCourse, setActiveCourse] = useState<string | null>(null);
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
        .fromTo(".catalogue-header", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo(".course-card", 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        );
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section ref={containerRef} className="bg-white py-24 px-6 overflow-hidden border-t border-slate-50 opacity-0 invisible">
      <div className="max-w-7xl mx-auto">
        
        <div className="catalogue-header text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-[1px] bg-slate-200" />
            <span className="text-[#c9a24d] font-mono text-[9px] tracking-[0.5em] font-black uppercase">Service_Portfolio</span>
            <div className="w-10 h-[1px] bg-slate-200" />
          </div>
          <h2 className="text-4xl md:text-5xl font-[1000] text-[#0b1236] uppercase italic tracking-tighter leading-none mb-6">
            {catalogue.title}
          </h2>
          <p className="text-slate-400 font-medium max-w-xl mx-auto italic text-sm">{catalogue.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="course-card group bg-white border border-slate-100 flex flex-col h-full transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 relative"
            >
              <div className="relative aspect-video overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1236] via-[#0b1236]/20 to-transparent opacity-90" />
                
                <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center gap-2 mb-1">
                        <FaClock className="text-[#c9a24d] text-[10px]" />
                        <span className="text-white font-mono text-[9px] font-black uppercase tracking-widest opacity-80">
                            {course.duration}
                        </span>
                    </div>
                    <h3 className="text-white font-black text-lg md:text-xl uppercase italic tracking-tight leading-none">
                        {course.title}
                    </h3>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="min-h-[80px] mb-6">
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {course.summary}
                  </p>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={() => setActiveCourse(activeCourse === course.id ? null : course.id)}
                    className={`w-full py-3.5 flex items-center justify-center gap-2 font-black uppercase italic tracking-widest text-[10px] transition-all duration-300 border-2 
                      ${activeCourse === course.id 
                        ? 'bg-[#0b1236] border-[#0b1236] text-white' 
                        : 'border-[#0b1236] text-[#0b1236] hover:bg-[#0b1236] hover:text-white'}`}
                  >
                    {activeCourse === course.id ? (locale === 'ar' ? 'إغلاق' : 'Close') : (locale === 'ar' ? 'التفاصيل' : 'Details')}
                    <FaChevronDown className={`transition-transform duration-500 ${activeCourse === course.id ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeCourse === course.id ? 'max-h-80 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                    <div className="pt-5 border-t border-slate-100 space-y-3">
                      <div className="flex items-start gap-2">
                          <FaGraduationCap className="text-[#c9a24d] mt-0.5 shrink-0 text-sm" />
                          <p className="text-[11px] text-slate-500 leading-tight"><strong className="text-[#0b1236]">{locale === 'ar' ? 'الهدف:' : 'Target:'}</strong> {course.details.target}</p>
                      </div>
                      <div className="flex items-start gap-2">
                          <FaUsers className="text-[#c9a24d] mt-0.5 shrink-0 text-sm" />
                          <p className="text-[11px] text-slate-500 leading-tight"><strong className="text-[#0b1236]">{locale === 'ar' ? 'الجمهور:' : 'Audience:'}</strong> {course.details.audience.join(", ")}</p>
                      </div>
                      <div className="bg-slate-50 p-3 border-r-4 border-[#c9a24d]">
                          <p className="text-[9px] font-mono font-black text-[#0b1236] uppercase tracking-tighter">
                              {locale === 'ar' ? 'التقديم:' : 'Delivery:'} {course.details.delivery}
                          </p>
                      </div>
                    </div>
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