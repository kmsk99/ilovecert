import { useReadContract, useWaitForTransactionReceipt } from 'wagmi';

import { certificateABI } from '@/config/abi';
import { CONTRACT_ADDRESS } from '@/config/contract';

export function useCertificate(certificateId: string) {
  const { data, isError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'getCertificate',
    args: [BigInt(certificateId)],
    query: {
      gcTime: 0,
      staleTime: 0,
    },
  });

  if (isError) {
    throw new Error('인증서를 가져오는데 실패했습니다.');
  }

  if (!data) return null;

  const [
    id,
    issuer,
    recipientName,
    metadataURI,
    issuedAt,
    isValid,
    certificateType,
  ] = data as [bigint, `0x${string}`, string, string, bigint, boolean, string];

  const ipfsHash = metadataURI.replace('ipfs://', '');

  const imageUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${ipfsHash}`;

  return {
    id: String(id),
    name: certificateType,
    description: '',
    recipient: recipientName,
    issuer,
    issuedAt: Number(issuedAt) * 1000,
    imageUrl,
  };
}

export function useWatchTransaction(transactionHash: `0x${string}`) {
  const {
    data: receipt,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash: transactionHash as `0x${string}`,
    onReplaced: replacement => {
      console.log('Transaction replaced:', replacement);
    },
  });

  return {
    receipt,
    isLoading,
    isSuccess,
  };
}
