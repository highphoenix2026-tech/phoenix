"use client";
import { bannerSchema } from "@/app/server/banners/validators";
import { NewBanner } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
import ImageUploader from "../ImageUpload";
import { Label } from "@radix-ui/react-dropdown-menu";

interface Props {
  banner: NewBanner;
  action: (
    id: string,
    data: Partial<NewBanner>
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

type BannerFormValues = z.infer<typeof bannerSchema>;

function EditBannerForm({ banner, action }: Props) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      name: banner.name ?? "",
      description_en: banner.description_en ?? "",
      description_ar: banner.description_ar ?? "",
      image: banner.image ?? "",
    },
  });

  const router = useRouter();

  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  const onSubmit: SubmitHandler<BannerFormValues> = async (data) => {
    try {
      const result = await action(banner.id ?? "", data);
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
        router.push("/admin/dashboard/banner");
        return;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error updating the banner");
    }
  };

  return (
    <div className="w-full max-w-6xl  px-4 sm:px-6 md:px-8">
      <div className="flex flex-col justify-start items-start border-b-2 border-gray-900 mb-4">
        <h1 className="text-2xl font-bold">Edit Banner</h1>
        <p className="text-sm text-gray-600">ID: {banner.id}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Edit Banner Details</CardTitle>
          <CardDescription>
            Fill out the required fields below to update the banner.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-2/3">
            <div className="flex flex-col  gap-4">
             
                <TextInput register={register("name")} label="Name" error={errors.name} />


                <TextareaInput
                  register={register("description_en")}
                  label="English Description"
                  error={errors.description_en}
                  
                />

                <TextareaInput
                  register={register("description_ar")}
                  label="Arabic Description"
                  error={errors.description_ar}
                />
            </div>

            <div>
              <Label className="block text-sm font-semibold text-gray-700 mb-2 ml-2">
                Banner Image
              </Label>
              <ImageUploader
                initialImageUrl={watch("image")}
                endpoint="banners"
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.image && (
                <p className="mt-1 text-xs text-red-600 ml-2">Image is required</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button type="submit" disabled={!isDirty || isSubmitting} className="bg-gray-800 sm:w-auto">
                {isSubmitting ? "Updating..." : "Update Banner"}
              </Button>
              <Button
                disabled={isSubmitting}
                type="button"
                onClick={() => router.push("/admin/dashboard/banner")}
                className="bg-gray-800 sm:w-auto"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default EditBannerForm;
