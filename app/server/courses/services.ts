import prisma from "@/lib/prisma";
import { NewCourse, Locale } from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";

export const addNewCourse = async (data: NewCourse) => {
  try {
    await prisma.courses.create({
      data: {
        ...data,
        start_date: new Date(data.start_date!),
        end_date: new Date(data.end_date!),
      },
    });
    console.log("target", data.target_audience_ar);

    revalidateTag("courses", "max");
    revalidateTag("categories", "max");
    return {
      success: true,
      message: "Course Added Successfully",
      status: 201,
    };
  } catch (error) {
    console.log("error backend: ", error);

    return {
      success: false,
      message: "Error In Adding The Course",
      status: 500,
    };
  }
};

export const deleteCourse = async (id: string) => {
  try {
    await prisma.courses.delete({
      where: { id },
    });

    revalidateTag("courses", "max");
    revalidateTag("categories", "max");

    return {
      success: true,
      message: "Course Deleted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error In Deleting The Course",
      status: 500,
    };
  }
};

export const editCourse = async (id: string, data: Partial<NewCourse>) => {
  try {
    const result = await prisma.courses.update({
      where: { id },
      data:{
        ...data,
        start_date:new Date(data.start_date!),
        end_date:new Date(data.end_date!)
      },
    });

    revalidateTag("courses", "max");
    revalidateTag("categories", "max");
    console.log("error: ",result);

    return {
      data: result,
      success: true,
      message: "Course Updated Successfully",
      status: 201,
    };
  } catch (error) {
    console.log("error: ",error);
    
    return {
      data: null,
      success: false,
      message: "Error In Updating The Course",
      status: 500,
    };
  }
};

export const getAllCourses = unstable_cache(
  async () => {
    try {
      const result = await prisma.courses.findMany({
        include: {
          category: true,
        },
      });

      return {
        data: result,
        success: true,
        message: "All Courses",
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        message: "Error In Getting Courses",
        status: 500,
      };
    }
  },
  ["all-courses"],
  { revalidate: 3600, tags: ["courses"] },
);

export const getCourseById = (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.courses.findUnique({
          where: { id },
          include: {
            category: true,
          },
        });

        if (!result) {
          return {
            data: null,
            success: false,
            message: "Course Not Found",
            status: 404,
          };
        }

        return {
          data: result,
          success: true,
          message: "Course Found",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          success: false,
          message: "Error In Getting Course",
          status: 500,
        };
      }
    },
    [`course-by-id-${id}`],
    { revalidate: 3600, tags: ["courses"] },
  );

  return cachedFn();
};

export const getCoursesByCategoryId = (categoryId: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.courses.findMany({
          where: { category_id: categoryId },
          include: {
            category: true,
          },
        });

        return {
          data: result,
          success: true,
          message: "Courses By Category",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          success: false,
          message: "Error In Getting Courses By Category",
          status: 500,
        };
      }
    },
    [`courses-by-category-${categoryId}`],
    { revalidate: 3600, tags: ["courses", "categories"] },
  );

  return cachedFn();
};

export const getAllCoursesByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      try {
        const result = await getAllCourses();

        if (!result || !result.data) return null;

        const translatedCourses = result.data.map((course) => ({
          id: course.id,
          title: locale === "en" ? course.course_title_en : course.course_title_ar,
          description:
            locale === "en"
              ? course.course_description_en
              : course.course_description_ar,
          image: course.course_image,
          categoryId: course.category_id,
          target_audience:
            locale === "en"
              ? course.target_audience_en
              : course.target_audience_ar,
          slug: course.slug,
          start_date: course.start_date,
          end_date: course.end_date,
        }));

        return {
          data: translatedCourses,
          message: "Translated Courses",
          status: 200,
        };
      } catch (error) {
        return {
          data: [],
          message: "Error fetching courses",
          status: 500,
        };
      }
    },
    [`all-courses-by-locale-${locale}`],
    { tags: ["courses"], revalidate: 3600 },
  );

export const getCourseByIdByLocale = (id: string, locale: Locale) =>
  unstable_cache(
    async () => {
      try {
        const result = await getCourseById(id);

        if (!result || !result.data)
          return {
            data: null,
            message: "Course Not Found",
            status: 409,
          };

        const course = result.data;
        return {
          data: {
            id: course.id,
            title: locale === "en" ? course.category : course.course_title_ar,
            description:
              locale === "en"
                ? course.course_description_en
                : course.course_description_ar,
            image: course.course_image,
            categoryId: course.category_id,
            target_audience:
              locale === "en"
                ? course.target_audience_en
                : course.target_audience_ar,
            slug: course.slug,
            start_date: course.start_date,
            end_date: course.end_date,
          },
          message: "Translated Course",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error fetching course",
          status: 500,
        };
      }
    },
    [`course-${id}-locale-${locale}`],
    { tags: ["courses"], revalidate: 3600 },
  );

export const getCoursesByCategoryIdByLocale = (
  categoryId: string,
  locale: Locale,
) =>
  unstable_cache(
    async () => {
      try {
        const result = await getCoursesByCategoryId(categoryId);

        if (!result || !result.data) return null;

        const translatedCourses = result.data.map((course) => ({
          id: course.id,
          title: locale === "en" ? course.category : course.course_title_ar,
          description:
            locale === "en"
              ? course.course_description_en
              : course.course_description_ar,
          image: course.course_image,
          categoryId: course.category_id,
          target_audience:
            locale === "en"
              ? course.target_audience_en
              : course.target_audience_ar,
          slug: course.slug,
          start_date: course.start_date,
          end_date: course.end_date,
        }));

        return {
          data: translatedCourses,
          message: "Translated Courses By Category",
          status: 200,
        };
      } catch (error) {
        return {
          data: [],
          message: "Error fetching courses by category",
          status: 500,
        };
      }
    },
    [`courses-${categoryId}-locale-${locale}`],
    { tags: ["courses", "categories"], revalidate: 3600 },
  );


  export const getCourseNameAndIdById= (id: string) => {
  const cachedFn = unstable_cache(
    async () => {
      try {
        const result = await prisma.courses.findUnique({
          where: { id },
          select:{id:true, course_title_en:true}
        });
        if (!result)
          return { data: null, message: "Course not found", status: 409 };
        return {
          data: result,
          message: "Course fetched successfully",
          status: 200,
        };
      } catch (error) {
        return { data: null, message: "Error fetching Course", status: 500 };
      }
    },
    [`course-name-by-id-${id}`],
    { tags: ["courses"], revalidate: 3600 }
  );

  return cachedFn();
};