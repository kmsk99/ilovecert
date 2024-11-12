'use client';

import { useQuery } from '@tanstack/react-query';

import { Certificate } from '../types/certificate';

export function useCertificates(address: string | undefined) {
  return useQuery({
    queryKey: ['certificates', address],
    queryFn: async () => {
      if (!address) return [];

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/certificates/${address}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch certificates');
        }
        const data = await response.json();
        return data as Certificate[];
      } catch (error) {
        console.error('Error fetching certificates:', error);
        return [];
      }
    },
    enabled: !!address,
  });
}
