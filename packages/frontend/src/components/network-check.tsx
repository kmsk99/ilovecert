'use client';

import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import { useChainId, useSwitchChain } from 'wagmi';

export function NetworkCheck() {
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (chainId !== 31337) {
      setShowGuide(true);
    } else {
      setShowGuide(false);
    }
  }, [chainId]);

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

  if (!showGuide) return null;

  return (
    <div className='fixed top-0 left-0 right-0 bg-yellow-100 p-4 z-50'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='font-bold'>⚠️ 네트워크 설정이 필요합니다</h3>
            <p className='text-sm'>Localhost 8545 네트워크로 전환해주세요.</p>
          </div>
          <div className='flex gap-2'>
            <button
              className='bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600'
              onClick={handleAddNetwork}
            >
              네트워크 추가
            </button>
            {switchChain && (
              <button
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
                onClick={() => switchChain({ chainId: 31337 })}
              >
                네트워크 전환
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
