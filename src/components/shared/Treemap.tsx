import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const AgChartsReact = dynamic(
  () => import('ag-charts-react').then((mod) => mod.AgChartsReact),
  {
    ssr: false,
  }
);

interface Props {
  data: any;
  title?: string;
  isRevenue?: boolean;
  main_title?: string;
  main_subtitle?: string;
  min: number;
  max: number;
  titleField?: string;
  colors?: string[];
}

function TreeMapChart({
  data,
  title,
  main_title,
  main_subtitle,
  min,
  max,
  colors,
  titleField,
}: Props) {
  const [filteredData, setFilteredData] = useState<any[]>(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const formatRevenue = (value: number) => {
    const value_ = value * 1000;
    if (value_ >= 1000000000) {
      return `${(value_ / 1000000000).toFixed(1)} mlrd so'm`;
    } else if (value_ >= 1000000) {
      return `${(value_ / 1000000).toFixed(1)} mln so'm`;
    } else if (value_ >= 1000) {
      return `${(value_ / 1000).toFixed(1)} ming so'm`;
    } else {
      return `${value_} so'm`;
    }
  };

  const options = {
    data: filteredData,
    padding: [20, 20, 20, 20], // Padding around the tree map
    series: [
      {
        type: 'treemap',
        labelKey: titleField ?? 'title',
        sizeKey: 'analytics',
        colorKey: 'analytics',
        labels: {
          fontSize: 14, // Adjust as necessary
          color: 'black', // Font color for labels
          padding: { left: 5, right: 5, top: 5, bottom: 5 }, // Spacing around text
        },
        tooltip: {
          renderer: (params: any) => {
            return {
              content: `<div style="background-color: #f9f9f9; padding: 5px; border-radius: 3px; color: black;">
                          <b style"color: black;">${title}</b>: ${formatRevenue(
                params.datum['analytics']
              )}
                        </div>`,
            };
          },
        },
        colorDomain: [min, max],
        colorRange: colors ?? ['#f0f8ff', '#4682b4'], // Lighter blue to steel blue
        formatter: (params: any) => ({
          stroke: '#ffffff', // White border
          strokeWidth: 1, // Adjusted border thickness
        }),
      },
    ],
  };

  return (
    <div className='h-full w-full min-w-[1200px] flex-1'>
      <AgChartsReact
        options={options as any}
        containerStyle={{
          height: '460px',
          fontFamily: '"Roboto", sans-serif',
        }}
      />
    </div>
  );
}

export default TreeMapChart;
