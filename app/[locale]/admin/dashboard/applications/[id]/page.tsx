import { getAllApplicationsByFilters } from "@/app/server/applications/services";
import { deleteApplicationAction } from "../(actions)/deleteApplication";
import { ApplicationColumns } from "@/components/columns/application-columns";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getCourseNameAndIdById } from "@/app/server/courses/services";
import ApplicationsFilter from "@/components/applications/ApplicationsFilter";
import { ApplicationsDataTable } from "@/components/ApplicationsDataTable";
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{
    courseId?: string | null;
    applicationId?: string | null;
    country?: string | null;
    sponsorshipType: "self_funded" | "sponsored_by_international_organization";
    page?: number;
  }>;
  params: Promise<{ id: string }>;
}

async function Page({ params, searchParams }: Props) {
  const id = (await params).id;
  const searchParamsData = await searchParams;
  const page = Number(searchParamsData.page ?? 1);

  const filters = {
    programId: id,
    country: searchParamsData.country ?? null,
    applicationId: searchParamsData.applicationId ?? null,
    sponsorshipType: searchParamsData.sponsorshipType ?? null,
  };

  const courseResult = await getCourseNameAndIdById(id);

  if (!courseResult || !courseResult.data) {
    notFound();
  }

  const courseDetails = courseResult.data;
  const filteredData = await getAllApplicationsByFilters(page, filters);

  return (
    <div className="flex flex-col justify-start items-start ml-5 md:ml-7 w-[88vw] md:w-[68vw] xl:w-[80vw]">
      <h1 className="text-2xl font-semibold mb-4 border-b p-1 w-full">
        Applications On {courseDetails.course_title_en}
      </h1>

      <ApplicationsFilter
        initialCountry={searchParamsData.country ?? ""}
        initialSponsorshipType={searchParamsData.sponsorshipType}
      />

      <div className="mt-4 mb-4 flex items-center gap-3"></div>

      {filteredData.data.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Applications Found
            </h3>
          </CardContent>
        </Card>
      ) : (
        <ApplicationsDataTable
          columns={ApplicationColumns}
          data={filteredData.data}
          routeName="applicationById"
          deleteAction={deleteApplicationAction}
          totalPages={filteredData.totalPages}
          programId={id}
          country={searchParamsData.country??null}
          applicationId={searchParamsData.applicationId ?? null}
        />
      )}
    </div>
  );
}

export default Page;
