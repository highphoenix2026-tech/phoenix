"use client";

import AdvisoryHero from "@/app/components/advisorycomponents/AdvisoryHero";
import InstitutionalSection from "@/app/components/advisorycomponents/InstitutionalSection";
import DomainsSection from "@/app/components/advisorycomponents/DomainsSection";
import EngagementSection from "@/app/components/advisorycomponents/EngagementSection";
import OutcomesSection from "@/app/components/advisorycomponents/OutcomesSection";
import PartnerSection from "@/app/components/advisorycomponents/PartnerSection";

export default function AdvisoryPage() {
  return (
    <main className="bg-[#f1f3f5] text-slate-800  mt-20">
      <AdvisoryHero />
      <DomainsSection />
      <OutcomesSection />
      <InstitutionalSection />
      <EngagementSection />
      <PartnerSection />
    </main>
  );
}
