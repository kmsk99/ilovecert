import { http, createConfig, readContract } from '@wagmi/core';
import { polygonMumbai } from 'wagmi/chains';

import { certificateABI } from '@/config/abi';
import { Certificate } from '@/types/certificate';

const config = createConfig({
  chains: [polygonMumbai],
  transports: {
    [polygonMumbai.id]: http(),
  },
});

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

type ContractCertificate = {
  id: bigint;
  issuer: `0x${string}`;
  recipientName: string;
  metadataURI: string;
  issuedAt: bigint;
  isValid: boolean;
  certificateType: string;
};

export async function getCertificate(
  certificateId: string,
): Promise<Certificate> {
  try {
    const result = await readContract(config, {
      address: CONTRACT_ADDRESS,
      abi: certificateABI,
      functionName: 'getCertificate',
      args: [BigInt(certificateId)],
    });

    const [
      id,
      issuer,
      recipientName,
      metadataURI,
      issuedAt,
      isValid,
      certificateType,
    ] = result as [
      bigint,
      `0x${string}`,
      string,
      string,
      bigint,
      boolean,
      string,
    ];

    return {
      id: String(id),
      name: certificateType,
      description: '',
      recipient: recipientName,
      issuer: issuer,
      issuedAt: Number(issuedAt) * 1000,
      imageUrl: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}/${metadataURI}`,
    };
  } catch (error) {
    console.error('Certificate fetch error:', error);
    throw new Error('인증서를 가져오는데 실패했습니다.');
  }
}

export async function getCertificates(address: string): Promise<Certificate[]> {
  try {
    const certificateIds = (await readContract(config, {
      address: CONTRACT_ADDRESS,
      abi: certificateABI,
      functionName: 'getUserCertificates',
      args: [address as `0x${string}`],
    })) as bigint[];

    if (!certificateIds.length) return [];

    const certificates = await Promise.all(
      certificateIds.map(id => getCertificate(String(id))),
    );

    return certificates;
  } catch (error) {
    console.error('Certificates fetch error:', error);
    throw new Error('인증서 목록을 가져오는데 실패했습니다.');
  }
}
