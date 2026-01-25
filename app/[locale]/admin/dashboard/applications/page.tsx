import Link from "next/link";
import Image from "next/image";
import { getAllCategoriesNameAndImageWithCourses } from "@/app/server/categories/services";
async function page() {
  const allCategories = (await getAllCategoriesNameAndImageWithCourses()).data;
  console.log("allCategories: ", allCategories);

  return (
    <main className=" ml:0 md:ml-2.5 lg:ml-5 mt-2">
      <header className="mb-4">
        <h1 className=" ml-2 text-xl text-gray-800 lg:text-3xl font-semibold">
          All Courses by Category
        </h1>
        <p className="text-gray-600 mt-1 ml-2">
          Browse Courses grouped by category
        </p>
      </header>

      <div className="space-y-12 mt-8">
        {allCategories?.map((category, index) => {
          return (
            <div key={index}>
              <h2 className="text-2xl w-[95vw] ml-1 lg:ml-0 md:w-[70vw] lg:w-[80vw] text-black font-semibold border-b pb-2 text-center flex flex-row justify-center">
                {category.category_name_en}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 mt-5 lg:grid-cols-5 gap-6">
                {category.courses.map((course, index) => (
                  <Link
                    key={index}
                    href={`/admin/dashboard/applications/${course.id}`}
                    className="group flex flex-col items-center gap-2 text-center hover:scale-105 transition-transform duration-500 ease-in-out"
                  >
                    <div className="w-44 h-44 rounded-full overflow-hidden flex items-center justify-center border shadow-md bg-gray-50 hover:shadow-lg">
                      <Image
                        src={course.course_image ?? "DefaultImage"}
                        alt={course.course_title_en}
                        width={50}
                        height={50}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="text-sm font-medium truncate max-w-36 mt-2">
                      {course.course_title_en}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-gray-600">
                      <span
                        className="inline-flex items-center justify-center px-2.5 py-1 rounded-full
                   bg-[#397a34]/10 text-[#397a34] font-semibold"
                      >
                        {course.applications.length}
                      </span>
                      <span className="whitespace-nowrap">Applications</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default page;
