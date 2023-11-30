import { Connection } from "@sdk/clients/shopify/types";
import { Image } from "@sdk/clients/shopify/types/image";
import { removeEdgesAndNodes } from ".";

export const reshapeImages = (
  images: Connection<Image>,
  productTitle: string
): Image[] => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = /.*\/(.*)\..*/.exec(image.url)?.[1];

    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`,
    };
  });
};
