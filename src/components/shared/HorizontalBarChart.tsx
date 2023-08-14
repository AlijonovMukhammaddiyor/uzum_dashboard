import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export interface GroupedColumnChartProps {
  labels: string[];
  data: {
    data: number[];
    label: string;
    backgroundColor: string;
  }[];
  isRevenue?: boolean;
  style?: React.CSSProperties;
}

const HorizontalColumnChart: React.FC<GroupedColumnChartProps> = ({
  data,
  labels,
  isRevenue,
  style,
}) => {
  const { i18n } = useTranslation('common');

  // count
  const ta = i18n.language === 'uz' ? 'ta' : 'шт';

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      y: {
        barThickness: 30, // Adjust bar thickness
        categorySpacing: 15, // Adjust spacing between bars
        ticks: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'point' as const,
        intersect: false,
        callbacks: {
          label: function (context: any) {
            const datasetLabel = context.dataset.label || '';
            const dataValue = context.parsed.x;
            return `${datasetLabel}: ${
              isRevenue
                ? `${
                    dataValue > 1000000000
                      ? `${(dataValue / 1000000000).toFixed(1)} ${
                          i18n.language === 'uz' ? 'mlrd so`m' : 'млрд сум'
                        }`
                      : dataValue > 1000000
                      ? `${(dataValue / 1000000).toFixed(2)} ${
                          i18n.language === 'uz' ? 'mln so`m' : 'млн сум'
                        }`
                      : `${dataValue.toLocaleString()} ${
                          i18n.language === 'uz' ? 'ming so`m' : 'тыс. сум'
                        }`
                  }`
                : `${dataValue.toLocaleString()} ${ta}`
            }`;
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div style={{ ...style }}>
      <Bar
        data={{
          labels: labels,
          datasets: data,
        }}
        options={{ ...options }}
      />
    </div>
  );
};

export default HorizontalColumnChart;
