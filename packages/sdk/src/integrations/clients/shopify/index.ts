import { ensureStartsWith } from "@sdk/utils";
import type { ExtractVariables } from "@sdk/utils/types";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { isShopifyError } from "./type-guards";

const versions = {
  "2023-10": "2023-10",
  "2023-07": "2023-07",
  "2023-04": "2023-04",
  "2023-01": "2023-01",
} as const;

type ShopifyFetch<T> = {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
};

type ShopifyResponse<T> = {
  status: number;
  body: T;
};

const schemaShopifyClient = z.object({
  key: z.string(),
  endpoint: z.string().regex(/^[a-z0-9-]+\.myshopify\.com$/),
  version: z.nativeEnum(versions),
});

export class ShopifyClient {
  constructor(
    private readonly key: string,
    private readonly endpoint: string,
    private readonly version: keyof typeof versions = "2023-01"
  ) {
    const isShopifyClient = schemaShopifyClient.safeParse({
      key,
      endpoint,
      version,
    });

    if (!isShopifyClient.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: isShopifyClient.error.message,
      });
    }

    this.key = isShopifyClient.data.key;
    this.endpoint = isShopifyClient.data.endpoint;
    this.version = isShopifyClient.data.version;
  }

  fetch = async <T>({
    cache = "force-cache",
    headers,
    query,
    tags,
    variables,
  }: ShopifyFetch<T>): Promise<ShopifyResponse<T>> => {
    const url = ensureStartsWith(this.endpoint, "https://");
    const version = `/api/${versions[this.version]}/graphql.json`;
    const endpoint = `${url}${version}`;

    try {
      const result = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": this.key,
          ...headers,
        },
        body: JSON.stringify({
          ...(query && { query }),
          ...(variables && { variables }),
        }),
        cache,
        ...(tags && { next: { tags } }),
      });

      const body = await result.json();

      if (body.errors) {
        throw body.errors[0];
      }

      return {
        status: result.status,
        body,
      };
    } catch (e) {
      if (isShopifyError(e)) {
        throw {
          cause: e.cause?.toString() ?? "unknown",
          status: e.status,
          message: e.message,
          query,
        };
      }

      throw {
        error: e,
        query,
      };
    }
  };
}
