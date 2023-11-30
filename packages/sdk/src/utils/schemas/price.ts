import { z } from "zod";

export const PriceSchema = z.object({
  amount: z.string(),
  currencyCode: z.string(),
});

export const PriceRangeSchema = z.object({
  maxVariantPrice: PriceSchema,
  minVariantPrice: PriceSchema,
});
