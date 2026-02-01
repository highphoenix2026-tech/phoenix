import Image from "next/image";

export default function CourseMainImage({ src, alt }: { src: string | null; alt: string }) {
  return (
    <section className="bg-white px-6 md:px-24 -mt-10 relative z-20">
      <div className="max-w-6xl mx-auto">
        <div className="relative aspect-[21/9] w-full overflow-hidden border-[12px] border-white shadow-2xl">
          <Image
            src={src ?? "/placeholder.jpg"}
            alt={alt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[url('/grid.png')] opacity-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}