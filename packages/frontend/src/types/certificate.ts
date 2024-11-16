export interface Certificate {
  id: string;
  name: string;
  description?: string;
  recipient: string;
  issuer: string;
  issuedAt: number;
  metadataURI?: string;
}

export type CertificateFormData = {
  recipientName: string;
  certificateType: string;
  description: string;
  issuerName: string;
  issuerTitle: string;
  organizationName: string;
  bgColor: string;
  borderColor: string;
  logoBase64: string;
  issuedAt: string;
};

export type ContractCertificate = {
  id: bigint;
  issuer: `0x${string}`;
  recipientName: string;
  metadataURI: string;
  issuedAt: bigint;
  isValid: boolean;
  certificateType: string;
};
