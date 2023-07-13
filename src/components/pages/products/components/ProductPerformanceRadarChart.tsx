// import { Radar } from '@ant-design/plots';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';

const Radar = dynamic(
  () => import('@ant-design/plots').then((mod) => mod.Radar),
  {
    ssr: false,
  }
);

const data_ = [
  {
    item: 'Rating',
    user: 'a',
    score: 70,
  },
  {
    item: 'Rating',
    user: 'b',
    score: 30,
  },
  {
    item: 'Reviews',
    user: 'a',
    score: 60,
  },
  {
    item: 'Reviews',
    user: 'b',
    score: 70,
  },
  {
    item: 'Orders',
    user: 'a',
    score: 50,
  },
  {
    item: 'Orders',
    user: 'b',
    score: 60,
  },
  {
    item: 'Avaliability',
    user: 'a',
    score: 40,
  },
  {
    item: 'Avaliability',
    user: 'b',
    score: 50,
  },
  {
    item: 'Narx',
    user: 'a',
    score: 60,
  },
  {
    item: 'Narx',
    user: 'b',
    score: 70,
  },
];

const ProductPerformanceRadarChart = () => {
  const [data, setData] = useState(data_);

  const config = {
    data,
    xField: 'item',
    yField: 'score',
    seriesField: 'user',
    meta: {
      score: {
        alias: '分数',
        min: 0,
        max: 80,
      },
    },
    xAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          style: {
            lineDash: null,
          },
        },
      },
    },
    yAxis: {
      line: null,
      tickLine: null,
      grid: {
        line: {
          type: 'line',
          style: {
            lineDash: null,
          },
        },
        alternateColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    // 开启辅助点
    point: {
      size: 2,
    },
  };

  return (
    <Radar
      {...config}
      style={{
        width: '100%',
        maxWidth: '100%',
        height: '100%',
      }}
    />
  );
};

export default ProductPerformanceRadarChart;
