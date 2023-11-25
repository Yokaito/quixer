import { z } from "zod";

export const ShopifyConfigurationSchema = z.object({
  platform: z.enum(["shopify"]),
  domain: z.string().regex(/^[a-z0-9-]+\.myshopify\.com$/),
  version: z.enum(["2023-10", "2023-07", "2023-04", "2023-01"]),
  tokens: z.object({
    admin: z.string(),
    storefront: z.string(),
  }),
});

export type ShopifyConfiguration = z.infer<typeof ShopifyConfigurationSchema>;
