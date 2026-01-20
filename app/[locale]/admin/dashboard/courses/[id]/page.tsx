
import { editCourseAction } from "../(actions)/editCourse";
import { notFound } from "next/navigation";
import { getCourseById } from "@/app/server/courses/services";
import EditCourseForm from "@/components/courses/EditCourseForm";
import {getCategoryNameAndId} from "@/app/server/categories/services"
import { NewCourse } from "@/types";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const categoriesNameAndId=  (await getCategoryNameAndId()).data

  const course = (await getCourseById(id));

  if (!course || !course.data) {
    notFound();
  }

  return (
    <EditCourseForm
      course={course.data as NewCourse}
      action={editCourseAction}
      categoriesNameAndId={categoriesNameAndId}
    />
  );
}

export default Page;
