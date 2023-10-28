import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <AiOutlineLoading3Quarters
        className="text-primary animate-spin"
        size={60}
      />
    </div>
  );
}
