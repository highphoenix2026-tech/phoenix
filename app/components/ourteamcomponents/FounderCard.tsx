"use client";

import { useLocale } from "next-intl";
import { teamData } from "@/app/data/teamdata";

export default function FounderCard() {
 const locale = useLocale() as "en" | "ar";
  const {founder} = teamData[locale];

  return (
    <section className="py-28 px-6 md:px-24 text-center bg-white">
      <div className="max-w-4xl mx-auto">
        <img
          src={founder.image}
          alt={founder.name}
          className="w-48 h-48 mx-auto rounded-full object-cover border-4 border-[#c9a24d]"
        />
        <h2 className="mt-6 text-4xl font-extrabold text-[#0b1236]">{founder.name}</h2>
        <h3 className="mt-2 text-xl font-semibold text-[#c9a24d]">{founder.role}</h3>
        <p className="mt-6 text-slate-700 leading-relaxed">{founder.bio}</p>
      </div>
    </section>
  );
}
