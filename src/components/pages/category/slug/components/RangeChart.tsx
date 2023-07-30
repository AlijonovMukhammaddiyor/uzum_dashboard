import dynamic from 'next/dynamic';

const DualAxes = dynamic(
  () => import('@ant-design/charts').then((module) => module.DualAxes),
  { ssr: false }
);

import React from 'react';
import { useTranslation } from 'react-i18next';

export interface RangeChartProps {
  data: any[];
  style?: React.CSSProperties;
}

const RangeChart = ({ data, style }: RangeChartProps) => {
  const { t } = useTranslation('categories');
  const transformedData = data.flatMap((item, index) => [
    {
      range: `${(item.from / 1000).toLocaleString()}k so'm - ${(
        item.to / 1000
      ).toLocaleString()}k so'm`,
      category: t('products_amount'),
      value: item.total_products,
      index: index,
    },
    {
      range: `${(item.from / 1000).toLocaleString()}k so'm - ${(
        item.to / 1000
      ).toLocaleString()}k so'm`,
      category: t('orders_amount'),
      value: item.total_orders,
      index: index,
    },
  ]);

  const lineData = data.map((item, index) => ({
    range: `${(item.from / 1000).toLocaleString()}k so'm - ${(
      item.to / 1000
    ).toLocaleString()}k so'm`,
    Daromad: item.total_revenue * 1000,
    index: index,
  }));

  const config = {
    data: [transformedData, lineData],
    xField: 'range',
    yField: ['value', 'Daromad'],
    geometryOptions: [
      {
        geometry: 'column',
        isStack: true,
        seriesField: 'category',
        color: ({ category }: { category: string }) => {
          switch (category) {
            case t('products_amount'):
              return 'rgb(82, 95, 225)';
            case t('orders_amount'):
              return 'rgba(248, 111, 3, 0.6)';
            default:
              return '#ccc';
          }
        },
      },
      {
        geometry: 'line',
        color: '#62CDFF',
      },
    ],
    tooltip: {
      customContent: (title: string, items: any[]) => {
        // Filtering out the revenue line item
        const revenueItem = items.find((item) => item.name === 'Daromad');
        const productsItem = items.find(
          (item) => item.name === t('products_amount')
        );
        const ordersItem = items.find(
          (item) => item.name === t('orders_amount')
        );

        return `

          <div class="text-base font-bold pb-2 border-b border-blue-400">${title}</div>
          <ul class='pb-2'>
            <li class="flex justify-between items-center py-1">
              <span class='mr-2'>Daromad: </span>
              <span class="font-semibold">${
                revenueItem?.value / 1000000000 > 1
                  ? (revenueItem?.value / 1000000000).toFixed(1) + ' mlrd so`m'
                  : revenueItem?.value / 1000000 > 1
                  ? (revenueItem?.value / 1000000).toFixed(1) + ' mln so`m'
                  : revenueItem?.value + ' ming so`m'
              }</span>
            </li>
            <li class="flex justify-between items-center py-1">
              <span>Mahsulotlar soni:</span>
              <span class="font-semibold">${productsItem?.value.toLocaleString()} ta</span>
            </li>
            <li class="flex justify-between items-center py-1">
              <span>Buyurtmalar soni:</span>
              <span class="font-semibold">${ordersItem?.value.toLocaleString()} ta</span>
            </li>
          </ul>
        `;
      },
    },
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

export default RangeChart;
