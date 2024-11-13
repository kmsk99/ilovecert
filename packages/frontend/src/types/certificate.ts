export interface Certificate {
  id: bigint;
  ipfsHash: string;
  recipient: string;
  issuedAt: bigint;
  isValid: boolean;
  certificateType: string;
  issuerName: string;
}

export interface CertificateFormData {
  recipientName: string;
  certificateType: string;
  description: string;
  issuerName: string;
  issuerTitle: string;
  issuedAt: string;
  organizationName: string;
  bgColor: string;
  borderColor: string;
  logoBase64: string;
}
