'use client';

import { useState } from 'react';

import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import {
  useAccount,
  useSimulateContract,
  useWriteContract,
  useReadContract,
  usePublicClient,
} from 'wagmi';

import { CertificatePreview } from './certificate-preview';
import { ColorField } from './form-fields/ColorField';
import { ImageUploadField } from './form-fields/ImageUploadField';
import { TextField } from './form-fields/TextField';

import { certificateABI } from '@/config/abi';
import { CONTRACT_ADDRESS } from '@/config/contract';
import { uploadToIPFS } from '@/lib/ipfs';
import { CertificateFormData } from '@/types/certificate';

const defaultFormData: CertificateFormData = {
  recipientName: '',
  certificateType: '상장',
  description: `위 사람은 2024년도 전국체육대회 수영 종목에서 
우수한 성적을 거두어 체육 발전에 기여하였기에 
이 상장을 수여합니다.`,
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

export function CertificateForm() {
  const { address } = useAccount();
  const [isUploading, setIsUploading] = useState(false);
  const [metadataUri, setMetadataUri] = useState<string>('');
  const [formData, setFormData] =
    useState<CertificateFormData>(defaultFormData);

  // 발급자 권한 확인
  const { data: isIssuer } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'issuers',
    args: [address!],
  });

  // 컨트랙트 호출 시뮬레이션
  const { data: simulateData } = useSimulateContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'issueCertificate',
    args: [address as `0x${string}`, ''],
    query: {
      enabled: Boolean(address) && Boolean(isIssuer) && Boolean(metadataUri),
    },
  });

  const publicClient = usePublicClient();

  const { writeContract, isPending } = useWriteContract({
    mutation: {
      onSuccess: async hash => {
        console.log('Transaction hash:', hash);

        try {
          const receipt = await publicClient?.waitForTransactionReceipt({
            hash,
          });

          console.log('Transaction receipt:', receipt);
          console.log('Block number:', receipt?.blockNumber);
          console.log('Status:', receipt?.status);

          if (receipt?.status === 'success') {
            toast.success('인증서가 성공적으로 블록체인에 기록되었습니다.');
            setFormData(defaultFormData);
            setMetadataUri('');
          } else {
            toast.error('트랜잭션이 실패했습니다.');
          }
        } catch (error) {
          console.error('Transaction receipt error:', error);
          toast.error('트랜잭션 확인 중 오류가 발생했습니다.');
        }
      },
      onError: error => {
        console.error('Transaction error:', error);
        toast.error('인증서 발급 실패: ' + error.message);
      },
    },
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!address) {
        throw new Error('지갑이 연결되지 않았습니다.');
      }

      if (!isIssuer) {
        throw new Error('인증서 발급 권한이 없습니다.');
      }

      setIsUploading(true);

      // 1. 미리보기 이미지를 캡처
      const previewElement = document.getElementById('certificate-preview');
      if (!previewElement) throw new Error('미리보기를 찾을 수 없습니다.');

      const canvas = await html2canvas(previewElement);
      const imageBlob = await new Promise<Blob | null>(resolve => {
        canvas.toBlob(blob => resolve(blob), 'image/png');
      });

      let imageHash = '';

      if (imageBlob) {
        // 2. IPFS에 이미지 업로드
        const imageLoadingId = toast.loading(
          '인증서 이미지를 업로드하고 있습니다...',
        );
        imageHash = await uploadToIPFS(imageBlob);
        toast.dismiss(imageLoadingId);

        if (!imageHash) {
          throw new Error('이미지 업로드에 실패했습니다.');
        }
      }

      // 3. 메타데이터 생성 및 업로드
      const metadataLoadingId = toast.loading(
        '메타데이터를 업로드하고 있습니다...',
      );
      const metadata = {
        ...formData,
        image: imageHash ? `ipfs://${imageHash}` : '',
        recipient: formData.recipientName,
        createdAt: new Date().toISOString(),
      };

      const metadataBlob = new Blob([JSON.stringify(metadata)], {
        type: 'application/json',
      });
      const metadataHash = await uploadToIPFS(metadataBlob);
      toast.dismiss(metadataLoadingId);

      if (!metadataHash) {
        throw new Error('메타데이터 업로드에 실패했습니다.');
      }

      // 4. 스마트 컨트랙트 호출
      const metadataUri = `ipfs://${metadataHash}`;
      console.log('Contract call params:', {
        recipientName: formData.recipientName,
        metadataUri,
      });

      try {
        const tx = await writeContract({
          address: CONTRACT_ADDRESS,
          abi: certificateABI,
          functionName: 'issueCertificate',
          args: [formData.recipientName, metadataUri],
        });

        // writeContract의 onSuccess에서 처리되므로 여기서는 추가 처리 불필요
      } catch (contractError) {
        console.error('Contract call error:', contractError);
        throw new Error(
          `컨트랙트 호출 실패: ${(contractError as Error).message}`,
        );
      }

      toast.success('인증서가 성공적으로 발급되었습니다.');
      setFormData(defaultFormData);
    } catch (error) {
      console.error('인증서 발급 중 오류:', error);
      toast.dismiss();
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
            <label className='block text-sm font-medium text-gray-700'>
              설명
            </label>
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
      </div>
      <div className='border rounded-lg p-4'>
        <h2 className='text-2xl font-bold mb-6'>미리보기</h2>
        <CertificatePreview {...formData} />
      </div>
    </div>
  );
}
