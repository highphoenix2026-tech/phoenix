"use client";
import { categorySchema } from "@/app/server/categories/validators";
import { NewCategory } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import ImageUploader from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
import TargetAudienceInput from "../inputs/MultiInput";
import Button2 from "@/components/ui/Button2";
import Button1 from "@/components/ui/Button1";

interface Props {
  category: NewCategory;
  action: (
    id:string,data: Partial<NewCategory>
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

type CategoryFormValues = z.infer<typeof categorySchema>;
function EditCategoryForm({ action, category }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      category_name_en: category.category_name_en ?? "",
      category_name_ar: category.category_name_en ?? "",
      category_description_en: category.category_description_en ?? "",
      category_description_ar: category.category_description_ar ?? "",
      logo: category.logo??""
    },
  });
  const router = useRouter();

  const handleUploadComplete = (url: string) => {
    setValue("logo", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };
  setValue(
    "slug",
    watch("category_name_en")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
  );
  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    try {
      const result = await action(category.id??"",data);
      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
        return;
      } else if (result.status === 403) {
        toast.error(result.message);
        router.push("/");
        return;
      } else if (result.status === 201) {
        toast.success(result.message);
        router.push("/admin/dashboard/categories");
        return;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error In Creating The Category");
    }
  };

  return (
    <main className="w-full max-w-6xl  px-4  sm:px-6 md:px-8">
      <div className="flex flex-col justify-start items-start border-b-2 border-gray-900 mb-4">
        <h1 className="text-2xl font-bold">Edit Category</h1>
        <p className="text-sm text-gray-600">ID: {category.id}</p>
      </div>

      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
             Category Details
          </CardTitle>
          <CardDescription>
            Fill out the required fields below to edit the category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-2/3">
            <div className="flex flex-col w-full gap-6">
              <div className="flex flex-col lg:flex-row lg:gap-4 w-full">
                <TextInput
                  register={register("category_name_en")}
                  label="English Category Name"
                  error={errors.category_name_en}
                  className="w-full"
                />
                <TextInput
                  register={register("category_name_ar")}
                  label="Arabic Category Name"
                  error={errors.category_name_ar}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-4">
                <TextareaInput
                  register={register("category_description_en")}
                  label="English Category Description"
                  error={errors.category_description_en}
                />
                <TextareaInput
                  register={register("category_description_ar")}
                  label="English Category Description"
                  error={errors.category_description_ar}
                />
              </div>

 
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2 ml-2">
                  Category Icon
                </Label>
                <ImageUploader
                  initialImageUrl={watch("logo")}
                  endpoint="categories"
                  onUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
                {errors.logo && (
                  <p className="mt-1 text-xs text-red-600">Icon is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 mb-12">
              <Button2
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="bg-gray-800 sm:w-auto"
              >
                {isSubmitting ? "Updating..." : "Update Category"}
              </Button2>

              <Button1
                disabled={isSubmitting}
                type="button"
                onClick={() => router.push("/admin/dashboard/categories")}
                className="bg-gray-800 sm:w-auto"
              >
                Cancel
              </Button1>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default EditCategoryForm;
