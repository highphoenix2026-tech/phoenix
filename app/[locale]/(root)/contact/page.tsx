
import HeroSection from "@/app/components/contactcomponents/HeroSection";
import EngagementSection from "@/app/components/contactcomponents/EngagementSection";
import ContactForm from "@/app/components/contactcomponents/ContactForm";
import ProfessionalNotice from "@/app/components/contactcomponents/ProfessionalNotice";
import { sendEmailAction } from "./(actions)/sendEmailAction";





type Locale = "en" | "ar";

interface PageProps {
  params: {
    locale: Locale;
  };
}



export default async function ContactPage({ params }: PageProps) {
      const { locale } =await params;
  return (
    <main className="bg-[#f1f3f5] text-slate-800  mt-20">
      <HeroSection />
      <EngagementSection />
      <ContactForm  locale={locale} action={sendEmailAction}/>
      <ProfessionalNotice />
    </main>
  );
}
