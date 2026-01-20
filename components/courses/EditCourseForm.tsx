"use client";

import React, { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { NewCourse } from "@/types";
import { courseSchema } from "@/app/server/courses/validators";
import ImageUploader from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
import TargetAudienceInput from "../inputs/MultiInput";
import DateInput from "../inputs/DateInput";
import FormSelect from "../inputs/SelectorInput";
import { z } from "zod";

interface Props {
  course:NewCourse
  categoriesNameAndId: { id: string; category_name_en: string }[] | null;
  action: (
   id:string, data: NewCourse,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

 const formatDateForInput = (date?: Date | string | null) => {
  if (!date) return "";
  const d = typeof date === "string" ? new Date(date) : date;
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

type CourseFormValues = z.infer<typeof courseSchema>;

export default function EditCourseForm({
  action,
  categoriesNameAndId,
  course,
}: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      course_title_en:course.course_title_en??"",
      course_title_ar:course.course_title_ar??"",
      course_description_en:course.course_description_en??"",
      course_description_ar:course.course_description_ar??"",
      target_audience_en: course.target_audience_en??[],
      target_audience_ar: course.target_audience_ar??[],
      course_image: course.course_image??"",
      duration: course.duration??"",
      slug: course.slug??"",
      start_date:formatDateForInput(course.start_date),
      end_date:formatDateForInput(course.end_date),
      category_id:course.category_id??""
    } as Partial<CourseFormValues>,
  });

  console.log("course: ",course);

 

  
  const categoriesOptions = useMemo(() => {
    return (
      categoriesNameAndId?.map((ele) => ({
        label: ele.category_name_en,
        value: ele.id,
      })) ?? []
    );
  }, [categoriesNameAndId]);

  const handleUploadComplete = (url: string) => {
    setValue("course_image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  const watchedTitle = watch("course_title_en");
  useEffect(() => {
    const slug = (watchedTitle ?? "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setValue("slug", slug, { shouldDirty: false, shouldValidate: false });
  }, [watchedTitle, setValue]);

  const onSubmit = async (data: CourseFormValues) => {
    try {
      const result = await action(course.id??"",data);
      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
        return;
      }

      if (result.status === 403) {
        toast.error(result.message);
        router.push("/");
        return;
      }

      if (result.status === 201) {
        toast.success(result.message);
        router.push("/admin/dashboard/courses");
        return;
      }

      toast.error(result.message);
    } catch (err) {
      console.error("Add course error:", err);
      toast.error("Error In Creating The Course");
    }
  };

  return (
    <main className="w-full max-w-6xl px-4 sm:px-6 md:px-8">
      <h1 className="border-b-2 border-gray-800 text-3xl font-semibold text-gray-800 mb-4 pb-1">
        Add New Course
      </h1>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
            New Course Details
          </CardTitle>
          <CardDescription>
            Fill out the required fields below to create a new course.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit, (formErrors) =>
              console.log("Form errors:", formErrors),
            )}
            className="w-full lg:w-2/3"
            aria-busy={isSubmitting}
          >
            <div className="flex flex-col w-full gap-6">
              <FormSelect
                control={control}
                error={errors.category_id}
                label="Category"
                name="category_id"
                options={categoriesOptions}
                placeholder={
                  categoriesOptions.length ? "Select category" : "No categories"
                }
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                  register={register("course_title_en")}
                  label="English Course Name"
                  error={errors.course_title_en}
                />
                <TextInput
                  register={register("course_title_ar")}
                  label="Arabic Course Name"
                  error={errors.course_title_ar}
                />
              </div>

              <div className="flex flex-col gap-4">
                <TextareaInput
                  register={register("course_description_en")}
                  label="English Course Description"
                  error={errors.course_description_en}
                />
                <TextareaInput
                  register={register("course_description_ar")}
                  label="Arabic Course Description"
                  error={errors.course_description_ar}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TargetAudienceInput
                  control={control}
                  label="English Target Audience"
                  name="target_audience_en"
                  error={errors.target_audience_en}
                />
                <TargetAudienceInput
                  control={control}
                  label="Arabic Target Audience"
                  name="target_audience_ar"
                  error={errors.target_audience_ar}
                />
              </div>

              <TextInput
                register={register("duration")}
                label="Duration"
                error={errors.duration}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <DateInput
                  register={register("start_date")}
                  label="Start Date"
                  error={errors.start_date}
                />
                <DateInput
                  register={register("end_date")}
                  label="End Date"
                  error={errors.end_date}
                />
              </div>

              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2 ml-2">
                  Course Image
                </Label>
                <ImageUploader
                  initialImageUrl={watch("course_image")}
                  endpoint="courses"
                  onUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
                {errors.course_image && (
                  <p className="mt-1 text-xs text-red-600">Image is required</p>
                )}
              </div>

              <input type="hidden" {...register("slug")} />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 mb-12">
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="bg-gray-800 sm:w-auto"
                aria-disabled={!isDirty || isSubmitting}
              >
                {isSubmitting ? "Ubdating..." : "Update Course"}
              </Button>

              <Button
                disabled={isSubmitting}
                type="button"
                onClick={() => router.push("/admin/dashboard/courses")}
                className="bg-gray-800 sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
