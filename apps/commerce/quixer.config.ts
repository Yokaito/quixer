import env from '@/sdk/env';
import { defineConfig } from '@quixer/sdk';

export const config = defineConfig(() => ({
  platform: {
    platform: 'shopify',
    domain: env.SHOPIFY_STORE_DOMAIN,
    version: '2023-10',
    tokens: {
      admin: env.SHOPIFY_ADMIN_ACCESS_TOKEN,
      storefront: env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
    }
  }
}));
