'use client';

import { Address, createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

import { useQuery } from '@tanstack/react-query';

import { certificateABI } from '../lib/contract';
import { Certificate } from '../types/certificate';

export function useCertificates(address: string | undefined) {
  return useQuery({
    queryKey: ['certificates', address],
    queryFn: async () => {
      if (!address) return [];

      const client = createPublicClient({
        chain: mainnet,
        transport: http(),
      });

      try {
        const certificates = (await client.readContract({
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
          abi: certificateABI,
          functionName: 'getUserCertificates',
          args: [address as Address],
        })) as Certificate[];

        return certificates;
      } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
      }
    },
    enabled: !!address,
  });
}
