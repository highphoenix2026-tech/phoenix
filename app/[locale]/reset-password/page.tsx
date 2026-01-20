"use client";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { resetPasswordAction } from "./(actions)/resetPasswordAction";
import PasswordInput from "@/components/inputs/PasswordInput";
import { toast } from "sonner";
import Button2 from "@/components/ui/Button2";

// Validation schema
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
        toast.success(
          "Password updated successfully. Redirecting to Login Page..."
        );
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <main>
      <form
        className="max-w-lg mx-auto shadow-lg shadow-slate-500/50 p-7 rounded-lg bg-white mt-28 mb-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl flex flex-row justify-center border-b-2 border-[#397a34]  mb-4 pb-2">
          Reset Your Password
        </h1>

        {/* Password */}
        <PasswordInput
          register={register("password")}
          error={errors.password}
          label="Password"
        />
        {/* Confirm Password */}
        <PasswordInput
          register={register("confirmPassword")}
          error={errors.confirmPassword}
          label="Confirm Password"
        />
        {/* Submit */}
        <Button2 disabled={isSubmitting}
        className="w-full px-5 py-2.5"
          type="submit">
{isSubmitting ? "Resetting..." : "Reset"}
        </Button2>
       

        {/* Back Link */}
        <Link
          href="/login"
          className="flex flex-row pt-4 text-center justify-center text-sm text-[#397a34] underline-offset-4 hover:underline m-2"
        >
          Back To Login
        </Link>
      </form>
    </main>
  );
}

export default ResetPasswordPage;
