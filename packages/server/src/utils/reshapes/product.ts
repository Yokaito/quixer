import { Product, ProductReshaped } from "../types/product";
import { removeEdgesAndNodes } from "./edges";
import { reshapeImages } from "./image";

export const reshapeProduct = (
  product: Product,
  filterHiddenProducts: boolean = true,
  hiddenProductTag: string = "hidden"
): ProductReshaped | undefined => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(hiddenProductTag))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants),
  };
};

export const reshapeProducts = (products: Product[]): ProductReshaped[] => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);

      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};
