import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import type { SimulationStep } from '../utils/pidSimulation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SimulationChartProps {
  data: SimulationStep[];
}

export function SimulationChart({ data }: SimulationChartProps) {
  if (data.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">시뮬레이션 데이터가 없습니다</p>
      </div>
    );
  }

  const chartData = {
    labels: data.map((d) => d.time.toFixed(2)),
    datasets: [
      {
        label: '목표값 (Reference)',
        data: data.map((d) => d.reference),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
      },
      {
        label: '실제값 (Output)',
        data: data.map((d) => d.output),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
        fill: false,
        borderWidth: 2,
      },
      {
        label: '제어신호 (Control)',
        data: data.map((d) => d.control),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: false,
        borderWidth: 1.5,
        hidden: false,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'PID 제어 시뮬레이션 결과',
        font: { size: 16 },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Output / Reference',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Control Signal',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div style={{ height: '400px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
