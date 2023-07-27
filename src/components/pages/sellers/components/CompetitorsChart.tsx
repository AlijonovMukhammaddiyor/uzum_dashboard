import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import React from 'react';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler,
  LineElement,
  Annotation
);

type ChartType = 'line' | 'bar'; // Define your allowed chart types here.

export interface Dataset {
  type: ChartType;
  data: {
    x: string;
    y: number;
  }[];
  fill?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  label?: string;
  pointRadius?: number;
  pointBackgroundColor?: string;
  borderRadius?: number;
  borderSkipped?: string | boolean;
}

export interface MixedChartProps {
  data: Dataset[];
  labels: string[];
  options?: any;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
}

const Competitors: React.FC<MixedChartProps> = ({
  data,
  labels,
  options,
  style,
}) => {
  const chartData = {
    labels: labels.sort((a, b) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      return aDate.getTime() - bDate.getTime();
    }),
    datasets: data.map((dataset, index) => ({
      ...dataset,
    })),
  };

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: 'index',
    },
    elements: {
      line: {
        fill: false,
      },
    },
    legend: {
      display: true,
      // make solid rectangle with filled color
      labels: {
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        display: true,
        autohide: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        grace: '10%',
        grid: {},
        ticks: {},
      },
    },
    tension: 0,
  };

  return (
    <div className='h-[90%] max-h-full min-h-full w-full min-w-full max-w-full'>
      <Chart
        type='bar'
        data={chartData as any}
        options={options || defaultOptions}
        style={{
          width: '100%',
          height: '90%',
          ...style,
        }}
      />
    </div>
  );
};

export default Competitors;
