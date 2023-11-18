import { HIDDEN_PRODUCT_TAG } from '../../constants';
import { Product, ShopifyProduct } from '../fragments';
import { removeEdgesAndNodes } from './edges';
import { reshapeImages } from './image';

export const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
): Product | undefined => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
  };
};

export const reshapeProducts = (products: ShopifyProduct[]): Product[] => {
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
