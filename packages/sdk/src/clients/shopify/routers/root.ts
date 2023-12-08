import { createTRPCRouter, publicProcedure } from "../trpc/trpc";
import { productRouter } from "./product";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => "ok"),
  product: productRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
