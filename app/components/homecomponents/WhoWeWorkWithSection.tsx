import { FaUniversity, FaPlaneDeparture, FaPlaneArrival, FaSchool, FaBuilding } from "react-icons/fa";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";







export default function WhoWeWorkWithSection() {
  const locale = useLocale() as "en" | "ar";
  const { whoWeWorkWith } = homeData[locale];


  const icons = [FaUniversity, FaPlaneDeparture, FaPlaneArrival, FaSchool, FaBuilding];

  return (
    <section className="py-28 px-6 md:px-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl centert font-extrabold text-[#0b1236]">
          {locale === "en" ? "Who We Work With" : "جهات نعمل معها"}
        </h2>

        <div className="mt-16 grid  grid-cols-2 md:grid-cols-5 gap-8">
          {whoWeWorkWith.map((item, i) => {
            const IconComponent = icons[i];
            return (
              <div
                key={i}
                className="bg-white  rounded-2xl p-8 shadow-md flex flex-col items-center gap-4 font-semibold text-slate-700 hover:shadow-lg transition"
              >
                <div className="text-3xl text-[#0b1236]">
                  <IconComponent />
                </div>
                <span className="centert">{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
