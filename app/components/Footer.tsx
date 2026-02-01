"use client"
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
  const nurembergUrl = process.env.NEXT_PUBLIC_NUREMBERG_URL || "#";
  const locale = useLocale() as "en" | "ar";
  const t = useTranslations("navbar");
  const isArabic = locale === "ar";
  
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("aboutUs"), href: "/about" },
    { name: t("advisoryServices"), href: "/advisory" },
    { name: t("training"), href: "/training" },
    { name: t("ourteam"), href: "/ourteam" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <footer className="bg-[#080d24] relative overflow-hidden border-t border-[#c9a24d]/20">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#c9a24d 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-5 relative z-10">
        <div className="grid md:grid-cols-3 gap-12">

          <div className="space-y-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black text-[#c9a24d] tracking-tighter uppercase italic">
                Phoenix <span className="text-white">Aviation</span>
              </h2>
              <div className="h-[2px] w-12 bg-[#c9a24d] mt-1" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              {isArabic 
                ? "رائد عالمي في الاستشارات الاستراتيجية للطيران، نقدم حلول تدريب واستشارات متطورة لصناعة الطيران الحديثة."
                : "Global leader in aviation strategic advisory, providing cutting-edge training and consultancy solutions for the modern aerospace industry."}
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                <Link key={index} href="#" className="w-9 h-9 border border-[#c9a24d]/30 flex items-center justify-center text-[#c9a24d] hover:bg-[#c9a24d] hover:text-[#0b1236] transition-all duration-300 rounded-sm">
                  <Icon className="no-flip" size={14} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#c9a24d] text-xs font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c9a24d] rounded-full animate-pulse" />
              {isArabic ? "التنقل" : "Navigation"}
            </h3>
            <ul className="space-y-4 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white flex items-center transition-all duration-300 group">
                    <span className={`${isArabic ? 'ml-2 rotate-180' : 'mr-2'} opacity-0 group-hover:opacity-100 text-[#c9a24d] text-[10px]`}>▶</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#c9a24d] text-xs font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c9a24d] rounded-full animate-pulse" />
              {isArabic ? "المقر الرئيسي" : "Headquarters"}
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-[#c9a24d] no-flip mt-1 shrink-0" />
                <span className="text-slate-400">
                  {isArabic ? "العبدلي، شارع أمية بنت عبد شمس" : "Al-Abdali, Omayya Bent Abd Shams St."}<br/>
                  {isArabic ? "عمان، الأردن" : "Amman, Jordan"}
                </span>
              </li>
              <li className="flex items-center gap-4">
                <FaPhoneAlt className="text-[#c9a24d] no-flip shrink-0" />
                <span className="text-slate-400" dir="ltr">+962 6 560 0000</span>
              </li>
              <li className="flex items-center gap-4">
                <FaEnvelope className="text-[#c9a24d] no-flip shrink-0" />
                <span className="text-slate-400">info@phoenixaviation.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="text-center pt-5 mt-10 border-t border-white/10">
          <p className="text-sm  centert  text-white/80 break-words">
            {isArabic ? (
              <>
                © {currentYear} Phoenix. جميع الحقوق محفوظة. تم الإنشاء بواسطة{" "}
                <a href={nurembergUrl} target="_blank" className="underline hover:text-[#c9a24d] transition-colors">
                  Nuremberg Group
                </a>
              </>
            ) : (
              <>
                © {currentYear} Phoenix. All rights reserved. Made by{" "}
                <a href={nurembergUrl} target="_blank" className="underline hover:text-[#c9a24d] transition-colors">
                  Nuremberg Group
                </a>
              </>
            )}
          </p>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c9a24d]/10 to-transparent pointer-events-none" />
    </footer>
  );
}