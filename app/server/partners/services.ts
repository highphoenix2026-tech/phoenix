import prisma from "@/lib/prisma";
import { unstable_cache, revalidateTag } from "next/cache";
import { Partners,Locale } from "@/types";


export const addPartner = async (data: Partners) => {
  try {
    const result = await prisma.partners.create({
      data,
    });
    revalidateTag("partners", "max");
    return {
      data: result,
      message: "Client added successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error adding client",
      status: 500,
    };
  }
};

export const getAllPartners = unstable_cache(
  async () => {
    try {
      const result = await prisma.partners.findMany();
      return {
        data: result,
        message: "All Partners fetched",
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error fetching Partners",
        status: 500,
      };
    }
  },
  ["all-Partners"],
  { tags: ["partners"], revalidate: 3600 }
);

export const getPartnerById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.partners.findUnique({
          where: { id },
        });

        if (!result)
          return {
            data: null,
            message: "partners not found",
            status: 409,
          };

        return {
          data: result,
          message: "partners fetched successfully",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error fetching partners",
          status: 500,
        };
      }
    },
    [`Partners-by-id-${id}`],
    { tags: ["partners"], revalidate: 3600 }
  );

  return cachedFn();
};


export const updatePartner = async (
  id: string,
  data: Partial<Partners>
) => {
  try {
    const existing = await prisma.partners.findUnique({
      where: { id },
    });

    if (!existing)
      return {
        data: null,
        message: "partners not found",
        status: 409,
      };

    const result = await prisma.partners.update({
      where: { id },
      data,
    });

    revalidateTag("partners", "max");

    return {
      data: result,
      message: "partners updated successfully",
      status: 201,
    };
  } catch (error) {
        console.log("description_arpartners?",error);

    return {
      data: error,
      message: "Error updating partner",
      status: 500,
    };
  }
};


export const deletepartner= async (id: string) => {
  try {
    const existing = await prisma.partners.findUnique({
      where: { id },
    });

    if (!existing)
      return {
        data: null,
        message: "partners not found",
        status: 409,
      };

    const result = await prisma.partners.delete({
      where: { id },
    });

    revalidateTag("partners", "max");

    return {
      data: result,
      message: "partner deleted successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error deleting partner",
      status: 500,
    };
  }
};


/*
export const getPartnersByLocale = async (locale: Locale) => {
  return unstable_cache(
    async () => {
      const result = await getAllPartners();

      if (result.status !== 200 || !result.data) {
        return {
          data: [],
          message: "Error fetching partners",
          status: 500,
        };
      }

      const translatedPartners = result.data.map((partner) => ({
        id: partner.id,
        name: locale === "en" ? partner : partner.name_ar,
        logo: partner.logo,
      }));

      return {
        data: translatedPartners,
        message: "Partners translated successfully",
        status: 200,
      };
    },
    [`partners-by-locale-${locale}`],
    {
      tags: ["partners"], 
      revalidate: 3600,
    }
  )();
};*/
