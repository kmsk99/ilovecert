'use client';

import { useQuery } from '@tanstack/react-query';
import { useReadContract } from 'wagmi';

import { certificateABI } from '@/config/abi';
import { CONTRACT_ADDRESS } from '@/config/contract';
import { getCertificates } from '@/lib/contract';
import { Certificate } from '@/types/certificate';

export function useCertificates(address: string | undefined) {
  return useQuery<Certificate[]>({
    queryKey: ['certificates', address],
    queryFn: () => getCertificates(address!),
    enabled: !!address,
  });
}

export function useCertificate(id: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'certificates',
    args: [BigInt(id)],
  });
}

export function useIsIssuer(address?: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'issuers',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });
}

export function useValidateCertificate(id: string) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'validateCertificate',
    args: [BigInt(id)],
  });
}
