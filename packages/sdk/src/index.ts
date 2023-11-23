import { ShopifyClient } from "@sdk/integrations/clients/shopify";
import { appRouter } from "@sdk/trpc/root";
import { createTRPCContext } from "@sdk/trpc/trpc";

const clients = {
  shopify: {
    client: ShopifyClient,
  },
};

export { appRouter, clients, createTRPCContext };
