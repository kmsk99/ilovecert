import './globals.css';

import React from 'react';

import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';

import { NetworkCheck } from '@/components/network-check';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

// Updated: 2024-11-16 - Modern UI Enhancement
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
        <link href='/favicon.ico' rel='icon' />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased bg-gradient-to-b from-gray-50 to-white min-h-screen`}
      >
        <Providers>
          <NetworkCheck />
          <div className='mx-auto max-w-7xl'>{children}</div>
        </Providers>
        <Toaster
          richColors
          position='top-right'
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #E2E8F0',
              borderRadius: '0.75rem',
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            className: 'text-sm font-medium',
          }}
        />
      </body>
    </html>
  );
}
