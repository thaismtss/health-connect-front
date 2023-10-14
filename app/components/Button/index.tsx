import { cva, cx } from 'class-variance-authority';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

const styles = cva(
  [
    'p-2',
    'bg-primary',
    'font-bold',
    'rounded-md',
    'w-full',
    'hover:bg-primary-dark',
    'disabled:bg-gray-300',
    'disabled:text-gray-400',
    'disabled:cursor-not-allowed',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary hover:bg-primary-dark  text-white',
        secondary: 'bg-tertiary text-primary hover:bg-tertiary-dark',
      },
      loading: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export default function Button({
  children,
  loading,
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        styles({ loading, variant }),
        'inline-flex justify-center gap-2 text-sm'
      )}
      {...props}
    >
      {loading && (
        <AiOutlineLoading3Quarters size={24} className="animate-spin" />
      )}
      {children}
    </button>
  );
}
