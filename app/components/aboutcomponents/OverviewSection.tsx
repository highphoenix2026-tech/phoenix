"use client";

import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";

export default function OverviewSection() {
  const locale = useLocale() as "en" | "ar";
  const { overview } = aboutData[locale];

  return (
    <section className="bg-white   py-28 px-6 md:px-24 border-t border-slate-200">
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center justify-center">
        <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-bold bg-[#0b1236]/10 text-[#0b1236]">
          {overview.badge}
        </span>
        <h2 className="text-3xl centert md:text-4xl font-extrabold text-[#0b1236]">
          {overview.title}
        </h2>
        <p className="mt-6 centert text-slate-700 max-w-4xl mx-auto leading-relaxed">
          {overview.desc}
        </p>
      </div>
    </section>
  );
}
