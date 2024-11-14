import { IssuerManagement } from '@/components/admin/issuer-management';

export default function AdminPage() {
  return (
    <div className='container max-w-4xl py-8'>
      <h1 className='text-3xl font-bold mb-8'>관리자 페이지</h1>
      <IssuerManagement />
    </div>
  );
}
