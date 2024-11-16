import Link from 'next/link';

import { IssuerManagement } from '@/components/admin/issuer-management';

// Updated: 2024-11-16 - Modern UI Enhancement
export default function AdminPage() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-gray-50 to-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-8'>
          <div className='flex items-center gap-4 mb-6 sm:mb-0'>
            <div
              className='flex items-center justify-center w-12 h-12 
                          rounded-xl bg-gradient-to-br from-yellow-400 to-yellow-500 
                          shadow-lg text-white'
            >
              <span className='text-2xl'>👑</span>
            </div>
            <div>
              <h1
                className='text-3xl font-bold text-transparent bg-clip-text 
                           bg-gradient-to-r from-blue-600 to-blue-800'
              >
                관리자 페이지
              </h1>
              <p className='text-gray-500 mt-1'>인증서 발급자를 관리합니다</p>
            </div>
          </div>
          <Link
            className='flex items-center gap-2 px-6 py-2.5 rounded-xl border 
                      border-gray-200 text-gray-600 hover:bg-gray-50 
                      transition-all duration-200 shadow-sm hover:shadow
                      group'
            href='/'
          >
            <svg
              className='w-5 h-5 transform group-hover:-translate-x-1 
                        transition-transform duration-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              />
            </svg>
            <span>메인으로</span>
          </Link>
        </div>
        <div className='bg-white rounded-2xl shadow-xl border border-gray-100'>
          <IssuerManagement />
        </div>
      </div>
    </main>
  );
}
