import { z } from "zod";
import { ImageSchema } from "./image";
import { MetafieldUnionSchema } from "./metafield";
import { PriceRangeSchema } from "./price";
import { SeoSchema } from "./seo";

const ProductSchema = z.object({
  descriptionHtml: z.string(),
  images: z.array(ImageSchema),
  id: z.string(),
  handle: z.string(),
  productType: z.string().optional(),
  seo: SeoSchema,
  title: z.string(),
  updatedAt: z.string(),
  priceRange: PriceRangeSchema,
  metafields: z.array(MetafieldUnionSchema),
  availableForSale: z.boolean(),
});

export const QuixerProductSchema = ProductSchema.extend({
  variants: z.array(ProductSchema),
});
