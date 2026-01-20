import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  banners: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Banner Upload Complete:", file.url);
    return { uploadedUrl: file.ufsUrl };
  }),
  categories: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Category Upload Complete:", file.url);
    return { uploadedUrl: file.ufsUrl };
  }),
  ourTeam: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Our Team Upload Complete:", file.url);
    return { uploadedUrl: file.url };
  }),

  courses: f({
    image: { maxFileSize: "2MB", maxFileCount: 2 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Courses Upload Complete:", file.url);
    return { uploadedUrl: file.url };
  }),
  partners: f({
    image: { maxFileSize: "2MB", maxFileCount: 2 },
  }).onUploadComplete(async ({ file }) => {
    console.log("partners Upload Complete:", file.url);
    return { uploadedUrl: file.url };
  }),
 
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
