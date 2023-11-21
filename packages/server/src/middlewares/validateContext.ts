import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { ShopifyClient } from "../integrations/shopify";
import { t } from "../trpc";

const schemaShopify = z.object({
  integrations: z.object({
    shopify: z.object({
      client: z.instanceof(ShopifyClient),
    }),
  }),
});

export const validatedContext = t.middleware(async (opts) => {
  const { integrations } = opts.ctx;

  const isContextShopify = schemaShopify.safeParse({
    integrations: {
      shopify: {
        client: integrations?.shopify?.client,
      },
    },
  });

  if (!isContextShopify.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: isContextShopify.error.message,
    });
  }

  return opts.next({
    ctx: {
      ...opts.ctx,
    },
  });
});

export const validatedProcedure = t.procedure.use(validatedContext);
