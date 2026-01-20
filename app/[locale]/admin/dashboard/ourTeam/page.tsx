
import { MemberColumns } from "@/components/columns/members-columns";
import { DataTable } from "@/components/data-table";
import { deleteMemberAction } from "./(actions)/deleteMember";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllMembers } from "@/app/server/ourTeam/services";
import SortMemberButton from "@/components/SortMemberButton";

export default async function MemberTable() {
  const allMembers = (await getAllMembers()).data || [];

  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Members</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Members.
        </h2>
      </div>

      {/* Conditional rendering */}
      {allMembers.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Members Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Member Yet.
            </p>
            <NavigationButton
              routeName="newMember"
              value="Add New Member"
              className="mb-10"
              
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={MemberColumns}
            data={allMembers}
            routeName="ourTeam"
            deleteAction={deleteMemberAction}
          />
         <div className="flex flex-col md:flex-row w-full justify-center gap-4 mb-10 mt-12 md:mt-7 ">
           <NavigationButton
            routeName="newMember"
            value="Add New Member"
          />
          <SortMemberButton
            routeName="sortMember"
            value="Sort Member"
          />
         </div>

        </>
      )}
    </main>
  );
}


