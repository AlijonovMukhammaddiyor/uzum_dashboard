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
  tension?: number;
}

function SingAxisAreaChart({
  data,
  labels,
  options: customOptions,
  style,
  className,
  tension = 0.3,
  title,
}: AreaChartProps) {
  const [data_, setData] = useState(data);
  const [sliderValues, setSliderValues] = useState([0, labels.length]);

  useEffect(() => {
    setSliderValues([0, labels.length]);
  }, [labels]);

  useEffect(() => {
    logger('data changed');
    setData(data);
    setSliderValues([0, labels.length - 1]);
  }, [data, labels.length]);

  const onSliderChange = (values: number[]) => {
    setSliderValues(values);
  };

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
    },
    tension: tension,
  };

  if (!data_ || data_.length == 0 || !labels || labels.length == 0) {
    return null;
  }

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
          datasets: data_?.map((dataset) => ({
            ...dataset,
            data: dataset.data.filter(
              (data_) =>
                !labels.slice(0, sliderValues[0]).includes(data_.x) &&
                !labels.slice(sliderValues[1]).includes(data_.x)
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

export default SingAxisAreaChart;
