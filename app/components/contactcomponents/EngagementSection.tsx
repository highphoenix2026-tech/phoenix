"use client";

import { useLocale } from "next-intl";
import { contactData } from "@/app/data/contactData";
import { FaBusinessTime, FaLaptop, FaHubspot } from "react-icons/fa";
import { JSX } from "react";

export default function EngagementSection() {
  const locale = useLocale() as "en" | "ar";
  const { engagement } = contactData[locale];

  const icons: Record<string, JSX.Element> = {
    FaBusinessTime: <FaBusinessTime className="text-[#c9a24d] text-3xl mx-auto" />,
    FaLaptop: <FaLaptop className="text-[#c9a24d] text-3xl mx-auto" />,
    FaHubspot: <FaHubspot className="text-[#c9a24d] text-3xl mx-auto" />
  };

  return (
    <section className="py-28 px-6 md:px-24 bg-white">
      <h2 className="text-3xl md:text-4xl centert font-extrabold text-[#0b1236] text-center">How We Engage</h2>
      <p className="mt-6 text-slate-700 centert max-w-3xl mx-auto leading-relaxed text-center">
        Engagements typically begin with an initial discussion to understand organizational context, regulatory environment, and strategic objectives.
      </p>
      <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
        {engagement.map((item, i) => (
          <div key={i} className="bg-[#f1f3f5] rounded-2xl p-8 shadow-md">
            <div>{icons[item.icon]}</div>
            <h4 className="mt-4 font-bold centert text-lg text-[#0b1236]">{item.title}</h4>
            <p className="mt-2 text-slate-700 centert text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
