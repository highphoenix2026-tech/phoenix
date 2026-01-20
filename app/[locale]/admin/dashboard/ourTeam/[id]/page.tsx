// app/(somewhere)/[id]/page.tsx
import EditMemberForm from "@/components/ourTeam/EditMemberForm";
import { editMemberAction } from "../(actions)/editMember";
import { getMemberById } from "@/app/server/ourTeam/services";
import { notFound } from "next/navigation";

type Props = { params:Promise< { id: string }> };

export default async function Page({ params }: Props) {
  const id= (await params).id
  const member = await getMemberById(id);
   console.log("member: ",member);
   
  if (!member?.data || member.status !== 200) {
    notFound();
  }

  return <EditMemberForm member={member.data} action={editMemberAction} />;
}
