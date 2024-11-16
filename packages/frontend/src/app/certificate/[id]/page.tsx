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
    <main className='min-h-screen'>
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
              <h1 className='text-3xl font-bold text-gray-900'>인증서 상세</h1>
              <p className='text-gray-500 mt-1'>
                블록체인에 기록된 인증서 정보를 확인합니다
              </p>
            </div>
          </div>
          <ConnectButton />
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8'>
          <div className='max-w-5xl mx-auto'>
            <div className='mb-8 text-center'>
              <div
                className='inline-flex items-center justify-center w-16 h-16 
                            rounded-full bg-blue-100 mb-4'
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
              <h2 className='text-2xl font-semibold text-gray-900 mb-2'>
                인증서 정보
              </h2>
              <p className='text-gray-500 max-w-xl mx-auto'>
                블록체인에 안전하게 저장된 인증서입니다. 인증서의 진위여부를
                확인하고 상세 정보를 조회할 수 있습니다.
              </p>
            </div>

            <CertificateViewer certificateId={params.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
