'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';

import { CertificateList } from '@/components/certificate/certificate-list';
import { ConnectButton } from '@/components/connect-button';

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-12'>
          <div className='mb-6 sm:mb-0'>
            <h1 className='text-4xl font-extrabold text-gray-900 tracking-tight'>
              iLoveCert
              <span className='block text-lg font-medium text-gray-500 mt-1'>
                블록체인 기반 디지털 인증서 플랫폼
              </span>
            </h1>
          </div>
          <div className='flex flex-col sm:flex-row items-center gap-4'>
            {isConnected && (
              <Link
                className='px-6 py-3 bg-blue-600 text-white font-medium rounded-xl 
                          hover:bg-blue-700 transition-colors duration-200 ease-in-out 
                          shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                href='/new'
              >
                새 인증서 발급
              </Link>
            )}
            <ConnectButton />
          </div>
        </div>

        {isConnected ? (
          <div className='bg-white rounded-2xl shadow-xl p-6'>
            <CertificateList />
          </div>
        ) : (
          <div className='text-center py-32 bg-white rounded-2xl shadow-xl'>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              환영합니다!
            </h2>
            <p className='text-gray-600 mb-8'>
              지갑을 연결하여 블록체인 기반 디지털 인증서를 확인하세요
            </p>
            <ConnectButton />
          </div>
        )}
      </div>
    </main>
  );
}
