import './globals.css';

import React from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'iLoveCert - 블록체인 인증서 발급 시스템',
  description: '블록체인 기반의 디지털 인증서 발급 및 검증 시스템',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang='ko'>
      <body suppressHydrationWarning className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster richColors position='top-right' />
      </body>
    </html>
  );
}
