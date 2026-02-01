"use client";

import React from "react";
import Image from "next/image";
import {  Phone, ClipboardCopy,ArrowBigLeft  } from "lucide-react";
import { toast } from "sonner";
import { NewCourse } from "@/types";
import { useRouter } from "next/navigation";

type Application = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country: string;
  sponsorship_type: "self_funded" | "sponsored_by_international_organization";
  created_at: Date |null;
  courses:NewCourse |null 
};

export default function ApplicationDetailsClient({
  applicationDetails,
  
}: {
  applicationDetails: Application;
}) {
  const router= useRouter()
  const email = applicationDetails.email ?? "";
  const phone = applicationDetails.phone_number ?? "";
  const fullName = applicationDetails.first_name + applicationDetails.last_name ;
  const sponsorshipType=  applicationDetails.sponsorship_type === "self_funded"
                  ? "Self Funded"
                  : applicationDetails.sponsorship_type === "sponsored_by_international_organization"
                  ? " Sponsored By International Organization "
                  : "Program Type"

  

  function copyToClipboard(text: string, label = "Copied") {
    navigator.clipboard.writeText(text).then(() => {
      toast?.success ? toast.success(`${label}: ${text}`) : alert(`${label}: ${text}`);
    });
  }


  return (
    <div className="flex flex-col  overflow-hidden bg-gray-50">
      <header className="flex flex-col lg:flex-row items-start justify-between gap-3 lg:gap-0 lg:px-6 pb-4 px-0 bg-white shadow-md z-10 flex-none">
        <h1 className="text-lg lg:text-2xl font-semibold">{applicationDetails?.courses?.course_title_en ?? "Course"}</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => copyToClipboard(email, "Email copied")}
            className="flex items-center gap-2 px-3 py-2 bg-gray-500 border rounded-md text-sm hover:bg-gray-100 hover:text-gray-500 "
          >
            <ClipboardCopy className="w-4 h-4" /> Copy email
          </button>
          <button
            onClick={() => copyToClipboard(phone, "Phone copied")}
            className="flex items-center gap-2 px-3 py-2 bg-gray-500 border rounded-md text-sm hover:bg-gray-100 hover:text-gray-500"
          >
            <Phone className="w-4 h-4" /> Copy phone
          </button>
        </div>
      </header>

      <div className="flex flex-col xl:flex-row mt-4 overflow-auto lg:p-6 p-0 gap-6">
        <aside className="shrink-0 w-full xl:w-80">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden ">
            <div className="relative w-full h-96 bg-gray-100 flex items-center justify-center">
              {applicationDetails?.courses?.course_image ? (
                <Image src={applicationDetails?.courses?.course_image} alt={applicationDetails?.courses?.course_title_en} fill className="object-cover" />
              ) : (
                <div className="text-gray-400">No Image</div>
              )}
            </div>
            {<div className="p-2 lg:p-4">
              <p className="text-sm text-gray-500">
                {applicationDetails.courses?.course_title_en}
              </p>
            </div>}
          </div>
        </aside>

        <main className="flex-1 flex flex-col gap-4 overflow-auto">
          <div className="bg-white lg:p-6 p-2 rounded-xl shadow-sm flex flex-col gap-4">
            <h2 className="text-xl font-semibold">{fullName}</h2>
            <p className="text-gray-500 text-sm">Applied to: {applicationDetails.courses?.course_title_en ?? "-"}</p>
            <p className="text-gray-400 text-xs">
              Submitted: {applicationDetails.created_at ? new Date(String(applicationDetails.created_at)).toLocaleString() : "-"}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
              <DetailRow label="Email" value={email || "-"} />
              <DetailRow label="Phone" value={phone || "-"} />
              <DetailRow label="Location" value={applicationDetails.country || "-"} />
              <DetailRow label="Application ID" value={applicationDetails.id ?? "-"} />
              <DetailRow label="Sponsorship Type" value={sponsorshipType ?? "-"}  />
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => router.back()}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-gray-500 border`}
              >
                <ArrowBigLeft className={`w-4 h-4 `} />
                Back
              </button>

              
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="min-w-27.5 text-xs text-gray-500">{label}</div>
      <div className="text-sm text-gray-800">{value}</div>
    </div>
  );
}
