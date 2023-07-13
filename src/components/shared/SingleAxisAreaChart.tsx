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
}

function SingAxisAreaChart({
  data,
  labels,
  options: customOptions,
  style,
  title,
}: AreaChartProps) {
  const [sliderValues, setSliderValues] = useState([0, 15]);

  useEffect(() => {
    setSliderValues([0, labels.length]);
  }, [labels]);

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
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
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
    tension: 0.3,
  };

  return (
    <div style={{ ...style }}>
      <Line
        options={{ ...options, ...customOptions }}
        data={{
          labels: labels?.slice(sliderValues[0], sliderValues[1]),
          datasets: data?.map((dataset, index) => ({
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
          maxHeight: '100%',
          // height: '535px',
          minHeight: '400px',
          // ...style,
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
