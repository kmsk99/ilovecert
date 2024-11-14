import './globals.css';

import React from 'react';

import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import { NetworkCheck } from '@/components/network-check';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='ko'>
      <body suppressHydrationWarning className={inter.className}>
        <Providers>
          <NetworkCheck />
          {children}
        </Providers>
        <Toaster richColors position='top-right' />
      </body>
    </html>
  );
}
