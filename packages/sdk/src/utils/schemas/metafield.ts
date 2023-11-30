import { z } from "zod";
import { DimensionSchema } from "./dimension";
import { RatingSchema } from "./rating";
import { VolumeSchema } from "./volume";
import { WeightSchema } from "./weight";

const MetafieldSchema = z.object({
  id: z.string(),
  namespace: z.string(),
  key: z.string(),
  description: z.string().optional(),
});

export const MetafieldUnionSchema = z.union([
  z
    .object({
      type: z.literal("string"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("boolean"),
      value: z.boolean(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("date"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("date_time"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("dimension"),
      value: DimensionSchema,
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("json"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("money"),
      value: z.object({
        amount: z.string(),
        currency_code: z.string(),
      }),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("multi_line_text_field"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("number_decimal"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("number_integer"),
      value: z.number(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("rating"),
      value: RatingSchema,
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("rich_text_field"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("url"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("volume"),
      value: VolumeSchema,
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("weight"),
      value: WeightSchema,
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("collection_reference"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("file_reference"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("metaobject_reference"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("mixed_reference"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("page_reference"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("product_reference"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("variant_reference"),
      value: z.string(),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.collection_reference"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.color"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.date"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.date_time"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.dimension"),
      value: z.array(DimensionSchema),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.file_reference"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.metaobject_reference"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.mixed_reference"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.number_integer"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.number_decimal"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.page_reference"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.product_reference"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.rating"),
      value: z.array(RatingSchema),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.single_line_text_field"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.url"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.variant_reference"),
      value: z.array(z.string()),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.volume"),
      value: z.array(VolumeSchema),
    })
    .merge(MetafieldSchema),
  z
    .object({
      type: z.literal("list.weight"),
      value: z.array(WeightSchema),
    })
    .merge(MetafieldSchema),
]);
