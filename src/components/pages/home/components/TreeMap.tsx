import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { LuShrink } from 'react-icons/lu';
import Popup from 'reactjs-popup';

const AgChartsReact = dynamic(
  () => import('ag-charts-react').then((mod) => mod.AgChartsReact),
  {
    ssr: false,
  }
);

interface Props {
  data: any;
  open: boolean;
  closeModal: () => void;
  title: string;
  isRevenue?: boolean;
  main_title?: string;
  main_subtitle?: string;
  min: number;
  max: number;
}

function TreeMap({
  data,
  open,
  closeModal,
  title,
  isRevenue,
  main_title,
  main_subtitle,
  min,
  max,
}: Props) {
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [chart, setChart] = useState<any>(null);

  const handleDownload = () => {
    console.log('handleDownload -> chart', chart);
    if (chart) {
      chart.exportChart({
        format: 'png',
        filename: title,
      });
    }
  };
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const isSum = title === 'Daromad miqdori' ? true : false;

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
        labelKey: 'title',
        sizeKey: 'analytics',
        colorKey: 'analytics',
        tooltip: {
          renderer: (params: any) => {
            return {
              content: `<b>${title}</b>: ${
                isSum
                  ? formatRevenue(params.datum['analytics'])
                  : params.datum['analytics'].toFixed(0) + ' ta'
              }`,
            };
          },
        },
        colorDomain: [min, max],
        colorRange: ['#FFD495', '#FE6244'],
        paddingInner: 3, // spacing between nodes
        formatter: (params: any) => ({
          stroke: 'black',
          strokeWidth: 0.5, // reduce border thickness
        }),
        labels: {
          value: {
            formatter: (params: any) => `${params.datum.color.toFixed(2)}%`,
            color: 'black', // label color
            fontWeight: 'bold', // label font weight
          },
        },
      },
    ],
    title: {
      text: main_title ?? '',
    },
    subtitle: {
      text: main_subtitle ?? '',
    },
  };

  return (
    <Popup
      open={open}
      closeOnDocumentClick
      onClose={closeModal}
      contentStyle={{
        width: '100vw',
        height: '100vh',
        overflow: 'scroll',
      }}
    >
      <div className='modal relative flex h-full flex-col items-start justify-start overflow-scroll'>
        <LuShrink
          className='absolute right-5 top-5 z-[100] h-6 w-6 cursor-pointer'
          onClick={closeModal}
        />

        <div className='h-full min-h-[1200px] w-full min-w-[1200px] flex-1'>
          <AgChartsReact
            options={options as any}
            containerStyle={{
              height: '100%',
            }}
            onChartReady={(params: any) => {
              setChart(params.chart);
            }}
          />
        </div>
      </div>
    </Popup>
  );
}

export default TreeMap;
