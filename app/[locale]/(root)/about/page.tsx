import AboutHero from "@/app/components/aboutcomponents/AboutHero";
import OverviewSection from "@/app/components/aboutcomponents/OverviewSection";
import MissionVisionSection from "@/app/components/aboutcomponents/MissionVisionSection";
import ApproachSection from "@/app/components/aboutcomponents/ApproachSection";
import CoreValuesSection from "@/app/components/aboutcomponents/CoreValuesSection";
import GlobalReachSection from "@/app/components/aboutcomponents/GlobalReachSection";
import EngageSection from "@/app/components/aboutcomponents/EngageSection";

export default function AboutPage() {
  return (
    <main className="bg-[#f1f3f5] text-slate-800 mt-20">
      <AboutHero />
      <OverviewSection />
      <MissionVisionSection />
            <CoreValuesSection />

      <ApproachSection />
      <GlobalReachSection />
      <EngageSection />
    </main>
  );
}
