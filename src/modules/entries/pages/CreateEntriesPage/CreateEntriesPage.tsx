'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import revalidateTagFn from '@/api/actions/revalidateTagFn';
import { useCreateEntries } from '@/api/entries';
import { Tags } from '@/api/types';
import { InputText } from '@/components/InputText';
import { Button } from '@/components/ui/button';
import { brlToNumber } from '@/utils/formatters/brlToNumber';
import { Mask } from '@/utils/functions/mask';

import { createEntriesSchema, CreateEntriesSchema } from '../../validators';

export const CreateEntriesPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateEntriesSchema>({
    resolver: zodResolver(createEntriesSchema),
  });

  const { mutate, isPending } = useCreateEntries();

  const router = useRouter();

  const onSubmit = (values: CreateEntriesSchema) => {
    mutate(
      { ...values, value: brlToNumber(values.value) },
      {
        onSuccess: () => {
          revalidateTagFn(Tags.ENTRIES);
          router.push('/entradas');
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center h-screen"
    >
      <div className="flex flex-col max-w-[20rem] gap-4">
        <InputText
          label="Valor"
          error={errors.value}
          register={register('value')}
          mask={Mask.brl}
        />
        <InputText
          label="Descrição"
          error={errors.description}
          register={register('description')}
        />
        <Button type="submit" isLoading={isPending} className="bg-blue">
          Adicionar
        </Button>
      </div>
    </form>
  );
};
