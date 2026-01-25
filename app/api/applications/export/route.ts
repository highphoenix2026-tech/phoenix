import { NextRequest } from "next/server";
import ExcelJS from "exceljs";
import { getAllApplicationsByFilters } from "@/app/server/applications/services";

type Filters = {
  courseId?: string | null;
  country?: string | null;
  sponsorshipType: "self_funded" | "sponsored_by_international_organization";
  applicationId?: string | null;
};

type applicationDetails = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  sponsorship_type: "self_funded" | "sponsored_by_international_organization";
  country: string;
  course_id: string | null;
  created_at: string | Date | null;
  courses: { course_title_en: string } | null;
};

function formatHumanDateTime(value?: string | Date | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  // Human friendly with day/month name and time in Asia/Amman timezone
  // Example output: "29 Dec 2025, 14:05"
  try {
    return new Intl.DateTimeFormat("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Amman",
    }).format(d);
  } catch {
    // Fallback
    return d.toLocaleString();
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;

    const filters: Filters = {
      courseId: params.get("courseId") ?? undefined,
      country: params.get("country") ?? undefined,
      sponsorshipType: params.get("sponsorshipType") as "self_funded" | "sponsored_by_international_organization" ,
      applicationId: params.get("applicationId") ?? undefined,
    };

    // collect all pages
    const allRows: applicationDetails[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const res = await getAllApplicationsByFilters(page, {
        courseId: filters.courseId ?? null,
        country: filters.country ?? null,
        sponsorshipType: filters.sponsorshipType,
        applicationId: filters.applicationId ?? null,
      });

      const data = res.data ?? [];
      totalPages = res.totalPages ?? 1;
      allRows.push(...data);
      page++;
    } while (page <= totalPages);

    // build workbook
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Applications");

    // define columns (customize fields to match your application object)
    sheet.columns = [
      { header: "Application ID", key: "applicationId", width: 40 },
      { header: "First Name", key: "firstName", width: 30 },
      { header: "Last Name", key: "lastName", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Phone Number", key: "phone", width: 18 },
      { header: "Country", key: "country", width: 20 },
      { header: "Course Name", key: "courseName", width: 30 },
      { header: "Submitted At", key: "createdAt", width: 25 },
    ];

    // normalize each application into the columns above
    for (const app of allRows) {
      sheet.addRow({
        applicationId: app.id ?? "",
        firstName: app?.first_name ?? "",
        lastName: app?.last_name ?? "",
        email: app?.email ?? "",
        phone: app.phone_number ?? "",
        country: app.country ?? "",
        // created_at human friendly (Asia/Amman) e.g. "29 Dec 2025, 14:05"
        createdAt: formatHumanDateTime(app.created_at),
        courseName: app.courses?.course_title_en

      });
    }

    // optional: make header bold
    sheet.getRow(1).font = { bold: true };

    // generate buffer
    const buffer = await workbook.xlsx.writeBuffer();
    const bufferNode = Buffer.from(buffer as ArrayBuffer);

    const safeProgram = (filters.courseId ?? "all").replace(
      /[^a-z0-9-_]/gi,
      "_",
    );
    const fileName = `applications-${safeProgram}.xlsx`;

    return new Response(bufferNode, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (err: any) {
    // better console logging for debugging
    console.error("Export to Excel failed:", {
      message: err?.message ?? err,
      stack: err?.stack ?? null,
    });

    // return JSON with helpful error message (useful for frontend)
    const body = {
      error: "ExportToExcelFailed",
      message: err?.message ?? "Unknown error during Excel export",
    };
    return new Response(JSON.stringify(body), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
