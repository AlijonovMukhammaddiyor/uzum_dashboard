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
import React from 'react';

import { CategoryTrendDataType } from '@/components/pages/category/slug/components/CategoryTrends';
import Tabs from '@/components/shared/Tabs';

function AreaChartComponent({
  data,
  labels,
}: {
  data: CategoryTrendDataType[];
  labels: string[];
}) {
  const [activeTab, setActiveTab] = React.useState<string>('Chiziq');

  function sortDates(dates: string[]): string[] {
    return dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }

  function constructSortedArrays(
    data: CategoryTrendDataType[],
    sortedLabels: string[]
  ): {
    totalOrdersSorted: number[];
    totalReviewsSorted: number[];
    totalShopsSorted: number[];
    totalProductsSorted: number[];
    totalProductsWithSalesSorted: number[];
    totalShopsWithSalesSorted: number[];
  } {
    // Initialize empty arrays for the sorted data
    const totalOrdersSorted: number[] = [];
    const totalReviewsSorted: number[] = [];
    const totalShopsSorted: number[] = [];
    const totalProductsSorted: number[] = [];
    const totalProductsWithSalesSorted: number[] = [];
    const totalShopsWithSalesSorted: number[] = [];

    // For each label in the sorted labels array...
    sortedLabels.forEach((label) => {
      // Find the corresponding data object
      const dataObj = data.find((d) => d.date_pretty === label);
      if (dataObj) {
        // If found, push the corresponding values into the sorted arrays
        totalOrdersSorted.push(dataObj.total_orders);
        totalReviewsSorted.push(dataObj.total_reviews);
        totalShopsSorted.push(dataObj.total_shops);
        totalProductsSorted.push(dataObj.total_products);
        totalProductsWithSalesSorted.push(dataObj.total_products_with_sales);
        totalShopsWithSalesSorted.push(dataObj.total_shops_with_sales);
      }
    });

    // Return the sorted arrays
    return {
      totalOrdersSorted,
      totalReviewsSorted,
      totalShopsSorted,
      totalProductsSorted,
      totalProductsWithSalesSorted,
      totalShopsWithSalesSorted,
    };
  }

  const labelsSorted = sortDates(labels);
  const {
    totalOrdersSorted,
    totalReviewsSorted,
    totalShopsSorted,
    totalProductsSorted,
    totalProductsWithSalesSorted,
    totalShopsWithSalesSorted,
  } = constructSortedArrays(data, labelsSorted);

  const data_sellers = totalShopsSorted.map((value, index) => ({
    label: labelsSorted[index],
    value,
    type: 'Sotuvchilar',
  }));

  const data_orders = totalOrdersSorted.map((value, index) => ({
    label: labelsSorted[index],
    value,
    type: 'Buyurtmalar',
  }));

  const data_products = totalProductsSorted.map((value, index) => ({
    label: labelsSorted[index],
    value,
    type: 'Mahsulotlar',
  }));

  const data_totalReviews = totalReviewsSorted.map((value, index) => ({
    label: labelsSorted[index],
    value,
    type: 'Izohlar',
  }));

  const data_totalShopsWithSales = totalShopsWithSalesSorted.map(
    (value, index) => ({
      label: labelsSorted[index],
      value,
      type: 'Faol sotuvchilar',
    })
  );

  const data_totalProductsWithSales = totalProductsWithSalesSorted.map(
    (value, index) => ({
      label: labelsSorted[index],
      value,
      type: 'Faol mahsulotlar',
    })
  );

  const data_ = [
    ...data_sellers,
    ...data_orders,
    ...data_products,
    ...data_totalReviews,
    ...data_totalShopsWithSales,
    ...data_totalProductsWithSales,
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
      if (type.type === 'Buyurtmalar') {
        return '#00DFA2';
      } else if (type.type === 'Mahsulotlar') {
        return '#E893CF';
      } else if (type.type === 'Izohlar') {
        return '#FF6D60';
      } else if (type.type === 'Sotuvchilar') {
        return '#E823CF';
      } else if (type.type === 'Faol sotuvchilar') {
        return '#126D60';
      } else {
        return '#A233E2';
      }
    },
    slider: {
      start: 0,
      end: 0.99,
    },
    xAxis: {
      label: {
        autoRotate: true, // auto rotate labels
        autoHide: false, // do not hide labels automatically
        autoEllipsis: false, // do not ellipsis labels automatically
      },
    },
  };

  if (activeTab === 'Ustun') {
    return (
      <div className='h-[650px] w-full max-w-full rounded-md bg-white p-3'>
        <Tabs
          tabs={['Chiziq', 'Ustun']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          className='mb-6 mt-4'
        />
        <Column
          style={{
            width: '100%',
            height: '550px',
          }}
          {...(config as any)}
        />
      </div>
    );
  }

  return (
    <div className='h-[650px] w-full max-w-full rounded-md bg-white p-3'>
      <Tabs
        tabs={['Chiziq', 'Ustun']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4'
      />

      <Area
        style={{
          width: '100%',
          height: '550px',
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
