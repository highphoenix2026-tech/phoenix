
import { getAllBanners } from "@/app/server/banners/services";
import { BannerColumns } from "@/components/columns/banner-columns";
import { DataTable } from "@/components/data-table";
import { deleteBannerAction } from "./(actions)/deleteBanner";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";

export default async function BannerTable() {
  const allBanners = (await getAllBanners()).data || [];

  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Banners</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Banners.
        </h2>
      </div>

      {allBanners.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Banners Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Banner Yet.
            </p>
            <NavigationButton
              routeName="newBanner"
              value="Add New Banner"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={BannerColumns}
            data={allBanners}
            routeName="banner"
            deleteAction={deleteBannerAction}
          />
          <NavigationButton
            routeName="newBanner"
            value="Add New Banner"
          />
        </>
      )}
    </main>
  );
}


