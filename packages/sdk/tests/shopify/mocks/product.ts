import { ProductReshaped } from "@sdk/clients/shopify/types/product";

export const productShopifyMock: ProductReshaped = {
  id: "id",
  title: "title",
  handle: "handle",
  descriptionHtml: "descriptionHtml",
  metafields: [],
  seo: {
    title: "seoTitle",
    description: "seoDescription",
  },
  images: [],
  variants: [],
  priceRange: {
    maxVariantPrice: {
      amount: "max",
      currencyCode: "USD",
    },
    minVariantPrice: {
      amount: "min",
      currencyCode: "USD",
    },
  },
  updatedAt: "updatedAt",
  availableForSale: true,
  description: "description",
  featuredImage: {
    altText: "altText",
    height: 1,
    width: 1,
    url: "url",
  },
  options: [],
  tags: [],
};

export const productShopifyMockWithMetafields: ProductReshaped = {
  ...productShopifyMock,
  metafields: [
    {
      description: "description",
      id: "id",
      key: "key",
      namespace: "namespace",
      type: "single_line_text_field",
      value: "value",
    },
  ],
};
