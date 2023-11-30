import { Product } from "@sdk/clients/shopify/types/product";
import { productFragment } from "../fragments";

export type ShopifyProductOperation = {
  data: { product: Product };
  variables: {
    handle: string;
  };
};

export const getProductQuery = /* GraphQL */ `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;
