import { cn } from '@/sdk/utils/tailwind';
import { UserRound, UserRoundCheck } from 'lucide-react';
import Link from 'next/link';

export const User = () => {
  const isLogged = true;

  return (
    <Link href="/login" className="flex p-2">
      <UserRound
        name="user-round"
        className={cn(
          {
            hidden: isLogged
          },
          'text-zinc-900 dark:text-white'
        )}
      />
      <UserRoundCheck
        name="user-round-check"
        className={cn(
          {
            hidden: !isLogged
          },
          'text-zinc-900 dark:text-white'
        )}
      />
      <span aria-label="user login" className="sr-only">
        User
      </span>
    </Link>
  );
};
