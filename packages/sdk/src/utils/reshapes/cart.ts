import { Cart, CartReshaped } from "@sdk/utils/types/cart";
import { removeEdgesAndNodes } from ".";

export const reshapeCart = (cart: Cart): CartReshaped => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: "USD",
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
};
