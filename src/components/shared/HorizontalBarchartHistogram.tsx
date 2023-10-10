import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import Slider from 'rc-slider';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export interface GroupedColumnChartProps {
  data: {
    data: {
      y: string;
      x: number;
    }[];
    label: string;
    backgroundColor: string;
  }[];
  isRevenue?: boolean;
  style?: React.CSSProperties;
  withSlider?: boolean;
}

const HorizontalColumnChartHistogram: React.FC<GroupedColumnChartProps> = ({
  data,
  isRevenue,
  style,
  withSlider,
}) => {
  // const customSteps = [0, 10, 50, 100, 500, 1000, 5000, 10000, 50000, 1000000];
  // make nonlinear steps for slider using max value

  function generateDecileSteps(
    data: {
      data: {
        y: string;
        x: number;
      }[];
      label: string;
      backgroundColor: string;
    }[]
  ) {
    // Sort data by the x value (number of orders)
    const sortedOrders = data[0].data
      .map((item) => item.x)
      .sort((a: number, b: number) => a - b);

    const decileSteps = [];
    const decileSize = Math.floor(sortedOrders.length / 10); // Determine size of each decile

    for (let i = 1; i <= 10; i++) {
      let threshold = sortedOrders[i * decileSize - 1];
      if (i === 10) {
        threshold = sortedOrders[sortedOrders.length - 1];
      }
      decileSteps.push(Math.ceil(threshold));
    }

    return [...decileSteps]; // Adding 0 to the beginning
  }

  const customSteps = generateDecileSteps(data);

  console.log(customSteps);

  const [sliderStepIndices, setSliderStepIndices] = useState([
    0,
    customSteps.length - 1,
  ]);

  const onSliderChange = (values: number[]) => {
    setSliderStepIndices(values);
  };

  const getCurrentValues = () => {
    const [minIndex, maxIndex] = sliderStepIndices;
    return [customSteps[minIndex], customSteps[maxIndex]];
  };

  const [minValue, maxValue] = getCurrentValues();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    scales: {
      y: {
        barThickness: 30,
        categorySpacing: 15,
        ticks: {
          display: false,
        },
        grid: {
          color: 'rgba(0, 128, 128, 0.1)', // Teal grid lines
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(0, 128, 128, 0.1)', // Teal grid lines
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'point' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark tooltip background for contrast
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        callbacks: {
          // ... [Same tooltip callback as before]
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div style={{ ...style }}>
      <Bar
        data={{
          datasets: data.map((item) => ({
            ...item,
            data: item.data.filter(
              (item) => item.x >= minValue && item.x <= maxValue
            ),
          })),
        }}
        options={{ ...options }}
      />
      {withSlider && (
        <Slider
          range
          min={0}
          max={customSteps.length - 1}
          value={sliderStepIndices}
          step={null} // This allows jumping between custom steps
          marks={customSteps.reduce(
            (acc: Record<number, string>, step, idx) => {
              acc[idx] = step?.toString();
              return acc;
            },
            {}
          )}
          onChange={onSliderChange as any}
          className='custom-slider mx-auto w-[90%]'
          style={{
            maxHeight: '100%',
            marginTop: '1rem',
            maxWidth: '96%',
            marginInline: 'auto',
            width: '100%',
          }}
        />
      )}
    </div>
  );
};

export default HorizontalColumnChartHistogram;
