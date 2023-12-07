import { appRouter } from "@sdk/clients/shopify";
import { createInnerTRPCContext } from "@sdk/clients/shopify/trpc/context.inner";
import { QuixerProductSchema } from "@sdk/utils/schemas/product";
import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  productShopifyMock,
  productShopifyMockWithMetafields,
} from "./mocks/product";

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

  test("Route should return undefined if product doesn't exists", async () => {
    vi.spyOn(client, "getByHandle").mockResolvedValue(undefined);

    const product = await caller.product.getByHandle({ handle: "notFound" });

    expect(product).toBeUndefined();
  });

  test("Route return product when product is find", async () => {
    vi.spyOn(client, "getByHandle").mockResolvedValue(productShopifyMock);

    const product = await caller.product.getByHandle({ handle: "handle" });

    expect(product).toBeDefined();
  });

  test("Route product should match QuixerProductSchema", async () => {
    vi.spyOn(client, "getByHandle").mockResolvedValue(productShopifyMock);

    const product = await caller.product.getByHandle({ handle: "handle" });

    expect(QuixerProductSchema.parse(product)).toBeDefined();
  });

  test("Route product should match QuixerProductSchema with metafields", async () => {
    vi.spyOn(client, "getByHandle").mockResolvedValue(
      productShopifyMockWithMetafields
    );

    const product = await caller.product.getByHandle({
      handle: "handle",
      identifiers: [{ key: "teste" }],
    });

    expect(QuixerProductSchema.parse(product)).toBeDefined();
  });
});
