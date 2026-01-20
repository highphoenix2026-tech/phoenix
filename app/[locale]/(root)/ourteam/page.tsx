"use client";

import TeamHero from "@/app/components/ourteamcomponents/TeamHero";
import FounderCard from "@/app/components/ourteamcomponents/FounderCard";
import StaffCards from "@/app/components/ourteamcomponents/StaffCards";

export default function OurTeamPage() {
  return (
    <main className="bg-[#f1f3f5] text-slate-800">
      <TeamHero />
      <FounderCard />
      <StaffCards />
    </main>
  );
}
