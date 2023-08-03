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
}

function TreeMapChart({
  data,
  title,
  main_title,
  main_subtitle,
  min,
  max,
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
    series: [
      {
        type: 'treemap',
        labelKey: titleField ?? 'title',
        sizeKey: 'analytics',
        colorKey: 'analytics',
        tooltip: {
          renderer: (params: any) => {
            return {
              content: `<b>${title}</b>: ${formatRevenue(
                params.datum['analytics']
              )}`,
            };
          },
        },
        colorDomain: [min, max],
        colorRange: ['#feedde', '#a63603'],
        formatter: (params: any) => ({
          stroke: 'black',
          strokeWidth: 0.5, // reduce border thickness
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
        }}
      />
    </div>
  );
}

export default TreeMapChart;
