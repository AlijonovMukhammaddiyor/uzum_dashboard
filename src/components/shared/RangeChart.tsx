import dynamic from 'next/dynamic';

const Column = dynamic(
  () => import('@ant-design/charts').then((module) => module.Column),
  { ssr: false }
);

import React from 'react';

export interface RangeChartProps {
  data: any[];
}

const RangeChart = ({ data }: RangeChartProps) => {
  const transformedData = data.flatMap((item, index) => [
    {
      range: `${(item.from / 1000).toLocaleString()}k so'm-${(
        item.to / 1000
      ).toLocaleString()}k so'm`,
      category: 'Mahsulotlar soni',
      value: item.total_products,
      index: index,
    },
    {
      range: `${(item.from / 1000).toLocaleString()}k so'm-${(
        item.to / 1000
      ).toLocaleString()}k so'm`,
      category: 'Buyurtmalar soni',
      value: item.total_orders,
      index: index,
    },
  ]);

  const config = {
    data: transformedData,
    xField: 'range',
    yField: 'value',
    columnWidthRatio: 0.8,
    seriesField: 'category',
    isGroup: true,
    xAxis: {
      label: {
        autoRotate: true,
        autoHide: false,
      },
    },
    slider: {
      start: 0,
      end: 0.9,
      slider: {
        formatter: (v: any) => {
          const range = v.split('-');
          return `${range[0]}k so'm`; // or range[1] depending on which value you want to display
        },
      },
    },
  };

  return (
    <Column
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
      }}
      {...config}
    />
  );
};

export default RangeChart;
