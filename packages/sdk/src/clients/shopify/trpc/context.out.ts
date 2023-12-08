import {
  ShopifyConfiguration,
  ShopifyConfigurationSchema,
} from "@sdk/clients/shopify/configuration";
import { createInnerTRPCContext } from "./context.inner";

interface TRPCContextProps {
  req: {
    headers: Headers;
  };
  configuration: ShopifyConfiguration;
}

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: TRPCContextProps) => {
  // Fetch stuff that depends on the request
  const safeConfiguration = ShopifyConfigurationSchema.parse(
    opts.configuration
  );

  return createInnerTRPCContext({
    req: opts.req,
    configuration: safeConfiguration,
  });
};
