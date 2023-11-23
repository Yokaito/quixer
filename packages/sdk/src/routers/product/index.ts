import {
  ShopifyProductOperation,
  getProductQuery,
} from "@sdk/integrations/clients/shopify/queries/product";
import { validatedProcedure } from "@sdk/routers/middlewares/validateContext";
import { createTRPCRouter } from "@sdk/trpc/trpc";
import { reshapeProduct } from "@sdk/utils/reshapes";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getProductByHandle: validatedProcedure
    .input(
      z.object({
        handle: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { integrations } = ctx;

      const result =
        await integrations?.shopify?.client.fetch<ShopifyProductOperation>({
          query: getProductQuery,
          tags: ["products"],
          variables: {
            handle: input.handle,
          },
        });

      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      return reshapeProduct(result.body.data.product, false);
    }),
});
