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
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

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

export interface AreaChartProps {
  data: {
    data: {
      x: Date;
      y: number;
    }[];
    fill?: boolean;
    borderColor?: string;
    backgroundColor?: string;
    label?: string;
    pointRadius?: number;
    pointBackgroundColor?: string;
  }[];
  options?: any;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
  tension?: number;
}

function SingAxisAreaChart({
  data,
  options: customOptions,
  style,
  className,
  tension = 0.3,
  title,
}: AreaChartProps) {
  const [data_, setData] = useState(data);

  useEffect(() => {
    logger('data changed');
    setData(data);
  }, [data]);

  const options: any = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
        // mode: 'index',
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
        // change font size and color
        font: {
          size: 16,
          color: 'purple',
        },
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        stacked: false,
        beginAtZero: true,
        // offset: true, // offset means that the axis will not overlap the data
        grace: '10%',
      },
      x: {
        type: 'timeseries',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'yyyy-MM-dd',
          },
        },
        ticks: {
          source: 'data',
          autoSkip: true,
          // maxTicksLimit: 20, // Adjust this value as needed to prevent label overlap
        },
      },
    },
    tension: tension,
  };

  if (!data_ || data_.length === 0) return null;

  return (
    <div
      className={clsxm(
        'flex h-[500px] flex-col items-start justify-start',
        className
      )}
    >
      <Line
        options={{ ...options, ...customOptions }}
        data={{
          datasets: data_,
        }}
        style={{
          width: '100%',
          maxWidth: '100%',
          maxHeight: 'calc(100% - 30px)',
          height: 'calc(100% - 30px)',
          minHeight: '400px',
          ...style,
        }}
      />
    </div>
  );
}

export default SingAxisAreaChart;
