"use client";

import { FaShieldAlt, FaCheck, FaStar, FaSchool } from "react-icons/fa";
import { useLocale } from "next-intl";
import { aboutData } from "@/app/data/aboutdata";

export default function ApproachSection() {
  const locale = useLocale() as "en" | "ar";
  const { approach } = aboutData[locale];
  const icons = [FaShieldAlt, FaCheck, FaStar, FaSchool];

  return (
    <section className="bg-white  py-28 px-6 md:px-24 border-t border-slate-200">
      <div className=    "      max-w-6xl mx-auto text-center  flex flex-col items-center justify-center">
        <span className="inline-block  mb-4 px-4 py-1 rounded-full text-xs font-bold bg-[#0b1236]/10 text-[#0b1236]">
          {approach.badge}
        </span>
        <h2 className="text-3xl   md:text-4xl font-extrabold text-[#0b1236]">
          {approach.title}
        </h2>

        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {approach.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="bg-[#f1f3f5]  rounded-2xl p-8 shadow-md flex flex-col items-center justify-center">
                <Icon className="text-[#c9a24d] no-flip text-3xl" />
                <h4 className="mt-4 font-bold centert text-[#0b1236]">{item.title}</h4>
                <p className="mt-2 centert text-slate-700 text-sm leading-relaxed">
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
