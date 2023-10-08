import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between h-40">
        <div>
          <h1 className="text-4xl font-bold text-center text-primary mb-10">
            HealthConnect
          </h1>
          <p className="text-xl text-center">Sua saúde em um só lugar</p>
        </div>
        <p className="text-xl text-center">Faça login para acessar o sistema</p>
        <Link href={'/login'} passHref>
          <button className="bg-primary text-white rounded-lg px-8 py-2 my-8">
            Entrar
          </button>
        </Link>
        <p>
          Não tem conta?{' '}
          <Link href="/cadastro" className="font-bold text-primary">
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}
