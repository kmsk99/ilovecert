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
