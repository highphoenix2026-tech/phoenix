"use server";

import { generateToken } from "@/app/server/reset_password_token/services";
import { Resend } from "resend";

const resendEmail = new Resend(process.env.RESEND_API_KEY);

export const forgotPasswordAction = async (email: string) => {
  try {
    const token = await generateToken(email);
    if (token === null)
      return {
        message: "If that email exists, we sent a reset link.",
        status: 409,
      };

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await resendEmail.emails.send({
      from: process.env.Email_from || "onboarding@resend.dev",
      to: email,
      subject: "Reset Password Email",
      html: `<p> Click <a href="${resetUrl}">here<a/> to reset your password. Link expires in 1 hour</p>`,
    });

    return {
      message: "If that email exists, we sent a reset link.",
      status: 201,
    };
  } catch (error) {
    return {
      message: "Error sending the email",
      status: 500,
    };
  }
};
