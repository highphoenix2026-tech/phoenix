import Image from "next/image";
import image from "@/public/logo.png"

export default function FolderCourses() {
  return (
    <section
      className="
        p-8 bg-white
        grid gap-4
        grid-cols-[repeat(6,1fr)]
        max-[1440px]:grid-cols-[repeat(5,1fr)]
        max-[1024px]:grid-cols-[repeat(4,1fr)]
        max-[768px]:grid-cols-[repeat(3,1fr)]
        max-[425px]:grid-cols-[repeat(2,1fr)]
        max-[320px]:grid-cols-[repeat(1,1fr)]
      "
    >
      
      <div
        className="
          relative w-full aspect-square overflow-hidden rounded-lg group
        "
      >
        {/* الجزء العلوي (التبويب) - سليت فاتح لتمييزه عن الجسم */}
        <div
          className="
            absolute w-full h-[20%]
            bg-slate-200
            skew-x-45 translate-x-[-50%]
          "
        />

        {/* الجزء السفلي (جسم الفولدر) - أفتح درجة سليت (50) مع حدود ناعمة */}
        <div
          className="
            absolute bottom-0 left-0 w-full h-[90%]
            bg-slate-50 rounded-lg
            border border-slate-200
            shadow-[0_8px_30px_rgba(0,0,0,0.04)]
          "
        >
          {/* حاوية الصورة */}
          <div className="w-[90%] h-[50%] m-[5%] rounded-lg overflow-hidden bg-white border border-slate-100">
            <Image
              alt="image"
              src={image}
              className="w-full h-full object-cover"
            />
          </div>

          {/* النصوص بدرجات السليت الغامق للوضوح */}
          <h3 className="ml-[5%] m-0 leading-tight font-sans text-slate-800 font-bold text-base">
            اسم الكورس
          </h3>
          <p className="ml-[5%] mt-1 leading-normal font-sans text-slate-500 text-xs">
            Course Description
          </p>
        </div>
      </div>

    </section>
  );
}