// lib/sitemap.prisma.ts
// Tries to use Prisma to fetch training slugs.
// If prisma isn't configured in your project the function gracefully returns [].

import  prisma  from "@/lib/prisma";

/**
 * Returns an array of objects like [{ slug: 'course-a' }, ...]
 * Replace the query if your training table name/field differs.
 */
export async function fetchTrainingSlugs(): Promise<Array<{ slug: string }>> {
  if (!prisma) return [];

  try {
    // Adjust table name and field as required by your schema
    return await prisma.courses.findMany({
      select: { slug: true },
    });
  } catch (err) {
    console.error("Error fetching training slugs for sitemap:", err);
    return [];
  }
}
