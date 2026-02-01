"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.png";
import LanguageSwitcher from "@/app/components/language-switcher";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Button1 from "./Button1";

export default function Navbar() {
  const t = useTranslations("navbar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("aboutUs"), href: "/about" },
    { name: t("advisoryServices"), href: "/advisory" },
    { name: t("training"), href: "/training" },
    { name: t("ourteam"), href: "/ourteam" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-[100] bg-[#0b1236] border-b-2 border-[#c9a24d] shadow-2xl h-20">
        <div className="max-w-[1500px] mx-auto flex justify-between items-center h-full px-6 md:px-12">
          <div className="flex items-center gap-6 h-full">
            <Link href="/" className="w-20 md:w-[70px] shrink-0">
              <Image
                src={Logo}
                alt="Logo"
                className="w-full h-auto brightness-0 invert"
                priority
              />
            </Link>
            <div className="h-8 w-[1px] bg-white/10 hidden lg:block" />
          </div>

          <nav className="hidden lg:flex items-center h-full">
            <ul className="flex items-center h-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href} className="h-full">
                    <Link
                      href={link.href}
                      className={`h-full px-5 flex items-center text-[12px] font-black uppercase  tracking-[0.2em] transition-all relative group ${
                        isActive
                          ? "text-[#c9a24d] bg-white/[0.03]"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#c9a24d]" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-6 ml-10">
              <LanguageSwitcher />
            </div>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[1000] w-12 h-12 flex flex-col items-center justify-center gap-1.5"
          >
            <span
              className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-8 rotate-45 translate-y-2" : "w-6"}`}
            />
            <span
              className={`h-[2px] bg-[#c9a24d] transition-all duration-300 ${isOpen ? "opacity-0" : "w-8"}`}
            />
            <span
              className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-8 -rotate-45 -translate-y-[2px]" : "w-4"}`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[999] lg:hidden transition-all duration-500 ${isOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 w-[80%] max-w-[320px] h-full bg-[#0b1236] border-l-4 border-[#c9a24d] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] transition-transform duration-500 ease-out flex flex-col p-8 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="mb-12 pt-4">
            <Image src={Logo} alt="Logo" className="w-20 brightness-0 invert" />
          </div>

          <nav className="flex-1">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-xl font-black uppercase italic tracking-tight flex items-baseline gap-3 transition-colors ${
                      pathname === link.href
                        ? "text-[#c9a24d]"
                        : "text-white/80 hover:text-[#c9a24d]"
                    }`}
                  >
                    <span className="text-[9px] font-mono opacity-30 italic">
                      0{i + 1}
                    </span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto border-t border-white/5 pt-8 space-y-6">
            <div className="scale-100 origin-left">
              <LanguageSwitcher />
            </div>

              <Button1  href="/contact"> {t("contact")}</Button1>
   
          </div>
        </div>
      </div>
    </>
  );
}
