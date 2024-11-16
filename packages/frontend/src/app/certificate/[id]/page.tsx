'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

import { CertificateViewer } from '@/components/certificate/certificate-viewer';
import { ConnectButton } from '@/components/connect-button';

export default function CertificateDetail({
  params,
}: {
  params: { id: string };
}) {
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
              className='flex items-center text-gray-600 hover:text-blue-600 
                        transition-colors duration-200 group'
              href='/'
            >
              <svg
                className='w-5 h-5 mr-2 transform group-hover:-translate-x-1 
                          transition-transform duration-200'
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
            <div className='sm:ml-4'>
              <h1 className='text-3xl font-bold text-gray-900'>
                인증서 상세
                <span className='block text-base font-normal text-gray-500 mt-1'>
                  블록체인에 기록된 인증서 정보를 확인합니다
                </span>
              </h1>
            </div>
          </div>
          <ConnectButton />
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-8'>
          <CertificateViewer certificateId={params.id} />
        </div>
      </div>
    </main>
  );
}
