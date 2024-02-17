import { CartToggle } from '@/components/Cart/Toggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { User } from '@/components/User';
import { Wishlist } from '@/components/Wishlist';
import { Logo } from '@/components/ui/Logo';

export const Header = () => {
  return (
    <header className="sticky">
      <nav className="container border-b border-b-zinc-900 py-3 dark:border-b-white md:py-6">
        <div className="flex gap-3 md:grid md:grid-cols-[1fr_4fr_1fr]">
          <ThemeToggle />
          <div className="flex w-full justify-center">
            <Logo />
          </div>
          <div className="flex items-center justify-end gap-3">
            <User />
            <Wishlist className="hidden md:flex" />
            <CartToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};
