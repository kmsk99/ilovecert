'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';

import { CertificateList } from '@/components/certificate/certificate-list';
import { ConnectButton } from '@/components/connect-button';

// Updated: 2024-11-16 - Modern UI Enhancement
export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className='px-4 sm:px-6 lg:px-8 py-12'>
      <div className='flex flex-col sm:flex-row justify-between items-center mb-12'>
        <div className='mb-6 sm:mb-0 text-center sm:text-left'>
          <h1
            className='text-4xl sm:text-5xl font-extrabold text-transparent 
                        bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800'
          >
            iLoveCert
          </h1>
          <p className='mt-3 text-lg sm:text-xl text-gray-600 max-w-2xl'>
            블록체인 기술로 신뢰할 수 있는 디지털 인증서를 발급하고 관리하세요
          </p>
        </div>
        <div className='flex flex-col sm:flex-row items-center gap-4'>
          {isConnected && (
            <Link
              className='px-6 py-3 bg-blue-600 text-white font-medium rounded-xl 
                        hover:bg-blue-700 transition-all duration-200 
                        shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                        flex items-center gap-2'
              href='/new'
            >
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  d='M12 4v16m8-8H4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                />
              </svg>
              새 인증서 발급
            </Link>
          )}
          <ConnectButton />
        </div>
      </div>

      {isConnected ? (
        <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8'>
          <div className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-900'>내 인증서 목록</h2>
            <p className='text-gray-500 mt-1'>
              발급받은 모든 인증서를 확인할 수 있습니다
            </p>
          </div>
          <CertificateList />
        </div>
      ) : (
        <div className='text-center py-20 bg-white rounded-2xl shadow-xl'>
          <div className='max-w-md mx-auto px-4'>
            <div
              className='inline-flex items-center justify-center w-16 h-16 
                          rounded-full bg-blue-100 mb-6'
            >
              <svg
                className='w-8 h-8 text-blue-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                />
              </svg>
            </div>
            <h2 className='text-2xl font-bold text-gray-900 mb-4'>
              안전하고 신뢰할 수 있는 인증서 플랫폼
            </h2>
            <p className='text-gray-600 mb-8 leading-relaxed'>
              블록체인 기술을 활용하여 위변조가 불가능한 디지털 인증서를
              발급하고 관리하세요. 지갑을 연결하여 시작해보세요.
            </p>
            <ConnectButton />
          </div>
        </div>
      )}
    </main>
  );
}
