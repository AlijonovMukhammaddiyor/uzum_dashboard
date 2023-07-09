import {
  Chart,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Scatter } from 'react-chartjs-2';

Chart.register(LinearScale, PointElement, Title, Tooltip, Legend);

// options for the chart

export interface ScatterPropsType {
  data: {
    x: number;
    y: number;
  }[];
}

const ScatterChart = ({ data }: ScatterPropsType) => {
  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },

    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <>
      <Scatter
        data={{
          datasets: [
            {
              label: 'Scatter Dataset',
              data: data,
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
          ],
        }}
        options={options}
      />
    </>
  );
};

export default ScatterChart;
