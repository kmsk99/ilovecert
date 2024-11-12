export interface Certificate {
  id: string;
  ipfsHash: string;
  recipient: string;
  issuedAt: string;
  isValid: boolean;
  certificateType: string;
  issuerName: string;
}
