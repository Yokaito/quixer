'use client';

import { cn } from '@/sdk/utils/tailwind';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { forwardRef } from 'react';

type Props = React.ComponentPropsWithoutRef<'a'>;

export const Wishlist = forwardRef<HTMLAnchorElement, Props>(({ className, ...rest }, ref) => {
  const itemsInWishlist = 12;

  return (
    <Link {...rest} ref={ref} className={cn('relative flex p-2', className)} href="/wishlist">
      {itemsInWishlist > 0 && (
        <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-900 bg-white text-center text-xs font-semibold dark:border-white dark:bg-zinc-900">
          {itemsInWishlist.toString().substring(0, 2)}
        </span>
      )}
      <Heart className='className="text-zinc-900 dark:text-white"' />
      <span aria-label="wishlist" className="sr-only">
        Wishlist
      </span>
    </Link>
  );
});

Wishlist.displayName = 'Wishlist';
