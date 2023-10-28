'use client';
import { axios } from '@/lib/axios';
import { ReactNode, createContext } from 'react';
import { useQuery } from 'react-query';

export interface Service {
  id: string;
  name: string;
  description: string;
  slug: string;
}

type ServicesContextType = {
  services: Service[] | undefined;
  servicesUser: Service[] | undefined;
  isServicesLoading: boolean;
  isServicesUserLoading: boolean;
  refetchServicesUser: () => void;
};

export const ServicesContext = createContext<ServicesContextType>(
  {} as ServicesContextType
);

export default function ServicesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: services, isLoading: isServicesLoading } = useQuery<Service[]>(
    'services',
    () => {
      return axios.get('/api/services').then(res => res.data.data);
    }
  );

  const {
    data: servicesUser,
    isLoading: isServicesUserLoading,
    refetch: refetchServicesUser,
  } = useQuery('servicesUser', () => {
    return axios.get('/api/services/user').then(res => res.data.data);
  });

  return (
    <ServicesContext.Provider
      value={{
        services,
        servicesUser,
        isServicesLoading,
        isServicesUserLoading,
        refetchServicesUser,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
}
