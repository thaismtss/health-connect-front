'use client';
import { axios } from '@/lib/axios';
import Image, { StaticImageData } from 'next/image';
import Glycemic from '@/assets/services/controle-de-glicemia.svg';
import Loading from '@/app/components/Loading';
import { useContext } from 'react';
import { ToastContext } from '@/app/components/Toast';
import { useRouter } from 'next/navigation';
import { ServicesContext } from '@/app/contexts/services';
import { cx } from 'class-variance-authority';

export default function Services() {
  const router = useRouter();
  const { toast } = useContext(ToastContext);
  const { services, servicesUser, isServicesLoading, refetchServicesUser } =
    useContext(ServicesContext);

  const getServiceImage = (slug: string) => {
    const servicesImages: Record<string, StaticImageData> = {
      'controle-de-glicemia': Glycemic as StaticImageData,
    };

    return servicesImages[slug];
  };

  const isServiceAdded = (slug: string) => {
    return servicesUser?.some(service => service.slug === slug);
  };

  async function handleAddService(serviceId: string) {
    try {
      const { data: service } = await axios.post(
        `/api/services/connect?serviceId=${serviceId}`
      );

      if (!service.success) {
        toast({
          title: 'Erro ao conectar serviço',
          description: 'Não foi possível conectar o serviço, tente novamente',
          variant: 'error',
        });
        return;
      }

      toast({
        title: 'Sucesso',
        description: 'Serviço conectado com sucesso',
        variant: 'success',
      });
      refetchServicesUser();
      router.push('/dashboard');
    } catch {
      toast({
        title: 'Erro ao conectar serviço',
        description:
          'Não foi possível conectar o serviço, tente novamente mais tarde',
        variant: 'error',
      });
    }
  }

  if (isServicesLoading) {
    return (
      <div className="h-[80vh]">
        <Loading />
      </div>
    );
  }

  return (
    <main className="flex-grow pt-8">
      <div className="px-8">
        <h1 className="text-secondary text-2xl font-semibold">
          Aqui você encontra todos os nosso serviços disponiveis para adicionar
          a sua plataforma
        </h1>
        <div className="mt-4">
          {services &&
            services?.map(service => (
              <div
                className={cx(
                  'border max-w-[340px] rounded-xl',
                  isServiceAdded(service.slug)
                    ? 'border-emerald-400'
                    : 'border-primary'
                )}
                key={service.id}
              >
                <div className="bg-white p-4 mt-4">
                  <div className="flex justify-center w-full">
                    <Image
                      src={getServiceImage(service.slug)}
                      width={80}
                      height={80}
                      alt="Ilustração"
                    />
                  </div>
                  <h2 className="text-secondary text-lg font-semibold">
                    {service.name}
                  </h2>
                  <p className="text-secondary text-sm">
                    {service.description}
                  </p>
                </div>
                {isServiceAdded(service.slug) ? (
                  <footer className="bg-emerald-400 rounded-b-xl py-3">
                    <p className="text-center text-white font-bold cursor-pointer">
                      Conectado
                    </p>
                  </footer>
                ) : (
                  <footer
                    className="bg-primary rounded-b-xl py-3"
                    onClick={() => handleAddService(service.id)}
                  >
                    <p className="text-center text-white font-bold cursor-pointer">
                      Adicionar
                    </p>
                  </footer>
                )}
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
