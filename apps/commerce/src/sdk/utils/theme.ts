import { headers } from 'next/headers';
import { QUIXER_THEME_KEY } from '../constants';

export const isDarkTheme = (): 'light' | 'dark' => {
  const cookies =
    headers()
      .get('cookie')
      ?.split(';')
      .map((cookie) => cookie.trim()) ?? [];
  const cookie = cookies.find((cookie) => cookie.startsWith(QUIXER_THEME_KEY));

  if (cookie) {
    const isDark = cookie.split('=')[1] === 'true';

    return isDark ? 'dark' : 'light';
  }

  return 'light';
};
