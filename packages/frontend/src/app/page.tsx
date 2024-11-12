'use client';



import { CertificateList } from '../components/certificate/certificate-list';
import { ConnectButton } from '../components/connect-button';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">iLoveCert</h1>
          <ConnectButton />
        </div>
        <CertificateList />
      </div>
    </main>
  );
} 