
import {CategoryColumns  } from "@/components/columns/categories-columns";
import { DataTable } from "@/components/data-table";
import { deleteCategoryAction } from "./(actions)/deleteCategory";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllCategories } from "@/app/server/categories/services";

export default async function CategoriesTable() {
  const allCategories = (await getAllCategories()).data || [];

  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Categories</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Categories.
        </h2>
      </div>

      {allCategories.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Categories Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Category Yet.
            </p>
            <NavigationButton
              routeName="newCategory"
              value="Add New Category"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={CategoryColumns}
            data={allCategories}
            routeName="categories"
            deleteAction={deleteCategoryAction}
          />
          <NavigationButton
            routeName="newCategory"
            value="Add New Category"
          />
        </>
      )}
    </main>
  );
}


