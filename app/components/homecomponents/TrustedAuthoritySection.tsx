import { FaCheckCircle } from "react-icons/fa";
import { homeData } from "@/app/data/homedata";
import { useLocale } from "next-intl";



export default function TrustedAuthoritySection() {



  const locale = useLocale() as "en" | "ar";
  const { trustedAuthority } = homeData[locale];


  return (
    <section className="bg-white py-20 px-6 md:px-24 border-t border-slate-200">
      <div className="max-w-6xl mx-auto text-center">
        <div className=" flex  flex-col justify-center items-center gap-2 text-[#c9a24d] font-bold">
          <FaCheckCircle /> Trusted Authority
        </div>
        <h3 className="mt-4 text-2xl centert md:text-3xl font-extrabold text-[#0b1236]">{trustedAuthority.title}</h3>
      </div>
    </section>
  );
}
