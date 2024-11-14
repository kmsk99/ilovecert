import { useQuery } from '@tanstack/react-query';

import { getCertificate } from '@/lib/contract';

export function useCertificate(certificateId: string) {
  return useQuery({
    queryKey: ['certificate', certificateId],
    queryFn: () => getCertificate(certificateId),
    enabled: !!certificateId,
  });
}
