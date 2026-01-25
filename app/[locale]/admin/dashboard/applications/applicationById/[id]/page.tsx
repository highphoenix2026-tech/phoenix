import { getApplicationById } from "@/app/server/applications/services";
import ApplicationDetailsClient from "@/components/applications/ApplicationDetails";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const result = await getApplicationById(id);
  console.log("appl result: ",result);
  

  if (!result || !result.data) {
    notFound();
  }

  const application = result.data;

  return (
    <div className="p-6">
      <ApplicationDetailsClient applicationDetails={application} />
    </div>
  );
}
