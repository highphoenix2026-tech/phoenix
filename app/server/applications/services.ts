import prisma from "@/lib/prisma";
import { NewApplicationForm } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";

export const addNewApplcation = async (data: NewApplicationForm) => {
  try {
    await prisma.applications.create({ data });
    revalidateTag("courses", "max");
    revalidateTag("applications", "max");
    return {
      success: true,
      message: "Application submitted successfully",
      status: 201,
    };
  } catch (error) {
    console.log("error in: ", error);

    return {
      success: false,
      message: "Error In Submitting The Application",
      status: 500,
    };
  }
};

export const getAllApplication = async (pageNumber: number) =>
  unstable_cache(
    async () => {
      const pageSize = 10;
      const skip = (pageNumber - 1) * pageSize;
      const take = 10;

      try {
        const [result, total] = await Promise.all([
          prisma.applications.findMany({
            skip,
            take,
            orderBy: { created_at: "desc" },
          }),
          prisma.applications.count(),
        ]);

        return {
          totalPages: Math.ceil(total / pageSize),
          data: result,
          message: "All Applications",
          status: 200,
        };
      } catch (error) {
        return {
          data: [],
          message: "Error In Getting The Applications",
          status: 500,
        };
      }
    },
    [`all-applications-by-pageNumber-${pageNumber}`],
    { tags: ["applications"], revalidate: 3600 },
  )();

export const deleteApplicationById = async (id: string) => {
  try {
    const existing = await prisma.applications.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!existing) {
      return {
        success: false,
        message: "Application not found",
        status: 409,
      };
    }

    await prisma.applications.delete({
      where: { id },
    });

    revalidateTag("applications", "max");

    return {
      success: true,
      message: "Application deleted successfully",
      status: 201,
    };
  } catch (error) {
    console.error("Delete application error:", error);

    return {
      success: false,
      message: "Error deleting application",
      status: 500,
    };
  }
};

export const getApplicationById = (id: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.applications.findUnique({
          where: { id },
          include: { courses: true },
        });

        if (!result) {
          return {
            data: null,
            message: "Application not found",
            status: 404,
          };
        }

        return {
          data: result,
          message: "Application fetched successfully",
          status: 200,
        };
      } catch (error) {
        console.error("getApplicationById error:", error);

        return {
          data: null,
          message: "Error fetching application",
          status: 500,
        };
      }
    },
    [`application-by-id-${id}`],
    {
      tags: ["applications"],
      revalidate: 3600,
    },
  )();

type ApplicationFilters = {
  courseId?: string | null;
  country?: string | null;
  applicationId?: string | null;
    sponsorshipType: "Self-funded"| "Sponsored by International Organization";

};

const DEFAULT_PAGE_SIZE = 10;

type ApplicationsWhereInput = NonNullable<
  Parameters<typeof prisma.applications.findMany>[0]
>["where"];

export const getAllApplicationsByFilters = (
  pageNumber = 1,
  filters?: ApplicationFilters,
  pageSize = DEFAULT_PAGE_SIZE,
) =>
  unstable_cache(
    async () => {
      const page = Math.max(1, Number(pageNumber) || 1);
      const skip = (page - 1) * pageSize;

      // Use the correct Prisma type
      const where: ApplicationsWhereInput = {};

       if (filters?.sponsorshipType) {
        where.sponsorship_type = filters.sponsorshipType;
      }

      if (filters?.courseId) {
        where.course_id = filters.courseId;
      }

      if (filters?.applicationId) {
        where.id = filters.applicationId;
      }

      if (filters?.country) {
        where.country = { contains: filters.country, mode: "insensitive" };
      }
      try {
        const [data, total] = await Promise.all([
          prisma.applications.findMany({
            where,
            skip,
            take: pageSize,
            orderBy: { created_at: "desc" },
            include: { courses: { select: { course_title_en: true } } },
          }),
          prisma.applications.count({ where }),
        ]);
        return {
          data,
          total,
          totalPages: Math.ceil(total / pageSize),
          message: "Applications fetched",
          status: 200,
        };
      } catch (error) {
        console.error("getAllApplications error:", error);
        return {
          data: [],
          total: 0,
          totalPages: 0,
          message: "Error fetching applications",
          status: 500,
        };
      }
    },
    [
      `applications-page-${pageNumber}-ps-${pageSize}-f-${JSON.stringify(
        filters ?? {},
      )}`,
    ],
    { tags: ["applications"], revalidate: 60 },
  )();
