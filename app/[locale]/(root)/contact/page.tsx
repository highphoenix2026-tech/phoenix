"use client";

import HeroSection from "@/app/components/contactcomponents/HeroSection";
import EngagementSection from "@/app/components/contactcomponents/EngagementSection";
import ContactForm from "@/app/components/contactcomponents/ContactForm";
import ProfessionalNotice from "@/app/components/contactcomponents/ProfessionalNotice";

export default function ContactPage() {
  return (
    <main className="bg-[#f1f3f5] text-slate-800  mt-20">
      <HeroSection />
      <EngagementSection />
      <ContactForm />
      <ProfessionalNotice />
    </main>
  );
}
