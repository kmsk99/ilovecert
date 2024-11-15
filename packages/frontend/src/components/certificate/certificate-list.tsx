'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';

import { useCertificates } from '@/hooks/use-certificates';

export function CertificateList() {
  const { address } = useAccount();
  const { data: certificates, isLoading } = useCertificates(address);

  // 지갑이 연결되지 않은 경우
  if (!address) {
    return (
      <div className='text-center py-10'>
        <p className='text-gray-500'>
          지갑을 연결하면 발급된 인증서를 확인할 수 있습니다.
        </p>
      </div>
    );
  }

  // 로딩 중인 경우
  if (isLoading) {
    return (
      <div className='text-center py-10'>
        <div className='animate-pulse'>
          <div className='h-4 bg-gray-200 rounded w-48 mx-auto'></div>
        </div>
      </div>
    );
  }

  // 인증서가 없는 경우
  if (!certificates?.length) {
    return (
      <div className='text-center py-10'>
        <p className='text-gray-500'>발급된 인증서가 없습니다</p>
        <p className='text-sm text-gray-400 mt-2'>
          인증서 발급을 요청하거나 기다려주세요
        </p>
      </div>
    );
  }

  // 인증서 목록 표시
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {certificates
        .filter((cert): cert is NonNullable<typeof cert> => cert !== null)
        .map(cert => (
          <Link
            key={cert.id}
            className='block p-6 border rounded-lg hover:shadow-lg transition-all hover:-translate-y-1 bg-white'
            href={`/certificate/${cert.id}`}
          >
            <div className='flex flex-col h-full'>
              <h3 className='text-xl font-semibold mb-2 truncate'>
                {cert.name}
              </h3>
              <div className='flex-grow space-y-2'>
                <div className='flex items-center text-gray-600'>
                  <span className='text-sm font-medium w-16'>수령인:</span>
                  <span className='text-sm truncate'>{cert.recipient}</span>
                </div>
                <div className='flex items-center text-gray-600'>
                  <span className='text-sm font-medium w-16'>발급자:</span>
                  <span className='text-sm truncate'>{cert.issuer}</span>
                </div>
              </div>
              <div className='mt-4 pt-4 border-t text-sm text-gray-500'>
                발급일:{' '}
                {new Date(cert.issuedAt).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
