'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';

import { useCertificates } from '@/hooks/use-certificates';

export function CertificateList() {
  const { address } = useAccount();
  const { data: certificates, isLoading } = useCertificates(address);

  if (!address) {
    return (
      <div className='text-center py-20'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4'>
          <svg
            className='w-8 h-8 text-blue-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
            />
          </svg>
        </div>
        <p className='text-gray-600 mb-2'>
          지갑을 연결하면 발급된 인증서를 확인할 수 있습니다
        </p>
        <p className='text-sm text-gray-500'>
          안전하고 신뢰할 수 있는 블록체인 기반 인증서
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className='text-center py-20'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 animate-pulse mb-4'>
          <div className='w-8 h-8 bg-gray-200 rounded-full'></div>
        </div>
        <div className='h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse'></div>
      </div>
    );
  }

  if (!certificates?.length) {
    return (
      <div className='text-center py-20'>
        <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-50 mb-4'>
          <svg
            className='w-8 h-8 text-yellow-500'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
            />
          </svg>
        </div>
        <p className='text-gray-600 mb-2'>발급된 인증서가 없습니다</p>
        <p className='text-sm text-gray-500'>
          인증서 발급을 요청하거나 기다려주세요
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {certificates
        .filter((cert): cert is NonNullable<typeof cert> => cert !== null)
        .map(cert => (
          <Link
            key={cert.id}
            className='group block p-6 bg-white rounded-xl border border-gray-100 
                     hover:shadow-lg transition-all duration-200 hover:-translate-y-1'
            href={`/certificate/${cert.id}`}
          >
            <div className='flex flex-col h-full'>
              <div className='flex items-center justify-between mb-4'>
                <h3
                  className='text-xl font-semibold text-gray-900 group-hover:text-blue-600 
                             transition-colors duration-200'
                >
                  {cert.name}
                </h3>
                <svg
                  className='w-5 h-5 text-gray-400 group-hover:text-blue-500 
                              transform group-hover:translate-x-1 transition-all duration-200'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    d='M9 5l7 7-7 7'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                  />
                </svg>
              </div>

              <div className='flex-grow space-y-3'>
                <div className='flex items-center text-gray-600'>
                  <span className='text-sm font-medium w-20'>수령인</span>
                  <span className='text-sm truncate'>{cert.recipient}</span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <span className='text-sm font-medium w-20'>발급자</span>
                  <span className='text-sm truncate font-mono'>
                    {cert.issuer.slice(0, 6)}...{cert.issuer.slice(-4)}
                  </span>
                </div>
              </div>

              <div className='mt-4 pt-4 border-t border-gray-100'>
                <time
                  className='text-sm text-gray-500'
                  dateTime={new Date(cert.issuedAt).toISOString()}
                >
                  {new Date(cert.issuedAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
