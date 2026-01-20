"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";
import { FaCheckCircle } from "react-icons/fa";

export default function OutcomesSection() {
    const locale = useLocale() as "en" | "ar";
  const { outcomes } = advisoryData[locale];;

  return (
    <section className="bg-[#0b1236] py-28 px-6 text-center text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl centert font-extrabold mb-10">Advisory Outcomes</h2>
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {outcomes.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <FaCheckCircle className="text-[#c9a24d] no-flip text-xl" />
              <p className="text-slate-200">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
