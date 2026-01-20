"use client";

import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";
import { FaCheckCircle } from "react-icons/fa";

export default function TrainingObjectivesSection() {
 const locale = useLocale() as "en" | "ar";
  const {objectives} = trainingData[locale];

  return (
    <section className="bg-white flex flex-col items-center py-28 px-6 md:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1236]">{objectives.title}</h2>
        <ul className="mt-8 flex flex-col gap-4 md:gap-6">
          {objectives.items.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-700 text-lg">
              <FaCheckCircle className="text-[#c9a24d] no-flip" /> {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
