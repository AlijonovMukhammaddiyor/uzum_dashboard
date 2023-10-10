import * as echarts from 'echarts';
import { EChartsOption } from 'echarts-for-react/lib/types';
import React, { useEffect, useRef } from 'react';

interface GradientLineChartProps {
  data: [string, number][];
  style?: React.CSSProperties;
  title?: string;
  maximumValue?: number;
}

const GradientLineChart = ({
  data,
  style,
  title,
  maximumValue,
}: GradientLineChartProps) => {
  const chartRef = useRef(null);

  // The data and option code remains unchanged from your provided code.
  const dateList = data.map((item) => item[0]);
  const valueList = data.map((item) => item[1]);

  const option: EChartsOption = {
    visualMap: {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: maximumValue || 100000,
    },
    title: {
      left: 'center',
      text: 'Gradient along the y axis',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      data: dateList,
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: valueList,
      },
    ],
    width: '100%',
    height: '100%',
  };

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);
      myChart.setOption(option);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default GradientLineChart;
