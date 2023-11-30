import { createTRPCRouter, publicProcedure } from "@shopify/trpc/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  getByHandle: publicProcedure
    .input(
      z.object({
        handle: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { client } = ctx;

      const product = await client.getByHandle(input.handle);

      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      return product;
    }),
});
