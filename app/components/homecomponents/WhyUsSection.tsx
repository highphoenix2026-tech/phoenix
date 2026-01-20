import { FaUserTie, FaBuilding, FaShieldVirus, FaCheckCircle, FaGlobe } from "react-icons/fa";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";




export default function WhyUsSection() {






  const locale = useLocale() as "en" | "ar";
  const { whyUs } = homeData[locale];

  const icons = [FaUserTie, FaBuilding, FaShieldVirus, FaCheckCircle, FaGlobe];

  return (
    <section className="bg-[#0b1236] py-32 px-6 md:px-24 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl centert font-extrabold text-center">{whyUs.title}</h2>

        <div className="mt-20 grid md:grid-cols-5 gap-6">
          {whyUs.items.map((item, i) => {
            const IconComponent = icons[i];
            return (
              <div
                key={i} 
                className="bg-[#080d24]  flex  flex-col justify-center items-center rounded-2xl p-6 border border-white/10 hover:border-[#c9a24d]/40 transition"
              >
                <div className="mb-3 text-2xl text-[#c9a24d]">
                  <IconComponent />
                </div>
                <h4 className="font-bold centert text-sm uppercase tracking-wide">{item.title}</h4>
                <p className="mt-2 text-sm centert text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
