import { z } from "zod";

export const WeightSchema = z.object({
  value: z.number(),
  unit: z.enum(["oz", "lb", "g", "kg"]),
});
