import { CertificateForm } from '@/components/certificate/certificate-form';

export default function IssuePage() {
  return (
    <div className='container max-w-2xl py-8'>
      <h1 className='text-2xl font-bold mb-6'>인증서 발급</h1>
      <CertificateForm />
    </div>
  );
}
