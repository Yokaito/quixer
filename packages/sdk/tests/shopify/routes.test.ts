import { appRouter } from "@sdk/clients/shopify";
import { createInnerTRPCContext } from "@sdk/clients/shopify/trpc/context.inner";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("Shopify Routers", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const ctx = createInnerTRPCContext({
    headers: new Headers(),
    cookies: {} as any,
    configuration: {
      domain: "test.myshopify.com",
      platform: "shopify",
      version: "2023-10",
      tokens: {
        admin: "admin",
        storefront: "storefront",
      },
    },
  });

  const { client } = ctx;

  const caller = appRouter.createCaller({
    ...ctx,
    client: client,
  });

  test("Has route product.getByHandle()", async () => {
    expect(typeof caller?.product?.getByHandle).toBe("function");
  });
});
