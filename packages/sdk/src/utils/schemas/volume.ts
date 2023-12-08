import { z } from "zod";

export const VolumeSchema = z.object({
  value: z.number(),
  unit: z.enum([
    "ml",
    "cl",
    "l",
    "m3",
    "us_fl_oz",
    "us_pt",
    "us_qt",
    "us_gal",
    "imp_fl_oz",
    "imp_pt",
    "imp_qt",
    "imp_gal",
  ]),
});
