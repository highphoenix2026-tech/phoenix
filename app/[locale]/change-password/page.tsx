"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { changePasswordAction } from "./(actions)/changePasswordAction";
import { resetPasswordSchema } from "@/app/[locale]/server/reset_password_token/validators";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import PasswordInput from "@/components/inputs/PasswordInput";
import Button2 from "@/components/ui/Button2";

type ResetPasswordValue = z.infer<typeof resetPasswordSchema>;

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValue>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const user_id = session?.user.id;

  const onSubmit: SubmitHandler<ResetPasswordValue> = async (data) => {
    setLoading(true);
    try {
      const result = await changePasswordAction(
        data.oldPassword,
        data.newPassword,
        user_id ?? ""
      );

      if (result.status !== 201) {
        return toast.error(result.message);
      }
      if (data.newPassword !== data.confirmPassword) {
        return toast.error("Passwords Not Matched");
      }

      if (result.status === 201) {
        router.push("/");
        return toast.success(result.message);
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <form
        className="max-w-lg mx-auto shadow-lg shadow-slate-500/50 p-7 rounded-lg bg-white h-1/2 sm:w-11/12 md:w-1/2 lg:w-full mt-14  "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl flex justify-center border-b-2 border-[#397a34] mb-4 pb-2">
          Change Your Password
        </h1>

        <PasswordInput
          label="Old Password"
          register={register("oldPassword")}
          error={errors.oldPassword}
        />
        <PasswordInput
          label="New Password"
          register={register("newPassword")}
          error={errors.newPassword}
        />
        <PasswordInput
          label="Confirm Password"
          register={register("confirmPassword")}
          error={errors.confirmPassword}
        />
        <div className="flex flex-col items-center justify-center">
          {" "}
          <Button2 disabled={loading} className="w-full" type="submit">
            {" "}
            {loading ? "Changing..." : "Change"}
          </Button2>
          <Link
            href="/"
            className="block pt-4 text-center text-sm text-primary underline-offset-4 hover:underline m-2"
          >
            Back To Home
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Page;
