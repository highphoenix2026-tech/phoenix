"use client";

import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";

export default function GlobalReachSection() {
  const locale = useLocale() as "en" | "ar";
  const { globalReach } = aboutData[locale];

  return (
    <section className="bg-[#0b1236] py-28 px-6 md:px-24 text-center text-white">
      <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-bold bg-[#c9a24d]/20 text-[#c9a24d]">
        {globalReach.badge}
      </span>
      <h2 className="text-3xl centert md:text-4xl font-extrabold">
        {globalReach.title}
      </h2>
      <p className="mt-6 text-slate-300 centert max-w-3xl mx-auto leading-relaxed">
        {globalReach.desc}
      </p>
    </section>
  );
}
