'use client';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';
import { useRef } from 'react';

interface CertificatePreviewProps {
  recipientName: string;
  certificateType: string;
  description: string;
  issuerName: string;
  issuedAt: string;
  logoBase64?: string;
  bgColor?: string;
  borderColor?: string;
}

export function CertificatePreview({
  recipientName,
  certificateType,
  description,
  issuerName,
  issuedAt,
  logoBase64,
  bgColor = 'white',
  borderColor = 'black'
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
      
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
      
      pdf.save(`${certificateType}_${recipientName}.pdf`);
    } catch (error) {
      console.error('PDF 생성 중 오류:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div 
        ref={certificateRef}
        className="w-full aspect-[1/1.414] p-8 flex flex-col"
        style={{
          backgroundColor: bgColor,
          border: `8px double ${borderColor}`,
        }}
      >
        {logoBase64 && (
          <div className="flex justify-center mb-8">
            <Image 
              src={logoBase64} 
              alt="Logo" 
              className="h-16 object-contain"
              width={64}
              height={64}
            />
          </div>
        )}

        <div className="text-center flex-1 flex flex-col justify-center space-y-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            {certificateType}
          </h1>
          
          <div className="text-xl">
            This is to certify that
            <div className="font-bold text-2xl my-4">{recipientName}</div>
            has successfully completed
          </div>
          
          <p className="text-lg whitespace-pre-wrap max-w-md mx-auto">
            {description}
          </p>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="text-right space-y-2">
            <div className="text-sm text-gray-600">Date: {issuedAt}</div>
            <div className="font-bold">{issuerName}</div>
          </div>
        </div>
      </div>

      <button
        onClick={downloadPDF}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        PDF 다운로드
      </button>
    </div>
  );
} 