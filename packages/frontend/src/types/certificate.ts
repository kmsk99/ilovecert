export interface Certificate {
  id: string;
  name: string;
  description?: string;
  recipient: string;
  issuer: string;
  issuedAt: number;
  imageUrl?: string;
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
