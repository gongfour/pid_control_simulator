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
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { SimulationStep } from "../utils/pidSimulation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface SimulationChartProps {
  data: SimulationStep[];
}

export function SimulationChart({ data }: SimulationChartProps) {
  if (data.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          시뮬레이션을 실행하면 그래프가 표시됩니다
        </p>
      </div>
    );
  }

  // Chart.js 데이터 포맷
  const labels = data.map((_, idx) => (idx * 0.01).toFixed(2));

  const chartData = {
    labels,
    datasets: [
      {
        label: "시스템 응답",
        data: data.map((d) => parseFloat(d.output.toFixed(2))),
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: false,
      },
      {
        label: "참조값",
        data: data.map((d) => parseFloat(d.reference.toFixed(2))),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: false,
      },
      {
        label: "제어신호",
        data: data.map((d) => parseFloat(d.control.toFixed(2))),
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14,
            weight: "500" as const,
          },
          color: "rgb(107, 114, 128)",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: { size: 14, weight: "bold" as const },
        bodyFont: { size: 13 },
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "시간 (초)",
          font: { size: 13, weight: "bold" as const },
          color: "rgb(107, 114, 128)",
        },
        ticks: {
          color: "rgb(107, 114, 128)",
          font: { size: 12 },
        },
        grid: {
          color: "rgba(209, 213, 219, 0.3)",
          drawBorder: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "값",
          font: { size: 13, weight: "bold" as const },
          color: "rgb(107, 114, 128)",
        },
        ticks: {
          color: "rgb(107, 114, 128)",
          font: { size: 12 },
          callback: function (value: any) {
            return value.toFixed(2);
          },
        },
        grid: {
          color: "rgba(209, 213, 219, 0.3)",
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="h-96 w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}
