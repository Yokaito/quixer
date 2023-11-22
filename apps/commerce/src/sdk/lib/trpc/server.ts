import 'server-only'; // Make sure you can't import this on client

import env from '@/sdk/env';
import { appRouter, createTRPCContext, integrations } from '@quixer/server';
import { headers } from 'next/headers';

type Caller = ReturnType<typeof appRouter.createCaller>;

let caller: Caller | null = null;

// Cache the caller, since this runs per-request anyways.
const getCaller = () => {
  // This fn should be async if create context is async
  if (!caller) {
    caller = appRouter.createCaller(
      createTRPCContext({
        // @ts-expect-error - this is a hack to get the types to work
        req: {
          headers: headers()
        },
        integrations: {
          shopify: {
            client: new integrations.shopify.client(
              env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
              env.SHOPIFY_STORE_DOMAIN,
              '2023-10'
            )
          }
        }
      })
    );
  }
  return caller;
};

// @ts-expect-error - this is a hack to get the implementation to work async
const routeOrCallProxy = (path: (string | symbol)[]) => {
  return new Proxy<Function>( // We use a fn type because it tricks webpack into letting this actually run
    getCaller, // Any function will do, since we override apply
    {
      get: (_, prop) => {
        if (caller) {
          // Route to deeper path in the api caller, for example api.edge.user.get().
          //  This is unlikely to be called if caller exists, but just in case.
          let val: unknown = caller;
          for (const p of path) {
            // @ts-expect-error - this is a hack to get the types to work
            val = val[p];
          }
          // @ts-expect-error - this is a hack to get the types to work
          return val[prop];
        }
        return routeOrCallProxy([...path, prop]) as unknown;
      },
      // Note: this is where you would insert async if the context was async
      apply: (_, __, args) => {
        // Function call should retrieve actual result, so we ensure that the caller exists at this point.
        const caller = getCaller(); // Await this if ctx async
        let val: unknown = caller;
        for (const p of path) {
          // @ts-expect-error - this is a hack to get the types to work
          val = val[p];
        }
        // @ts-expect-error - this is a hack to get the types to work
        return val(...args);
      }
    }
  );
};

export const api = new Proxy<Caller>({} as Caller, {
  get: (_, prop) => {
    if (caller) {
      return caller[prop as keyof Caller];
    }
    return routeOrCallProxy([prop]) as unknown;
  }
});
