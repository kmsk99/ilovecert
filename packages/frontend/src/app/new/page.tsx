'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

import { CertificateForm } from '@/components/certificate/certificate-form';
import { ConnectButton } from '@/components/connect-button';

export default function NewCertificate() {
  const { isConnected } = useAccount();
  const router = useRouter();

  if (!isConnected) {
    router.push('/');
    return null;
  }

  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-8'>
          <div className='flex flex-col sm:flex-row items-center gap-4 mb-6 sm:mb-0'>
            <Link
              className='flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200'
              href='/'
            >
              <svg
                className='w-5 h-5 mr-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                />
              </svg>
              돌아가기
            </Link>
            <h1 className='text-3xl font-bold text-gray-900 sm:ml-4'>
              새 인증서 발급
              <span className='block text-base font-normal text-gray-500 mt-1'>
                블록체인에 영구적으로 기록될 인증서를 발급합니다
              </span>
            </h1>
          </div>
          <ConnectButton />
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <div className='mx-auto'>
            <div className='mb-8 text-center'>
              <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-4'>
                <svg
                  className='w-6 h-6 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h2 className='text-xl font-semibold text-gray-900'>
                인증서 정보 입력
              </h2>
              <p className='text-gray-500 mt-1'>
                아래 양식을 작성하여 새로운 인증서를 발급하세요
              </p>
            </div>
            <CertificateForm />
          </div>
        </div>
      </div>
    </main>
  );
}
