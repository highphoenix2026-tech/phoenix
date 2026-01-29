"use client";
import { FaUsers, FaCalendarAlt, FaBullseye, FaLayerGroup } from "react-icons/fa";

interface Props {
  description: string | null;
  targetAudience: string [];
  startDate: Date | null;
  endDate: Date | null;
  locale: "ar" | "en";
}

export default function CourseExtendedDetails({ description, targetAudience, startDate, endDate, locale }: Props) {
  return (
    <section className="py-24 bg-white px-6 md:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* الوصف المطول - يأخذ مساحة أكبر */}
        <div className="lg:col-span-8 space-y-12">
          <div className="relative">
            <div className="absolute -left-4 rtl:-right-4 top-0 w-1 h-full bg-[#c9a24d]" />
            <h2 className="text-sm font-mono text-[#c9a24d] uppercase tracking-[0.3em] mb-4">01_Overview</h2>
            <p className="text-2xl text-[#0b1236] font-medium leading-relaxed italic">
              {description}
            </p>
          </div>

          {/* محاكاة لداتا حقيقية إضافية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="p-6 bg-slate-50 border border-slate-100">
              <FaBullseye className="text-[#c9a24d] mb-4 text-xl" />
              <h4 className="font-black uppercase italic text-sm mb-2 text-[#0b1236]">Core Objectives</h4>
              <ul className="text-xs text-slate-500 space-y-2 font-medium">
                <li>• Advanced Strategic Implementation</li>
                <li>• Tactical Risk Management</li>
                <li>• Operational Leadership Excellence</li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100">
              <FaLayerGroup className="text-[#c9a24d] mb-4 text-xl" />
              <h4 className="font-black uppercase italic text-sm mb-2 text-[#0b1236]">Prerequisites</h4>
              <p className="text-xs text-slate-500 leading-loose">
                Basic understanding of organizational structure and minimum 2 years of field experience.
              </p>
            </div>
          </div>
        </div>

        {/* الجانب التقني (Sidebar) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-[#0b1236] text-white p-8">
            <div className="font-mono text-[10px] text-[#c9a24d] mb-8 border-b border-[#c9a24d]/20 pb-4">
              METRICS_&_TIMELINE
            </div>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <FaUsers className="text-[#c9a24d] text-xl shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Target Personnel</div>
                  <div className="text-sm font-bold italic mt-1">{targetAudience}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <FaCalendarAlt className="text-[#c9a24d] text-xl shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">Deployment Schedule</div>
                  <div className="text-sm font-bold italic mt-1">
                    {startDate ? new Date(startDate).toLocaleDateString() : "TBD"}
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full mt-12 bg-[#c9a24d] text-[#0b1236] py-4 font-[1000] uppercase italic text-xs tracking-[0.2em] hover:bg-white transition-colors shadow-[6px_6px_0px_#ffffff20]">
              {locale === "ar" ? "تقديم طلب التحاق" : "Apply for Admission"}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}