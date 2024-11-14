'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { toast } from 'sonner';
import { useChainId, useSwitchChain, useAccount } from 'wagmi';

// 어드민 지갑 주소 상수 추가
const ADMIN_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

export function NetworkCheck() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { address } = useAccount();
  const [showGuide, setShowGuide] = useState(false);
  const isAdmin = address?.toLowerCase() === ADMIN_ADDRESS.toLowerCase();

  // 기존 useEffect 유지
  useEffect(() => {
    if (chainId !== 31337) {
      setShowGuide(true);
    } else {
      setShowGuide(false);
    }
  }, [chainId]);

  // 기존 handleAddNetwork 함수 유지
  const handleAddNetwork = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x7A69', // 31337 in hex
            chainName: 'Localhost 8545',
            rpcUrls: ['http://127.0.0.1:8545'],
            nativeCurrency: {
              name: 'ETH',
              symbol: 'ETH',
              decimals: 18,
            },
          },
        ],
      });
      toast.success('네트워크가 추가되었습니다.');
    } catch (error) {
      toast.error('네트워크 추가 실패: ' + (error as Error).message);
    }
  };

  return (
    <div className='fixed top-4 right-4 z-50 flex flex-col gap-4'>
      {showGuide && (
        <div className='w-[calc(100vw-2rem)] sm:w-[400px] mx-4 sm:mx-0 rounded-lg bg-white shadow-lg border border-yellow-200 overflow-hidden'>
          <div className='bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-2'>
            <h3 className='font-bold text-white flex items-center gap-2'>
              <span className='text-xl'>⚠️</span>
              네트워크 설정
            </h3>
          </div>
          <div className='p-4 bg-white'>
            <p className='text-sm text-gray-600 mb-4'>
              원활한 서비스 이용을 위해 Localhost 8545 네트워크로 전환해주세요.
            </p>
            <div className='flex flex-col sm:flex-row gap-2 sm:justify-end'>
              <button
                className='w-full sm:w-auto px-4 py-2 text-sm rounded-md border border-yellow-500 text-yellow-600 hover:bg-yellow-50 transition-colors'
                onClick={handleAddNetwork}
              >
                네트워크 추가
              </button>
              {switchChain && (
                <button
                  className='w-full sm:w-auto px-4 py-2 text-sm rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition-colors'
                  onClick={() => switchChain({ chainId: 31337 })}
                >
                  네트워크 전환
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {isAdmin && (
        <div className='fixed bottom-4 right-4 z-50'>
          <Link
            className='flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-lg border border-blue-100 text-blue-600 hover:bg-blue-50 transition-all'
            href='/admin'
          >
            <span className='text-xl'>👑</span>
            <span className='text-sm font-medium'>관리자 페이지</span>
          </Link>
        </div>
      )}
    </div>
  );
}
