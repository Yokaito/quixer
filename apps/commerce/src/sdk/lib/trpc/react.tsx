'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { loggerLink, unstable_httpBatchStreamLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useMemo } from 'react';

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
              process.env.NODE_ENV === 'development' ||
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
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children} <ReactQueryDevtools />
      </QueryClientProvider>
    </api.Provider>
  );
}
