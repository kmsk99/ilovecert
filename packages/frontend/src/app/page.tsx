'use client';

import { CertificateForm } from '@/components/certificate/certificate-form';
import { ConnectButton } from '@/components/connect-button';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">iLoveCert</h1>
          <ConnectButton />
        </div>
        <CertificateForm />
        {/* TODO: 
          1. 지갑 연결 상태에 따라 폼 표시/숨김 처리
          2. 발급된 인증서 목록 표시
          3. IPFS 연동
          4. 로딩 상태 표시
        */}
      </div>
    </main>
  );
} 