import { z } from "zod";

export const ImageSchema = z.object({
  url: z.string(),
  altText: z.string(),
  height: z.number(),
  width: z.number(),
});
