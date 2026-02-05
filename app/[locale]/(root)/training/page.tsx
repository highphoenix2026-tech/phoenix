import TrainingHero from "@/app/components/trainingcomponents/TrainingHero";
import InstitutionalTrainingSection from "@/app/components/trainingcomponents/InstitutionalTrainingSection";
import TrainingDeliverySection from "@/app/components/trainingcomponents/TrainingDeliverySection";
import TrainingDomainsSection from "@/app/components/trainingcomponents/TrainingDomainsSection";
import TrainingCatalogueSection from "@/app/components/trainingcomponents/TrainingCatalogueSection";
import TrainingOutcomesSection from "@/app/components/trainingcomponents/TrainingOutcomesSection";
import { getAllCategoriesByLocale } from "@/app/server/categories/services";
import { getAllCoursesByLocale } from "@/app/server/courses/services";
import type { TranslatedCourse, TranslatedCategory,TranslatedCourseFiltered } from "@/types";
import { TRAINING_METADATA } from "@/lib/constants/metadata"
import { log } from "util";

export const metadata=TRAINING_METADATA


type Locale = "en" | "ar";

interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function TrainingPage({ params }: PageProps) {
  const { locale } = await params;
  console.log();
  
  const categoriesRes = await getAllCategoriesByLocale(locale);
  const coursesRes = await getAllCoursesByLocale(locale);

  console.log(categoriesRes);
  console.log(" coursesRes:", coursesRes);
  console.log("locale:", locale);
  
  
  

  const categoriesData: TranslatedCategory[] = categoriesRes?.data || [];

  const coursesData: TranslatedCourseFiltered[] = coursesRes?.data || [];

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
