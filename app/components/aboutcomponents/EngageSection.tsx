"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";

export default function EngageSection() {
  const locale = useLocale() as "en" | "ar";
  const { engage } = aboutData[locale];

  return (
    <section className="bg-white py-28 px-6 text-center text-[#0b1236]">
      <h2 className="text-3xl md:text-4xl centert font-extrabold">
        {engage.title}
      </h2>
      <p className="mt-6 text-slate-700 centert max-w-2xl mx-auto leading-relaxed">
        {engage.desc}
      </p>
      <Link
        href="/contact"
        className="inline-block mt-10 px-14 py-4 rounded-2xl bg-[#c9a24d] text-[#0b1236] font-extrabold"
      >
        {engage.cta}
      </Link>
    </section>
  );
}
