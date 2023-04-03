import { createContext, useEffect, useState } from 'react';

import { getCookie, setCookie } from '../helpers/cookies';

export interface ContextInterface {
  theme: string | null;
  setTheme: (theme: string) => void;
  navOpen: boolean;
  setNavOpen: (theme: boolean) => void;
}

export const AppContext = createContext<ContextInterface>({} as ContextInterface);

export const useAppContext = () => {
  const initialTheme = getCookie('theme') !== null ? getCookie('theme') : 'Light';
  const [theme, setTheme] = useState(initialTheme);
  const [navOpen, setNavOpen] = useState(window.innerWidth >= 994);

  useEffect(() => {
    if (theme) setCookie('theme', 525600, theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    navOpen,
    setNavOpen,
  };
};

export default AppContext;
