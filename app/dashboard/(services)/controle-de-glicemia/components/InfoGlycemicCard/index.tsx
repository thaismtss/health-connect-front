interface InfoGlycemicCardProps {
  label: string;
  value: string | number;
  prefix?: string;
}

export default function InfoGlycemicCard({
  label,
  value,
  prefix,
}: InfoGlycemicCardProps) {
  return (
    <div className="w-48 p-4 rounded-lg border-l-8 border-primary bg-white">
      <p className="text-xs text-gray-600 mt-2">{label}</p>
      <p className="text-lg text-primary font-semibold mb-2">
        {value}
        {prefix ?? ''}
      </p>
    </div>
  );
}
