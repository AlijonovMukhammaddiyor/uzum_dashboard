import { faker } from '@faker-js/faker';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler,
  LineElement,
  Annotation
);

const annotation1 = {
  type: 'line',
  borderColor: 'rgb(100,149,237)',
  borderDash: [6, 6],
  borderDashOffset: 0,
  borderWidth: 3,
  label: {
    enabled: true,
    content: (ctx: any) => 'Average: ' + 650,
    position: 'end',
  },
  scaleID: 'y',
  value: (ctx: any) => 650,
};

const annotation2 = {
  type: 'line',
  borderColor: 'rgba(102,102,102,0.5)',
  borderDash: [6, 6],
  borderDashOffset: 0,
  borderWidth: 3,
  label: {
    enabled: true,
    backgroundColor: 'rgba(102,102,102,0.5)',
    color: 'black',
    content: (ctx: any) => 'Upper Limit',
    position: 'start',
    rotation: -90,
    yAdjust: -28,
  },
  scaleID: 'y',
  value: (ctx: any) => 800,
};

const annotation3 = {
  type: 'line',
  borderColor: 'rgba(102,102,102,0.5)',
  borderDash: [6, 6],
  borderDashOffset: 0,
  borderWidth: 3,
  label: {
    enabled: true,
    backgroundColor: 'rgba(102,102,102,0.5)',
    color: 'black',
    content: (ctx: any) => 'Lower Limit',
    position: 'end',
    rotation: 90,
    yAdjust: 28,
  },
  scaleID: 'y',
  value: (_: any) => 500,
};

export const options: any = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    annotation: {
      annotations: [annotation1, annotation2, annotation3],
    },
  },
  scales: {
    y: {
      // suggestedMin: 0,
      beginAtZero: false,
      grace: '10%', // Padding as a percentage of the data range
    },
  },
  tension: 0,
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      data: labels.map(() => faker.number.int({ min: 500, max: 800 })),
      borderColor: 'rgba(20, 233, 162)',
      backgroundColor: 'rgba(100, 233, 162, 0.5)',
      // pointRadius: 3,
    },
  ],
};

function PositionAreaChartComponent() {
  return (
    <Line
      options={options}
      data={data}
      style={{
        width: '100%',
        height: '535px',
        maxHeight: '535px',
      }}
    />
  );
}

export default PositionAreaChartComponent;
