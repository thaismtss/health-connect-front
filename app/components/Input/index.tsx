'use client';
import * as Form from '@radix-ui/react-form';
import { VariantProps, cva } from 'class-variance-authority';

interface InputProps
  extends React.ComponentPropsWithRef<'input'>,
    VariantProps<typeof style> {
  name: string;
  label: string;
  message?: string;
  invalid?: boolean;
  disabled?: boolean;
}

const style = cva(
  ['group', 'relative', 'inline-flex', 'flex-wrap-reverse', 'w-full'],
  {
    variants: {
      disabled: {
        true: 'cursor-not-allowed opacity-50',
      },
    },
  }
);

const inputStyle = cva(
  [
    'peer',
    'self-end',
    'w-full',
    'focus:outline-0',
    'border',
    'border-primary',
    'px-4',
    'h-10',
    'rounded-lg',
    'focus-within:border-2',
  ],
  {
    variants: {
      invalid: {
        true: 'border-red-500',
        false: 'border-primary',
      },
    },
  }
);

export default function Input({
  name,
  label,
  message,
  disabled = false,
  invalid = false,
  ...props
}: InputProps) {
  return (
    <Form.Field name={name} asChild>
      <div className="w-full">
        <div className={style({ disabled })}>
          <Form.Control
            {...{ ...props, disabled }}
            className={inputStyle({ invalid })}
          />
          <Form.Label className="pb-2 text-primary font-semibold">
            {label}
          </Form.Label>
        </div>
        <div className="text-red-500 text-xs h-6 pt-1">
          {message && <Form.Message> {message} </Form.Message>}
        </div>
      </div>
    </Form.Field>
  );
}
