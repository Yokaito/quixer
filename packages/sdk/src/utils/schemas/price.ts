import { z } from "zod";
import { CurrencySchema } from "./currency";

export const PriceSchema = z.object({
  amount: z.string(),
  currencyCode: CurrencySchema,
});

export const PriceRangeSchema = z.object({
  maxVariantPrice: PriceSchema,
  minVariantPrice: PriceSchema,
});
