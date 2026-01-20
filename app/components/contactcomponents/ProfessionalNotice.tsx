"use client";

import { useLocale } from "next-intl";
import { contactData } from "@/app/data/contactData";
import { FaCheckCircle } from "react-icons/fa";

export default function ProfessionalNotice() {
  const locale = useLocale() as "en" | "ar";
  const { professional } = contactData[locale];

  return (
    <section className="py-28 px-6 md:px-24 text-center bg-white text-slate-800 border-t border-slate-200">
      <FaCheckCircle className="text-[#c9a24d]  no-flip text-4xl mx-auto mb-6" />
      <h2 className="text-3xl centert md:text-4xl font-extrabold">{professional.title}</h2>
      <p className="mt-6 max-w-3xl centert mx-auto leading-relaxed">{professional.desc1}</p>
      <p className="mt-4 max-w-3xl centert mx-auto leading-relaxed">{professional.desc2}</p>
    </section>
  );
}
