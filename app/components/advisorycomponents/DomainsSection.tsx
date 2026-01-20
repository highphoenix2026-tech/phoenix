"use client";

import { useLocale } from "next-intl";
import { advisoryData } from "@/app/data/advisoryData";
import { FaCheckCircle } from "react-icons/fa";

export default function DomainsSection() {
  const locale = useLocale() as "en" | "ar";
  const { domains } = advisoryData[locale];;

  return (
    <section className="py-28 px-6 md:px-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl centert font-extrabold text-[#0b1236]">Advisory Service Domains</h2>
        <div className="mt-16 grid md:grid-cols-3 gap-12 text-left">
          {domains.map((domain, i) => (
            <div key={i}>
              <div className="w-full h-48 bg-[#f1f3f5] rounded-3xl flex items-center justify-center text-slate-400">
                <img src={domain.image} alt={domain.title} className="w-full h-full object-cover rounded-3xl" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-[#0b1236]">{domain.title}</h3>
              <p className="mt-2 text-slate-700 text-sm leading-relaxed">{domain.desc}</p>
              <ul className="mt-4 space-y-2 text-slate-700">
                {domain.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <FaCheckCircle className="text-[#c9a24d] no-flip" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
