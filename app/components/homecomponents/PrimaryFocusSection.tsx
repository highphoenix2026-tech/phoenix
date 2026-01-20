import { FaUserTie, FaGavel, FaMapMarkedAlt, FaSchool, FaPaperPlane } from "react-icons/fa";
import Link from "next/link";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";

export default function PrimaryFocusSection() {


  const locale = useLocale() as "en" | "ar";
  const { primaryFocus } = homeData[locale];



  const icons = [FaUserTie, FaGavel, FaMapMarkedAlt, FaSchool];

  return (
    <section className="py-28 px-6 md:px-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl  flex  flex-col justify-center items-center mx-auto text-center">
        <span className="inline-block  mb-4 px-4 py-1 rounded-full text-xs font-bold bg-[#0b1236]/10 text-[#0b1236]">
          {locale === "en" ? "PRIMARY FOCUS AREAS" : "المجالات الأساسية"}
        </span>

        <h2 className="text-3xl centert md:text-4xl font-extrabold text-[#0b1236]">{primaryFocus.title}</h2>
        <p className="mt-4 centert text-slate-600 max-w-2xl mx-auto leading-relaxed">{primaryFocus.subtitle}</p>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 mt-6 font-semibold text-[#c9a24d] hover:underline"
        >
          {primaryFocus.cta} <FaPaperPlane />
        </Link>

        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {primaryFocus.services.map((item, i) => {
            const IconComponent = icons[i];
            return (
              <div
                key={i}
                className="bg-[#f1f3f5] centert  flex  flex-col justify-center items-center rounded-2xl p-8 shadow-md hover:shadow-xl hover:border-l-4 hover:border-[#c9a24d] transition"
              >
                <div>
                  <IconComponent className="text-3xl text-[#0b1236]" />
                </div>
                <h4 className="mt-4 font-bold text-lg text-[#0b1236]">{item.title}</h4>
                <p className="mt-2 centert text-sm text-slate-700 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
