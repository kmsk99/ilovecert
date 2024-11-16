'use client';

import { useState } from 'react';

import { toast } from 'sonner';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { certificateABI } from '@/config/abi';
import { CONTRACT_ADDRESS } from '@/config/contract';

// Updated: 2024-11-16 - Modern UI Enhancement
export function IssuerManagement() {
  const { address } = useAccount();
  const [newIssuerAddress, setNewIssuerAddress] = useState('');

  const { data: adminAddress } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'admin',
  });

  const isAdmin = address === adminAddress;

  const { writeContract: addIssuer, isPending: isAddingIssuer } =
    useWriteContract({
      mutation: {
        onSuccess: () => {
          toast.success('발급자가 추가되었습니다.');
          setNewIssuerAddress('');
        },
        onError: error => {
          toast.error('발급자 추가 실패: ' + error.message);
        },
      },
    });

  const { writeContract: removeIssuer, isPending: isRemovingIssuer } =
    useWriteContract({
      mutation: {
        onSuccess: () => {
          toast.success('발급자가 제거되었습니다.');
        },
        onError: error => {
          toast.error('발급자 제거 실패: ' + error.message);
        },
      },
    });

  const handleAddIssuer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) {
      toast.error('관리자 권한이 필요합니다.');
      return;
    }

    try {
      addIssuer({
        address: CONTRACT_ADDRESS,
        abi: certificateABI,
        functionName: 'addIssuer',
        args: [newIssuerAddress as `0x${string}`],
      });
    } catch (error) {
      console.error('발급자 추가 중 오류:', error);
    }
  };

  const handleRemoveIssuer = async (issuerAddress: string) => {
    if (!isAdmin) {
      toast.error('관리자 권한이 필요합니다.');
      return;
    }

    try {
      removeIssuer({
        address: CONTRACT_ADDRESS,
        abi: certificateABI,
        functionName: 'removeIssuer',
        args: [issuerAddress as `0x${string}`],
      });
    } catch (error) {
      console.error('발급자 제거 중 오류:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className='flex flex-col items-center justify-center py-16 px-4'>
        <div
          className='inline-flex items-center justify-center w-16 h-16 
                      rounded-full bg-yellow-100 text-yellow-600 mb-6'
        >
          <svg
            className='w-8 h-8'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              d='M12 15v2m0 0v2m0-2h2m-2 0H10m8-6a4 4 0 01-4 4H6a4 4 0 01-4-4V7a4 4 0 014-4h8a4 4 0 014 4v4z'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
            />
          </svg>
        </div>
        <h3 className='text-xl font-semibold text-gray-900 mb-2'>
          접근 권한이 없습니다
        </h3>
        <p className='text-gray-500 text-center max-w-sm'>
          이 페이지는 관리자 권한이 있는 계정만 접근할 수 있습니다.
        </p>
      </div>
    );
  }

  return (
    <div className='divide-y divide-gray-100'>
      <div className='p-6 sm:p-8'>
        <h2 className='text-xl font-semibold text-gray-900 mb-6'>
          새 발급자 추가
        </h2>
        <form className='space-y-4' onSubmit={handleAddIssuer}>
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              발급자 지갑 주소
            </label>
            <div className='flex flex-col sm:flex-row gap-3'>
              <input
                className='flex-1 px-4 py-2.5 rounded-xl border border-gray-200 
                          focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                          transition-all duration-200 shadow-sm font-mono'
                placeholder='0x...'
                type='text'
                value={newIssuerAddress}
                onChange={e => setNewIssuerAddress(e.target.value)}
              />
              <button
                className='px-6 py-2.5 rounded-xl bg-blue-600 text-white 
                          hover:bg-blue-700 transition-all duration-200 
                          shadow-md hover:shadow-lg disabled:opacity-50 
                          disabled:cursor-not-allowed flex items-center 
                          justify-center gap-2'
                disabled={isAddingIssuer}
                type='submit'
              >
                {isAddingIssuer ? (
                  <>
                    <svg className='animate-spin h-5 w-5' viewBox='0 0 24 24'>
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        fill='none'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      />
                      <path
                        className='opacity-75'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z'
                        fill='currentColor'
                      />
                    </svg>
                    처리중...
                  </>
                ) : (
                  <>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                      />
                    </svg>
                    추가
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className='p-6 sm:p-8'>
        <h3 className='text-xl font-semibold text-gray-900 mb-6'>
          발급자 목록
        </h3>
        <div className='space-y-4'>
          <div
            className='p-4 rounded-xl bg-gray-50 border border-gray-100 
                        flex flex-col sm:flex-row sm:items-center justify-between 
                        gap-4'
          >
            <div className='space-y-1'>
              <p className='text-sm text-gray-500'>현재 지갑 주소</p>
              <code className='text-sm font-mono text-gray-900'>{address}</code>
            </div>
            <button
              className='px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 
                        border border-red-200 transition-colors duration-200
                        disabled:opacity-50 flex items-center justify-center gap-2'
              disabled={isRemovingIssuer}
              onClick={() => handleRemoveIssuer(address!)}
            >
              {isRemovingIssuer ? '처리중...' : '권한 제거'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
