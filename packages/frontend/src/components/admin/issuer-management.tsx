'use client';

import { useState } from 'react';

import { toast } from 'sonner';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';

import { certificateABI } from '@/config/abi';
import { CONTRACT_ADDRESS } from '@/config/contract';

export function IssuerManagement() {
  const { address } = useAccount();
  const [newIssuerAddress, setNewIssuerAddress] = useState('');

  // admin 권한 확인
  const { data: adminAddress } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'admin',
  });

  const isAdmin = address === adminAddress;

  // 발급자 추가 함수
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

  // 발급자 제거 함수
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
      <div className='p-6 sm:p-8 text-center'>
        <div className='inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4'>
          ⚠️
        </div>
        <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-2'>
          접근 제한
        </h3>
        <p className='text-sm sm:text-base text-gray-600'>
          관리자만 접근할 수 있는 페이지입니다.
        </p>
      </div>
    );
  }

  return (
    <div className='divide-y divide-gray-100'>
      <div className='p-4 sm:p-6'>
        <h2 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6'>
          발급자 관리
        </h2>
        <form className='space-y-4' onSubmit={handleAddIssuer}>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              새 발급자 주소
            </label>
            <div className='flex flex-col sm:flex-row gap-3'>
              <input
                className='flex-1 rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                placeholder='0x...'
                type='text'
                value={newIssuerAddress}
                onChange={e => setNewIssuerAddress(e.target.value)}
              />
              <button
                className='w-full sm:w-auto px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                disabled={isAddingIssuer}
                type='submit'
              >
                {isAddingIssuer ? '처리중...' : '추가'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className='p-4 sm:p-6'>
        <h3 className='text-base sm:text-lg font-medium text-gray-900 mb-4'>
          발급자 목록
        </h3>
        <div className='space-y-3'>
          <div className='flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100 gap-3'>
            <code className='text-sm text-gray-600 break-all'>{address}</code>
            <button
              className='w-full sm:w-auto px-4 py-1.5 rounded-lg text-sm text-red-600 hover:bg-red-50 border border-red-200 transition-colors disabled:opacity-50'
              disabled={isRemovingIssuer}
              onClick={() => handleRemoveIssuer(address!)}
            >
              {isRemovingIssuer ? '처리중...' : '제거'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
