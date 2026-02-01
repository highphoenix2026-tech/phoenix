"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { registerAction } from "./(actions)/registerAction";
import { newUserSchema } from "@/app/server/users/validators";
import TextInput from "@/components/inputs/TextInput";
import EmailInput from "@/components/inputs/EmailInput";
import { toast } from "sonner";
import PasswordInput from "@/components/inputs/PasswordInput";
import { useRouter } from "next/navigation";
import { Loader2, UserPlus, ArrowRight } from "lucide-react";
import Link from "next/link";

const clientRegisterSchema = newUserSchema;
type FormValues = z.infer<typeof clientRegisterSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const result = await registerAction(data);
      if (!result.success) {
        toast.error(result.message ?? "Registration failed");
        setLoading(false);
        return;
      }
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (signInResult?.ok) {
        toast.success("Registered Successfully", {
          style: { border: '1px solid #c9a24d', background: '#0b1236', color: '#fff' }
        });
        router.push("/");
        return;
      } else {
        return toast.error("An unexpected error occurred during login.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-2xl relative">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#c9a24d]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-[#0b1236]/5 rounded-full blur-3xl" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative bg-white shadow-2xl shadow-slate-200 p-8 md:p-10 rounded-[2.5rem] border border-slate-100"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0b1236] text-[#c9a24d] mb-4 shadow-lg shadow-[#0b1236]/20">
              <UserPlus size={28} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-extrabold text-[#0b1236] tracking-tight">
              Create Account
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Join our aviation consultancy platform</p>
            <div className="w-10 h-1 bg-[#c9a24d] mx-auto mt-3 rounded-full" />
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                register={register("first_name")}
                label="First Name"
                error={errors.first_name}
                className="text-gray-700"
              />
              <TextInput
                register={register("last_name")}
                label="Last Name"
                error={errors.last_name}
                className="text-gray-700"
              />
            </div>

            <EmailInput
              register={register("email")}
              label="Email Address"
              error={errors.email}
              className="text-gray-700"
            />

            <PasswordInput
              register={register("password")}
              label="Password"
              error={errors.password}
              className="text-gray-700"
            />

            <PasswordInput
              register={register("confirmPassword")}
              label="Confirm Password"
              error={errors.confirmPassword}
              className="text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full mt-8 flex items-center justify-center gap-3 bg-[#0b1236] text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-[#121b4a] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#0b1236]/20"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={22} />
            ) : (
              <>
                <span className="relative z-10">Create Account</span>
                <ArrowRight size={20} className="relative z-10 text-[#c9a24d]" />
              </>
            )}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </button>

          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-slate-100"></div>
            <span className="mx-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Or</span>
            <div className="h-px flex-1 bg-slate-100"></div>
          </div>

          <button
            type="button"
            className="w-full flex justify-center items-center gap-3 px-5 py-4 text-slate-700 font-bold border-2 border-slate-100 rounded-2xl hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98]"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="w-6 h-6" />
            Continue with Google
          </button>

          <p className="mt-8 text-center text-slate-500 font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#0b1236] font-bold underline-offset-4 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}