import '@/app/globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import IllustrationHome from '@/assets/illustration-home.svg';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'HealthConnect',
  description: 'Sua saúde em um só lugar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={montserrat.className}>
        <main className="md:flex h-screen overflow-x-hidden">
          <div className="bg-primary w-[470px] mt-[-90px] ml-[-40px] md:mt-0 md:ml-0 rounded-[499px] md:rounded-none h-[270px] md:w-1/2 md:h-screen flex justify-center">
            <div className="flex justify-center items-center mt-12 md:mt-0 md:block md:absolute md:top-10 md:left-10">
              <p className="text-4xl md:text-xl font-bold text-white text-center">
                HealthConnect
              </p>
            </div>
            <Image
              src={IllustrationHome}
              alt="Ilustração de saúde"
              height={350}
              width={350}
              className="hidden md:block"
            />
          </div>
          <div className="w-full md:w-1/2 bg-white">{children}</div>
        </main>
      </body>
    </html>
  );
}
