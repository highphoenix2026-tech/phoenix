"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";


    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");

 
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
   <button onClick={toggleLocale} className="group/btn relative inline-flex items-center justify-center
                       bg-[#c9a24d] text-[#0b1236]
                       px-6 py-3 md:px-5 md:py-2
                       rounded-full
                       text-sm md:text-lg
                       font-black shadow-xl
                       hover:bg-white hover:text-yellow-400 transition-all duration-300 active:scale-95">
          
         
      {locale === "en" ? "AR" : "EN"}
    </button>
  );
}
