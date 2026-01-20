"use client";

import TrainingHero from "@/app/components/trainingcomponents/TrainingHero";
import InstitutionalTrainingSection from "@/app/components/trainingcomponents/InstitutionalTrainingSection";
import TrainingDeliverySection from "@/app/components/trainingcomponents/TrainingDeliverySection";
import TrainingDomainsSection from "@/app/components/trainingcomponents/TrainingDomainsSection";
import TrainingCatalogueSection from "@/app/components/trainingcomponents/TrainingCatalogueSection";
import TrainingOutcomesSection from "@/app/components/trainingcomponents/TrainingOutcomesSection";

export default function TrainingPage() {
  return (
    <main className="bg-[#f1f3f5] text-slate-800">
      <TrainingHero />
      <InstitutionalTrainingSection />
      <TrainingDeliverySection />
      <TrainingDomainsSection />
      <TrainingCatalogueSection />
      <TrainingOutcomesSection />
    </main>
  );
}
