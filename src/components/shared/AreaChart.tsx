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
import Slider from 'rc-slider';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-chartjs-2';

import clsxm from '@/lib/clsxm';

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

export interface AreaChartProps {
  data: {
    type?: 'line' | 'bar'; // Add this type
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
  }[];
  labels: string[];
  options?: any;
  style?: React.CSSProperties;
  title?: string;
  className?: string;
  tension?: number;
  withSlider?: boolean;
  withCheckbox?: boolean;
}

function AreaChart({
  data,
  labels,
  options: customOptions,
  style,
  title,
  className,
  tension = 0.3,
  withSlider = false,
  withCheckbox = true,
}: AreaChartProps) {
  const [visibleDatasets, setVisibleDatasets] = React.useState(
    data.map(() => true)
  );

  const toggleDatasetVisibility = (index: number) => {
    const newVisibility = [...visibleDatasets];
    newVisibility[index] = !newVisibility[index];
    setVisibleDatasets(newVisibility);
  };
  const [data_, setData] = useState(data);
  const [sliderValues, setSliderValues] = useState([0, labels.length]);

  useEffect(() => {
    setSliderValues([0, labels.length]);
  }, [labels]);

  useEffect(() => {
    setData(data.filter((_, index) => visibleDatasets[index]));
  }, [data, visibleDatasets]);

  const onSliderChange = (values: number[]) => {
    setSliderValues(values);
  };

  const yAxis: {
    [key: string]: any;
  } = {};

  let c = 0;

  for (let i = 0; i < data_.length; i++) {
    yAxis[`y-axis-${i}`] = {
      type: 'linear',
      display: true,
      position: c % 2 === 0 ? 'left' : 'right',
      id: `y-axis-${i}`,
      stacked: true,
      beginAtZero: true,
      // offset: true, // offset means that the axis will not overlap the data
      grace: '10%',
      grid: {
        borderColor: data_[i].borderColor,
      },
      ticks: {
        color: data_[i].borderColor,
        borderColor: data_[i].borderColor,
      },
    };
    c += 1;
  }

  const options: any = {
    maintainAspectRatio: false,
    responsive: true,

    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'top',
        display: false,
      },
      title: {
        display: title ? true : false,
        text: title,
      },
    },
    scales: {
      x: {
        autoSkip: false,
        ticks: {
          maxRotation: 90,
          minRotation: 0,
        },
        grid: {
          drawOnChartArea: true, // this will ensure grid lines are drawn on the chart area
          drawBorder: true,
          color: 'rgba(0,0,0,0.1)', // subtle color for the vertical grid lines
        },
      },
      ...yAxis,
    },
    tension: tension,
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
    <div
      className={clsxm(
        'flex h-[500px] flex-col items-start justify-start',
        className
      )}
    >
      {withCheckbox && (
        <div style={legendContainerStyle} className='custom-legend w-full'>
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
      )}
      <Chart
        type='bar'
        options={{ ...options, ...customOptions }}
        data={{
          labels: labels?.slice(sliderValues[0], sliderValues[1]),
          datasets: data_
            // ?.filter((_, index) => visibleDatasets[index])
            ?.map((dataset, index) => ({
              ...dataset,
              yAxisID: `y-axis-${index}`,
              type: dataset.type ?? 'line',
              data: dataset.data.filter(
                (data_q) =>
                  !labels.slice(0, sliderValues[0]).includes(data_q.x) &&
                  !labels.slice(sliderValues[1]).includes(data_q.x)
              ),
            })) as any,
        }}
        style={{
          width: '100%',
          maxWidth: '100%',
          maxHeight: 'calc(100% - 30px)',
          height: 'calc(100% - 30px)',
          minHeight: '400px',
          ...style,
        }}
      />
      {withSlider && (
        <Slider
          range
          min={0}
          max={labels.length}
          value={sliderValues}
          onChange={onSliderChange as any}
          className='custom-slider mx-auto w-[90%]'
          style={{
            maxHeight: '100%',
            marginTop: '1rem',
            maxWidth: '96%',
            marginInline: 'auto',
            ...style,
          }}
        />
      )}
    </div>
  );
}

export default AreaChart;
