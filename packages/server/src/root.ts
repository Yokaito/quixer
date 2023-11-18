import "server-only";

import { helloRouter } from "./routers/hello";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  hello: helloRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
