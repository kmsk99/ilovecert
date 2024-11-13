import { getCertificate } from '@/lib/contract';
import { useQuery } from '@tanstack/react-query';

export function useCertificate(certificateId: string) {
  return useQuery({
    queryKey: ['certificate', certificateId],
    queryFn: () => getCertificate(certificateId),
    enabled: !!certificateId,
  });
}
