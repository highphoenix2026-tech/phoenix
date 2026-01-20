"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";

export default function AdvisoryHero() {
  const locale = useLocale() as "en" | "ar";
  const { hero } = advisoryData[locale];;

  return (
    <section className="relative bg-[#0b1236] text-white py-32 px-6 md:px-24 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl  centert font-extrabold mb-6">{hero.title}</h1>
        <p className="text-lg md:text-xl centert  leading-relaxed">{hero.desc}</p>
      </div>
    </section>
  );
}
