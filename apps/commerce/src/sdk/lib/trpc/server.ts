import 'server-only'; // Make sure you can't import this on client

import env from '@/sdk/env';
import { config } from '@config';
import { appRouter, createTRPCContext, type AppRouter } from '@quixer/sdk/shopify';
import { TRPCClientError, createTRPCProxyClient, loggerLink } from '@trpc/client';
import { callProcedure } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import { TRPCErrorResponse } from '@trpc/server/rpc';
import { cookies } from 'next/headers';
import { cache } from 'react';
import { transformer } from './shared';

const createContext: () => Promise<ReturnType<typeof createTRPCContext>> = cache(() => {
  return new Promise((resolve) => {
    const req = {
      headers: new Headers({
        cookie: cookies().toString(),
        'x-trpc-source': 'rsc'
      })
    };

    const ctx = createTRPCContext({
      req: req,
      configuration: config.platform
    });

    resolve(ctx);
  });
});

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: (op) =>
        env.NODE_ENV === 'development' || (op.direction === 'down' && op.result instanceof Error)
    }),
    /**
     * Custom RSC link that lets us invoke procedures without using http requests. Since Server
     * Components always run on the server, we can just call the procedure as a function.
     */
    () =>
      ({ op }) =>
        observable((observer) => {
          createContext()
            .then((ctx) => {
              return callProcedure({
                procedures: appRouter._def.procedures,
                path: op.path,
                rawInput: op.input,
                ctx,
                type: op.type
              });
            })
            .then((data) => {
              observer.next({ result: { data } });
              observer.complete();
            })
            .catch((cause: TRPCErrorResponse) => {
              observer.error(TRPCClientError.from(cause));
            });
        })
  ]
});
