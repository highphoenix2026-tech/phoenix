    import { useLocale } from "next-intl";
import { homeData } from "@/app/data/homedata";




    
    export default function FounderSection() {
      const locale = useLocale() as "en" | "ar";
      const { safety } = homeData[locale];
    

  return (
    <section className="bg-[#0b1236] py-28 px-6 text-center text-white">
      <h2 className="text-3xl md:text-4xl centert font-extrabold">{safety.title}</h2>
      <p className="mt-6 text-slate-300 centert max-w-3xl mx-auto">{safety.desc}</p>
    </section>
  );
}
