import { Certificate } from '@/types/certificate';

export const certificateABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'certificateId',
        type: 'uint256',
      },
    ],
    name: 'getCertificate',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'ipfsHash',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'issuedAt',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'certificateType',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'issuerName',
            type: 'string',
          },
        ],
        internalType: 'struct CertificateStorage.Certificate',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getUserCertificates',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'ipfsHash',
            type: 'string',
          },
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'issuedAt',
            type: 'uint256',
          },
          {
            internalType: 'bool',
            name: 'isValid',
            type: 'bool',
          },
          {
            internalType: 'string',
            name: 'certificateType',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'issuerName',
            type: 'string',
          },
        ],
        internalType: 'struct CertificateStorage.Certificate[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export async function getCertificate(
  certificateId: string,
): Promise<Certificate> {
  // TODO: 실제 컨트랙트 호출 로직 구현
  // 임시 더미 데이터 반환
  return {
    id: certificateId,
    name: '샘플 인증서',
    description: '이것은 샘플 인증서입니다.',
    recipient: '0x1234...5678',
    issuer: '0x8765...4321',
    issuedAt: Date.now(),
    imageUrl: '/sample-certificate.png',
  };
}

export async function getCertificates(address: string): Promise<Certificate[]> {
  // TODO: 실제 컨트랙트 호출 로직 구현
  // 임시 더미 데이터 반환
  return [
    {
      id: '1',
      name: '샘플 인증서 1',
      recipient: address,
      issuer: '0x8765...4321',
      issuedAt: Date.now() - 86400000,
    },
    {
      id: '2',
      name: '샘플 인증서 2',
      recipient: address,
      issuer: '0x8765...4321',
      issuedAt: Date.now(),
    },
  ];
}
