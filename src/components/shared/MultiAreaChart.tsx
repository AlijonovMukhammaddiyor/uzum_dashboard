// import { Area } from '@ant-design/charts';
import dynamic from 'next/dynamic';
import React from 'react';

const Area = dynamic(
  () => import('@ant-design/charts').then((mod) => mod.Area),
  {
    ssr: false,
  }
);

interface MultiAreaChartProps {
  data: {
    x: string;
    y: number;
    label: string;
  }[];
  style?: React.CSSProperties;
  xAxisTitle?: string;
  yAxisTitle?: string;
}

const MultiAreaChart = ({
  data,
  style,
  xAxisTitle,
  yAxisTitle,
}: MultiAreaChartProps) => {
  const config = {
    data,
    height: 400,
    xField: 'x',
    yField: 'y',
    seriesField: 'label',
    isStack: false,
    // color: ['#1ca9e6', '#f88c24'],
    // smooth: true,
    slider: {
      start: 0,
      end: 1,
    },
    areaStyle: { fillOpacity: 0.3 },
    line: { size: 2 },
    legend: {
      position: 'top' as
        | 'top'
        | 'top-left'
        | 'top-right'
        | 'right'
        | 'right-top'
        | 'right-bottom'
        | 'left'
        | 'left-top'
        | 'left-bottom'
        | 'bottom'
        | 'bottom-left'
        | 'bottom-right'
        | undefined,
    },
    point: {
      size: 4,
      shape: 'circle',
      style: { fill: 'white', stroke: '#1ca9e6', lineWidth: 2 },
    },
    tooltip: { showMarkers: false },
    state: {
      active: {
        style: {
          // shadowColor: 'yellow',
          shadowBlur: 4,
          // stroke: 'transparent',
          // fill: 'red',
        },
      },
    },
    xAxis: {
      nice: true,
      // tickCount: 8,
      label: {
        autoRotate: true,
        autoHide: false,
        // rotate: -Math.PI / 4,
        // offset: 20,
        // move the label to the left after rotating
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: (name: string) => name,
      },
      title: {
        text: xAxisTitle,
        style: {
          fontSize: 13,
          fontWeight: 600,
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)',
      },
    },
    yAxis: {
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)',
      },

      nice: true,
      label: {
        autoRotate: false,
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
      title: {
        text: yAxisTitle,
        style: {
          fontSize: 13,
          fontWeight: 600,
        },
      },
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
    },
    theme: {
      geometries: {
        point: {
          circle: {
            active: {
              style: {
                shadowColor: '#FCEBB9',
                shadowBlur: 2,
                stroke: '#F6BD16',
              },
            },
          },
        },
      },
    },
    interactions: [{ type: 'marker-active' }],
  };

  return <Area {...config} style={{ ...style }} />;
};

export default MultiAreaChart;
