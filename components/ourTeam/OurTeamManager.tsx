"use client";
import MemberReorder, { Member } from "./MemberReorder";
import { MemberOrder } from "@/types";
import { reorderMemberyAction } from "@/app/[locale]/admin/dashboard/ourTeam/(actions)/reorderMember";

export default function OurTeamManager({ initialMembers }: { initialMembers: Member[] }) {
  // client wrapper: must return the promise
  const handleReorder = (order: MemberOrder[]) => {
  // MUST return the promise so the component can await it
  return reorderMemberyAction(order);
};

  return <MemberReorder initialMembers={initialMembers} action={handleReorder} />;
}
