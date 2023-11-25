import { ShopifyConfiguration } from "@sdk/clients/shopify/configuration";
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";
import { ShopifyClient } from "../utils";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */

export interface InnerTRPCContextProps {
  headers: Headers;
  cookies: RequestCookies;
  configuration: ShopifyConfiguration;
}

export interface InnerTRPCContextResponse {
  req: {
    headers: Headers;
    cookies: RequestCookies;
  };
  client: ShopifyClient;
  configuration: ShopifyConfiguration;
}

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-serverapitrpcts
 */
export const createInnerTRPCContext = (
  opts: InnerTRPCContextProps
): InnerTRPCContextResponse => {
  return {
    req: {
      headers: opts.headers,
      cookies: opts.cookies,
    },
    client: new ShopifyClient(opts.configuration),
    configuration: opts.configuration,
  };
};
