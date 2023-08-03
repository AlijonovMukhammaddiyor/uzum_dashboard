import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import Slider from 'rc-slider';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

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
  Annotation,
  TimeSeriesScale
);

export interface AreaChartProps {
  data: {
    type?: 'line' | 'bar'; // Add this type
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
  labels: Date[];
  options?: any;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
  first_date: Date;
  last_date: Date;
}

function CampaignAreaChart({
  data,
  labels,
  options: customOptions,
  style,
  title,
  className,
  first_date,
  last_date,
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

  const findClosestDate = (targetDate: Date) => {
    return labels.reduce((a, b) => {
      const aDiff = Math.abs(a.getTime() - targetDate.getTime());
      const bDiff = Math.abs(b.getTime() - targetDate.getTime());
      return aDiff < bDiff ? a : b;
    });
  };

  const firstDateIndex = findClosestDate(first_date);
  const lastDateIndex = findClosestDate(last_date);

  const options: any = {
    maintainAspectRatio: false,
    responsive: true,

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
        display: title ? true : false,
        text: title,
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: firstDateIndex,
            borderColor: '#343a40',
            content: 'End: ' + last_date.toDateString(),
            borderWidth: 2,
            label: {
              enabled: true,
              position: 'start',
              content: 'Start' + first_date.toDateString(),
            },
          },
          {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x',
            value: lastDateIndex,
            borderColor: '#343a40',
            borderWidth: 2,
            content: 'End: ' + last_date.toDateString(),
            label: {
              enabled: true,
              position: 'end',
              content: 'End: ' + last_date.toDateString(),
            },
          },
          {
            type: 'box',
            xScaleID: 'x',
            xMin: firstDateIndex,
            xMax: lastDateIndex,
            backgroundColor: 'rgba(2, 236, 241,0.1)', // Change to the color you want
          },
        ],
      },
    },
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
      <Chart
        type='bar'
        options={{ ...options, ...customOptions }}
        data={{
          labels: labels?.slice(sliderValues[0], sliderValues[1]),
          datasets: data_?.map((dataset, index) => ({
            ...dataset,
            yAxisID: `y-axis-${index}`,
            type: dataset.type ?? 'line',
            data: dataset.data.filter(
              (data_q) =>
                !labels.slice(0, sliderValues[0]).includes(data_q.x) &&
                !labels.slice(sliderValues[1]).includes(data_q.x)
            ),
          })) as any,
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

export default CampaignAreaChart;
