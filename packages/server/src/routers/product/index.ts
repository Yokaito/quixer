import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  ShopifyProductOperation,
  getProductQuery,
} from "../../integrations/shopify/queries/product";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { reshapeProduct } from "../../utils/reshapes";

export const productRouter = createTRPCRouter({
  getProductByHandle: publicProcedure
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
