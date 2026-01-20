"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import LanguageSwitcher from "@/app/components/language-switcher";
import { useTranslations } from "next-intl";

export default function Navbar() {
  const t = useTranslations("navbar"); 

  return (
    <header className="bg-slate-50 shadow-md w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src={Logo}
            alt={t("logoAlt")} 
            className="w-full object-cover rounded-xl"
            priority
          />
        </div>

        <ul className="hidden md:flex space-x-8 items-center">
          <li>
            <Link
              href="/"
              className="text-[#0b1236] hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              {t("home")}
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-[#0b1236] hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              {t("aboutUs")}
            </Link>
          </li>
          <li>
            <Link
              href="/advisory"
              className="text-[#0b1236] hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              {t("advisoryServices")}
            </Link>
          </li>
          <li>
            <Link
              href="/training"
              className="text-[#0b1236] hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              {t("training")}
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-[#0b1236] hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              {t("contact")}
            </Link>
          </li>
             <li>
            <Link
              href="/ourteam"
              className="text-[#0b1236] hover:text-yellow-400 font-medium transition-colors duration-300"
            >
              {t("ourteam")}
            </Link>
          </li>

          <li>
            <LanguageSwitcher />
          </li>
        </ul>

        <div className="md:hidden">
          <button className="text-white focus:outline-none text-3xl">
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
