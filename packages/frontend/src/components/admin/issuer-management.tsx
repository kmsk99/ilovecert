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
      <div className='bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4'>
        ⚠️ 관리자만 접근할 수 있습니다.
      </div>
    );
  }

  return (
    <div className='space-y-6 p-6'>
      <h2 className='text-2xl font-bold'>발급자 관리</h2>

      {/* 발급자 추가 폼 */}
      <form className='space-y-4' onSubmit={handleAddIssuer}>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            새 발급자 주소
          </label>
          <div className='mt-1 flex rounded-md shadow-sm'>
            <input
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              placeholder='0x...'
              type='text'
              value={newIssuerAddress}
              onChange={e => setNewIssuerAddress(e.target.value)}
            />
            <button
              className='ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50'
              disabled={isAddingIssuer}
              type='submit'
            >
              {isAddingIssuer ? '처리중...' : '추가'}
            </button>
          </div>
        </div>
      </form>

      {/* 현재 발급자 목록 */}
      <div className='mt-8'>
        <h3 className='text-lg font-medium'>현재 발급자 목록</h3>
        <div className='mt-4 space-y-2'>
          {/* 여기에 발급자 목록을 표시할 수 있습니다 */}
          <div className='flex items-center justify-between rounded-lg border border-gray-200 p-4'>
            <code className='text-sm'>{address}</code>
            <button
              className='rounded-md bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50'
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
