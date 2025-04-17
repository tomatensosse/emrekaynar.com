'use client';

import { ReactNode } from 'react';
import { AppProvider } from '@/contexts/AppContext';

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}