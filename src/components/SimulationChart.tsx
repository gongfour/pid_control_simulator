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
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📈</span>
            시뮬레이션 결과
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p className="text-slate-500 dark:text-slate-400">시뮬레이션을 실행하면 그래프가 표시됩니다</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: data.map((d) => d.time.toFixed(1)),
    datasets: [
      {
        label: '목표값 (Reference)',
        data: data.map((d) => d.reference),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
      {
        label: '실제값 (Output)',
        data: data.map((d) => d.output),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
      {
        label: '제어신호 (Control)',
        data: data.map((d) => d.control),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'transparent',
        tension: 0.3,
        fill: false,
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        pointHoverRadius: 5,
        yAxisID: 'y1',
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: { size: 12, weight: 500 },
          usePointStyle: true,
          color: '#64748b',
        },
      },
      filler: {
        propagate: true,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 13, weight: 600 },
        bodyFont: { size: 12 },
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
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
          font: { size: 12, weight: 600 },
          color: '#64748b',
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.2)',
          drawBorder: true,
        },
        ticks: {
          font: { size: 11 },
          color: '#64748b',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Control Signal',
          font: { size: 12, weight: 600 },
          color: '#64748b',
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: { size: 11 },
          color: '#64748b',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Time (s)',
          font: { size: 12, weight: 600 },
          color: '#64748b',
        },
        grid: {
          color: 'rgba(203, 213, 225, 0.1)',
        },
        ticks: {
          font: { size: 11 },
          color: '#64748b',
          maxTicksLimit: 10,
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">📈</span>
          시뮬레이션 결과
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: '450px' }} className="w-full">
          <Line data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
