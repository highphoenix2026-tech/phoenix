"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";

export default function InstitutionalSection() {

    const locale = useLocale() as "en" | "ar";
  const { institutional } = advisoryData[locale];;

  return (
    <section className="py-28 px-6 md:px-24">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1236]">{institutional.title}</h2>
          <p className="text-slate-700 leading-relaxed">{institutional.desc}</p>
        </div>
        <div className="w-full h-64 bg-[#f1f3f5] rounded-3xl flex items-center justify-center text-slate-400">
          <img src={institutional.image} alt={institutional.title} className="w-full h-full object-cover rounded-3xl" />
        </div>
      </div>
    </section>
  );
}
