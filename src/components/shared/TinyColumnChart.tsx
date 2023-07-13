import dynamic from 'next/dynamic';
import React from 'react';

// import { TinyArea } from '@ant-design/plots';
const TinyColumn = dynamic(
  () => import('@ant-design/plots').then((mod) => mod.TinyColumn),
  {
    ssr: false,
  }
);

export interface GroupedColumnChartProps {
  data: number[];
  labels: string[];
  bgColor?: string;
  borderColor?: string;
  style?: React.CSSProperties;
}

const TinyColumnChart: React.FC<GroupedColumnChartProps> = ({
  data,
  bgColor,
  borderColor,
  style,
}) => {
  const config = {
    height: 60,
    autoFit: false,
    data,
    smooth: true,
    color: bgColor,
    pattern: {
      type: 'line' as const,
      cfg: {
        stroke: borderColor,
      },
    },
  };

  return <TinyColumn {...config} style={style} />;
};

export default TinyColumnChart;
