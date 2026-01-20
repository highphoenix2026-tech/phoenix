import prisma from "@/lib/prisma";
import {
  type NewBanner,
  type Locale,
} from "@/types/index";
import { revalidateTag, unstable_cache } from "next/cache";

export const addNewBanner = async (data: NewBanner) => {
  try {
    const result = await prisma.banners.create({
      data: {
        name: data.name,
        image: data.image,
        description_en: data.description_en,
        description_ar: data.description_ar,
      },
    });

    revalidateTag("banners", "max");
    return {
      data: result,
      message: "Banner Added Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Adding The Banner",
      status: 500,
    };
  }
};

export const getAllBanners = unstable_cache(
  async () => {
    try {
      const result = await prisma.banners.findMany({});

      return {
        data: result,
        message: "Banners fetched successfully",
        status: 200,
      };
    } catch (error) {
      return {
        data: [],
        message: "Error fetching banners",
        status: 500,
      };
    }
  },
  ["all-banners"],
  { tags: ["banners"], revalidate: 3600 }
);

export const getBannerById = (id:string) =>{
  const cachedData=
  unstable_cache(
    async () => {
      try {
        const result = await prisma.banners.findUnique({
          where: { id },
        });

        if (!result)
          return { data: null, message: "Banner not found", status: 409 };

        return {
          data: result,
          message: "Banner fetched successfully",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error fetching banner",
          status: 500,
        };
      }
    },
    [`banner-by-id-${id}`],
    { tags: ["banners"], revalidate: 3600 }
  );
  return cachedData()
}

export const updateBanner = async (id: string, data: Partial<NewBanner>) => {
  try {
    const existing = await prisma.banners.findUnique({ where: { id } });

    if (!existing)
      return { data: null, message: "Banner not found", status: 409 };

    const result = await prisma.banners.update({
      where: { id },
      data,
    });

    revalidateTag("banners", "max");
    return {
      data: result,
      message: "Banner updated successfully",
      status: 201,
    };
  } catch (error) {
    console.log("error: ",error);
    
    return {
      data: error,
      message: "Error In updating banner",
      status: 500,
    };
  }
};

export const deleteBanner = async (id: string) => {
  try {
    const existing = await prisma.banners.findUnique({ where: { id } });

    if (!existing)
      return { data: null, message: "Banner not found", status: 409 };

    const result = await prisma.banners.delete({
      where: { id },
    });
    revalidateTag("banners", "max");
    return {
      data: result,
      message: "Banner deleted successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error deleting banner",
      status: 500,
    };
  }
};

export const getAllBannersByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      try {
        const allBanners = await getAllBanners();

        if (!allBanners.data || !allBanners) return null;

        const translatedBanner = allBanners.data.map((banner) => {
          return {
            name: banner.name,
            image: banner.image,
            description:
              locale === "en" ? banner.description_en : banner.description_ar,
          };
        });

        return {
          data: translatedBanner,
          message: "Translated Banners",
          status: 200,
        };
      } catch (error) {
        return {
          data: [],
          message: "Error fetching banners",
          status: 500,
        };
      }
    },

    [`all-banners-by-locale-${locale}`],
    { tags: ["banners"], revalidate: 3600 }
  );
