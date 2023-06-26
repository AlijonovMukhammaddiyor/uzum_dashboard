// import { Area, Column } from '@ant-design/plots';
import dynamic from 'next/dynamic';

const Area = dynamic(
  () => import('@ant-design/plots').then((item) => item.Area),
  {
    ssr: false,
  }
);

const Column = dynamic(
  () => import('@ant-design/plots').then((item) => item.Column),
  {
    ssr: false,
  }
);
import { faker } from '@faker-js/faker';
// import {
//   CategoryScale,
//   Chart as ChartJS,
//   Filler,
//   Legend,
//   LinearScale,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
// } from 'chart.js';
// import annotationPlugin from 'chartjs-plugin-annotation';
import React from 'react';

import Tabs from '@/components/shared/Tabs';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Filler,
//   Legend,
//   annotationPlugin
// );

function AreaChartComponent() {
  const [activeTab, setActiveTab] = React.useState<string>('Chiziq');
  const labels = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '12',
    '12.5',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '23.5',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
  ];

  const dataValues_totalOrders = labels
    .map(() => faker.number.int({ min: 5000, max: 15000 }))
    .sort((a, b) => a - b);

  const data_totalOrders = dataValues_totalOrders.map((value, index) => {
    return {
      label: labels[index],
      value,
      type: 'total orders',
    };
  });

  const dataValues_orders = labels.map(() =>
    faker.number.int({ min: 500, max: 2000 })
  );

  const data_orders = dataValues_orders.map((value, index) => {
    return {
      label: labels[index],
      value,
      type: 'orders',
    };
  });

  const dataValues_products = labels
    .map(() => faker.number.int({ min: 8000, max: 10000 }))
    .sort((a, b) => a - b);

  const data_products = dataValues_products.map((value, index) => {
    return {
      label: labels[index],
      value,
      type: 'products',
    };
  });

  const dataValues_sellers = labels.map(() =>
    faker.number.int({ min: 100, max: 500 })
  );

  const data_sellers = dataValues_sellers.map((value, index) => {
    return {
      label: labels[index],
      value,
      type: 'sellers',
    };
  });

  const data_ = [
    ...data_sellers,
    ...data_orders,
    ...data_products,
    ...data_totalOrders,
  ];
  // const minValue = Math.min(...dataValues);
  // const maxValue = Math.max(...dataValues);
  // const avgValue =
  //   dataValues.reduce((acc, val) => acc + val, 0) / dataValues.length;

  const config = {
    data: data_,
    xField: 'label',
    yField: 'value',
    seriesField: 'type',
    isStack: false,
    isGroup: true,
    dodgePadding: 2,
    color: (type: { type: string }) => {
      if (type.type === 'orders') {
        return '#00DFA2';
      } else if (type.type === 'products') {
        return '#E893CF';
      } else if (type.type === 'sellers') {
        return '#FF6D60';
      } else {
        return '#AFD3E2';
      }
    },
    slider: {
      start: 0,
      end: 0.99,
    },
  };

  if (activeTab === 'Ustun') {
    return (
      <div className='w-full max-w-full rounded-md bg-white p-3'>
        <Tabs
          tabs={['Chiziq', 'Ustun']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className='mb-6 mt-4'
        />
        <Column
          style={{
            width: '100%',
          }}
          {...(config as any)}
        />
      </div>
    );
  }

  return (
    <div className='w-full max-w-full rounded-md bg-white p-3'>
      <Tabs
        tabs={['Chiziq', 'Ustun']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4'
      />

      <Area
        style={{
          width: '100%',
        }}
        {...(config as any)}
        point={{
          // add this configuration
          shape: 'circle',
          size: 1,
          style: {
            lineWidth: 4,
          },
        }}
      />
    </div>
  );
}

export default AreaChartComponent;
