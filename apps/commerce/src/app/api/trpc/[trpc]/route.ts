import env from '@/sdk/env';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { appRouter, createTRPCContext, integrations } from 'server';

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () =>
      createTRPCContext({
        req,
        integrations: {
          shopify: {
            client: new integrations.shopify.client(
              env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
              `${env.SHOPIFY_STORE_DOMAIN}`
            )
          }
        }
      }),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
          }
        : undefined
  });

export { handler as GET, handler as POST };
