'use client';

import { useAccount } from 'wagmi';

import { useCertificates } from '../../hooks/use-certificates';
import { Certificate } from '../../types/certificate';

export function CertificateList() {
  const { address } = useAccount();
  const { data: certificates, isLoading } = useCertificates(address);

  if (!address) {
    return (
      <div className="text-center py-8">
        <p>지갑을 연결해주세요</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>로딩중...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certificates?.map((cert: Certificate) => (
        <div
          key={cert.id.toString()}
          className="p-4 border rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <h3 className="font-bold">{cert.certificateType}</h3>
          <p className="text-sm text-gray-600">발급자: {cert.issuerName}</p>
          <p className="text-sm text-gray-600">
            발급일: {new Date(Number(cert.issuedAt) * 1000).toLocaleDateString()}
          </p>
          <div className="mt-2">
            <span
              className={`px-2 py-1 text-xs rounded ${
                cert.isValid
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {cert.isValid ? '유효' : '취소됨'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
} 