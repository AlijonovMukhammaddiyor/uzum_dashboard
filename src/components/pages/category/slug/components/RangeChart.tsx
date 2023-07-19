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

const RangeChart = ({ data, style }: RangeChartProps) => {
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
      // specify color of the column
      color: 'rgba(255, 82, 162, 0.3)',
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
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },

    // interactions: [{ type: 'marker-active' }],
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
    colorField: 'category', // specify which field should be used for the color mapping
    color: ({ category }: { category: string }) => {
      // use a function to map categories to colors
      switch (category) {
        case 'Mahsulotlar soni':
          return 'rgb(82, 95, 225)'; // specify color for Mahsulotlar soni
        case 'Buyurtmalar soni':
          return 'rgba(248, 111, 3, 0.6)'; // specify color for Buyurtmalar soni
        default:
          return '#ccc'; // default color for other categories
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

export default RangeChart;
