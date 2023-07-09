import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AgChartsReact = dynamic(
  () => import('ag-charts-react').then((mod) => mod.AgChartsReact),
  { ssr: false }
);

export interface TreeMapProps {
  data: {
    name: string;
    children: {
      name: string;
      size: number;
      color: number;
    }[];
    color?: number;
  };
  title?: string;
  subtitle?: string;
  total: number;
}

const TreemapComponent = ({ data, title, subtitle, total }: TreeMapProps) => {
  const [filteredData, setFilteredData] = useState<any>(data);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const options = {
    data: filteredData,
    series: [
      {
        type: 'treemap',
        labelKey: 'name',
        sizeKey: 'size',
        colorKey: 'color',
        groupStrokeWidth: 0,
        groupStrokeColor: 'transparent',
        colorDomain: [0, 130_000],
        colorRange: ['#C4B0FF', '#40128B'],
        gradient: false,
        tileShadow: {
          enabled: false,
        },
        tooltip: {
          renderer: (params: any) => {
            return {
              content: `<b>${title}</b>: ${params.datum[
                params.sizeKey
              ]?.toLocaleString()}`,
            };
          },
        },
        formatter: (params: any) => ({
          stroke: params.depth < 2 ? 'transparent' : 'black',
        }),
        labels: {
          value: {
            formatter: (params: any) =>
              `${((params.datum.size / total) * 100).toFixed(2)}%`,
          },
        },
      },
    ],
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
  };

  return (
    <div className='h-full w-full'>
      <AgChartsReact options={options as any} />
    </div>
  );
};

export default TreemapComponent;
