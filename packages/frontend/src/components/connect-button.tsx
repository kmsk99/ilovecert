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
        onClick={() => disconnect()}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        {address.slice(0, 6)}...{address.slice(-4)} 연결 해제
      </button>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      지갑 연결
    </button>
  );
} 