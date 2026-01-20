import { getUserById } from "@/app/server/users/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateRoleForm from "@/components/users/UpdateUserRoleForm";
import { updateUserRole } from "../(actions)/updateUser";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { notFound } from "next/navigation";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const result = await getUserById(id);

  // ⛔ Prevent access with fake / invalid user ID
  if (!result || !result.data) {
    notFound();
  }

  const user = result.data;

  return (
    <main className="ml-7 mb-7">
      {/* Header */}
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[80vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Edit User</h1>
        <h2 className="text-base md:text-xl text-gray-400">
          Manage role for Admin
        </h2>
      </div>

      <div className="h-full lg:h-[85vh] w-[80vw] flex flex-col lg:flex-row gap-5">
        {/* User Info */}
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle className="text-base md:text-2xl mb-5">
              User Information
            </CardTitle>
            <CardDescription className="flex flex-row items-center gap-3 mb-7">
              <Avatar className="h-20 w-20 text-4xl">
                <AvatarFallback className="bg-black text-white font-semibold">
                  {user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-base md:text-lg capitalize text-black font-bold">
                  {user.first_name}
                </p>
                <p className="text-base md:text-lg">{user.email}</p>
                <p
                  className={`text-base md:text-lg uppercase ${
                    user.role === "admin"
                      ? "text-[#8B0000]"
                      : "text-gray-800"
                  }`}
                >
                  {user.role}
                </p>
              </div>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base md:text-2xl mb-5 font-bold">
              Account Details
            </p>

            <div className="flex flex-col lg:flex-row lg:gap-40 gap-4 mb-12">
              <div>
                <p className="text-base text-gray-600">Full Name</p>
                <p className="text-base">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div>
                <p className="text-base text-gray-600">Email</p>
                <p className="text-base">{user.email}</p>
              </div>
            </div>

            <div>
              <p className="text-xs lg:text-base text-gray-600">User ID</p>
              <p className="text-base">{user.id}</p>
            </div>
          </CardContent>
        </Card>

        {/* Edit Role */}
        <Card className="w-full h-full">
          <CardHeader>
            <CardTitle className="text-base md:text-2xl mb-2">
              Edit User Role
            </CardTitle>
            <CardDescription className="flex flex-col gap-3 mb-3">
              <p className="text-xs lg:text-base mb-5">
                Update the role for {user.first_name}. This will affect their
                permissions within the system.
              </p>

              <UpdateRoleForm
                userId={user.id}
                userRole={user.role}
                action={updateUserRole}
              />
            </CardDescription>
          </CardHeader>
          <CardContent />
        </Card>
      </div>
    </main>
  );
}

export default Page;
