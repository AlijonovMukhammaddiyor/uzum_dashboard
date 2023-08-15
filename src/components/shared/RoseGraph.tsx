// import { measureTextWidth } from '@ant-design/plots';
import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import React from 'react';

const Pie = dynamic(() => import('@ant-design/plots').then((mod) => mod.Pie), {
  ssr: false,
});

interface Props {
  data: {
    type: string;
    value: number;
  }[];
  isRevenue?: boolean;
  title?: string;
}

function RoseGraph({ data, isRevenue, title }: Props) {
  const { i18n } = useTranslation('common');
  const ta = i18n.language === 'uz' ? 'ta' : 'шт';

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    tooltip: {
      showTitle: false,
      showMarkers: false,
      showCrosshairs: false,
      shared: true,
      formatter: (datum: { type: string; value: number }) => {
        const title = datum.type;
        const value = datum.value;
        return {
          name: title,
          value: isRevenue
            ? value > 1000000000
              ? `${(value / 1000000000).toFixed(1)} ${
                  i18n.language === 'uz' ? 'mlrd so`m' : 'млрд сум'
                }`
              : value > 1000000
              ? `${(value / 1000000).toFixed(2)} ${
                  i18n.language === 'uz' ? 'mln so`m' : 'млн сум'
                }`
              : `${value.toLocaleString()} ${
                  i18n.language === 'uz' ? 'ming so`m' : 'тыс. сум'
                }`
            : `${value.toLocaleString()} ${ta}`,
        };
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '20px',
          lineHeight: '26px',
        },
        content: title,
      },
    },
    legend: false,
    label: false,
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <Pie
      {...(config as any)}
      style={{
        width: '100%',
        height: '100%',
        padding: '0px',
        margin: '0px',
      }}
    />
  );
}

export default RoseGraph;
