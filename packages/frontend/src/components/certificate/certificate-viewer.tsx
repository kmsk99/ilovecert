'use client';

import { useEffect, useState, useRef } from 'react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';

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

// Updated: 2024-11-16 - Modern UI Enhancement
export function CertificateViewer({ certificateId }: CertificateViewerProps) {
  const certificate = useCertificate(certificateId);
  const [metadata, setMetadata] = useState<MetadataType | null>(null);
  const [isMetadataLoading, setIsMetadataLoading] = useState(true);
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchMetadata() {
      if (!certificate?.metadataURI) return;

      try {
        const response = await fetch(certificate.metadataURI);
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

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        scale: 1.5,
        logging: false,
        useCORS: true,
        backgroundColor: null,
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/jpeg', 0.8);

      pdf.addImage(
        imgData,
        'JPEG',
        0,
        0,
        imgWidth,
        imgHeight,
        undefined,
        'FAST',
      );

      pdf.save(`${certificate?.name}_${metadata?.recipient}.pdf`);
    } catch (error) {
      console.error('PDF 생성 중 오류:', error);
    }
  };

  if (!certificate || isMetadataLoading) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px] space-y-4'>
        <div className='w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
        <p className='text-gray-500 animate-pulse'>
          인증서 정보를 불러오는 중...
        </p>
      </div>
    );
  }

  if (!metadata) {
    return (
      <div className='flex flex-col items-center justify-center py-12 px-4 bg-red-50 rounded-xl text-red-600 space-y-2'>
        <svg
          className='w-12 h-12'
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
        <h3 className='font-semibold'>인증서를 찾을 수 없습니다</h3>
        <p className='text-sm'>인증서를 불러오는데 실패했습니다</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h2 className='text-3xl font-bold text-gray-900'>
            {certificate.name}
          </h2>
          <p className='text-gray-500'>{metadata.description}</p>
        </div>

        <div className='grid gap-4'>
          <InfoField label='수령인' value={certificate.recipient} />
          <InfoField label='발급 기관' value={metadata.organizationName} />
          <InfoField
            label='발급자'
            value={`${metadata.issuerName} ${metadata.issuerTitle}`}
          />
          <InfoField label='발급일' value={formatDate(certificate.issuedAt)} />
          <InfoField
            isMonospace
            label='컨트랙트 주소'
            value={certificate.issuer}
          />
        </div>

        <div className='pt-6 border-t border-gray-200'>
          <button
            className='w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2'
            onClick={downloadPDF}
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              />
            </svg>
            PDF 다운로드
          </button>
        </div>
      </div>

      <div className='relative'>
        {metadata.image && (
          <div
            ref={certificateRef}
            className='relative aspect-[1/1.414] overflow-hidden shadow-xl border border-gray-200'
          >
            <Image
              fill
              priority
              alt='Certificate'
              className='object-cover'
              src={metadata.image}
            />
          </div>
        )}
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
    <div className='bg-gray-50 rounded-lg p-4 space-y-1'>
      <label className='text-sm font-medium text-gray-500'>{label}</label>
      <p
        className={`${isMonospace ? 'font-mono text-sm' : 'text-lg'} text-gray-900 break-all`}
      >
        {value}
      </p>
    </div>
  );
}
