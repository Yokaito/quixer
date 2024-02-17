import { useCallback } from 'react';
import { QUIXER_THEME_KEY } from '../constants';
import { useCookie } from './useCookie';

export const useColorScheme = () => {
  const [isDark, setDark] = useCookie(QUIXER_THEME_KEY, 'false');

  const handleChangeColorScheme = useCallback(() => {
    if (isDark === 'true') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }

    setDark(isDark === 'true' ? 'false' : 'true');
  }, [isDark, setDark]);

  return {
    isDark,
    toggle: handleChangeColorScheme
  };
};
