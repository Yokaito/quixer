import { reshapeProduct } from "@sdk/clients/shopify/reshapes";
import type { ExtractVariables } from "@sdk/clients/shopify/types";
import { ProductReshaped } from "@sdk/clients/shopify/types/product";
import { ensureStartsWith } from "@sdk/utils";
import { TRPCError } from "@trpc/server";
import {
  ShopifyConfiguration,
  ShopifyConfigurationSchema,
} from "../configuration";
import { TAGS } from "./constants";
import { ShopifyProductOperation, getProductQuery } from "./queries/product";
import { isShopifyError } from "./type-guards";

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

export class ShopifyClient {
  constructor(private readonly config: ShopifyConfiguration) {
    const safeConfig = ShopifyConfigurationSchema.safeParse(config);

    if (!safeConfig.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: safeConfig.error.message,
      });
    }

    this.config = safeConfig.data;
  }

  fetch = async <T>({
    cache = "force-cache",
    headers,
    query,
    tags,
    variables,
  }: ShopifyFetch<T>): Promise<ShopifyResponse<T>> => {
    const { domain, tokens, version } = this.config;

    const url = ensureStartsWith(domain, "https://");
    const endpoint = `${url}/api/${version}/graphql.json`;

    try {
      const result = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": tokens.storefront,
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

  getByHandle = async (
    handle: string
  ): Promise<ProductReshaped | undefined> => {
    const result = await this.fetch<ShopifyProductOperation>({
      query: getProductQuery,
      tags: [TAGS.products],
      variables: {
        handle,
      },
    });

    const product = reshapeProduct(result.body.data.product, false);

    return product;
  };
}
