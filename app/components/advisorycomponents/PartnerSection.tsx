"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";
import Link from "next/link";

export default function PartnerSection() {
    const locale = useLocale() as "en" | "ar";
  const { partner } = advisoryData[locale];;

  return (
    <section className="py-28 px-6 md:px-24 text-center">
      <h2 className="text-3xl centert md:text-4xl font-extrabold text-[#0b1236]">{partner.title}</h2>
      <p className="mt-6 centert text-slate-600 max-w-2xl mx-auto leading-relaxed">{partner.desc}</p>
      <Link
        href="/contact"
        className="inline-block mt-10 px-14 py-4 rounded-2xl bg-[#c9a24d] text-[#0b1236] font-extrabold tracking-wide hover:bg-[#b8933f] transition"
      >
        {partner.cta}
      </Link>
    </section>
  );
}
