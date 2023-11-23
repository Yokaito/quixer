import { Connection } from "@sdk/utils/types";
import { Image } from "@sdk/utils/types/image";
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
