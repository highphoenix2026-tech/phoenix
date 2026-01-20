"use client";
import Link from "next/link";
import { homeData } from "@/app/data/homedata";

import { useLocale } from "next-intl";

export default function EngageSection() {
  const locale = useLocale() as "en" | "ar";
  const { engage } = homeData[locale];

  return (
    <section className="py-28 px-6 md:px-24 text-center">
      <h2 className="text-3xl centert md:text-4xl font-extrabold text-[#0b1236]">
        {engage.title}
      </h2>
      <p className="mt-6 text-slate-600 centert max-w-2xl mx-auto">
        {engage.desc}
      </p>

      <Link
        href="/contact"
        className="inline-block mt-10 px-14 py-4 rounded-2xl bg-[#c9a24d] text-[#0b1236] font-extrabold tracking-wide hover:bg-[#b8933f] transition"
      >
        {engage.cta}
      </Link>
    </section>
  );
}
