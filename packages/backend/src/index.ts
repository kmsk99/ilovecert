import cors from 'cors';
import dotenv from 'dotenv';
import { ethers } from 'ethers';
import express from 'express';

import { certificateABI } from './contract';
import { Certificate } from './types';

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 이더리움 프로바이더 및 컨트랙트 설정
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS!,
  certificateABI,
  provider,
);

// 인증서 조회 API
app.get('/api/certificates/:address', async (req, res) => {
  try {
    const { address } = req.params;

    // 주소 유효성 검사
    if (!ethers.utils.isAddress(address)) {
      return res.status(400).json({ error: 'Invalid Ethereum address' });
    }

    const certificates = await contract.getUserCertificates(address);

    const formattedCertificates: Certificate[] = certificates.map(
      (cert: any) => ({
        id: cert.id.toString(),
        ipfsHash: cert.ipfsHash,
        recipient: cert.recipient,
        issuedAt: cert.issuedAt.toString(),
        isValid: cert.isValid,
        certificateType: cert.certificateType,
        issuerName: cert.issuerName,
      }),
    );

    res.json(formattedCertificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
});

// 단일 인증서 조회 API
app.get('/api/certificate/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const certificate = await contract.getCertificate(id);

    const formattedCertificate: Certificate = {
      id: certificate.id.toString(),
      ipfsHash: certificate.ipfsHash,
      recipient: certificate.recipient,
      issuedAt: certificate.issuedAt.toString(),
      isValid: certificate.isValid,
      certificateType: certificate.certificateType,
      issuerName: certificate.issuerName,
    };

    res.json(formattedCertificate);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ error: 'Failed to fetch certificate' });
  }
});

// 서버 시작
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Connected to RPC: ${process.env.RPC_URL}`);
  console.log(`Contract address: ${process.env.CONTRACT_ADDRESS}`);
});
