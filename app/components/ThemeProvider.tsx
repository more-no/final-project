'use client';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function Theme({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
