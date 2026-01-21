import Image from "next/image";
import image from "@/public/logo.png"

export default function FolderCourses() {
  return (
    <section
      className="
        grid gap-3
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
            relative w-full aspect-square overflow-hidden rounded-lg
           
          "
        >
          <div
            className="
              absolute w-full h-[20%]
              bg-red-500 rounded-lg
              skew-x-45 translate-x-[-50%]
            "
          />
      

          <div
            className="
              absolute bottom-0 left-0 w-full h-[90%]
              bg-red-500 rounded-lg
            "
          >
            <Image
            alt="image"
              src={image}
              className="
                w-[90%] h-[50%] m-[5%]
                rounded-lg object-cover
              "
            />

            <h3 className="ml-[5%] m-0 leading-normal font-sans">
              Title
            </h3>
            <p className="ml-[5%] m-0 leading-normal font-sans">
              Subtitle
            </p>
          </div>
        </div>

    </section>
  );
}
