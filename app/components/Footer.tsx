"use client"
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useLocale } from "next-intl";

export default function Footer() {
  const locale = useLocale() as "en" | "ar";

  return (
    <footer className="bg-[#080d24] relative overflow-hidden border-t border-[#c9a24d]/20">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#c9a24d 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12">

          <div className="space-y-6">
            <div className="flex flex-col">
              <h2 className="text-2xl font-black text-[#c9a24d] tracking-tighter uppercase italic">
                Phoenix <span className="text-white">Aviation</span>
              </h2>
              <div className="h-[2px] w-12 bg-[#c9a24d] mt-1" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-light">
              {locale === "en" 
                ? "Global leader in aviation strategic advisory, providing cutting-edge training and consultancy solutions for the modern aerospace industry."
                : "رائد عالمي في الاستشارات الاستراتيجية للطيران، نقدم حلول تدريب واستشارات متطورة لصناعة الطيران الحديثة."}
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                <Link key={index} href="#" className="w-9 h-9 border border-[#c9a24d]/30 flex items-center justify-center text-[#c9a24d] hover:bg-[#c9a24d] hover:text-[#0b1236] transition-all duration-300 rounded-sm">
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[#c9a24d] text-xs font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c9a24d] rounded-full animate-pulse" />
              {locale === "en" ? "Navigation" : "التنقل"}
            </h3>
            <ul className="space-y-4 text-sm">
              {["Home", "About Us", "Services", "Training", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "")}`} className="text-slate-400 hover:text-white hover:translate-x-2 flex items-center transition-all duration-300 group">
                    <span className="opacity-0 group-hover:opacity-100 text-[#c9a24d] mr-2 text-[10px]">▶</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[#c9a24d] text-xs font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c9a24d] rounded-full animate-pulse" />
              {locale === "en" ? "Headquarters" : "المقر الرئيسي"}
            </h3>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-[#c9a24d] mt-1 shrink-0" />
                <span className="text-slate-400">Al-Abdali, Omayya Bent Abd Shams St.<br/>Amman, Jordan</span>
              </li>
              <li className="flex items-center gap-4">
                <FaPhoneAlt className="text-[#c9a24d] shrink-0" />
                <span className="text-slate-400" dir="ltr">+962 79 000 0000</span>
              </li>
              <li className="flex items-center gap-4">
                <FaEnvelope className="text-[#c9a24d] shrink-0" />
                <span className="text-slate-400">info@phoenixaviation.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#c9a24d] text-xs font-bold uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#c9a24d] rounded-full animate-pulse" />
              {locale === "en" ? "Newsletter" : "النشرة الإخبارية"}
            </h3>
            <p className="text-sm text-slate-500 mb-6 font-light">
              {locale === "en" ? "Subscribe to receive tactical updates." : "اشترك لتصلك آخر التحديثات."}
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder={locale === "en" ? "Enter Email" : "أدخل البريد"}
                  className="w-full bg-[#0b1236] border border-[#c9a24d]/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a24d] transition-colors rounded-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#c9a24d] text-[#0b1236] py-3 text-xs font-black uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm"
              >
                {locale === "en" ? "Subscribe" : "اشترك الآن"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] md:text-xs text-slate-500 font-mono tracking-widest uppercase italic">
            © 2026 Phoenix Aviation Consultancy // Secure Strategic Solutions
          </p>
          <div className="flex gap-6 text-[10px] md:text-xs text-slate-600 uppercase tracking-widest">
            <Link href="#" className="hover:text-[#c9a24d]">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#c9a24d]">Terms of Service</Link>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c9a24d]/10 to-transparent pointer-events-none" />
    </footer>
  );
}