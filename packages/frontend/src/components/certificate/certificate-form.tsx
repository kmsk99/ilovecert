'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { CertificateFormFields } from './certificate-form-fields';
import { CertificatePreview } from './certificate-preview';

import { useCertificateContract } from '@/hooks/use-certificate-contract';
import { useCertificateForm } from '@/hooks/use-certificate-form';

export function CertificateForm() {
  const { formData, handleChange, handleLogoUpload, resetForm } =
    useCertificateForm();
  const { isIssuer, isPending, issueCertificate } = useCertificateContract();
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsUploading(true);
      const previewElement = document.getElementById('certificate-preview');
      if (!previewElement) throw new Error('미리보기를 찾을 수 없습니다.');

      await issueCertificate(formData, previewElement);
      resetForm();
    } catch (error) {
      console.error('인증서 발급 중 오류:', error);
      toast.error((error as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='grid grid-cols-2 gap-8 p-6'>
      {!isIssuer && (
        <div className='col-span-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4'>
          ⚠️ 인증서를 발급하려면 발급자 권한이 필요합니다.
        </div>
      )}
      <div className='space-y-4'>
        <h2 className='text-2xl font-bold mb-6'>인증서 발급</h2>
        <CertificateFormFields
          formData={formData}
          handleChange={handleChange}
          handleLogoUpload={handleLogoUpload}
          handleSubmit={handleSubmit}
          isPending={isPending}
          isUploading={isUploading}
        />
      </div>
      <div className='border rounded-lg p-4'>
        <h2 className='text-2xl font-bold mb-6'>미리보기</h2>
        <CertificatePreview {...formData} />
      </div>
    </div>
  );
}
