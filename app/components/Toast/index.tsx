'use client';
import * as ToastGroup from '@radix-ui/react-toast';
import { VariantProps, cva } from 'class-variance-authority';
import { createContext, useState } from 'react';

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastProps
  extends VariantProps<typeof style>,
    Omit<ToastGroup.ToastProps, 'asChild'> {
  title: string;
  description?: string;
}

type ToastContextType = {
  toast: (props: ToastProps) => void;
};

export const ToastContext = createContext<ToastContextType>(
  {} as ToastContextType
);

const style = cva(
  [
    'relative',
    'w-full',
    'p-4',
    'pr-10',
    'rounded-lg',
    'shadow-lg',
    "data-[state='open']:animate-toastSlideIn",
    "data-[state='closed']:animate-toastHide",
    "data-[swipe='move']:translate-x-[var(--radix-toast-swipe-move-x)]",
    "data-[swipe='cancel']:transition-[transform_200ms_ease-out]",
    "data-[swipe='end']:animate-toastSwipeOut",
  ],
  {
    variants: {
      variant: {
        info: 'bg-blue-100 text-blue-500',
        success: 'bg-green-100 text-green-500',
        error: 'bg-red-100 text-red-500',
      },
    },
  }
);

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  function toast(props: ToastProps) {
    setToasts(toast => [...toast, props]);
  }
  return (
    <ToastContext.Provider value={{ toast }}>
      <ToastGroup.Provider swipeDirection="right">
        {children}
        {toasts.map(({ title, description, variant, duration }, index) => (
          <ToastGroup.Root
            key={index}
            duration={duration ?? 5000}
            {...toast}
            className={style({ variant })}
          >
            <ToastGroup.Title className="font-semibold mb-1">
              {title}
            </ToastGroup.Title>
            <ToastGroup.Description>{description}</ToastGroup.Description>
          </ToastGroup.Root>
        ))}
        <ToastGroup.Viewport className="[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[500px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </ToastGroup.Provider>
    </ToastContext.Provider>
  );
}
