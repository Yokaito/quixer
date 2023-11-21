import { ensureStartsWith } from "../../utils";
import type { ExtractVariables } from "../../utils/types";
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

export class ShopifyClient {
  constructor(
    private readonly key: string,
    private readonly endpoint: string,
    private readonly version: keyof typeof versions = "2023-01"
  ) {}

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
