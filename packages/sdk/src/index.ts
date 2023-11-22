import { ShopifyClient } from "./integrations/shopify";
import { appRouter } from "./trpc/root";
import { createTRPCContext } from "./trpc/trpc";

const integrations = {
  shopify: {
    client: ShopifyClient,
  },
};

export { appRouter, createTRPCContext, integrations };
