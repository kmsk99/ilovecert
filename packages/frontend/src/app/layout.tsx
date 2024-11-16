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
      <head>
        <title>iLoveCert - 블록체인 기반 디지털 인증서 플랫폼</title>
        <meta
          content='블록체인 기술을 활용한 안전하고 신뢰할 수 있는 디지털 인증서 발급 플랫폼'
          name='description'
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased`}
      >
        <Providers>
          <NetworkCheck />
          {children}
        </Providers>
        <Toaster
          richColors
          position='top-right'
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
            },
          }}
        />
      </body>
    </html>
  );
}
