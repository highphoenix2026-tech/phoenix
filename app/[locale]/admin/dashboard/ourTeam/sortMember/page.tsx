import OurTeamManager from "@/components/ourTeam/OurTeamManager";
import {  getMemberNameIdAndImage } from "@/app/server/ourTeam/services";

export default async function OurTeamPage() {
  const initialMembers = await getMemberNameIdAndImage();


  return <OurTeamManager initialMembers={initialMembers.data} />;
}
