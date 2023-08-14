import Chart from 'chart.js/auto';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef } from 'react';

interface TinyLineGraphProps {
  data: number[];
  borderColor?: string;
  bgColor?: string;
  width?: string;
  height?: string;
  labels?: string[];
  isRevenue?: boolean;
}

const TinyLineGraph = ({
  data,
  borderColor,
  bgColor,
  width,
  height,
  isRevenue,
  labels,
}: TinyLineGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart>();
  const { i18n } = useTranslation('common');

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (chartRef.current) chartRef.current.destroy();

    if (!ctx) return;
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array(data.length).fill(''),
        datasets: [
          {
            data,
            backgroundColor: bgColor || 'rgba(0, 0, 0, 0.1)',
            borderColor: borderColor || 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            fill: false, // Setting fill to false for a line chart
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false,
          },
          y: { display: false },
        },
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            enabled: true,
            mode: 'index',
            //     value: isRevenue
            //     ? value > 1000000000
            //       ? `${(value / 1000000000).toFixed(1)} ${
            //           i18n.language === 'uz' ? 'mlrd so`m' : 'млрд сум'
            //         }`
            //       : value > 1000000
            //       ? `${(value / 1000000).toFixed(2)} ${
            //           i18n.language === 'uz' ? 'mln so`m' : 'млн сум'
            //         }`
            //       : `${value.toLocaleString()} ${
            //           i18n.language === 'uz' ? 'ming so`m' : 'тыс. сум'
            //         }`
            //     : `${value.toLocaleString()} ${ta}`,
            // };
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                const index = context.dataIndex;

                if (labels) {
                  label = labels[index] + ': ';
                }
                if (context.parsed.y !== null) {
                  if (!isRevenue)
                    label += Math.floor(context.parsed.y).toLocaleString();
                  else {
                    const value = context.parsed.y;
                    label +=
                      value > 1000000000
                        ? `${(value / 1000000000).toFixed(2)} ${
                            i18n.language === 'uz' ? 'mlrd so`m' : 'млрд сум'
                          }`
                        : value > 1000000
                        ? `${(value / 1000000).toFixed(2)} ${
                            i18n.language === 'uz' ? 'mln so`m' : 'млн сум'
                          }`
                        : `${value.toLocaleString()} ${
                            i18n.language === 'uz' ? 'ming so`m' : 'тыс. сум'
                          }`;
                  }
                }
                return label;
              },
            },
          },
        },
      },
    });
  }, [bgColor, borderColor, data, i18n.language, isRevenue, labels]);

  return (
    <div
      style={{
        height: height ?? '60px',
        width: width ?? '200px',
        maxWidth: '100%',
        padding: '0',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          height: height ?? '60px',
          width: width ?? '200px',
          maxWidth: '100%',
        }}
      />
    </div>
  );
};

export default TinyLineGraph;
