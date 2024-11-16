'use client';

import { useEffect } from 'react';
import { useReadContract, useReadContracts } from 'wagmi';

import { certificateABI } from '@/config/abi';
import { CONTRACT_ADDRESS } from '@/config/contract';

export function useCertificates(address?: string) {
  const certificates = useUserCertificates(address);

  return {
    data: certificates ?? [],
    isLoading: certificates === null,
    error: null,
  };
}

export function useUserCertificates(address?: string) {
  const { data, isError, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: certificateABI,
    functionName: 'getUserCertificates',
    args: address ? [address as `0x${string}`] : undefined,
    query: {
      enabled: Boolean(address),
      retry: 3,
      retryDelay: 1000,
    },
  });

  useEffect(() => {
    if (isError) {
      const timer = setTimeout(() => {
        refetch();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isError, refetch]);

  const validCertificateIds = data
    ?.map(id => {
      try {
        return String(id);
      } catch {
        return null;
      }
    })
    .filter((id): id is string => id !== null);

  const certificatesResults = useReadContracts({
    contracts:
      validCertificateIds?.map(id => ({
        address: CONTRACT_ADDRESS,
        abi: certificateABI,
        functionName: 'getCertificate',
        args: [BigInt(id)],
      })) ?? [],
    query: {
      enabled: Boolean(validCertificateIds?.length),
      retry: 3,
      retryDelay: 1000,
    },
  });

  console.log('=== Debug Information ===');
  console.log('Address:', address);
  console.log('Original Certificate IDs:', data);
  console.log('Valid Certificate IDs:', validCertificateIds);
  console.log('Certificates Results:', certificatesResults.data);

  if (isError || certificatesResults.isLoading) {
    return null;
  }

  if (!validCertificateIds?.length) {
    return [];
  }

  try {
    const processedCertificates = (certificatesResults.data ?? [])
      .filter(result => {
        return (
          result.status === 'success' &&
          result.result &&
          Array.isArray(result.result) &&
          result.result.length >= 7
        );
      })
      .map(({ result }) => {
        if (!result) return null;

        try {
          const [
            id,
            issuer,
            recipientName,
            metadataURI,
            issuedAt,
            isValid,
            certificateType,
          ] = result as unknown as [
            bigint,
            `0x${string}`,
            string,
            string,
            bigint,
            boolean,
            string,
          ];

          return {
            id: String(id),
            name: certificateType,
            description: '',
            recipient: recipientName,
            issuer,
            issuedAt: Number(issuedAt) * 1000,
            metadataURI,
          };
        } catch (error) {
          console.error('Certificate processing error:', error);
          return null;
        }
      })
      .filter((cert): cert is NonNullable<typeof cert> => cert !== null);

    return processedCertificates;
  } catch (error) {
    console.error('Certificate processing error:', {
      error,
      data: certificatesResults.data,
    });
    return [];
  }
}
