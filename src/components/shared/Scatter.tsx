import dynamic from 'next/dynamic';
import React from 'react';
const Scatter = dynamic(
  () => import('@ant-design/plots').then((item) => item.Scatter),
  {
    ssr: false,
  }
);
import clsxm from '@/lib/clsxm';

export interface ScatterPlotProps {
  data: any;
  className?: string;
}

const ScatterPlot = ({ className }: ScatterPlotProps) => {
  const data = [
    { x: 1, y: 4.181 },
    { x: 2, y: 4.665 },
    { x: 3, y: 5.296 },
    { x: 4, y: 5.365 },
    { x: 5, y: 5.448 },
    { x: 6, y: 5.744 },
    { x: 7, y: 5.653 },
    { x: 8, y: 5.844 },
    { x: 9, y: 6.362 },
    { x: 10, y: 6.38 },
    { x: 11, y: 6.311 },
    { x: 12, y: 6.457 },
    { x: 13, y: 6.479 },
    { x: 14, y: 6.59 },
    { x: 15, y: 6.74 },
    { x: 16, y: 6.58 },
    { x: 17, y: 6.852 },
    { x: 18, y: 6.531 },
    { x: 19, y: 6.682 },
    { x: 20, y: 7.013 },
    { x: 21, y: 6.82 },
    { x: 22, y: 6.647 },
    { x: 23, y: 6.951 },
    { x: 24, y: 7.121 },
    { x: 25, y: 7.143 },
    { x: 26, y: 6.914 },
    { x: 27, y: 6.941 },
    { x: 28, y: 7.226 },
    { x: 29, y: 6.898 },
    { x: 30, y: 7.392 },
    { x: 31, y: 6.938 },
  ];
  const config = {
    data,
    xField: 'x',
    yField: 'y',
    size: 5,
    pointStyle: {
      stroke: '#777777',
      lineWidth: 1,
      fill: '#5B8FF9',
    },
    regressionLine: {
      type: 'quad', // linear, exp, loess, log, poly, pow, quad
      style: {
        stroke: '#FF0000', // Change the color of the regression line
        lineDash: [6, 4], // Make the regression line dashed
      },
    },
    brush: {
      enabled: true,
      mask: {
        style: {
          fill: 'rgba(255,0,0,0.15)',
        },
      },
    },
    title: {
      text: 'Your Chart Title', // Add your chart title here
      style: {
        fontSize: 20, // You can customize the style
        fill: '#545454',
      },
    },

    xAxis: {
      min: 0,
      grid: {
        line: {
          style: {
            stroke: '#ddd', // You can customize the grid line style
          },
        },
      },
      title: {
        text: 'Shu kategoriyadagi mahusoltlar soni', // Add your X axis label here
        style: {
          fontSize: 14, // You can customize the style
          fill: '#4942E4',
        },
      },
    },
    yAxis: {
      min: 0,
      grid: {
        line: {
          style: {
            stroke: '#ddd', // You can customize the grid line style
          },
        },
      },
      title: {
        text: 'Shu kategoriyadagi buyurtmalar soni', // Add your Y axis label here
        style: {
          fontSize: 14, // You can customize the style
          fill: '#116D6E',
        },
      },
    },
  };

  return (
    <div
      className={clsxm(
        'h-[600px] min-h-[600px] w-full rounded-md bg-white p-3',
        className
      )}
    >
      <Scatter
        {...config}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default ScatterPlot;
