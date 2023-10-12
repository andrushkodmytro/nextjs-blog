'use client';

import { ThemeContext } from '@/app/context/ThemeContext';
import React, { useContext, useEffect, useState } from 'react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return <div className={theme}>{children}</div>;
  }
};

export default ThemeProvider;
