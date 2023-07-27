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
import Slider from 'rc-slider';
import React, { useState } from 'react';
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
  data: {
    datasets: {
      label: string;
      data: {
        x: Date;
        y: number;
      }[];
      backgroundColor: string;
    }[];
  };
  options?: any;
  style?: React.CSSProperties;
  title?: string;
}

const GroupedColumnChart: React.FC<GroupedColumnChartProps> = ({
  data,
  options: customOptions,
  style,
  title,
}) => {
  const [sliderValues, setSliderValues] = useState([
    0,
    data.datasets[0].data.length,
  ]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
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
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const onSliderChange = (values: number[]) => {
    setSliderValues(values);
  };

  return (
    <div style={{ ...style }}>
      <Bar
        data={{
          datasets: data.datasets.map((dataset) => ({
            ...dataset,
            data: dataset,
          })),
        }}
        options={{ ...options, ...customOptions }}
      />
      <Slider
        range
        min={0}
        max={data.datasets[0].data.length}
        value={sliderValues}
        onChange={onSliderChange as any}
        className='custom-slider mx-auto w-[90%]'
        style={{
          marginTop: '1rem',
          maxWidth: '96%',
          marginInline: 'auto',
        }}
      />
    </div>
  );
};

export default GroupedColumnChart;
