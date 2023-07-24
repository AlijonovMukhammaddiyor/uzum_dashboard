import dynamic from 'next/dynamic';

const Pie = dynamic(
  () => import('@ant-design/plots').then((item) => item.Pie),
  {
    ssr: false,
  }
);

import React from 'react';

export interface PieChartProps {
  data: {
    type: string;
    value: number;
  }[];
  title?: string;
  labelType?: 'spider' | 'inner' | 'outer';
  style?: React.CSSProperties;
}

const PieChart = ({ data, title, labelType, style }: PieChartProps) => {
  const config = {
    appendPadding: 10,
    date: data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    title: {
      text: title || 'Ulushlar',
      style: {
        fontSize: 20,
        fontWeight: 'bold',
        fill: '#333',
      },
      align: 'center', // optional, to align the title. Other options are 'left' and 'right'
      offset: 20, // optional, the distance between title and chart
    },
    label: {
      type: labelType || 'spider',
      labelHeight: 28,
      content: '{percentage} - {name}',
    },
    // legend
    toolbar: {
      show: true,
      items: [
        {
          type: 'download',
        },
        {
          type: 'zoom',
        },
        {
          type: 'dataView',
        },
      ],
    },
    legend: {},
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return (
    <div className='h-full w-full'>
      {title && <h3 className='text-primary text-center text-base'>{title}</h3>}
      <Pie
        data={data}
        {...config}
        style={{
          height: '100%',
          width: '100%',
          flexGrow: '1',
          maxWidth: '100%',
          justifyContent: 'center',
          ...style,
        }}
      />
    </div>
  );
};

export default PieChart;
