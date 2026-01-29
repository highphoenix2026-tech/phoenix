"use client";

import {  useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm, SubmitHandler } from "react-hook-form";
import { createContactSchema } from "./schema/emailSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {  Loader2 } from "lucide-react";

type EmailFormValues = z.infer<ReturnType<typeof createContactSchema>>;

interface Props {
  locale: "en" | "ar";
  action: (
    data: EmailFormValues,
  ) => Promise<{ success: boolean; message: string }>;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactForm({ locale, action }: Props) {
  const containerRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const isRtl = locale === "ar";
  const labelPosition = isRtl
  ? "right-0 text-right"
  : "left-0 text-left";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(createContactSchema(locale)),
   
  });

  const onSubmit: SubmitHandler<EmailFormValues> = async (data) => {
    try {
      const result = await action(data);
      if (result.success) {
        toast.success(result.message);
        router.replace("/");
        return;
      }
      toast.error(result.message);
    } catch (error) {
      toast.error(locale === "en" ? "Error sending email" : "خطأ في إرسال البريد");
    }
  };

  // Translations for labels
  const form = {
    name: isRtl ? "الاسم" : "Name",
    subject: isRtl ? "الموضوع" : "Subject",
    email: isRtl ? "البريد الإلكتروني" : "Email",
    country: isRtl ? "البلد" : "Country",
    message: isRtl ? "الرسالة" : "Message",
    submit: isRtl ? "إرسال" : "Send",
    sending: isRtl ? "جاري الإرسال..." : "Sending...",
    contactInfo: isRtl ? "معلومات التواصل" : "Contact Information",
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".floating-label",
        { opacity: 0, x: -10 },
        {
          opacity: 0.4,
          x: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section
      ref={containerRef}
      className="bg-[#0b1236] py-32 px-6 relative overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="absolute top-0 right-0 w-125 h-125 bg-[#c9a24d]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-20">
        {/* Left title column (kept from original) */}
        <div className="lg:w-1/3 space-y-6">
          <div className="w-12 h-1 bg-[#c9a24d]" />
          <h2 className="text-6xl font-black text-white uppercase italic leading-tight tracking-tighter" >
            {isRtl ? "اتصل" : "Contact"}
            <br />
            <span className="text-white/20">{isRtl ? "بنا" : "Us"}</span>
          </h2>
          <p className="text-slate-400 text-sm font-mono uppercase tracking-[0.3em] opacity-60">
            Secure_Input_Portal_v.4
          </p>
        </div>

        {/* Right side holds the form and contact info */}
        <div className="lg:w-2/3 space-y-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10"
          >
            {/* fields: name, subject, email (kept two-column layout) */}
            <div className="relative group">
              <span  className={`floating-label absolute -top-6 ${labelPosition} font-mono text-[9px] uppercase tracking-widest text-[#c9a24d]`} >
                {form.name}
              </span>
              <input
                {...register("name")}
                type="text"
                className={`w-full bg-transparent border-b border-white/10 py-3 text-white text-lg font-bold italic outline-none focus:border-[#c9a24d] transition-all duration-500 ${errors.name ? "border-red-400" : ""}`}
                placeholder="..."
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <p className="mt-2 text-xs text-red-400">
                  {String(errors.name.message)}
                </p>
              )}
            </div>

            <div className="relative group">
              <span className={`floating-label absolute -top-6 ${labelPosition} font-mono text-[9px] uppercase tracking-widest text-[#c9a24d]`}>
                {form.subject}
              </span>
              <input
                {...register("subject")}
                type="text"
                className={`w-full bg-transparent border-b border-white/10 py-3 text-white text-lg font-bold italic outline-none focus:border-[#c9a24d] transition-all duration-500 ${errors.subject ? "border-red-400" : ""}`}
                placeholder="..."
                aria-invalid={errors.subject ? "true" : "false"}
              />
              {errors.subject && (
                <p className="mt-2 text-xs text-red-400">
                  {String(errors.subject.message)}
                </p>
              )}
            </div>

            <div className="relative group">
              <span className={`floating-label absolute -top-6 ${labelPosition} font-mono text-[9px] uppercase tracking-widest text-[#c9a24d]`}>
                {form.email}
              </span>
              <input
                {...register("email")}
                type="email"
                className={`w-full bg-transparent border-b border-white/10 py-3 text-white text-lg font-bold italic outline-none focus:border-[#c9a24d] transition-all duration-500 ${errors.email ? "border-red-400" : ""}`}
                placeholder="..."
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p className="mt-2 text-xs text-red-400">
                  {String(errors.email.message)}
                </p>
              )}
            </div>
            <div className="md:col-span-2 relative">
              <span className={`floating-label absolute -top-6 ${labelPosition} font-mono text-[9px] uppercase tracking-widest text-[#c9a24d]`}>
                {form.message}
              </span>
              <textarea
                {...register("message")}
                name="message"
                className={`w-full bg-transparent border-b border-white/10 py-3 text-white text-lg font-bold italic outline-none focus:border-[#c9a24d] h-20 resize-none transition-all duration-500 ${errors.message ? "border-red-400" : ""}`}
                placeholder="..."
                aria-invalid={errors.message ? "true" : "false"}
              />
              {errors.message && (
                <p className="mt-2 text-xs text-red-400">{String(errors.message.message)}</p>
              )}
            </div>

            <div className="md:col-span-2 pt-10">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full py-6 bg-white overflow-hidden transition-transform active:scale-95 disabled:opacity-60"
              >
                <div className="absolute inset-0 bg-[#c9a24d] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-[#0b1236] font-black uppercase italic tracking-[0.5em] text-sm">
                  {isSubmitting ? (
                    <span className="flex flex-row justify-center gap-2 items-center">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{form.submit === "إرسال" ? form.sending ?? "جاري الإرسال..." : "Sending..."}</span>
                    </span>
                  ) : (
                    form.submit
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Contact info block — styled to fit dark theme and match the requested info content */}
          <div className="grid grid-cols-1  gap-6 text-white">
            <div className="mt-2 sm:mt-0 w-full">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-white/80 italic text-sm leading-relaxed">
                  {isRtl
                    ? "نحن نرد عادةً خلال 24 ساعة عمل. يسعدنا سماع صوتك!"
                    : "We usually respond within 24 business hours. Looking forward to hearing from you!"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
