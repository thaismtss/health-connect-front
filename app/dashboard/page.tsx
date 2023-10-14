'use client';
import { useSession } from 'next-auth/react';
import Button from '../components/Button';
import Link from 'next/link';
import { Fragment, useContext } from 'react';
import { ServicesContext } from '../contexts/services';
import Image, { StaticImageData } from 'next/image';
import Glycemic from '@/assets/services/controle-de-glicemia.svg';
import Loading from '../components/Loading';

export default function HomePage() {
  const { data: session } = useSession();
  const { servicesUser, isServicesUserLoading } = useContext(ServicesContext);
  const user = session?.user;

  const getServiceImage = (slug: string) => {
    const servicesImages: Record<string, StaticImageData> = {
      'controle-de-glicemia': Glycemic as StaticImageData,
    };

    return servicesImages[slug];
  };

  if (isServicesUserLoading)
    return (
      <main className="bg-tertiary flex-grow pt-8 -mt-16">
        <div className="h-[70vh]">
          <Loading />
        </div>
      </main>
    );

  return (
    <main className="bg-tertiary flex-grow pt-8 -mt-16">
      <div className="px-8 mt-16">
        <h1 className="text-2xl font-bold text-secondary">Olá, {user?.name}</h1>
        {servicesUser?.length === 0 ? (
          <Fragment>
            <div className="mt-20">
              <p className="text-xl text-primary font-semibold mt-2 text-center">
                Seja bem-vindo ao HealthConnect!
              </p>
              <p className="text-xl text-primary font-semibold mt-2 text-center">
                Acesse nossa sessão Connect+ e obtenha os serviços essencias
                para a sua saúde
              </p>
            </div>
            <div className="inline-flex justify-center w-full mt-8">
              <div className="w-80">
                <Link href={'/dashboard/connect-plus'} passHref>
                  <Button>Adicionar Seviços</Button>
                </Link>
              </div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <h1 className="text-xl font-bold text-secondary mt-10">
              Health Essentials
            </h1>
            <div className="mt-2 flex gap-2">
              {servicesUser &&
                servicesUser?.map(service => (
                  <Link key={service.id} href={`/dashboard/${service.slug}`}>
                    <div className="max-w-[340px] rounded-xl bg-white shadow-lg p-4 mt-4 hover:shadow-md hover:bg-indigo-200 cursor-pointer">
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
                    </div>
                  </Link>
                ))}
            </div>
          </Fragment>
        )}
      </div>
    </main>
  );
}
