import { ShopifyClient } from "./src/integrations/shopify";

export * from "./src/root";
export * from "./src/trpc";

const integrations = {
  shopify: {
    client: ShopifyClient,
  },
};

export { integrations };
