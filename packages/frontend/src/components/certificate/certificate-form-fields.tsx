import { ColorField } from './form-fields/ColorField';
import { ImageUploadField } from './form-fields/ImageUploadField';
import { TextField } from './form-fields/TextField';

import { CertificateFormData } from '@/types/certificate';

interface CertificateFormFieldsProps {
  formData: CertificateFormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleLogoUpload: (base64: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isUploading: boolean;
  isPending: boolean;
}

export function CertificateFormFields({
  formData,
  handleChange,
  handleLogoUpload,
  handleSubmit,
  isUploading,
  isPending,
}: CertificateFormFieldsProps) {
  return (
    <form className='space-y-8' onSubmit={handleSubmit}>
      <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
        <div className='flex items-center gap-2 mb-2'>
          <div className='w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-blue-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>기본 정보</h3>
        </div>
        <TextField
          required
          label='수령인 이름'
          name='recipientName'
          placeholder='수상자 이름을 입력하세요'
          value={formData.recipientName}
          onChange={handleChange}
        />
        <TextField
          required
          label='인증서 종류'
          name='certificateType'
          placeholder='예) 수료증, 졸업장, 상장 등'
          value={formData.certificateType}
          onChange={handleChange}
        />
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>
            설명
          </label>
          <textarea
            className='w-full px-4 py-3 rounded-xl border border-gray-200 
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                      transition-all duration-200 shadow-sm resize-none
                      placeholder:text-gray-400'
            name='description'
            placeholder='인증서에 대한 설명을 입력하세요'
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
        <div className='flex items-center gap-2 mb-2'>
          <div className='w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-green-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>발급자 정보</h3>
        </div>
        <TextField
          required
          label='발급 기관'
          name='organizationName'
          placeholder='발급 기관명을 입력하세요'
          value={formData.organizationName}
          onChange={handleChange}
        />
        <TextField
          required
          label='발급자 이름'
          name='issuerName'
          placeholder='발급자 이름을 입력하세요'
          value={formData.issuerName}
          onChange={handleChange}
        />
        <TextField
          label='발급자 직위'
          name='issuerTitle'
          placeholder='예) 대표이사, 학과장 등'
          value={formData.issuerTitle}
          onChange={handleChange}
        />
      </div>

      <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
        <div className='flex items-center gap-2 mb-2'>
          <div className='w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center'>
            <svg
              className='w-5 h-5 text-purple-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              />
            </svg>
          </div>
          <h3 className='text-lg font-semibold text-gray-900'>디자인 설정</h3>
        </div>
        <ColorField
          label='배경 색상'
          name='bgColor'
          value={formData.bgColor}
          onChange={handleChange}
        />
        <ColorField
          label='테두리 색상'
          name='borderColor'
          value={formData.borderColor}
          onChange={handleChange}
        />
        <ImageUploadField
          label='로고 업로드'
          previewSrc={formData.logoBase64}
          onImageUpload={handleLogoUpload}
        />
      </div>

      <button
        className='w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
                  text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 
                  transition-all duration-200 shadow-lg hover:shadow-xl 
                  transform hover:-translate-y-0.5 disabled:opacity-50 
                  disabled:cursor-not-allowed disabled:hover:transform-none
                  flex items-center justify-center gap-2 font-medium'
        disabled={isUploading || isPending}
        type='submit'
      >
        {isUploading || isPending ? (
          <>
            <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                fill='none'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                fill='currentColor'
              />
            </svg>
            {isUploading ? '업로드 중...' : '발급 중...'}
          </>
        ) : (
          <>
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              />
            </svg>
            인증서 발급
          </>
        )}
      </button>
    </form>
  );
}
