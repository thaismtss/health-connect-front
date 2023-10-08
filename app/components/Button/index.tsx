import { cva, cx } from 'class-variance-authority';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  children: React.ReactNode;
  loading?: boolean;
}

const styles = cva(
  [
    'p-2',
    'bg-primary',
    'text-white',
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
      loading: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
  }
);

export default function Button({ children, loading, ...props }: ButtonProps) {
  return (
    <button
      className={cx(styles({ loading }), 'inline-flex justify-center gap-2')}
      {...props}
    >
      {loading && (
        <AiOutlineLoading3Quarters size={24} className="animate-spin" />
      )}
      {children}
    </button>
  );
}
