import { GlycemicControl } from '@/app/api/services/glycemic-control/route';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ glycemic }: { glycemic: GlycemicControl }) {
  const labels = glycemic.glycemic.map(({ date }) => date);
  const values = glycemic.glycemic.map(({ value }) => value);
  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: '#504CFF',
        backgroundColor: '#A4A2FF',
      },
    ],
  };
  return (
    <Line
      data={data}
      options={options}
      className="absolute left-1 top-2 md:static w-[1200px] md:w-full"
    />
  );
}
