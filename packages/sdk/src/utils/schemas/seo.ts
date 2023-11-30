import { z } from "zod";

export const SeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
