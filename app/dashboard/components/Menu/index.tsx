'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Menu() {
  const menuItems = [
    {
      title: 'Home',
      path: '/dashboard',
    },
    {
      title: 'Connect+',
      path: '/dashboard/connect-plus',
    },
  ];

  const pathname = usePathname();
  const pathActive = (path: string) => path === pathname;

  return (
    <div className="flex justify-center gap-8 font-semibold text-white">
      {menuItems.map(item => (
        <Link
          key={item.title}
          href={item.path}
          className={
            pathActive(item.path)
              ? 'border-b-2 border-quarternary'
              : 'text-white'
          }
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
