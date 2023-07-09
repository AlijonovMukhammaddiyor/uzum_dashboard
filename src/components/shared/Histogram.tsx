// import { Histogram } from '@ant-design/plots';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef } from 'react';

const Histogram = dynamic(
  () => import('@ant-design/plots').then((mod) => mod.Histogram),
  { ssr: false }
);

export interface HistogramPlotProps {
  className?: string;
  data: {
    value: number;
  }[];
}

const HistogramPlot = ({ data }: HistogramPlotProps) => {
  const histogramRef = useRef();

  const max = Math.max(...data.map((d) => d.value));
  const binWidth = max / 10;

  console.log('max', max, binWidth);

  // find the height of the highest bar based on binWidth
  const heights = Array(Math.ceil(max / binWidth)).fill(0);
  data.forEach((d) => {
    const binIndex = Math.floor(d.value / binWidth);
    heights[binIndex]++;
  });

  const maxBarHeight = Math.max(...heights);
  const averageBarHeight = heights.reduce((a, b) => a + b, 0) / heights.length;

  console.log('heights', heights, maxBarHeight, averageBarHeight);

  const config = {
    data,
    binField: 'value',
    color: 'rgba(44, 211, 225, 0.5)',
    // binWidth: binWidth,
    // tooltip: {
    //   showMarkers: false,
    //   position: 'top' as any,
    //   customContent: (title: string, items: any) => {
    //     const { count } = items[0]?.data || {};
    //     if (!title) return;
    //     const tooltipHtml = `
    //     <div style="
    //       border-radius: 8px;
    //       padding: 16px;
    //       line-height: 1.5;
    //       color: #333;">
    //       <h3 style="font-size: 14px; margin-bottom: 2px;">Sotuv miqdori - ${
    //         title.split(',')[0]
    //       } tadan ${title.split(',')[1]} tagacha</h3>
    //       <p style="font-size: 12px; margin: 0;">${count} ta do'kon(lar) ${
    //       title.split(',')[0]
    //     } tadan ${title.split(',')[1]} tagacha sotuv amalga oshirgan</p>
    //     </div>`;
    //     return tooltipHtml;
    //   },
    // },
    interactions: [
      {
        type: 'element-highlight',
      },
    ],

    meta: {
      range: {
        min: 0,
        // tickInterval: binWidth,
      },
      count: {
        // max: maxBarHeight,
        nice: true,
      },
    },
    slider: {
      start: 0,
      end: 1,
      trendCfg: {
        isArea: false,
      },
    },
  };

  useEffect(() => {
    if (histogramRef.current) {
      const chart = (histogramRef.current as any)?.chart;
      if (!chart) return;

      // add the average line annotation
      chart.annotation().line({
        start: ['min', averageBarHeight],
        end: ['max', averageBarHeight],
        text: {
          content: `O'rtacha miqdor: ${Math.round(averageBarHeight)}`, // The label text
          position: 'end', // The position of the label, relative to the line
          offsetY: -10, // Adjust the y-offset to position the label above the line
          style: {
            fill: 'red', // The text color
            textAlign: 'right', // Align the text to the right
            textBaseline: 'middle', // Align the text vertically in the middle
          },
        },
        style: {
          stroke: 'red',
          lineDash: [2, 2],
        },
      });

      chart.render();
    }
  }, [averageBarHeight]);

  return (
    <Histogram
      {...config}
      style={{
        width: '100%',
        height: '100%',
      }}
      // chartRef={histogramRef}
    />
  );
};

export default HistogramPlot;
