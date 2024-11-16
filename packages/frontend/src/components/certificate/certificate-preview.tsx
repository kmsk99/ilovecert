'use client';

import { useRef } from 'react';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';

import { CertificateFormData } from '@/types/certificate';

interface CertificatePreviewProps extends CertificateFormData {}

export function CertificatePreview({
  recipientName,
  certificateType,
  description,
  issuerName,
  issuerTitle,
  organizationName,
  issuedAt,
  logoBase64,
  bgColor = 'white',
  borderColor = 'black',
}: CertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

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

      pdf.save(`${certificateType}_${recipientName}.pdf`);
    } catch (error) {
      console.error('PDF 생성 중 오류:', error);
    }
  };

  return (
    <div className='space-y-4'>
      <div
        ref={certificateRef}
        className='w-full aspect-[1/1.414] relative'
        id='certificate-preview'
        style={{
          backgroundColor: bgColor,
          boxShadow: '0 4px 24px -1px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div
          className='absolute left-0 top-0 h-full w-2'
          style={{ backgroundColor: borderColor }}
        />

        <div className='h-full flex flex-col p-12'>
          <div className='flex justify-between items-start mb-12'>
            {logoBase64 && (
              <div className='relative'>
                <Image
                  alt='Logo'
                  className='h-12 w-auto object-contain'
                  height={48}
                  src={logoBase64}
                  width={48}
                />
              </div>
            )}
            <div className={logoBase64 ? 'text-right' : 'text-left'}>
              <div
                className='text-sm font-medium mb-1'
                style={{ color: borderColor }}
              >
                NO. {Math.random().toString(36).substr(2, 6).toUpperCase()}
              </div>
              <div className='text-sm text-gray-500'>{issuedAt}</div>
            </div>
          </div>

          <div className='flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full text-center'>
            <h1
              className='text-4xl font-bold mb-8 tracking-tight'
              style={{ color: borderColor }}
            >
              {certificateType}
            </h1>

            <div className='space-y-6 mb-12'>
              <div>
                <p className='text-gray-500 text-lg mb-2'>
                  This Certificate is Awarded to
                </p>
                <h2 className='text-3xl font-bold text-gray-800'>
                  {recipientName}
                </h2>
              </div>

              <p className='text-gray-600 leading-relaxed whitespace-pre-wrap'>
                {description}
              </p>
            </div>
          </div>

          <div className='border-t border-gray-200 pt-8 mt-auto'>
            <div className='flex justify-between items-end'>
              <div>
                <div className='text-xl font-bold text-gray-800 mb-1'>
                  {organizationName}
                </div>
                <div className='text-gray-500 text-sm'>
                  {issuerTitle} | {issuerName}
                </div>
              </div>
              <div
                className='text-5xl font-serif opacity-10 font-bold'
                style={{ color: borderColor }}
              >
                ✦
              </div>
            </div>
          </div>
        </div>

        <div
          className='absolute top-0 right-0 w-48 h-48 opacity-[0.03]'
          style={{
            backgroundColor: borderColor,
            clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          }}
        />
      </div>

      <button
        className='w-full py-3 px-4 rounded-lg transition-all duration-200 
        font-medium text-base flex items-center justify-center gap-2'
        style={{
          backgroundColor: borderColor,
          color: 'white',
        }}
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
  );
}
