import { useState } from 'react';

import { CertificateFormData } from '@/types/certificate';

export const defaultFormData: CertificateFormData = {
  recipientName: '',
  certificateType: '상장',
  description: `위 사람은 2024년도 전국체육대회 수영 종목에서 우수한 성적을 거두어 체육 발전에 기여하였기에 이 상장을 수여합니다.`,
  issuerName: '김체육',
  issuerTitle: '회장',
  organizationName: '대한체육회',
  bgColor: '#ffffff',
  borderColor: '#000000',
  logoBase64: '',
  issuedAt: new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
};

export function useCertificateForm() {
  const [formData, setFormData] =
    useState<CertificateFormData>(defaultFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = (base64: string) => {
    setFormData(prev => ({
      ...prev,
      logoBase64: base64,
    }));
  };

  const resetForm = () => {
    setFormData(defaultFormData);
  };

  return {
    formData,
    handleChange,
    handleLogoUpload,
    resetForm,
  };
}
