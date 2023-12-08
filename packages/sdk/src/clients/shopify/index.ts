import { appRouter, AppRouter } from "./routers/root";
import { createTRPCContext } from "./trpc/context.out";

export { appRouter, createTRPCContext };
export type { AppRouter };
