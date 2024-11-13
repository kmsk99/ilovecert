'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';

import { CertificateList } from '@/components/certificate/certificate-list';
import { ConnectButton } from '@/components/connect-button';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold'>iLoveCert</h1>
          <div className='flex items-center gap-4'>
            {isConnected && (
              <Link
                className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
                href='/new'
              >
                새 인증서 발급
              </Link>
            )}
            <ConnectButton />
          </div>
        </div>
        {isConnected ? (
          <CertificateList />
        ) : (
          <div className='text-center py-20'>
            <p className='text-gray-500'>지갑을 연결하여 인증서를 확인하세요</p>
          </div>
        )}
      </div>
    </main>
  );
}
