import { createTRPCRouter, publicProcedure } from "../trpc";

export const helloRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return {
      greeting: "Hello, world!",
    };
  }),
});
