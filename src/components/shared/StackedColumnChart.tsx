import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Column = dynamic(
  () => import('@ant-design/plots').then((mod) => mod.Column),
  { ssr: false }
);

export interface StateckedColumnChartProps {
  data: {
    x: string;
    y: number;
    type: string;
  }[];
  style: React.CSSProperties;
  sliderEnd?: number;
}

const StateckedColumnChart = ({
  data,
  style,
  sliderEnd = 0.04,
}: StateckedColumnChartProps) => {
  const [data_, setData] = useState(data);

  useEffect(() => {
    setData(data);
  }, [data]);

  const config = {
    data: data_,
    isStack: true,
    xField: 'x',
    yField: 'y',
    seriesField: 'type',
    xAxis: {
      // Other configurations...
      label: null,
      grid: {
        line: {
          style: {
            stroke: '#d9d9d9',
            lineWidth: 1,
            lineDash: [4, 4],
          },
        },
      },
    },
    yAxis: {
      // Other configurations...
      tickCount: 20,
      grid: {
        line: {
          style: {
            stroke: '#d9d9d9',
            lineWidth: 1,
            lineDash: [4, 4],
          },
        },
      },
    },
    tooltip: {
      showMarkers: false,
      shared: true, // show all values in tooltip
    },
    legend: {
      position: 'top',
    },
    label: {
      position: 'middle',
      layout: [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
      ],
    },
    slider: {
      start: 0,
      end: sliderEnd,
      slider: {
        formatter: (v: any) => {
          const range = v.split('-');
          return `${range[0]}`; // or range[1] depending on which value you want to display
        },
      },
    },
    color: ({ type }: { type: string }) => {
      // use a function to map categories to colors
      switch (type) {
        case 'Buyurtmalar soni':
          return 'rgba(57, 181, 224, 0.7)'; // specify color for Mahsulotlar soni
        case 'Izohlar soni':
          return 'rgba(255, 82, 162, 0.5)'; // specify color for Buyurtmalar soni
        case 'Mahsulotlar soni':
          return 'rgba(255, 82, 162, 0.5)';
        default:
          return 'rgba(120, 193, 243, 0.7)'; // default color for other categories
      }
    },
  };

  return <Column {...(config as any)} style={style} />;
};

export default StateckedColumnChart;
