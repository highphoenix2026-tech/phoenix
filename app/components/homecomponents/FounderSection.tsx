import { useLocale } from "next-intl";
import { homeData } from "@/app/data/homedata";

export default function FounderSection() {
  const locale = useLocale() as "en" | "ar";
  const { founder } = homeData[locale];

  return (
    <section className="bg-[#f1f3f5] py-32 px-6 md:px-24 border-t border-slate-200">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-16 items-start">
        <div className="w-full h-64 bg-[#f1f3f5] rounded-2xl flex items-center justify-center text-slate-400">
          Founder Photo
        </div>

        <div className="md:col-span-2">
          <h3 className="text-2xl font-extrabold text-[#0b1236]">
            {founder.name}
          </h3>
          <p className="mt-2 font-medium text-slate-600">
            {founder.role}
          </p>
          <p className="mt-6 text-slate-700 leading-relaxed">
            {founder.desc}
          </p>
        </div>
      </div>
    </section>
  );
}
