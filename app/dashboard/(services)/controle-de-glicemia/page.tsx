'use client';
import Image from 'next/image';
import Glycemic from '@/assets/services/controle-de-glicemia.svg';
import Button from '@/app/components/Button';
import InfoGlycemicCard from './components/InfoGlycemicCard';
import { Modal } from '@/app/components/Modal';
import { Fragment, useContext, useState } from 'react';
import Form from '@/app/components/Form';
import Input from '@/app/components/Input';
import RadioButton, { RadioOption } from '@/app/components/RadioButton';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { axios } from '@/lib/axios';
import { ToastContext } from '@/app/components/Toast';
import { useQuery } from 'react-query';
import {
  GlycemicControl,
  Response,
} from '@/app/api/services/glycemic-control/route';
import DataTable from '@/app/components/DataTable';
import { columns } from './table-config';
import Loading from '@/app/components/Loading';
import NoDataImage from '@/assets/illustration-empty.svg';
import LineChart from './components/LineChart';

export default function GlycemicControlPage() {
  const [open, setOpen] = useState(false);
  const { toast } = useContext(ToastContext);
  const {
    data: glycemics,
    isLoading: isGlycemicLoading,
    refetch,
  } = useQuery<Response<GlycemicControl>>('glycemic-control', async () => {
    const { data } = await axios.get('/api/services/glycemic-control');
    return data;
  });

  const schema = z.object({
    value: z
      .string()
      .min(2, { message: 'Valor deve ter no mínimo 2 caracteres' }),
    isFasting: z.enum(['YES', 'NO'], {
      required_error: 'Selecione uma opção',
      invalid_type_error: 'Selecione uma opção',
    }),
  });

  type FormValues = z.infer<typeof schema>;

  const formMehods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const options: RadioOption[] = [
    { label: 'Sim', value: 'YES' },
    { label: 'Não', value: 'NO' },
  ];

  function handleOpenModal() {
    setOpen(true);
  }

  function handleCloseModal() {
    setOpen(false);
    formMehods.reset();
  }

  async function handleInsertGlycemic(data: FormValues) {
    try {
      const { value, isFasting } = data;
      const { data: glycemicData } = await axios.post(
        '/api/services/glycemic-control',
        {
          value,
          fasting: isFasting === 'YES' ? true : false,
        }
      );
      if (!glycemicData.success) {
        throw new Error();
      }
      toast({
        title: 'Glicemia inserida com sucesso',
        description: 'A glicemia foi inserida com sucesso',
        variant: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Erro ao inserir glicemia',
        description: 'Tente novamente mais tarde',
        variant: 'error',
        duration: 3000,
      });
    } finally {
      handleCloseModal();
      refetch();
    }
  }

  function handleSubmit() {
    formMehods.handleSubmit(handleInsertGlycemic)();
  }

  if (isGlycemicLoading) {
    return (
      <main className="bg-tertiary flex-grow pt-8 -mt-16">
        <div className="h-[70vh]">
          <Loading />
        </div>
      </main>
    );
  }

  return (
    <main className="bg-tertiary flex-grow pt-8 -mt-16 overflow-x-hidden">
      <div className="md:px-8 mt-16 mb-12">
        <section className="flex items-center justify-between flex-wrap px-8  md:px-0">
          <div className="flex items-center gap-4 ">
            <Image
              src={Glycemic}
              width={60}
              height={60}
              alt="Ilustração Controle de Glicemia"
            />
            <h1 className="text-xl text-secondary font-semibold">
              Controle de Glicemia
            </h1>
          </div>
          <div className="w-64">
            <Modal
              title="Glicemia"
              okText="Salvar"
              onOk={handleSubmit}
              onClose={handleCloseModal}
              open={open}
              onOpenChange={setOpen}
            >
              <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Controller
                  name="value"
                  control={formMehods.control}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <Input
                      name={field.name}
                      label="Valor"
                      placeholder="100"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      invalid={fieldState.invalid}
                      message={fieldState.error?.message}
                    />
                  )}
                />
                <div>
                  <p className="text-primary font-semibold mb-2">Em Jejum?</p>
                  <Controller
                    name="isFasting"
                    defaultValue={undefined}
                    control={formMehods.control}
                    render={({ field, formState: { errors } }) => (
                      <>
                        <RadioButton
                          options={options}
                          value={field.value}
                          onValueChange={(value: string) =>
                            field.onChange(value)
                          }
                          className="flex gap-6"
                        />

                        <p className="text-red-500 text-[12px] leading-none pt-2">
                          {errors.isFasting?.message}
                        </p>
                      </>
                    )}
                  />
                </div>
              </Form>
            </Modal>
            <Button onClick={handleOpenModal}>Adicionar Novo Registro</Button>
          </div>
        </section>
        {!glycemics?.data.glycemic.length ? (
          <div className="flex flex-col gap-4 justify-center items-center min-h-screen px-8  md:px-0">
            <Image
              src={NoDataImage}
              width={200}
              height={200}
              alt="Ilustração dados não encontrados"
            />
            <p className="text-xl text-primary font-semibold mt-2 text-center">
              Nenhum registro encontrado
            </p>
          </div>
        ) : (
          <Fragment>
            <section className="mt-12 flex flex-wrap md:flex-nowrap gap-4 md:h-60">
              <div className="flex md:flex-col justify-between w-full md:w-52 gap-4 px-8 md:px-0">
                <InfoGlycemicCard
                  label="Valor mais alto"
                  value={glycemics?.data.max ?? 0}
                  prefix="mg/dl"
                />
                <InfoGlycemicCard
                  label="Média"
                  value={glycemics?.data.average ?? ''}
                  prefix="mg/dl"
                />
              </div>

              <div className="w-full overflow-x-auto relative md:static ml-8 md:ml-0">
                <div className="bg-white rounded-lg p-4 w-[1220px] h-[160px] md:w-full md:h-full">
                  <LineChart glycemic={glycemics.data} />
                </div>
              </div>
            </section>
            <section className="mt-8 w-full overflow-x-auto ml-8 md:ml-0">
              {glycemics?.data.glycemic.length && (
                <DataTable data={glycemics?.data.glycemic} columns={columns} />
              )}
            </section>
          </Fragment>
        )}
      </div>
    </main>
  );
}
