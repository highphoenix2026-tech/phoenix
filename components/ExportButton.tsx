"use client";
import { useState } from "react";
import { Button } from "./ui/button";

interface ExportButtonProps {
  programId?: string;
  country?: string | null;
  applicationId?: string | null;
  className?: string;
}

export default function ExportButton({
  programId,
  country,
  applicationId,
  className = "",
}: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();
      if (programId) params.set("programId", programId);
      if (country) params.set("location", country);
      if (applicationId) params.set("applicationId", applicationId);

      const url = `/api/applications/export?${params.toString()}`;

      const res = await fetch(url, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error("Export failed");
      }

      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;

      // set a filename
      const fileName = `applications-${programId ?? "all"}.xlsx`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Export error", err);
      alert("Export failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={loading}
      className={`px-4 py-2 rounded-md bg-[white] text-[#397a34] hover:bg-gray-100 font-semibold shadow ${className}`}
      type="button"
    >
      {loading ? "Preparing..." : "Export to Excel"}
    </Button>
  );
}
