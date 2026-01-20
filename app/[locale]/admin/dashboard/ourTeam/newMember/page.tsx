import { createMemberyAction } from "../(actions)/addNewMember";
import AddMemberForm from "@/components/ourTeam/AddMemberForm";
async function page() {
  

  return (
   <div className="w-full">
   <AddMemberForm  action={createMemberyAction}/>
   </div>
  );
}

export default page;
