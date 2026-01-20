"use client";

import { useLocale } from "next-intl";
import { teamData } from "@/app/data/teamdata";

export default function StaffCards() {
  const locale = useLocale() as "en" | "ar";
   const {staff} = teamData[locale];
  return (
    <section className="py-28 px-6 md:px-24 bg-[#f1f3f5]">
      <h2 className="text-3xl  centert md:text-4xl font-extrabold text-[#0b1236] text-center mb-16">Our Team</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {staff.map((member, i) => (
          <div key={i} className="bg-white rounded-3xl shadow-md hover:shadow-lg transition p-6 text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-[#c9a24d]"
            />
            <h3 className="mt-4 centert text-xl font-bold text-[#0b1236]">{member.name}</h3>
            <h4 className="mt-1 centert text-sm font-semibold text-[#c9a24d]">{member.role}</h4>
            <p className="mt-4 centert text-slate-700 text-sm leading-relaxed">{member.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
