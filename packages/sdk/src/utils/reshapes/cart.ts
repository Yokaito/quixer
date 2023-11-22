import { removeEdgesAndNodes } from ".";
import { Cart, CartReshaped } from "../types/cart";

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
