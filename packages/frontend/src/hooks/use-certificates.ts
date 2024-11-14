'use client';

import { useQuery } from '@tanstack/react-query';

import { getCertificates } from '@/lib/contract';
import { Certificate } from '@/types/certificate';

export function useCertificates(address: string | undefined) {
  return useQuery<Certificate[]>({
    queryKey: ['certificates', address],
    queryFn: () => getCertificates(address!),
    enabled: !!address,
  });
}
