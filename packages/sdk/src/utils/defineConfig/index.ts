import { ShopifyConfiguration } from "@sdk/clients/shopify/configuration";

interface DefineConfigProps {
  platform: ShopifyConfiguration;
}

export const defineConfig = (callback: () => DefineConfigProps) => {
  const options = callback();
  return options;
};
