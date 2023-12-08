'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useMemo } from 'react';

import env from '@/sdk/env';
import { appRouter } from '@quixer/sdk/shopify';
import { getUrl, transformer } from './shared';

export const api = createTRPCReact<typeof appRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode; headers: Headers }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } }
      }),
    []
  );

  const trpcClient = useMemo(
    () =>
      api.createClient({
        transformer,
        links: [
          loggerLink({
            enabled: (op) =>
              env.NODE_ENV === 'development' ||
              (op.direction === 'down' && op.result instanceof Error)
          }),
          unstable_httpBatchStreamLink({
            url: getUrl(),
            headers() {
              const heads = new Map(props.headers);
              heads.set('x-trpc-source', 'react');
              return Object.fromEntries(heads);
            }
          })
        ]
      }),
    [props.headers]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children} <ReactQueryDevtools />
      </api.Provider>
    </QueryClientProvider>
  );
}
