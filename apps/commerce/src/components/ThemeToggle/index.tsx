'use client';

import { useColorScheme } from '@/sdk/hooks/useColorScheme';

export const ThemeToggle = () => {
  const { toggle } = useColorScheme();

  return (
    <button type="button" onClick={toggle} className="text-amber-600 dark:text-blue-700">
      toggle
    </button>
  );
};
