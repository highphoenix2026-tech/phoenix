
import TeamHero from "@/app/components/ourteamcomponents/TeamHero";
import FounderCard from "@/app/components/ourteamcomponents/FounderCard";
import StaffCards from "@/app/components/ourteamcomponents/StaffCards";
import {getMembersByMainAndLocale}from "@/app/server/ourTeam/services"
import {translatedMembers} from "@/types/index"





type Locale = "en" | "ar";

interface PageProps {
  params: {
    locale: Locale;
  };
}









export default async function OurTeamPage({ params }: PageProps) { 


 const { locale } = await params;

  const founderRes = await getMembersByMainAndLocale(true,locale)();

  const founderData: translatedMembers = founderRes?.data[0] || [];
  const memberRes = await getMembersByMainAndLocale(false,locale)();

  const memberData: translatedMembers[] = memberRes?.data || [];







 
  return (
    <main className="bg-[#f1f3f5] text-slate-800  mt-20">
      <TeamHero  />
      <FounderCard founderData={founderData} />
      <StaffCards   memberData={memberData} />
    </main>
  );
}
