import { z } from "zod";

export const DimensionSchema = z.object({
  value: z.number(),
  unit: z.enum(["in", "ft", "yd", "mm", "cm", "m"]),
});
