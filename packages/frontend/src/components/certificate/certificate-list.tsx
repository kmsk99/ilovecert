'use client';

import Link from 'next/link';
import { useAccount } from 'wagmi';

import { useCertificates } from '@/hooks/use-certificates';

export function CertificateList() {
  const { address } = useAccount();
  const { data: certificates, isLoading } = useCertificates(address);

  if (isLoading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!certificates?.length) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">발급된 인증서가 없습니다</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((cert) => (
        <Link
          key={cert.id}
          href={`/certificate/${cert.id}`}
          className="block p-6 border rounded-lg hover:shadow-lg transition-all hover:-translate-y-1"
        >
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-semibold mb-2 truncate">{cert.name}</h3>
            <div className="flex-grow">
              <div className="flex items-center text-gray-600 mb-2">
                <span className="text-sm font-medium w-16">수령인:</span>
                <span className="text-sm truncate">{cert.recipient}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-sm font-medium w-16">발급자:</span>
                <span className="text-sm truncate">{cert.issuer}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
              발급일: {new Date(Number(cert.issuedAt)).toLocaleDateString()}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 