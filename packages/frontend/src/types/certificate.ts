export interface Certificate {
  id: bigint;
  ipfsHash: string;
  recipient: string;
  issuedAt: bigint;
  isValid: boolean;
  certificateType: string;
  issuerName: string;
}
