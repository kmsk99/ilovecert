import html2canvas from 'html2canvas';
import { toast } from 'sonner';
import {
  useAccount,
  usePublicClient,
  useReadContract,
  useWriteContract,
} from 'wagmi';

import { certificateABI } from '@/config/abi';
import { CONTRACT_ADDRESS } from '@/config/contract';
import { uploadToIPFS } from '@/lib/ipfs';
import { CertificateFormData } from '@/types/certificate';

async function uploadCertificateData(
  formData: CertificateFormData,
  previewElement: HTMLElement,
) {
  // 1. 미리보기 이미지를 캡처
  const canvas = await html2canvas(previewElement);
  const imageBlob = await new Promise<Blob | null>(resolve => {
    canvas.toBlob(blob => resolve(blob), 'image/png');
  });

  if (!imageBlob) {
    throw new Error('이미지 생성에 실패했습니다.');
  }

  // 2. IPFS에 이미지 업로드
  const imageLoadingId = toast.loading(
    '인증서 이미지를 업로드하고 있습니다...',
  );
  const imageHash = await uploadToIPFS(imageBlob);
  toast.dismiss(imageLoadingId);

  if (!imageHash) {
    throw new Error('이미지 업로드에 실패했습니다.');
  }

  // 3. 메타데이터 생성 및 업로드
  const metadataLoadingId = toast.loading(
    '메타데이터를 업로드하고 있습니다...',
  );
  const metadata = {
    ...formData,
    image: `ipfs://${imageHash}`,
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

  return `ipfs://${metadataHash}`;
}

export function useCertificateContract() {
  const { address } = useAccount();
  const publicClient = usePublicClient();

  const { data: isIssuer } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'issuers',
    args: [address!],
  });

  const { writeContract, isPending } = useWriteContract({
    mutation: {
      onSuccess: async hash => {
        try {
          const receipt = await publicClient?.waitForTransactionReceipt({
            hash,
          });

          if (receipt?.status === 'success') {
            toast.success('인증서가 성공적으로 블록체인에 기록되었습니다.');
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

  const issueCertificate = async (
    formData: CertificateFormData,
    previewElement: HTMLElement,
  ) => {
    if (!address) throw new Error('지갑이 연결되지 않았습니다.');
    if (!isIssuer) throw new Error('인증서 발급 권한이 없습니다.');

    // IPFS 업로드 로직
    const metadataUri = await uploadCertificateData(formData, previewElement);

    // 컨트랙트 호출
    await writeContract({
      address: CONTRACT_ADDRESS,
      abi: certificateABI,
      functionName: 'issueCertificate',
      args: [formData.recipientName, metadataUri],
    });
  };

  return {
    isIssuer,
    isPending,
    issueCertificate,
  };
}
