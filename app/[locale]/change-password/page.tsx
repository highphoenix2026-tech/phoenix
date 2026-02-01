"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { changePasswordAction } from "./(actions)/changePasswordAction";
import { resetPasswordSchema } from "@/app/server/reset_password_token/validators";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import PasswordInput from "@/components/inputs/PasswordInput";
import { ShieldCheck, Loader2, ArrowLeft } from "lucide-react";

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
      
      // Note: Usually handled by Zod, but kept for logic consistency
      if (data.newPassword !== data.confirmPassword) {
        return toast.error("Passwords Do Not Match");
      }

      if (result.status === 201) {
        toast.success(result.message, {
          style: { border: '1px solid #c9a24d', background: '#0b1236', color: '#fff' }
        });
        router.push("/");
        return;
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#c9a24d]/10 rounded-full blur-3xl" />
        
        <form
          className="relative bg-white shadow-2xl shadow-slate-200 p-8 md:p-10 rounded-[2.5rem] border border-slate-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0b1236] text-[#c9a24d] mb-4 shadow-lg shadow-[#0b1236]/20">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-extrabold text-[#0b1236] tracking-tight">
              Security Settings
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Update your account password</p>
            <div className="w-12 h-1 bg-[#c9a24d] mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-5">
            <PasswordInput
              label="Current Password"
              register={register("oldPassword")}
              error={errors.oldPassword}
              className="text-gray-700"
            />
            
            <div className="h-px bg-slate-100 my-2 w-full" />

            <PasswordInput
              label="New Password"
              register={register("newPassword")}
              error={errors.newPassword}
              className="text-gray-700"
            />
            
            <PasswordInput
              label="Confirm New Password"
              register={register("confirmPassword")}
              error={errors.confirmPassword}
              className="text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full mt-10 flex items-center justify-center gap-3 bg-[#0b1236] text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-[#121b4a] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#0b1236]/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <span className="relative z-10 text-[#c9a24d]">Update Password</span>
            )}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>

          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#0b1236] transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back To Home
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Page;