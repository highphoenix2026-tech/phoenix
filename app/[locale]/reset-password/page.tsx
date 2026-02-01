"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { resetPasswordAction } from "./(actions)/resetPasswordAction";
import PasswordInput from "@/components/inputs/PasswordInput";
import { toast } from "sonner";
import { KeyRound, Loader2, ArrowLeft, ShieldCheck } from "lucide-react";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      toast.error("Invalid or expired token.");
      return;
    }

    try {
      const result = await resetPasswordAction(token, data.password);
      if (result.status === 201) {
        toast.success("Password updated successfully!", {
          style: { border: '1px solid #c9a24d', background: '#0b1236', color: '#fff' }
        });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <main className="h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg relative">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#c9a24d]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#0b1236]/5 rounded-full blur-3xl" />

        <form
          className="relative bg-white shadow-2xl shadow-slate-200 p-8 md:p-10 rounded-[2.5rem] border border-slate-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0b1236] text-[#c9a24d] mb-4 shadow-lg shadow-[#0b1236]/20">
              <KeyRound size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-2xl font-extrabold text-[#0b1236] tracking-tight">
              Set New Password
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Please choose a strong, unique password</p>
            <div className="w-12 h-1 bg-[#c9a24d] mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-5">
            <PasswordInput
              register={register("password")}
              error={errors.password}
              label="New Password"
              placeholder="Min. 6 characters"
            />
            
            <PasswordInput
              register={register("confirmPassword")}
              error={errors.confirmPassword}
              label="Confirm New Password"
              placeholder="Repeat your password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative w-full mt-10 flex items-center justify-center gap-3 bg-[#0b1236] text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-[#121b4a] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#0b1236]/20"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <>
                <span className="relative z-10 text-[#c9a24d]">Update Password</span>
                <ShieldCheck size={20} className="relative z-10 text-white/50" />
              </>
            )}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>

          <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#0b1236] transition-colors group"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
              Back To Login
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default ResetPasswordPage;