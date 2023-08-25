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
import { Chart } from 'react-chartjs-2';

import CustomCheckbox from '@/components/shared/CustomCheckbox';

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

type ChartType = 'line' | 'bar'; // Define your allowed chart types here.

export interface Dataset {
  type: ChartType;
  data: {
    x: string;
    y: number;
  }[];
  fill?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  label?: string;
  pointRadius?: number;
  pointBackgroundColor?: string;
  borderRadius?: number;
  borderSkipped?: string | boolean;
}

export interface MixedChartProps {
  data: Dataset[];
  labels: string[];
  options?: any;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
}

const MixedChart: React.FC<MixedChartProps> = ({ data, labels, options }) => {
  const [visibleDatasets, setVisibleDatasets] = React.useState(
    data.map(() => true)
  );

  const toggleDatasetVisibility = (index: number) => {
    const newVisibility = [...visibleDatasets];
    newVisibility[index] = !newVisibility[index];
    setVisibleDatasets(newVisibility);
  };

  const chartData = {
    labels: labels.sort((a, b) => {
      const aDate = new Date(a);
      const bDate = new Date(b);
      return aDate.getTime() - bDate.getTime();
    }),
    datasets: data
      .filter((_, index) => visibleDatasets[index])
      .map((dataset, index) => ({
        ...dataset,
        yAxisID: `y-axis-${index}`,
      })),
  };

  // console.log(chartData);

  const yAxis: {
    [key: string]: any;
  } = {};

  for (let i = 0; i < data.length; i++) {
    if (visibleDatasets[i])
      yAxis[`y-axis-${i}`] = {
        type: 'linear', // Fixed the axis type here.
        display: true,
        position: i % 2 === 0 ? 'left' : 'right',
        id: `y-axis-${i}`,
        stacked: true,
        beginAtZero: true,
        grace: '10%',
        grid: {
          borderColor: data[i].borderColor ?? data[i].backgroundColor,
        },
        ticks: {
          color: data[i].borderColor ?? data[i].backgroundColor,
          borderColor: data[i].borderColor ?? data[i].backgroundColor,
        },
      };
  }

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      mode: 'index',
    },
    elements: {
      line: {
        fill: false,
      },
    },
    legend: {
      display: false,
      // make solid rectangle with filled color
      // labels: {
      //   usePointStyle: true,
      // },
    },
    scales: {
      x: {
        display: true,
        autohide: true,
        grid: {
          display: false,
        },
      },
      ...yAxis,
    },
    tension: 0,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const legendContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '10px',
  };

  const legendItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '15px',
  };

  const legendLabelStyle: React.CSSProperties = {
    marginLeft: '5px',
  };

  return (
    <div className='h-[90%] max-h-full min-h-full w-full min-w-full max-w-full'>
      {/* Custom Legend */}
      <div style={legendContainerStyle} className='custom-legend'>
        {data.map((dataset, index) => (
          <div key={index} style={legendItemStyle} className='legend-item'>
            {/* <input
              type='checkbox'
              checked={visibleDatasets[index]}
              onChange={() => toggleDatasetVisibility(index)}
            /> */}
            <CustomCheckbox
              checked={visibleDatasets[index]}
              onChange={() => toggleDatasetVisibility(index)}
              color={dataset.borderColor ?? dataset.backgroundColor}
            />
            <span
              style={{
                ...legendLabelStyle,
                color: dataset.borderColor ?? dataset.backgroundColor,
              }}
            >
              {dataset.label}
            </span>
          </div>
        ))}
      </div>

      <Chart
        type='bar'
        data={chartData as any}
        options={{
          ...defaultOptions,
          ...options,
          legend: { display: false },
        }}
        style={{
          width: '100%',
          height: '90%',
        }}
      />
    </div>
  );
};

export default MixedChart;
