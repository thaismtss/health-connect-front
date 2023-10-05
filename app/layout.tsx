import './globals.css';
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
        <main className="flex min-h-screen">
          <div className="bg-primary w-2/5 min-h-screen flex justify-center">
            <div className="absolute top-10 left-10">
              <p className="text-xl font-bold text-white text-center">
                HealthConnect
              </p>
            </div>
            <Image
              src={IllustrationHome}
              alt="Ilustração de saúde"
              height={350}
              width={350}
            />
          </div>
          <div className="w-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
