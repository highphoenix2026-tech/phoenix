import { FaShieldVirus, FaCheckCircle, FaBuilding, FaSchool } from "react-icons/fa";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";










export default function AboutSection() {

  const locale = useLocale() as "en" | "ar";
  const { about } = homeData[locale];


  const icons = [FaShieldVirus, FaCheckCircle, FaBuilding, FaSchool];

  return (
    <section className="py-28 px-6 md:px-24 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="inline-block mb-4 px-4 py-1 rounded-full text-xs font-bold bg-[#0b1236]/10 text-[#0b1236]">
            {locale === "en" ? "WHO WE ARE" : "من نحن"}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1236]">{about.title}</h2>
          <p className="mt-6 text-slate-600 leading-relaxed">{about.desc}</p>
        </div>

        <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-200">
          <div className="grid grid-cols-2 gap-6 text-sm font-semibold text-slate-700">
            {about.items.map((item, i) => {
              const IconComponent = icons[i];
              return (
                <div
                  key={i} 
                  className="flex items-center gap-3 bg-[#f1f3f5] rounded-xl p-6 hover:bg-[#eaeaea] transition"
                >
                  <IconComponent /> {item}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
