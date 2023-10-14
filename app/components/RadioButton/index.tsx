import * as RadioGroup from '@radix-ui/react-radio-group';

export interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonsProps extends RadioGroup.RadioGroupProps {
  options: RadioOption[];
  message?: string;
}

export default function RadioButton({
  options,
  message,
  ...props
}: RadioButtonsProps) {
  return (
    <RadioGroup.Root {...props}>
      {options.map(option => (
        <div className="flex items-center" key={option.value}>
          <RadioGroup.Item
            className="bg-white w-[25px] h-[25px] rounded-full border-primary border hover:bg-primary-light  outline-none cursor-default"
            value={option.value}
          >
            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-primary" />
          </RadioGroup.Item>
          <label className="text-primary text-[15px] leading-none pl-1">
            {option.label}
          </label>
        </div>
      ))}
    </RadioGroup.Root>
  );
}
