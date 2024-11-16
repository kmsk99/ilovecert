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
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      {!isIssuer && (
        <div
          className='col-span-full p-4 bg-yellow-50 border-l-4 border-yellow-400 
                      rounded-r-xl'
        >
          <div className='flex'>
            <div className='flex-shrink-0'>
              <svg
                className='h-5 w-5 text-yellow-400'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  clipRule='evenodd'
                  d='M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z'
                  fillRule='evenodd'
                />
              </svg>
            </div>
            <div className='ml-3'>
              <p className='text-sm text-yellow-700'>
                인증서를 발급하려면 발급자 권한이 필요합니다.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className='space-y-6'>
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-6'>
            인증서 정보 입력
          </h2>
          <CertificateFormFields
            formData={formData}
            handleChange={handleChange}
            handleLogoUpload={handleLogoUpload}
            handleSubmit={handleSubmit}
            isPending={isPending}
            isUploading={isUploading}
          />
        </div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6'>미리보기</h2>
        <CertificatePreview {...formData} />
      </div>
    </div>
  );
}
