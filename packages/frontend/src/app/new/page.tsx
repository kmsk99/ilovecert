'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

import { CertificateForm } from '@/components/certificate/certificate-form';
import { ConnectButton } from '@/components/connect-button';

export default function NewCertificate() {
  const { isConnected } = useAccount();
  const router = useRouter();

  if (!isConnected) {
    router.push('/');
    return null;
  }

  return (
    <main className='min-h-screen p-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <div className='flex items-center gap-4'>
            <Link className='text-gray-500 hover:text-gray-700' href='/'>
              ← 돌아가기
            </Link>
            <h1 className='text-4xl font-bold'>새 인증서 발급</h1>
          </div>
          <ConnectButton />
        </div>
        <CertificateForm />
      </div>
    </main>
  );
}
