import { getBannerById } from "@/app/server/banners/services";
import EditBannerForm from "@/components/banner/EditBannerForm";
import { updateBannerAction } from "../(actions)/updateBanner";
import { notFound } from "next/navigation";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const banner = (await getBannerById(id));

  if (!banner || !banner.data) {
    notFound();
  }

  return (
    <EditBannerForm
      banner={banner.data}
      action={updateBannerAction}
    />
  );
}

export default Page;
