"use client";

import { useLocale } from "next-intl";
import { contactData } from "@/app/data/contactData";

export default function HeroSection() {
  const locale = useLocale() as "en" | "ar";
  const { hero } = contactData[locale];

  return (
    <section className="py-28 px-6 md:px-24 text-center bg-[#0b1236] text-white">
      <h1 className="text-4xl md:text-5xl centert font-extrabold">{hero.title}</h1>
      <p className="mt-6 max-w-3xl mx-auto centert leading-relaxed text-slate-300">{hero.desc}</p>
    </section>
  );
}
