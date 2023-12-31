import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    SHOPIFY_STORE_DOMAIN: z.string(),
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: z.string(),
    SHOPIFY_ADMIN_ACCESS_TOKEN: z.string()
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_ADMIN_ACCESS_TOKEN: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN
  }
});

export default env;
