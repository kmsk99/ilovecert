export interface Certificate {
  id: string;
  name: string;
  description?: string;
  recipient: string;
  issuer: string;
  issuedAt: number;
  imageUrl?: string;
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
