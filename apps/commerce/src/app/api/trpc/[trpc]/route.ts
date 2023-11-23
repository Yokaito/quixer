import env from '@/sdk/env';
import { appRouter, clients, createTRPCContext } from '@quixer/sdk';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';

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
            client: new clients.shopify.client(
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
