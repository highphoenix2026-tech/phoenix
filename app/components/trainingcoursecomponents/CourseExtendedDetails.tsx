"use client";
import { FaUsers, FaCalendarAlt, FaHourglassHalf, FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

interface Props {
    id:string;
  description: string | null;
  targetAudience: string[]; 
  startDate: Date | null;
  endDate: Date | null;
  duration: string | null; 
  locale: "ar" | "en";
}

export default function CourseExtendedDetails({ 
    id,
  description, 
  targetAudience, 
  startDate, 
  endDate, 
  duration,
  locale 
}: Props) {
  return (
    <section className="py-24 bg-white px-6 md:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div className="lg:col-span-8 space-y-12">
          <div className="relative">
            <div className="absolute -left-4 rtl:-right-4 top-0 w-1 h-full bg-[#c9a24d]" />
            <h2 className="text-sm font-mono text-[#c9a24d] uppercase tracking-[0.3em] mb-4">
              {locale === "ar" ? "01_نظرة_عامة" : "01_Overview"}
            </h2>
            <p className="text-2xl text-[#0b1236] font-medium leading-relaxed italic">
              {description || (locale === "ar" ? "لا يوجد وصف متوفر" : "No description available")}
            </p>
          </div>

        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-[#0b1236] text-white p-8">
            <div className="font-mono text-[10px] text-[#c9a24d] mb-8 border-b border-[#c9a24d]/20 pb-4">
              {locale === "ar" ? "بيانات_النظام" : "SYSTEM_METRICS"}
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <FaUsers className="text-[#c9a24d] text-xl shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                    {locale === "ar" ? "الجمهور المستهدف" : "Target Personnel"}
                  </div>
                  <div className="text-sm font-bold italic mt-1">
                    {targetAudience && targetAudience.length > 0 
                      ? targetAudience.join(" / ") 
                      : (locale === "ar" ? "متاح للجميع" : "Open Enrollment")}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <FaHourglassHalf className="text-[#c9a24d] text-xl shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                    {locale === "ar" ? "المدة المقدرة" : "Estimated Duration"}
                  </div>
                  <div className="text-sm font-bold italic mt-1">{duration || "---"}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <FaCalendarAlt className="text-[#c9a24d] text-xl shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">
                    {locale === "ar" ? "الجدول الزمني" : "Deployment Schedule"}
                  </div>
                  <div className="text-sm font-bold italic mt-1">
                    {startDate ? new Date(startDate).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US") : "TBD"}
                  </div>
                </div>
              </div>
            </div>
<Link href={`/application-form/${id}`}>
            <button className="w-full mt-12 bg-[#c9a24d] text-[#0b1236] py-4 font-[1000] uppercase italic text-xs tracking-[0.2em] hover:bg-white transition-all shadow-[6px_6px_0px_#ffffff20]">
              {locale === "ar" ? "تقديم طلب التحاق" : "Apply for Admission"}
            </button>
             </Link>
          </div>
        </div>

      </div>
    </section>
  );
}