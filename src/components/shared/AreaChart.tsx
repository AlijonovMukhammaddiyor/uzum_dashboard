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
import Slider from 'rc-slider';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import clsxm from '@/lib/clsxm';

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
      x: string;
      y: number;
    }[];
    fill?: boolean;
    borderColor?: string;
    backgroundColor?: string;
    label?: string;
    pointRadius?: number;
    pointBackgroundColor?: string;
  }[];
  labels: string[];
  options?: any;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
}

function AreaChart({
  data,
  labels,
  options: customOptions,
  style,
  title,
  className,
}: AreaChartProps) {
  const [data_, setData] = useState(data);
  const [sliderValues, setSliderValues] = useState([0, labels.length]);

  useEffect(() => {
    setSliderValues([0, labels.length]);
  }, [labels]);

  useEffect(() => {
    setData(data);
  }, [data]);

  const onSliderChange = (values: number[]) => {
    setSliderValues(values);
  };

  const yAxis: {
    [key: string]: any;
  } = {};

  for (let i = 0; i < data_.length; i++) {
    yAxis[`y-axis-${i}`] = {
      type: 'linear',
      display: true,
      position: i % 2 === 0 ? 'left' : 'right',
      id: `y-axis-${i}`,
      stacked: true,
      beginAtZero: true,
      // offset: true, // offset means that the axis will not overlap the data
      grace: '10%',
      grid: {
        borderColor: data_[i].borderColor,
      },
      ticks: {
        color: data_[i].borderColor,
        borderColor: data_[i].borderColor,
      },
    };
  }

  const options: any = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
      },
      legend: {
        position: 'top',
      },
      title: {
        display: title ? true : false,
        text: title,
      },
    },
    scales: {
      x: {
        autoSkip: false,
        ticks: {
          maxRotation: 90,
          minRotation: 0,
        },
      },
      ...yAxis,
    },
    tension: 0.3,
  };

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
          labels: labels?.slice(sliderValues[0], sliderValues[1]),
          datasets: data_?.map((dataset, index) => ({
            ...dataset,
            yAxisID: `y-axis-${index}`,
            data: dataset.data.filter(
              (data_q) =>
                !labels.slice(0, sliderValues[0]).includes(data_q.x) &&
                !labels.slice(sliderValues[1]).includes(data_q.x)
            ),
          })),
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
      <Slider
        range
        min={0}
        max={labels.length}
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
}

export default AreaChart;
