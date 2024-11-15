import { useContractRead } from 'wagmi';

import { certificateABI } from '@/config/abi';

export function useCertificate(certificateId: string) {
  return useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: certificateABI,
    functionName: 'getCertificate',
    args: [BigInt(certificateId)],
  });
}
