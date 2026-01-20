"use client";

import { useLocale } from "next-intl";
import { trainingData } from "@/app/data/trainingdata";

export default function TrainingDomainsSection() {
 const locale = useLocale() as "en" | "ar";
  const {domains} = trainingData[locale];


  return (
    <section className="bg-white py-28 px-6 md:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold centert text-[#0b1236]">{domains.title}</h2>

        <div className="mt-12 grid md:grid-cols-5 gap-8 text-center">
          {domains.items.map((item, i) => (
            <div key={i} className="bg-[#f1f3f5] rounded-2xl p-6 shadow-md hover:shadow-xl transition">
              <h4 className="font-bold centert text-[#0b1236]">{item.title}</h4>
              <p className="mt-2 centert text-slate-700 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
