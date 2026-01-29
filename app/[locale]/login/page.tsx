"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from "@/app/server/users/validators";
import { toast } from "sonner";
import PasswordInput from "@/components/inputs/PasswordInput";
import EmailInput from "@/components/inputs/EmailInput";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react"; // Added for premium feel

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result?.ok) {
        toast.success("Logged In Successfully", {
          style: { border: '1px solid #c9a24d', background: '#0b1236', color: '#fff' }
        });
        router.push("/admin/dashboard");
        return;
      }
      return toast.error("Invalid email or password. Please try again.");
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.ok) {
        toast.success("Logged In Successfully");
        router.push("/admin/dashboard");
        return;
      }
      return toast.error("An unexpected error occurred. Please try again.");
    } catch (error) {
      return toast.error("An unexpected error occurred.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-20">
      <div className="w-full max-w-2xl relative">
        {/* Background Decorative Blur */}
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#c9a24d]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#0b1236]/5 rounded-full blur-3xl" />

        <form
          className="relative bg-white shadow-2xl shadow-slate-200 p-8 md:p-12 rounded-[2.5rem] border border-slate-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#0b1236] text-[#c9a24d] mb-4 shadow-lg shadow-[#0b1236]/20">
              <LogIn size={32} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1236] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Access your aviation dashboard</p>
            <div className="w-12 h-1 bg-[#c9a24d] mx-auto mt-4 rounded-full" />
          </div>

          <div className="space-y-5">
            <EmailInput
              register={register("email")}
              label="Email Address"
              error={errors.email}
              className="text-gray-700"
            />
            
            <div className="space-y-1">
              <PasswordInput
                register={register("password")}
                label="Password"
                error={errors.password}
                className="text-gray-700"
              />
              <Link
                href="/forgot-password"
                className="inline-block text-sm font-semibold text-[#c9a24d] hover:text-[#0b1236] transition-colors ml-2"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full mt-8 flex items-center justify-center gap-3 bg-[#0b1236] text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-[#121b4a] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#0b1236]/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <span className="relative z-10">Login to Account</span>
            )}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="h-[1px] flex-1 bg-slate-100"></div>
            <span className="mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
            <div className="h-[1px] flex-1 bg-slate-100"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            className="w-full flex justify-center items-center gap-3 px-5 py-4 text-slate-700 font-bold border-2 border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98]"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="w-6 h-6" />
            Sign in with Google
          </button>

          {/* Footer Link */}
          <p className="mt-10 text-center text-slate-500 font-medium">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-[#0b1236] font-bold underline-offset-4 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Login;