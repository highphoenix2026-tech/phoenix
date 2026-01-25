"use client";

import { useState, useRef } from "react";
import { useLocale } from "next-intl";
import { contactData } from "@/app/data/contactData";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactForm() {
  const locale = useLocale() as "en" | "ar";
  const { form } = contactData[locale];
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "", organization: "", role: "", email: "", country: "", message: ""
  });

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".floating-label", 
        { opacity: 0, x: -10 }, 
        { opacity: 0.4, x: 0, stagger: 0.1, scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section ref={containerRef} className="bg-[#0b1236] py-32 px-6 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a24d]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">
        
        <div className="lg:w-1/3 space-y-6">
          <div className="w-12 h-1 bg-[#c9a24d]" />
          <h2 className="text-6xl font-black text-white uppercase italic leading-tight tracking-tighter">
            {locale === "ar" ? "قمرة" : "Command"}<br/>
            <span className="text-white/20">{locale === "ar" ? "القيادة" : "Center"}</span>
          </h2>
          <p className="text-slate-400 text-sm font-mono uppercase tracking-[0.3em] opacity-60">
            Secure_Input_Portal_v.4
          </p>
        </div>

        <div className="lg:w-2/3 space-y-12">
          <form onSubmit={(e) => { e.preventDefault(); alert("Transmitted"); }} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            
            {[
              { id: 'name', label: form.name, type: 'text' },
              { id: 'organization', label: form.organization, type: 'text' },
              { id: 'role', label: form.role, type: 'text' },
              { id: 'email', label: form.email, type: 'email' }
            ].map((field) => (
              <div key={field.id} className="relative group">
                <span className="floating-label absolute -top-6 left-0 font-mono text-[9px] uppercase tracking-widest text-[#c9a24d]">
                  {field.label}
                </span>
                <input 
                  type={field.type}
                  name={field.id}
                  value={formData[field.id]}
                  onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white text-lg font-bold italic outline-none focus:border-[#c9a24d] transition-all duration-500"
                  placeholder="..."
                />
              </div>
            ))}

            <div className="md:col-span-2 relative">
               <span className="floating-label absolute -top-6 left-0 font-mono text-[9px] uppercase tracking-widest text-[#c9a24d]">
                  {form.country}
                </span>
              <select 
                name="country" 
                className="w-full bg-transparent border-b border-white/10 py-3 text-white/40 focus:text-white text-lg font-bold italic outline-none focus:border-[#c9a24d] appearance-none"
                onChange={(e) => setFormData({...formData, country: e.target.value})}
              >
                <option value="" className="bg-[#0b1236]">{form.country}</option>
                {form.countries.map((c) => <option key={c.value} value={c.value} className="bg-[#0b1236]">{c.label}</option>)}
              </select>
            </div>

            <div className="md:col-span-2 relative">
               <span className="floating-label absolute -top-6 left-0 font-mono text-[9px] uppercase tracking-widest text-[#c9a24d]">
                  {form.message}
                </span>
              <textarea 
                name="message"
                className="w-full bg-transparent border-b border-white/10 py-3 text-white text-lg font-bold italic outline-none focus:border-[#c9a24d] h-20 resize-none transition-all duration-500"
                placeholder="..."
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="md:col-span-2 pt-10">
              <button className="group relative w-full py-6 bg-white overflow-hidden transition-transform active:scale-95">
                <div className="absolute inset-0 bg-[#c9a24d] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-[#0b1236] font-black uppercase italic tracking-[0.5em] text-sm">
                  {form.submit}
                </span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}