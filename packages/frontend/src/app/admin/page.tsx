import Link from 'next/link';

import { IssuerManagement } from '@/components/admin/issuer-management';

export default function AdminPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto px-4 py-6 sm:py-8 max-w-4xl'>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8'>
          <div className='flex items-center gap-3'>
            <span className='text-2xl sm:text-3xl'>👑</span>
            <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'>
              관리자 페이지
            </h1>
          </div>
          <Link
            className='flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all'
            href='/'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              />
            </svg>
            <span>메인으로</span>
          </Link>
        </div>
        <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
          <IssuerManagement />
        </div>
      </div>
    </div>
  );
}
