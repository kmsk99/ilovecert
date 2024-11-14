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
        className='w-full aspect-[1/1.414] p-8 flex flex-col'
        id='certificate-preview'
        style={{
          backgroundColor: bgColor,
          border: `8px double ${borderColor}`,
        }}
      >
        {logoBase64 && (
          <div className='flex justify-center mb-8'>
            <Image
              alt='Logo'
              className='h-16 object-contain'
              height={64}
              src={logoBase64}
              width={64}
            />
          </div>
        )}

        <div className='text-center flex-1 flex flex-col justify-center space-y-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-8'>
            {certificateType}
          </h1>

          <div className='text-xl'>
            <div className='font-bold text-2xl my-4'>{recipientName}</div>
          </div>

          <p className='text-lg whitespace-pre-wrap max-w-md mx-auto leading-relaxed'>
            {description}
          </p>
        </div>

        <div className='mt-12 pt-8 border-t border-gray-300'>
          <div className='text-center space-y-4'>
            <div className='text-lg'>{issuedAt}</div>
            <div className='text-xl font-bold'>{organizationName}</div>
            <div className='flex justify-center items-center gap-2'>
              <span className='text-lg'>{issuerTitle}</span>
              <span className='text-xl font-bold'>{issuerName}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        className='w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
        onClick={downloadPDF}
      >
        PDF 다운로드
      </button>
    </div>
  );
}
