import Image from 'next/image';

import { optimizeImage } from '@/utils/imageUtils';

interface ImageUploadFieldProps {
  label: string;
  onImageUpload: (base64: string) => void;
  previewSrc?: string;
}

export function ImageUploadField({
  label,
  onImageUpload,
  previewSrc,
}: ImageUploadFieldProps) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const optimizedBase64 = await optimizeImage(file);
      onImageUpload(optimizedBase64);
    } catch (error) {
      console.error('이미지 처리 중 오류:', error);
      alert('이미지 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <input
        accept='image/*'
        className='mt-1 block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100'
        type='file'
        onChange={handleFileChange}
      />
      {previewSrc && (
        <div className='mt-2'>
          <Image
            alt='Preview'
            className='h-16 object-contain'
            height={64}
            src={previewSrc}
            width={64}
          />
        </div>
      )}
    </div>
  );
}
