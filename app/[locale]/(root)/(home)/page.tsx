

import HeroSection from "@/app/components/homecomponents/HeroSection";
import FounderSection from "@/app/components/homecomponents/FounderSection";
import PrimaryFocusSection from "@/app/components/homecomponents/PrimaryFocusSection";
import TrustedAuthoritySection from "@/app/components/homecomponents/TrustedAuthoritySection";
import WhyUsSection from "@/app/components/homecomponents/WhyUsSection";
import WhoWeWorkWithSection from "@/app/components/homecomponents/WhoWeWorkWithSection";
import AboutSection from "@/app/components/homecomponents/AboutSection";
import SafetySection from "@/app/components/homecomponents/SafetySection";
import EngageSection from "@/app/components/homecomponents/EngageSection";



 
export default async function Home(){
  return (
    <main className="bg-[#f1f3f5] text-slate-800">
      <HeroSection  />
      <FounderSection  />
      <PrimaryFocusSection />
      <TrustedAuthoritySection />
      <WhyUsSection  />
      <WhoWeWorkWithSection  />
      <AboutSection />
      <SafetySection />
      <EngageSection  />
    </main>
  );
}
