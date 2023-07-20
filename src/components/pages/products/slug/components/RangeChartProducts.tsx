import dynamic from 'next/dynamic';

const Column = dynamic(
  () => import('@ant-design/charts').then((module) => module.Column),
  { ssr: false }
);

import React from 'react';

export interface RangeChartProps {
  data: any[];
  style?: React.CSSProperties;
}

const RangeChartProducts = ({ data, style }: RangeChartProps) => {
  const transformedData = data.flatMap((item, index) => [
    {
      range: `${(item.from / 1000).toLocaleString()}k so'm-${(
        item.to / 1000
      ).toLocaleString()}k so'm`,
      type: 'Mahsulotlar soni',
      value: item.total_products,
      index: index,
      color: 'rgba(120, 193, 243, 0.7)',
    },
    {
      range: `${(item.from / 1000).toLocaleString()}k so'm-${(
        item.to / 1000
      ).toLocaleString()}k so'm`,
      type: 'Buyurtmalar soni',
      value: item.total_orders,
      index: index,
      // specify color of the column
      color: 'rgba(57, 181, 224, 0.7)',
    },
    {
      range: `${(item.from / 1000).toLocaleString()}k so'm-${(
        item.to / 1000
      ).toLocaleString()}k so'm`,
      type: "Do'konlar soni",
      value: item.total_shops,
      index: index,
      // specify color of the column
      color: 'rgba(25, 182, 162, 0.3)',
    },
  ]);

  const config = {
    data: transformedData,
    xField: 'range',
    yField: 'value',
    columnWidthRatio: 0.8,
    seriesField: 'type',
    isGroup: false,
    isStack: true,
    xAxis: {
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
      tickCount: 10,
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

    // interactions: [{ type: 'marker-active' }],
    slider: {
      start: 0,
      end: 0.99,
      slider: {
        formatter: (v: any) => {
          const range = v.split('-');
          return `${range[0]}k so'm`; // or range[1] depending on which value you want to display
        },
      },
    },
    colorField: 'type', // specify which field should be used for the color mapping
    color: ({ type }: { type: string }) => {
      // use a function to map categories to colors
      switch (type) {
        case 'Mahsulotlar soni':
          return 'rgb(82, 95, 225)'; // specify color for Mahsulotlar soni
        case 'Buyurtmalar soni':
          return 'rgba(48, 111, 3, 0.6)'; // specify color for Buyurtmalar soni
        default:
          return 'rgba(57, 181, 224, 0.7)'; // default color for other categories
      }
    },
  };

  return (
    <Column
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
        ...style,
      }}
      {...(config as any)}
    />
  );
};

export default RangeChartProducts;
