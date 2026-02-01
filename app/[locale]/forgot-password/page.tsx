"use client";
import React, { useState } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "./(actions)/forgotPasswordAction";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import EmailInput from "@/components/inputs/EmailInput";
import { Mail, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";

type FormData = {
  email: string;
};

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const result = await forgotPasswordAction(data.email);

      if (result.status === 201 || result.status === 409) {
        setSuccess(true);
        toast.success(result.message, {
          style: { border: '1px solid #c9a24d', background: '#0b1236', color: '#fff' }
        });
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("An error occurred while sending the link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center  bg-slate-50 px-4">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-[#c9a24d]/10 rounded-full blur-3xl" />

        <form
          className="relative bg-white shadow-2xl shadow-slate-200 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 overflow-hidden"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg transition-colors duration-500 ${success ? 'bg-green-50 text-green-600' : 'bg-[#0b1236] text-[#c9a24d] shadow-[#0b1236]/20'}`}>
              {success ? <CheckCircle2 size={32} /> : <Mail size={32} strokeWidth={1.5} />}
            </div>
            
            <h1 className="text-2xl font-extrabold text-[#0b1236] tracking-tight">
              {success ? "Check Your Email" : "Reset Password"}
            </h1>
            <p className="text-slate-500 mt-2 font-medium leading-relaxed">
              {success 
                ? "We've sent a recovery link to your inbox. Please follow the instructions." 
                : "Enter your email address and we'll send you a link to reset your password."}
            </p>
            {!success && <div className="w-12 h-1 bg-[#c9a24d] mx-auto mt-4 rounded-full" />}
          </div>

          {!success && (
            <div className="space-y-6">
              <EmailInput
                label="Registered Email Address"
                register={register("email", {
                  required: "Email is required",
                })}
                error={errors.email}
              />

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center gap-3 bg-[#0b1236] text-white py-4 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:bg-[#121b4a] active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-[#0b1236]/20"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={22} />
                ) : (
                  <span className="relative z-10 text-[#c9a24d]">Send Reset Link</span>
                )}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              </button>
            </div>
          )}

          {success && (
            <button 
              onClick={() => setSuccess(false)}
              className="w-full py-3 text-sm font-bold text-[#0b1236] hover:bg-slate-50 rounded-xl transition-colors"
            >
              Didn't get the email? Try again
            </button>
          )}

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

export default Page;