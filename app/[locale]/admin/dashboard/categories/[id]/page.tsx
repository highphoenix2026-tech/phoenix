import { getBannerById } from "@/app/server/banners/services";
import EditBannerForm from "@/components/banner/EditBannerForm";
import { editCategoryAction } from "../(actions)/editCategory";
import { notFound } from "next/navigation";
import { getCategoryById } from "@/app/server/categories/services";
import EditCategoryForm from "@/components/categories/EditCategoryForm";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const category = (await getCategoryById(id));

  if (!category || !category.data) {
    notFound();
  }

  return (
    <EditCategoryForm
      category={category.data}
      action={editCategoryAction}
    />
  );
}

export default Page;
