'use client';
import Button from '@/app/components/Button';
import Form from '@/app/components/Form';
import Input from '@/app/components/Input';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { ToastContext } from '@/app/components/Toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { toast } = useContext(ToastContext);
  const router = useRouter();
  const [isLoadingLogin, setIsLoadingLogin] = React.useState(false);
  const [error, setError] = React.useState('');

  const schema = z.object({
    email: z.string().email({ message: 'Informe um email válido' }),
    password: z
      .string()
      .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
  });

  type FormValues = z.infer<typeof schema>;

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function handleSubmitLogin() {
    try {
      setIsLoadingLogin(true);
      const res = await signIn('credentials', {
        redirect: false,
        email: formMethods.getValues().email,
        password: formMethods.getValues().password,
      });

      if (res?.error) {
        setError('Email ou senha incorretos');
        return;
      }
      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Erro ao fazer login',
        description: 'Algo deu errado, tente novamente mais tarde',
        variant: 'error',
      });
    } finally {
      setIsLoadingLogin(false);
    }
  }
  return (
    <main className="flex flex-col h-full gap-8">
      <Form
        className="flex w-full md:max-w-fit m-auto"
        onSubmit={formMethods.handleSubmit(handleSubmitLogin)}
      >
        <div className="w-full md:w-96 space-y-4">
          {error && (
            <p className="text-center text-sm text-red-600">
              Email ou senha incorretos
            </p>
          )}
          <Controller
            name="email"
            control={formMethods.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Input
                name={field.name}
                placeholder="email"
                label="Email"
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                invalid={fieldState.invalid}
                message={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={formMethods.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Input
                name={field.name}
                placeholder="********"
                label="Senha"
                type="password"
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                invalid={fieldState.invalid}
                message={fieldState.error?.message}
              />
            )}
          />
          <Button type="submit" loading={isLoadingLogin}>
            Entrar
          </Button>
        </div>
      </Form>
    </main>
  );
}
