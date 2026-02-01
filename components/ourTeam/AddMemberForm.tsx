"use client";
import { type NewMember } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageUploader from "@/components/ImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import z from "zod";
import { toast } from "sonner";
import { ourteamSchema } from "@/app/server/ourTeam/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
import { Button } from "../ui/button";
import FormCheckbox from "@/components/inputs/CheckBoxInput";
import Button2 from "@/components/ui/Button2"
import Button1 from "@/components/ui/Button1"


interface Props {
  action: (
    data: NewMember
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

type MembersFormValues = z.infer<typeof ourteamSchema>;

export default function AddMemberForm({ action }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<MembersFormValues>({
    resolver: zodResolver(ourteamSchema),
    defaultValues: { main: false },
  });

  const router = useRouter();

  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  const onSubmit: SubmitHandler<MembersFormValues> = async (data) => {
    try {
      const result = await action(data);
      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
      } else if (result.status === 403) {
        toast.error(result.message);
        router.push("/");
      } else if (result.status === 201) {
        toast.success(result.message);
        router.push("/admin/dashboard/ourTeam");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error in creating the member");
    }
  };

  return (
    <main className="w-full max-w-6xl  px-4 sm:px-6 md:px-8 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 mb-6">
        <h1 className="text-2xl font-bold">Add New Member</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
        <Card>
          <CardHeader>
            <CardTitle>New Member Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new member.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-6">
            <FormCheckbox
              name="main"
              error={errors.main}
              label="Is Main?"
              control={control}
              className="w-full md:w-1/2"
            />

            <div className="flex flex-col md:flex-row gap-4">
              <TextInput
                register={register("name_en")}
                label="Name (EN)"
                error={errors.name_en}
                className="w-full md:w-1/2"
              />
              <TextInput
                register={register("name_ar")}
                label="Name (AR)"
                error={errors.name_ar}
                className="w-full md:w-1/2"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <TextInput
                register={register("position_en")}
                label="Position (EN)"
                error={errors.position_en}
                className="w-full md:w-1/2"
              />
              <TextInput
                register={register("position_ar")}
                label="Position (AR)"
                error={errors.position_ar}
                className="w-full md:w-1/2"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <TextareaInput
                register={register("description_en")}
                label="English Description"
                error={errors.description_en}
                className="w-full md:w-1/2"
              />
              <TextareaInput
                register={register("description_ar")}
                label="Arabic Description"
                error={errors.description_ar}
                className="w-full md:w-1/2"
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
              <label className="text-base text-black mb-2">Member Image</label>
              <ImageUploader
                endpoint="ourTeam"
                initialImageUrl={watch("image")}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.image && (
                <p className="mt-1 text-xs text-red-600">Image is required</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <Button1
                type="button"
                disabled={isSubmitting}
                onClick={() => router.replace("/admin/dashboard/ourTeam")}
                className="bg-gray-800 sm:w-auto"
              >
                Cancel
              </Button1>
              <Button2 type="submit" disabled={isSubmitting} className="bg-gray-800 sm:w-auto">
                {isSubmitting ? "Adding..." : "Add Member"}
              </Button2>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
