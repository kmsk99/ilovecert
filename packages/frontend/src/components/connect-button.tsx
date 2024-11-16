'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button
        className='px-6 py-2.5 bg-white border border-red-200 text-red-600 
                  rounded-xl hover:bg-red-50 transition-all duration-200 
                  shadow-sm hover:shadow flex items-center gap-2 font-medium'
        onClick={() => disconnect()}
      >
        <span className='font-mono'>
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
          />
        </svg>
      </button>
    );
  }

  return (
    <button
      className='px-6 py-2.5 bg-blue-600 text-white rounded-xl 
                hover:bg-blue-700 transition-all duration-200 
                shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                flex items-center gap-2 font-medium'
      onClick={() => connect({ connector: injected() })}
    >
      <svg
        className='w-4 h-4'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
        />
      </svg>
      지갑 연결
    </button>
  );
}
