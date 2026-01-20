"use client";

import { FaShieldAlt, FaCheck, FaStar, FaSchool, FaLeaf } from "react-icons/fa";
import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";

export default function CoreValuesSection() {
  const locale = useLocale() as "en" | "ar";
  const { values } = aboutData[locale];
  const icons = [FaShieldAlt, FaCheck, FaStar, FaSchool, FaLeaf];

  return (
    <section className="py-28 px-6 md:px-24">
      <div className="max-w-6xl mx-auto text-center flex flex-col items-center">
        <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-bold bg-[#0b1236]/10 text-[#0b1236]">
          {values.badge}
        </span>
        <h2 className="text-3xl md:text-4xl centert font-extrabold text-[#0b1236]">
          {values.title}
        </h2>

        <div className="mt-16 grid md:grid-cols-5 gap-8">
          {values.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="bg-[#f1f3f5] rounded-2xl p-8 shadow-md">
                <Icon className="text-[#c9a24d] no-flip text-3xl mx-auto" />
                <h4 className="mt-4 font-bold centert text-[#0b1236]">{item.title}</h4>
                <p className="mt-2 text-slate-700 centert text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
