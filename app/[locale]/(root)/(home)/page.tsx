import HeroSection from "@/app/components/homecomponents/HeroSection";
import FounderSection from "@/app/components/homecomponents/FounderSection";
import AboutSection from "@/app/components/homecomponents/AboutSection";
import PrimaryFocusSection from "@/app/components/homecomponents/PrimaryFocusSection";
import WhyUsSection from "@/app/components/homecomponents/WhyUsSection";
import TrustedAuthoritySection from "@/app/components/homecomponents/TrustedAuthoritySection";
import WhoWeWorkWithSection from "@/app/components/homecomponents/WhoWeWorkWithSection";
import SafetySection from "@/app/components/homecomponents/SafetySection";
import EngageSection from "@/app/components/homecomponents/EngageSection";

export default async function Home() {
  return (
    <main className="bg-[#f1f3f5] text-slate-800  mt-20 ">
      <HeroSection />
      <FounderSection />

      <AboutSection />
      <PrimaryFocusSection />
      <WhyUsSection />

      <WhoWeWorkWithSection />
            <TrustedAuthoritySection />


      <SafetySection />
      <EngageSection />
    </main>
  );
}
