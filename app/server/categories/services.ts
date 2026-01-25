import prisma from "@/lib/prisma";
import { NewCategory, Locale } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";

export const addNewCategory = async (data: NewCategory) => {
  try {
    await prisma.category.create({ data });
    revalidateTag("categories", "max");
    return {
      success: true,
      message: "Category Added Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Adding The Category",
      status: 500,
    };
  }
};

export const getCategoryNameAndId = unstable_cache(
  async () => {
    try {
      const result = await prisma.category.findMany({
        select: {
          category_name_en: true,
          id: true,
        },
      });
      return {
        data: result,
        message: "Categries name and id",
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Categries name and id",
        status: 200,
      };
    }
  },
  ["name-id-categories"],
  { revalidate: 3600, tags: ["categories"] },
);

export const getAllCategories = unstable_cache(
  async () => {
    try {
      const result = await prisma.category.findMany({});
      return {
        data: result,
        status: 200,
        success: true,
        message: "All Categories",
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        success: false,
        message: "Error In Getting Categories",
      };
    }
  },
  ["all-categories"],
  { revalidate: 3600, tags: ["categories"] },
);

export const getAllCategoriesWithCourses = unstable_cache(
  async () => {
    try {
      const result = await prisma.category.findMany({
        include: { courses: true },
      });
      return {
        data: result,
        status: 200,
        success: true,
        message: "All Categories With Courses",
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        success: false,
        message: "Error In Getting Categories With Courses",
      };
    }
  },
  ["all-categories-with-courses"],
  { revalidate: 3600, tags: ["categories"] },
);

export const getAllCategoriesNameAndImageWithCourses = unstable_cache(
  async () => {
    try {
      const result = await prisma.category.findMany({
        select: {
          courses: {
            select: {
              course_title_en: true,
              id: true,
              applications: { select: { id: true } },
              course_image: true,
            },
          },
          category_name_en: true,
          id: true,
        },
      });
      return {
        data: result,
        status: 200,
        success: true,
        message: "All Categories With Courses",
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        success: false,
        message: "Error In Getting Categories With Courses",
      };
    }
  },
  ["all-categories-with-courses"],
  { revalidate: 3600, tags: ["categories"] },
);

export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({
      where: { id },
    });

    revalidateTag("categories", "max");

    return {
      success: true,
      message: "Category Deleted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Deleting The Category",
      status: 500,
    };
  }
};

export const editCategory = async (id: string, data: Partial<NewCategory>) => {
  try {
    const result = await prisma.category.update({
      where: { id },
      data,
    });

    revalidateTag("categories", "max");

    return {
      data: result,
      success: true,
      message: "Category Updated Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: "Error In Updating The Category",
      status: 500,
    };
  }
};

export const getCategoryById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.category.findUnique({
          where: { id },
        });

        if (!result) {
          return {
            data: null,
            status: 409,
            success: false,
            message: "Category Not Found",
          };
        }

        return {
          data: result,
          status: 200,
          success: true,
          message: "Category Found",
        };
      } catch (error) {
        return {
          data: null,
          status: 500,
          success: false,
          message: "Error In Getting Category",
        };
      }
    },
    [`category-by-id-${id}`],
    { tags: ["categories"], revalidate: 3600 },
  );

  return cachedFn();
};

export const getAllCategoriesByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      const result = await getAllCategories();

      if (!result || !result.data) return null;

      const translated = result.data.map((category) => ({
        id: category.id,
        name:
          locale === "en"
            ? category.category_name_en
            : category.category_name_ar,
        description:
          locale === "en"
            ? category.category_description_en
            : category.category_description_ar,
        slug: category.slug,
        logo: category.logo,
      }));

      return {
        data: translated,
        status: 200,
        message: "Translated Categories",
      };
    },
    [`all-categories-by-locale-${locale}`],
    { tags: ["categories"], revalidate: 3600 },
  );
