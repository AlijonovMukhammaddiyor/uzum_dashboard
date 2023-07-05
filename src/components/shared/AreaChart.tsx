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
import { Line } from 'react-chartjs-2';

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

export const options: any = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: {
      display: true,
    },
    title: {
      display: false,
    },
    // annotation: {
    //   annotations: [annotation1, annotation2, annotation3],
    // },
  },
  scales: {
    y: {
      // suggestedMin: 0,
      stacked: false,
      beginAtZero: true,
      grace: '10%', // Padding as a percentage of the data range
    },
  },
  tension: 0.3,
};

export interface AreaChartProps {
  data: {
    data: number[];
    fill?: boolean;
    borderColor?: string;
    backgroundColor?: string;
    label?: string;
  }[];
  labels: string[];
}

function AreaChart({ data, labels }: AreaChartProps) {
  return (
    <Line
      options={options}
      data={{
        labels,
        datasets: data,
      }}
      style={{
        width: '100%',
        maxHeight: '100%',
        // height: '535px',
        // maxHeight: '440px',
      }}
    />
  );
}

export default AreaChart;
