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
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

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
    labels: string[];
    datasets: {
      label: string;
      data: {
        x: string;
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
  const [sliderValues, setSliderValues] = useState([0, 15]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        // mode: 'index',
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

  useEffect(() => {
    setSliderValues([0, data.labels.length]);
  }, [data]);

  const onSliderChange = (values: number[]) => {
    setSliderValues(values);
  };

  return (
    <div style={{ ...style }}>
      <Bar
        data={{
          labels: data.labels.slice(sliderValues[0], sliderValues[1]),
          datasets: data.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data.filter(
              (data_) =>
                !data.labels.slice(0, sliderValues[0]).includes(data_.x) &&
                !data.labels.slice(sliderValues[1]).includes(data_.x)
            ),
          })),
        }}
        options={{ ...options, ...customOptions }}
      />
      <Slider
        range
        min={0}
        max={data.labels.length}
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
