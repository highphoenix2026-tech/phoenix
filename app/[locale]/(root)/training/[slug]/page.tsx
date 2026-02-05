import { getAllCoursesByLocale } from "@/app/server/courses/services";
import CourseDetailHero from "@/app/components/trainingcoursecomponents/CourseDetailHero";
import CourseMainImage from "@/app/components/trainingcoursecomponents/CourseMainImage";
import CourseExtendedDetails from "@/app/components/trainingcoursecomponents/CourseExtendedDetails";
import ExploreRandomCourses from "@/app/components/trainingcoursecomponents/ExploreRandomCourses";
import { notFound } from "next/navigation";
import { generateDynamicMetadata } from "@/lib/constants/metadata";
import type { Metadata } from "next";
import {getCourseBySlug} from "@/app/server/courses/services"

type Locale = "en" | "ar";
interface Props {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}



export async function generateMetadata(params: Props): Promise<Metadata> {

  const courseData=await  getCourseBySlug((await params.params).slug)
  console.log("courseData: ",courseData);
  

  return generateDynamicMetadata.page({
    type: "training",
    name: (await params.params).slug.replace(/-/g, " "),
    slug: `training/${(await params.params).slug}`,
    description: courseData.data?.course_description_en[0],
    imageUrl:courseData.data?.course_image!
    
    
  });
}

export default async function CourseDetailsPage({ params }: Props) {

  const { slug, locale } = await params;

  const coursesRes = await getAllCoursesByLocale(locale);
  const allCourses = coursesRes?.data || [];

  const course = allCourses.find((c) => c.slug === slug);
  if (!course) {
    notFound();
  }

  

  return (
    <main className="bg-white mt-20">
      <CourseDetailHero
        title={course.title}
        categoryName={locale === "ar" ? "برنامج تدريبي" : "Training Program"}
      />

      <CourseMainImage src={course.image} alt={course.title} />

      <CourseExtendedDetails
        id={course.id}
        description={course.description}
        targetAudience={course.target_audience}
        startDate={course.start_date}
        endDate={course.end_date}
        duration={course.duration}
        locale={locale}
      />

      <ExploreRandomCourses
        allCourses={allCourses}
        currentCourseId={course.id}
        locale={locale}
      />

      
    </main>
  );
}
