import { PieChart } from 'echarts/charts';
// import components, all suffixed with Component
import {
  GridComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import { SVGRenderer } from 'echarts/renderers';
import { EChartsInstance, EChartsOption } from 'echarts-for-react';
// import the core library.
import EChartsReactCore from 'echarts-for-react/esm/core.js';
import React from 'react';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  // CanvasRenderer,
  SVGRenderer,
]);

interface DoughnutEchartsProps {
  loading?: boolean;
  data: {
    value: number;
    name: string;
  }[];
  style?: React.CSSProperties;
}

function DoughnutEcharts({ loading, data, style }: DoughnutEchartsProps) {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.9)', // Light background
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      padding: [10, 15],
      textStyle: {
        color: '#333',
      },
      formatter: (params: any) => {
        return `
        <strong>${params.seriesName}</strong><br/>
        ${
          params.name
        }: <strong style="color: #ff7f50">${params.value.toLocaleString()}</strong><br/>
        <span style="color: #008080">(${params.percent.toFixed(2)}%)</span>
    `;
      },
    },
    legend: {
      top: '5%',
      left: 'center',
      selectedMode: false,
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 0,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'outside',
          fontSize: 12,
          color: '#333',
          align: 'left',
          margin: 8,
          formatter: (params: any) => {
            return `{name|${
              params.name
            }}: {value|${params.value.toLocaleString()}} {percentage|(${params.percent.toFixed(
              2
            )}%)}`;
          },
          rich: {
            name: {
              color: '#666',
            },
            value: {
              color: '#ff7f50',
              fontWeight: 'bold',
            },
            percentage: {
              color: '#008080',
            },
          },
        },
        emphasis: {
          scale: true,
          scaleSize: 3,
          label: {
            show: true,
            fontSize: 14,
            formatter: (params: any) => {
              return `{name|${
                params.name
              }}: {value|${params.value.toLocaleString()}} {percentage|(${params.percent.toFixed(
                2
              )}%)}`;
            },
            rich: {
              name: {
                color: '#666',
                fontWeight: 'bold',
              },
              value: {
                color: '#ff7f50',
                fontWeight: 'bold',
              },
              percentage: {
                color: '#008080',
                fontWeight: 'bold',
              },
            },
          },
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 10,
        },
        data: data,
      },
    ],
  };

  const EventsDict = {
    click: (e: any) => {
      console.log(e);
    },
  };

  const onChartReady = (echarts: EChartsInstance) => {
    // console.log('Chart is ready', echarts);
  };

  return (
    <EChartsReactCore
      echarts={echarts}
      option={option}
      style={{
        height: '100%',
        width: '100%',
        ...style,
      }}
      notMerge={true}
      lazyUpdate={true}
      theme='theme_name'
      showLoading={loading}
      onChartReady={onChartReady}
      onEvents={EventsDict}
    />
  );
}

export default DoughnutEcharts;
