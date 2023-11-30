import { z } from "zod";
import { ImageSchema } from "./image";
import { MetafieldUnionSchema } from "./metafield";
import { PriceRangeSchema } from "./price";
import { SeoSchema } from "./seo";

const ProductSchema = z.object({
  createdAt: z.string(),
  descriptionHtml: z.string(),
  isGiftCard: z.boolean(),
  images: z.array(ImageSchema),
  id: z.string(),
  handle: z.string(),
  productType: z.string().optional(),
  seo: SeoSchema,
  title: z.string(),
  updatedAt: z.string(),
  priceRange: PriceRangeSchema,
  metafields: z.array(MetafieldUnionSchema),
});

export const QuixerProductSchema = ProductSchema.extend({
  variants: z.array(ProductSchema),
});
