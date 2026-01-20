"use client";

import { useLocale } from "next-intl";
import { teamData } from "@/app/data/teamdata";

export default function TeamHero() {
  const locale = useLocale() as "en" | "ar";
  const { hero } = teamData[locale];

  return (
    <section className="py-28 px-6 md:px-24 text-center bg-[#0b1236] text-white">
      <h1 className="text-4xl md:text-5xl centert font-extrabold">{hero.title}</h1>
      <p className="mt-6 max-w-3xl centert mx-auto leading-relaxed text-slate-300">
        {hero.desc}
      </p>
    </section>
  );
}
