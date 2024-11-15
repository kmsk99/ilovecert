'use client';

import { useUserCertificates } from '@/lib/contract';

export function useCertificates(address?: string) {
  const certificates = useUserCertificates(address);

  return {
    data: certificates ?? [],
    isLoading: certificates === null,
    error: null,
  };
}
