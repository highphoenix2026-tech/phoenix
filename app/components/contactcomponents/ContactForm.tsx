"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { contactData } from "@/app/data/contactData";

export default function ContactForm() {
  const locale = useLocale() as "en" | "ar";
  const { form } = contactData[locale];

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    role: "",
    email: "",
    country: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Enquiry submitted!");
  };

  return (
    <section className="py-28 px-6 md:px-24 bg-white">
      <h2 className="text-3xl md:text-4xl font-extrabold centert text-[#0b1236] text-center">Get in Touch</h2>
      <div className="mt-12 max-w-3xl mx-auto bg-[#0b1236] p-12 rounded-3xl shadow-lg">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <input type="text" name="name" placeholder={form.name} value={formData.name} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#c9a24d] bg-[#0b1236] text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c9a24d]" required />
          <input type="text" name="organization" placeholder={form.organization} value={formData.organization} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#c9a24d] bg-[#0b1236] text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c9a24d]" required />
          <input type="text" name="role" placeholder={form.role} value={formData.role} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#c9a24d] bg-[#0b1236] text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c9a24d]" required />
          <input type="email" name="email" placeholder={form.email} value={formData.email} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#c9a24d] bg-[#0b1236] text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c9a24d]" required />
          <select name="country" value={formData.country} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#c9a24d] bg-[#0b1236] text-white focus:outline-none focus:ring-2 focus:ring-[#c9a24d]" required>
            <option value="">{form.country}</option>
            {form.countries.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <textarea name="message" placeholder={form.message} value={formData.message} onChange={handleChange} className="w-full p-4 rounded-xl border border-[#c9a24d] bg-[#0b1236] text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-[#c9a24d] h-40 resize-none" required></textarea>
          <button type="submit" className="w-full py-4 rounded-2xl bg-[#c9a24d] text-[#0b1236] font-extrabold tracking-wide hover:bg-[#b8933f] transition">{form.submit}</button>
        </form>
      </div>
    </section>
  );
}
