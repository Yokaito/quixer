import { Product } from "@sdk/clients/shopify/types/product";
import { productFragment } from "../fragments";

export type ShopifyProductOperation = {
  data: { product: Product };
  variables: {
    handle: string;
    identifiers: { key: string; namespace: string }[];
  };
};

export const getProductQuery = /* GraphQL */ `
  query getProduct(
    $handle: String!
    $identifiers: [HasMetafieldsIdentifier!]!
  ) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;
