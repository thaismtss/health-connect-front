'use client';

import { signOut } from 'next-auth/react';

export default function Logout() {
  return (
    <button
      className="font-semibold text-white"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Sair
    </button>
  );
}
