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
    <form className='space-y-4' onSubmit={handleSubmit}>
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
        value={formData.certificateType}
        onChange={handleChange}
      />
      <div>
        <label className='block text-sm font-medium text-gray-700'>설명</label>
        <textarea
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500'
          name='description'
          rows={4}
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <TextField
        required
        label='발급 기관'
        name='organizationName'
        value={formData.organizationName}
        onChange={handleChange}
      />
      <TextField
        required
        label='발급자 이름'
        name='issuerName'
        value={formData.issuerName}
        onChange={handleChange}
      />
      <TextField
        label='발급자 직위'
        name='issuerTitle'
        value={formData.issuerTitle}
        onChange={handleChange}
      />
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
      <button
        className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50'
        disabled={isUploading || isPending}
        type='submit'
      >
        {isUploading
          ? '업로드 중...'
          : isPending
            ? '발급 중...'
            : '인증서 발급'}
      </button>
    </form>
  );
}
