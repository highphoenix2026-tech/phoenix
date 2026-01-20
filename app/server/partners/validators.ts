import { z } from "zod";

export const partnersSchema = z.object({
  id: z.string().optional(),
  name_en: z.string().min(1, "English name is required"),
  name_ar: z.string().min(1, "Arabic name is required"),
  logo: z.string().min(1, "Client logo is required"),
});

export type Newpartners = z.infer<typeof partnersSchema>;
