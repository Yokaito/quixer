import Cookies from 'js-cookie';
import { useCallback, useEffect, useState } from 'react';

type UseCookie = [string, (_value: string) => void, () => void];

export function useCookie(key: string, initialValue: string): UseCookie {
  const getCookie = useCallback(() => Cookies.get(key) || initialValue, [key, initialValue]);

  const [cookie, setCookieState] = useState(getCookie);

  const updateCookie = (value: string) => {
    Cookies.set(key, value);
    setCookieState(value);
  };

  const deleteCookie = () => {
    Cookies.remove(key);
    setCookieState('');
  };

  useEffect(() => {
    setCookieState(getCookie());
  }, [getCookie]);

  return [cookie, updateCookie, deleteCookie];
}

export default useCookie;
