import Chart from 'chart.js/auto';
import React, { useEffect, useRef } from 'react';

interface TinyColumnGraphProps {
  data: number[];
  borderColor?: string;
  bgColor?: string;
  width?: string;
  height?: string;
  labels?: string[];
}

const TinyColumnGraph = ({
  data,
  borderColor,
  bgColor,
  width,
  height,
  labels,
}: TinyColumnGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart>();

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (chartRef.current) chartRef.current.destroy();

    if (!ctx) return;
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Array(data.length).fill(''),
        datasets: [
          {
            data,
            backgroundColor: bgColor || 'rgba(0, 0, 0, 0.1)',
            borderColor: borderColor || 'rgba(0, 0, 0, 1)',
            borderWidth: 1,
            barPercentage: 0.9,
            categoryPercentage: 1,
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

            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                const index = context.dataIndex;

                if (labels) {
                  label = labels[index] + ': ';
                }
                if (context.parsed.y !== null) {
                  label += Math.floor(context.parsed.y);
                }
                return label;
              },
            },
          },
        },
      },
    });
  }, [bgColor, borderColor, data, labels]);

  return (
    <div style={{ height: height ?? '60px', width: width ?? '200px' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TinyColumnGraph;
