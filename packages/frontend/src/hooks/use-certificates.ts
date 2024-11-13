'use client';

import { getCertificates } from '@/lib/contract';
import { Certificate } from '@/types/certificate';
import { useQuery } from '@tanstack/react-query';

export function useCertificates(address: string | undefined) {
  return useQuery<Certificate[]>({
    queryKey: ['certificates', address],
    queryFn: () => getCertificates(address!),
    enabled: !!address,
  });
}
