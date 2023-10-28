import { ColumnDef } from '@tanstack/react-table';

interface GlyemicItem {
  id: string;
  date: string;
  time: string;
  fasting: boolean;
  value: string;
  status: string;
}

export const columns: ColumnDef<GlyemicItem>[] = [
  {
    header: 'Data',
    cell: row => row.renderValue(),
    accessorKey: 'date',
  },
  {
    header: 'Horário',
    cell: row => row.renderValue(),
    accessorKey: 'time',
  },
  {
    header: 'Em Jejum?',
    cell: ({ row }) => (row.original.fasting ? 'Sim' : 'Não'),
    accessorKey: 'fasting',
  },
  {
    header: 'Valor',
    cell: ({ row }) => `${row.original.value}mg/dl`,
    accessorKey: 'value',
  },
  {
    header: 'Status',
    cell: row => row.renderValue(),
    accessorKey: 'status',
  },
];
