"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";
import { FaFileAlt, FaHandshake, FaUsers } from "react-icons/fa";

import { JSX } from "react";

export default function EngagementSection() {
  const locale = useLocale() as "en" | "ar";
  const { engagement } = advisoryData[locale];;

  const icons: Record<string, JSX.Element> = {
    FaFileAlt: <FaFileAlt className="text-2xl no-flip text-[#c9a24d]" />,
    FaHandshake: <FaHandshake className="text-2xl no-flip text-[#c9a24d]" />,
    FaUsers: <FaUsers className="text-2xl no-flip text-[#c9a24d]" />
  };

  return (
    <section className="py-28 px-6 md:px-24 text-center">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl  centert font-extrabold text-[#0b1236]">How We Engage</h2>
        <p className="mt-6 text-slate-600 centert leading-relaxed">
          Advisory services are delivered through structured engagements tailored to the client’s regulatory context, institutional maturity, and strategic objectives.
        </p>
        <div className="mt-16 grid md:grid-cols-5 gap-8 ">
          {engagement.map((item, i) => (
            <div key={i} className="bg-white flex flex-col items-center rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-lg transition text-slate-700">
              <div className="mb-2 ">{icons[item.icon]}</div>
              <p className="centert  font-semibold text-sm">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
