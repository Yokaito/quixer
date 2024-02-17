'use client';

import { ShoppingBag } from 'lucide-react';

export const CartToggle = () => {
  const itemsLength = 5;

  const handleOpenCart = () => {
    console.log('Open cart');
  };

  return (
    <button className="relative flex p-2" onClick={() => handleOpenCart()}>
      {itemsLength > 0 && (
        <span className="absolute right-0 top-0 flex h-5 w-5 animate-bounce items-center justify-center rounded-full border border-zinc-900 bg-white text-center text-xs font-semibold dark:border-white dark:bg-zinc-900">
          {itemsLength}
        </span>
      )}

      <ShoppingBag className="text-zinc-900 dark:text-white" />
      <span aria-label="cart" className="sr-only">
        Cart
      </span>
    </button>
  );
};
