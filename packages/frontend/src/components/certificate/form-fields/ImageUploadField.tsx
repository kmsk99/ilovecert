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
    <div className='space-y-2'>
      <label className='block text-sm font-medium text-gray-700'>{label}</label>
      <div className='space-y-4'>
        <input
          accept='image/*'
          className='w-full px-4 py-2.5 rounded-xl border border-gray-200
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-lg file:border-0
                    file:text-sm file:font-medium
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    focus:outline-none focus:border-blue-500 focus:ring-2 
                    focus:ring-blue-200 transition-all duration-200'
          type='file'
          onChange={handleFileChange}
        />
        {previewSrc && (
          <div
            className='relative w-24 h-24 rounded-lg overflow-hidden border 
                        border-gray-200 shadow-sm'
          >
            <Image
              fill
              alt='Preview'
              className='object-contain'
              src={previewSrc}
            />
          </div>
        )}
      </div>
    </div>
  );
}
