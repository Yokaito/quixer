// import { ShopifyClient } from "..";
// import { reshapeProduct } from "../../../utils/reshapes";
// import { ProductReshaped } from "../../../utils/types/product";
// import { ShopifyProductOperation, getProductQuery } from "../queries/product";

// type Props = {
//   variables: {
//     handle: string;
//   };
//   fetch: ShopifyClient;
// };

// export const getProductByHandle = async ({
//   fetch,
//   variables,
// }: Props): Promise<ProductReshaped | undefined> => {
//   const res = await fetch<ShopifyProductOperation>({
//     query: getProductQuery,
//     tags: [],
//     variables: {
//       handle: variables.handle,
//     },
//     context: {
//       endpoint: "https://shopify.dev/api/graphql",
//       key: "123",
//     },
//   });

//   return reshapeProduct(res.body.data.product, false);
// };
