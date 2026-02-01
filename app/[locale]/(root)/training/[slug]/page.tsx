import { getAllCoursesByLocale } from "@/app/server/courses/services";
import CourseDetailHero from "@/app/components/trainingcoursecomponents/CourseDetailHero";
import CourseMainImage from "@/app/components/trainingcoursecomponents/CourseMainImage";
import CourseExtendedDetails from "@/app/components/trainingcoursecomponents/CourseExtendedDetails";
import RelatedCourses from "@/app/components/trainingcoursecomponents/RelatedCourses";
import ExploreRandomCourses from "@/app/components/trainingcoursecomponents/ExploreRandomCourses"
import { notFound } from "next/navigation";

type Locale = "en" | "ar";
interface Props {
  params: {
    locale: Locale;
    slug: string
  };
}

export default async function CourseDetailsPage({ params }: Props) {
  const { slug, locale } =await params;
  

 
  const coursesRes = await getAllCoursesByLocale(locale)();
  const allCourses = coursesRes?.data || [];

  const course = allCourses.find((c) => c.slug === slug);
if (!course) {
    notFound();
  }

  const relatedCourses = allCourses
    .filter((c) => c.categoryId === course.categoryId && c.id !== course.id)
    .slice(0, 3);

  return (
    <main className="bg-white mt-20">
      <CourseDetailHero 
        title={course.title} 
        categoryName={locale === "ar" ? "برنامج تدريبي" : "Training Program"} 
      />

      <CourseMainImage 
        src={course.image} 
        alt={course.title} 
      />

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

      <RelatedCourses 
        courses={relatedCourses} 
        locale={locale } 
      />
    </main>
  );
}