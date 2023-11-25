import { reshapeProduct } from "@sdk/utils/reshapes";
import { createTRPCRouter, publicProcedure } from "@shopify/trpc/trpc";
import {
  ShopifyProductOperation,
  getProductQuery,
} from "@shopify/utils/queries/product";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getProductByHandle: publicProcedure
    .input(
      z.object({
        handle: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { client } = ctx;

      const result = await client.fetch<ShopifyProductOperation>({
        query: getProductQuery,
        tags: ["products"],
        variables: {
          handle: input.handle,
        },
      });

      const product = reshapeProduct(result.body.data.product, false);

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      return product;
    }),
});
