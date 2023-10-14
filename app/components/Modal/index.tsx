'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '../Button';

interface ModalProps extends DialogProps {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
  onOk?: () => void;
  onClose?: () => void;
  okText?: string;
}

export function Modal({
  trigger,
  title,
  description,
  children,
  onOk,
  onClose,
  okText,
  open,
  onOpenChange,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/25 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-secondary m-0 text-[17px] font-semibold">
            {title}
          </Dialog.Title>
          {description && (
            <Dialog.Description className="text-secondary mt-[10px] mb-5 text-[15px] leading-normal">
              {description}
            </Dialog.Description>
          )}

          <div className="mt-6">{children}</div>

          <div className="mt-[25px] flex justify-end">
            <div className="inline-flex gap-2">
              <Button variant="secondary" onClick={onClose}>
                Cancelar
              </Button>
              <Button onClick={onOk}>{okText}</Button>
            </div>
          </div>
          <Dialog.Close asChild onClick={onClose}>
            <button
              className="text-primary bg-quarternary absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full outline-none"
              aria-label="Close"
            >
              <AiOutlineClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
