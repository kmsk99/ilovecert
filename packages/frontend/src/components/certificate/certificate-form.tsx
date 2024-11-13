'use client';

import { useState } from 'react';

import { CertificateFormData } from '@/types/certificate';

import { CertificatePreview } from './certificate-preview';
import { ColorField } from './form-fields/ColorField';
import { ImageUploadField } from './form-fields/ImageUploadField';
import { TextField } from './form-fields/TextField';

export function CertificateForm() {
  const [formData, setFormData] = useState<CertificateFormData>({
    recipientName: '',
    certificateType: '',
    description: '',
    issuerName: '',
    bgColor: '#ffffff',
    borderColor: '#000000',
    logoBase64: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (base64: string) => {
    setFormData(prev => ({
      ...prev,
      logoBase64: base64
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="grid grid-cols-2 gap-8 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold mb-6">인증서 발급</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextField
            label="수령인 이름"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            required
          />
          <TextField
            label="인증서 종류"
            name="certificateType"
            value={formData.certificateType}
            onChange={handleChange}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
            설명
            </label>
            <textarea
              name="description"
              value={formData.description}
              rows={4}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <TextField
            label="발급자 이름"
            name="issuerName"
            value={formData.issuerName}
            onChange={handleChange}
            required
          />
          <ColorField
            label="배경 색상"
            name="bgColor"
            value={formData.bgColor}
            onChange={handleChange}
          />
          <ColorField
            label="테두리 색상"
            name="borderColor"
            value={formData.borderColor}
            onChange={handleChange}
          />
          <ImageUploadField
            label="로고 업로드"
            onImageUpload={handleLogoUpload}
            previewSrc={formData.logoBase64}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            인증서 발급
          </button>
        </form>
      </div>
      <div className="border rounded-lg p-4">
        <h2 className="text-2xl font-bold mb-6">미리보기</h2>
        <CertificatePreview {...formData} issuedAt={new Date().toLocaleDateString('ko-KR')} />
      </div>
    </div>
  );
} 