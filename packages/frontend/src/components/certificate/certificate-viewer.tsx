'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useCertificate } from '@/hooks/use-certificate';
import { formatDate } from '@/lib/utils';

interface CertificateViewerProps {
  certificateId: string;
}

interface MetadataType {
  description: string;
  issuerName: string;
  issuerTitle: string;
  organizationName: string;
  image: string;
  recipient: string;
  createdAt: string;
}

export function CertificateViewer({ certificateId }: CertificateViewerProps) {
  const certificate = useCertificate(certificateId);

  const [metadata, setMetadata] = useState<MetadataType | null>(null);
  const [isMetadataLoading, setIsMetadataLoading] = useState(true);

  useEffect(() => {
    async function fetchMetadata() {
      if (!certificate?.imageUrl) return;

      try {
        const response = await fetch(certificate?.imageUrl);
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error('메타데이터 로딩 실패:', error);
      } finally {
        setIsMetadataLoading(false);
      }
    }

    if (certificate) {
      fetchMetadata();
    }
  }, [certificate]);

  if (!certificate || isMetadataLoading) {
    return (
      <div className='flex justify-center items-center min-h-[400px]'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  if (!metadata) {
    return (
      <div className='text-center py-10 bg-red-50 text-red-600 rounded-lg'>
        인증서를 찾을 수 없거나 로드하는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='space-y-6'>
          <h2 className='text-3xl font-bold mb-6'>{certificate.name}</h2>

          <div className='space-y-4'>
            <InfoField label='수령인' value={certificate.recipient} />
            <InfoField label='발급 기관' value={metadata.organizationName} />
            <InfoField
              label='발급자'
              value={`${metadata.issuerName} ${metadata.issuerTitle}`}
            />
            <InfoField
              label='발급일'
              value={formatDate(certificate.issuedAt)}
            />
            <InfoField label='설명' value={metadata.description} />
            <InfoField
              isMonospace
              label='컨트랙트 주소'
              value={certificate.issuer}
            />
          </div>
        </div>

        <div className='relative'>
          {certificate.imageUrl && (
            <div className='relative w-full aspect-[3/4] rounded-lg overflow-hidden shadow-lg'>
              <Image
                fill
                priority
                alt='Certificate'
                className='object-contain'
                src={certificate.imageUrl}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface InfoFieldProps {
  label: string;
  value: string;
  isMonospace?: boolean;
}

function InfoField({ label, value, isMonospace }: InfoFieldProps) {
  return (
    <div className='space-y-1'>
      <label className='text-sm font-medium text-gray-500'>{label}</label>
      <p
        className={`${isMonospace ? 'font-mono text-sm' : 'text-lg'} break-all`}
      >
        {value}
      </p>
    </div>
  );
}
