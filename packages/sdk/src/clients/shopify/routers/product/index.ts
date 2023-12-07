import { createTRPCRouter, publicProcedure } from "@shopify/trpc/trpc";
import { z } from "zod";

const ProductSchemaInput = z.object({
  handle: z.string(),
  identifiers: z
    .array(
      z.object({
        key: z.string(),
        namespace: z.string().default("custom"),
      })
    )
    .default([]),
});

export const productRouter = createTRPCRouter({
  getByHandle: publicProcedure
    .input(ProductSchemaInput)
    .query(async ({ ctx, input }) => {
      const { client } = ctx;

      const product = await client.getByHandle(input.handle, input.identifiers);

      return product;
    }),
});
