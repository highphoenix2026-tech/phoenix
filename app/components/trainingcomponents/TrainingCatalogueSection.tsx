"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";

export default function TrainingCatalogueSection() {
  const locale = useLocale() as "en" | "ar";
  const {courses} = trainingData[locale];


  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  return (
    <section className="bg-white py-28 px-6 md:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl centert md:text-4xl font-extrabold text-[#0b1236]">
          {trainingData[locale].catalogue.title}
        </h2>
        <p className="mt-2 centert text-slate-700">{trainingData[locale].catalogue.subtitle}</p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-[#f1f3f5] rounded-2xl flex flex-col items-center p-6 shadow-md hover:shadow-xl transition">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg" />
              <h3 className="mt-4 centert font-bold text-[#0b1236]">{course.title}</h3>
              <p className="mt-2 centert text-slate-700 text-sm">{course.summary}</p>
              <p className="mt-1 centert text-slate-500 text-sm font-semibold">{course.duration}</p>
              <button
                onClick={() => setActiveCourse(activeCourse === course.id ? null : course.id)}
                className="mt-4 px-4 py-2 rounded-full bg-[#0b1236] text-white hover:bg-[#0b1236]/80 transition"
              >
                {activeCourse === course.id ? "Hide Details" : "See More"}
              </button>

              {activeCourse === course.id && (
                <div className="mt-4 text-left text-slate-700 text-sm space-y-2">
                  <p><strong>Target:</strong> {course.details.target}</p>
                  <p><strong>Audience:</strong> {course.details.audience.join(", ")}</p>
                  <p><strong>Delivery:</strong> {course.details.delivery}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
