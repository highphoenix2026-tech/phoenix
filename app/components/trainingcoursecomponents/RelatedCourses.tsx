"use client";

import Image from "next/image";
import Link from "next/link";
import { TranslatedCourse } from "@/types";

interface Props {
  courses: TranslatedCourse[];
  locale: "ar" | "en";
}

export default function RelatedCourses({ courses, locale }: Props) {
  if (courses.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-[1000] text-[#0b1236] uppercase italic mb-12 tracking-tighter">
          {locale === "ar" ? "دورات مشابهة" : "Related Courses"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link 
              href={`/${locale}/training/${course.slug}`} 
              key={course.id}
              className="group bg-white overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={course.image ?? "/placeholder.jpg"}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-[#0b1236]/40 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="p-6">
                <h3 className="font-black uppercase italic text-[#0b1236] group-hover:text-[#c9a24d] transition-colors">
                  {course.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}