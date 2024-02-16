'use client';

import { useColorScheme } from '@/sdk/hooks/useColorScheme';
import { MoonStar, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { toggle } = useColorScheme();

  return (
    <div className="flex w-max flex-col justify-center">
      <button className="cursor-pointer p-2" onClick={() => toggle()}>
        <MoonStar className="dark:hidden" />
        <Sun className="hidden dark:block" />
        <span className="sr-only">Switch to light / dark version</span>
      </button>
    </div>
  );
};
