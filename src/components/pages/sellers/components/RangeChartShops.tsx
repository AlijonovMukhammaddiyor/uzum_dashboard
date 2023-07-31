import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

const DualAxes = dynamic(
  () => import('@ant-design/charts').then((module) => module.DualAxes),
  { ssr: false }
);

import React from 'react';

export interface RangeChartProps {
  data: any[];
  style?: React.CSSProperties;
}

const RangeChartShops = ({ data, style }: RangeChartProps) => {
  const { t } = useTranslation('tableColumns');

  const transformedData = data.flatMap((item, index) => [
    {
      x: item.title,
      category: t('daily_revenue'),
      value: item.total_revenue * 1000,
      index: index,
    },
  ]);
  const lineData = data.map((item, index) => ({
    x: item.title,
    [t('orders')]: item.total_orders,
    index: index,
  }));

  const config = {
    data: [transformedData, lineData],
    xField: 'x',
    yField: ['value', t('orders')],

    geometryOptions: [
      {
        geometry: 'column',
        seriesField: 'category',
        color: ({ category }: { category: string }) => {
          switch (category) {
            case t('daily_revenue'):
              return '#7149C6';
            case t('orders'):
              return 'rgba(255, 82, 162, 0.5)';
            default:
              return '#ccc';
          }
        },
      },
      {
        geometry: 'line',
        color: 'rgba(57, 181, 224, 0.7)',
      },
    ],
    tooltip: {
      customContent: (title: string, items: any[]) => {
        // Filtering out the revenue line item
        const revenueItem = items.find(
          (item) => item.name === t('daily_revenue')
        );
        const ordersItem = items.find((item) => item.name === t('orders'));

        return `

          <div class="text-base font-bold pb-2 border-b border-blue-400">${title}</div>
          <ul class='pb-2'>
            <li class="flex justify-between items-center py-1 gap-2">
              <span>${t('daily_revenue')}: </span>
              <span class="font-semibold">${
                revenueItem?.value / 1000000000 > 1
                  ? (revenueItem?.value / 1000000000).toFixed(1) + ' mlrd so`m'
                  : revenueItem?.value / 1000000 > 1
                  ? (revenueItem?.value / 1000000).toFixed(1) + ' mln so`m'
                  : revenueItem?.value + ' ming so`m'
              }</span>
            </li>
            <li class="flex justify-between items-center py-1">
              <span>${t('orders')}:</span>
              <span class="font-semibold">${ordersItem?.value.toLocaleString()} ta</span>
            </li>
          </ul>
        `;
      },
    },
    xAxis: {
      label: null,
      grid: {
        line: {
          style: {
            stroke: '#d9d9d9',
            lineWidth: 1,
            lineDash: [4, 4],
          },
        },
      },
    },
    yAxis: [
      {
        tickCount: 10,
        nice: false,
        label: {
          formatter: (v: any) => `${v.toLocaleString()} so'm`,
          style: {
            fill: '#7149C6', // color for the first y axis
          },
        },
        grid: {
          line: {
            style: {
              stroke: '#d9d9d9',
              lineWidth: 1,
              lineDash: [4, 4],
            },
          },
        },
      },
      {
        tickCount: 10, // Adjust this value for the second y-axis
        nice: false,
        label: {
          formatter: (v: any) => `${v} ta`,
          style: {
            fill: 'rgba(57, 181, 224, 1)', // color for the second y axis
          },
        },
        grid: {
          line: {
            style: {
              stroke: '#d9d9d9',
              lineWidth: 1,
              lineDash: [4, 4],
            },
          },
        },
      },
    ],
  };

  return (
    <DualAxes
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
        ...style,
      }}
      {...(config as any)}
    />
  );
};

export default RangeChartShops;
