import { z } from "zod";

export const RatingSchema = z.object({
  value: z.string(),
  scale_min: z.string(),
  scale_max: z.string(),
});
