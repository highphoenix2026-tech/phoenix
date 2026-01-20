"use client";

import { FaFlag, FaEye } from "react-icons/fa";
import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";

export default function MissionVisionSection() {
  const locale = useLocale() as "en" | "ar";
  const { missionVision } = aboutData[locale];
  const icons = [FaFlag, FaEye];

  return (
    <section className="py-28 px-6 md:px-24 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {missionVision.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-6 bg-[#0b1236] rounded-3xl p-10 shadow-xl border border-[#c9a24d]"
            >
              <Icon className="text-[#c9a24d] no-flip text-3xl" />
              <h3 className="text-xl font-bold  text-white">{item.title}</h3>
              <p className="text-slate-200 centert leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
