import {
  useReadContract,
  useReadContracts,
  usePublicClient,
  useWaitForTransactionReceipt,
} from 'wagmi';

import { certificateABI } from '@/config/abi';

export const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export type ContractCertificate = {
  id: bigint;
  issuer: `0x${string}`;
  recipientName: string;
  metadataURI: string;
  issuedAt: bigint;
  isValid: boolean;
  certificateType: string;
};

export function useCertificate(certificateId: string) {
  const { data, isError } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'getCertificate',
    args: [BigInt(certificateId)],
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

  return {
    id: String(id),
    name: certificateType,
    description: '',
    recipient: recipientName,
    issuer,
    issuedAt: Number(issuedAt) * 1000,
    imageUrl: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/${ipfsHash}`,
  };
}

export function useResetNonce() {
  const publicClient = usePublicClient({
    chainId: 8453,
  });

  const resetNonce = async (address: string) => {
    try {
      await publicClient?.prepareTransactionRequest({
        to: address as `0x${string}`,
        value: BigInt(0),
        nonce: 0,
      });
    } catch (error) {
      console.error('Failed to reset nonce:', error);
    }
  };

  return resetNonce;
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

export function useUserCertificates(address?: string) {
  const resetNonce = useResetNonce();

  const {
    data: certificateIds,
    isError: idsError,
    isLoading: isIdsLoading,
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'getUserCertificates',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const validCertificateIds = certificateIds
    ?.map(id => {
      try {
        return String(id);
      } catch {
        return null;
      }
    })
    .filter((id): id is string => id !== null);

  const certificatesResults = useReadContracts({
    contracts:
      validCertificateIds?.map(id => ({
        address: CONTRACT_ADDRESS,
        abi: certificateABI,
        functionName: 'getCertificate',
        args: [BigInt(id)],
      })) ?? [],
    query: {
      enabled: Boolean(validCertificateIds?.length),
    },
  });

  console.log('=== Debug Information ===');
  console.log('Address:', address);
  console.log('Original Certificate IDs:', certificateIds);
  console.log('Valid Certificate IDs:', validCertificateIds);
  console.log('Certificates Results:', certificatesResults.data);

  if (isIdsLoading || certificatesResults.isLoading) {
    return null;
  }

  if (idsError || !validCertificateIds?.length) {
    return [];
  }

  if (!certificatesResults.data?.length) {
    return [];
  }

  try {
    const processedCertificates = certificatesResults.data
      .filter(result => result.status === 'success' && result.result)
      .map(({ result }) => {
        if (!result) return null;

        const [id, issuer, recipientName, metadataURI, issuedAt, isValid] =
          result as unknown as [
            bigint,
            `0x${string}`,
            string,
            string,
            bigint,
            boolean,
          ];

        const ipfsHash = metadataURI.replace('ipfs://', '');

        return {
          id: String(id),
          name: '인증서',
          description: '',
          recipient: recipientName,
          issuer,
          issuedAt: Number(issuedAt) * 1000,
          imageUrl: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/${ipfsHash}`,
        };
      })
      .filter((cert): cert is NonNullable<typeof cert> => cert !== null);

    return processedCertificates;
  } catch (error) {
    console.error('Certificate processing error:', {
      error,
      data: certificatesResults.data,
    });
    return [];
  }
}
