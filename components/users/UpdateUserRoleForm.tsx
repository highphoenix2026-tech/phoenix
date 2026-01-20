"use client";
import  { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SelectorInput from "@/components/inputs/SelectorInput";
import { Role } from "@/app/server/users/services";
import Button1 from "../ui/Button1";
import Button2  from "@/components/ui/Button2";

interface Props {
  userId: string;
  userRole: string;
  action: (data: {
    userId: string;
    newRole: Role;
  }) => Promise<{ message: string; status: number }>;
}

interface FormValues {
  newRole: Role;
}

export default function UpdateRoleForm({ userId, userRole, action }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: { newRole: userRole as Role },
  });
  const onSubmit = async (values: FormValues) => {
    try {
      const result = await action({ userId, newRole: values.newRole });
      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
      }
      if (result.status === 403) {
        toast.error(result.message);
        return router.push("/");
      }
      
      toast.success(result.message);
      router.push("/admin/dashboard/users");
    } catch (error) {
      toast.error("Failed to update role.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
      <input type="hidden" name="userId" value={userId} />

      <div className="flex flex-col gap-3 ">
        <p className="text-xs lg:text-base text-black font-bold">User Role</p>
        <SelectorInput
          name="newRole"
          control={control}
          options={[
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
          label="Select Role"
        />
      </div>
      <div className="w-[90%] text-gray-600 mt-5">
        {" "}
        *Admin users have full access to the dashboard and all management
        features. Regular users have limited access to customer-facing features
        only.{" "}
      </div>
      <div className="flex flex-row gap-3 justify-end mt-8">
        <Button1 type="button"  onClick={()=>{router.push("/admin/dashboard/users")}}>Cencel</Button1>
        <Button2 type="submit"  disabled={isPending}>{isPending ? "Updating..." : "Update Role"}</Button2>
        
      </div>
    </form>
  );
}
