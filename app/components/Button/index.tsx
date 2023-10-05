import { cva } from 'class-variance-authority';
interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  children: React.ReactNode;
}

const styles = cva([
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
]);

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={styles()} {...props}>
      {children}
    </button>
  );
}
