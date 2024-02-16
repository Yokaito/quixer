import { ThemeToggle } from '@/components/ThemeToggle';

export const Header = () => {
  return (
    <header className="sticky">
      <div className="container">
        <ThemeToggle />
      </div>
    </header>
  );
};
