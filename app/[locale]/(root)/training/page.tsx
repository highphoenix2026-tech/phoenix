import TrainingHero from "@/app/components/trainingcomponents/TrainingHero";
import InstitutionalTrainingSection from "@/app/components/trainingcomponents/InstitutionalTrainingSection";
import TrainingDeliverySection from "@/app/components/trainingcomponents/TrainingDeliverySection";
import TrainingDomainsSection from "@/app/components/trainingcomponents/TrainingDomainsSection";
import TrainingCatalogueSection from "@/app/components/trainingcomponents/TrainingCatalogueSection";
import TrainingOutcomesSection from "@/app/components/trainingcomponents/TrainingOutcomesSection";
import { getAllCategoriesByLocale } from "@/app/server/categories/services";
import { getAllCoursesByLocale } from "@/app/server/courses/services";
import type { TranslatedCourse, TranslatedCategory } from "@/types";

type Locale = "en" | "ar";

interface PageProps {
  params: {
    locale: Locale;
  };
}

export default async function TrainingPage({ params }: PageProps) {
  const { locale } = await params;
  const categoriesRes = await getAllCategoriesByLocale(locale)();
  const coursesRes = await getAllCoursesByLocale(locale)();

  const categoriesData: TranslatedCategory[] = categoriesRes?.data || [];

  const coursesData: TranslatedCourse[] = coursesRes?.data || [];

  return (
    <main className="bg-[#f1f3f5] text-slate-800 mt-20">
      <TrainingHero />
      <InstitutionalTrainingSection />
      <TrainingDeliverySection />
      <TrainingDomainsSection />

      <TrainingCatalogueSection
        dbCourses={coursesData}
        dbCategories={categoriesData}
      />

      <TrainingOutcomesSection />
    </main>
  );
}
