'use client';

import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  toggle: () => {},
});

const getFromLocalStorage = (): string => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem('theme');
    return value || 'light';
  }

  return 'light';
};

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage();
  });

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
