'use client';

import Image from 'next/image';

import { useCertificate } from '@/hooks/use-certificate';

interface CertificateViewerProps {
  certificateId: string;
}

export function CertificateViewer({ certificateId }: CertificateViewerProps) {
  const { data: certificate, isLoading } = useCertificate(certificateId);

  if (isLoading) {
    return <div className="text-center py-10">로딩 중...</div>;
  }

  if (!certificate) {
    return <div className="text-center py-10">인증서를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{certificate.name}</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500">발급자</label>
          <p>{certificate.issuer}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">수령인</label>
          <p>{certificate.recipient}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">발급일</label>
          <p>{new Date(Number(certificate.issuedAt)).toLocaleDateString()}</p>
        </div>
        {certificate.imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={certificate.imageUrl}
              alt="Certificate"
              className="max-w-full h-auto rounded-lg"
              fill
            />
          </div>
        )}
      </div>
    </div>
  );
} 