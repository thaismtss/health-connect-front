import '@/app/globals.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import Session from '@/app/providers/session';
import { getCurrentSession } from '@/lib/session';
import Logout from './components/Logout';
import Query from '../contexts/query';
import ToastProvider from '../components/Toast';
import ServicesProvider from '../contexts/services';
import Menu from './components/Menu';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'HealthConnect',
  description: 'Sua saúde em um só lugar',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  return (
    <html lang="pt">
      <body className={`${montserrat.className} flex flex-col min-h-screen`}>
        <header className="flex justify-between bg-primary  rounded-b-xl p-4 mx-8 z-[9999]">
          <p className="font-bold text-white text-sm">HealthConnect</p>
          <Menu />
          <Logout />
        </header>
        <Query>
          <ToastProvider>
            <Session session={session}>
              <ServicesProvider>{children}</ServicesProvider>
            </Session>
          </ToastProvider>
        </Query>
      </body>
    </html>
  );
}
