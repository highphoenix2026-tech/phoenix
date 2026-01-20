"use client";
import React, { useState } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "./(actions)/forgotPasswordAction";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import EmailInput from "@/components/inputs/EmailInput";
import Button2 from "@/components/ui/Button2";

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
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error(
        "An error occurred while sending the link. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center mt-28 mb-20">
      <form
        className="w-full max-w-md bg-white dark:bg-gray-300 p-8 rounded-2xl shadow-sm space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {!success && (
          <h1 className="text-2xl font-bold text-center flex flex-row justify-center text-gray-800 border-b-2 border-[#397a34] pb-3 mb-6">
            Enter Your Email
          </h1>
        )}

        {success && (
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-700">
              Check Your Email
            </h2>
            <p className="text-sm text-gray-500">
              If an account exists with that email, a password reset link has
              been sent.
            </p>
          </div>
        )}

        {!success && (
          <EmailInput
            label="Enter Your Email"
            register={register("email", {
              required: "Email is required",
            })}
            error={errors.email}
          />
        )}

        

        {!success && (
        <Button2 type="submit" className="w-full"
            disabled={loading}> {loading ? "Sending..." : "Send Reset Link"}</Button2>
        )}

        <div className="text-center pt-4">
          <Link
            href="/login"
            className="text-base flex flex-row justify-center text-[#397a34] hover:underline font-medium"
          >
            Back To Login
          </Link>
        </div>
      </form>
    </main>
  );
}

export default Page;
