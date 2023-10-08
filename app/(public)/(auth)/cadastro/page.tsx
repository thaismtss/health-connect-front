'use client';
import Button from '@/app/components/Button';
import Form from '@/app/components/Form';
import Input from '@/app/components/Input';
import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { axios } from '@/lib/axios';
import { ToastContext } from '@/app/components/Toast';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { toast } = useContext(ToastContext);
  const router = useRouter();
  const schema = z
    .object({
      name: z
        .string()
        .min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
      email: z.string().email({ message: 'Informe um email válido' }),
      password: z
        .string()
        .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
      confirmPassword: z
        .string()
        .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: 'Senhas não conferem',
      path: ['confirmPassword'],
    });
  const [isLoadingRegister, setIsLoadingRegister] = React.useState(false);

  type FormValues = z.infer<typeof schema>;

  const formMethods = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function handleSubmitRegister() {
    try {
      setIsLoadingRegister(true);
      const { name, email, password } = formMethods.getValues();
      const { data } = await axios.post('/api/auth/register', {
        name,
        email,
        password,
      });

      if (!data.success) {
        toast({
          title: 'Erro ao criar conta',
          description: 'Verifique os dados e tente novamente',
          variant: 'error',
        });
        return;
      }

      toast({
        title: 'Conta criada com sucesso',
        description: 'Você já pode fazer login',
        variant: 'success',
      });
      formMethods.reset();
    } catch {
      toast({
        title: 'Erro ao criar conta',
        description: 'Algo deu errado, tente novamente mais tarde',
        variant: 'error',
      });
    } finally {
      setIsLoadingRegister(false);
      router.push('/login');
    }
  }
  return (
    <main className="flex flex-col h-full gap-8">
      <Form
        className="flex w-full md:max-w-fit m-auto"
        onSubmit={formMethods.handleSubmit(handleSubmitRegister)}
      >
        <div className="w-full md:w-96 space-y-4">
          <Controller
            name="name"
            control={formMethods.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Input
                name={field.name}
                placeholder="Nome"
                label="Nome"
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                invalid={fieldState.invalid}
                message={fieldState.error?.message}
              />
            )}
          />
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
          <Controller
            name="confirmPassword"
            control={formMethods.control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Input
                name={field.name}
                placeholder="********"
                label="Confirmar Senha"
                type="password"
                value={field.value}
                onBlur={field.onBlur}
                onChange={field.onChange}
                invalid={fieldState.invalid}
                message={fieldState.error?.message}
              />
            )}
          />
          <Button type="submit" loading={isLoadingRegister}>
            Criar Conta
          </Button>
        </div>
      </Form>
    </main>
  );
}
