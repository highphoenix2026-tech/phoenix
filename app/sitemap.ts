import { fetchTrainingSlugs } from "@/lib/sitemap.prisma";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap() {
  const now = new Date();

  const staticPages = [
    { url: `${SITE_URL}/`, lastModified: now },
    { url: `${SITE_URL}/about`, lastModified: now },
    { url: `${SITE_URL}/advisory`, lastModified: now },
    { url: `${SITE_URL}/training`, lastModified: now },
    { url: `${SITE_URL}/ourteam`, lastModified: now },
    { url: `${SITE_URL}/contact`, lastModified: now },
   
  ];

  const trainingSlugs = await fetchTrainingSlugs();
  const trainingPages = trainingSlugs.map((t) => ({
    url: `${SITE_URL}/courses/${t.slug}`,
    lastModified: now,
  }));

  return [...staticPages, ...trainingPages];
}
