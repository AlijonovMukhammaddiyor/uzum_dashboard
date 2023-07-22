import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { CategoryTrendstableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import SingleAxisAreaChart from '@/components/shared/SingleAxisAreaChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  categoryId: string;
  isActive?: boolean;
}

export interface CategoryAnalyticsDataType {
  average_product_rating: number;
  average_purchase_price: number;
  date_pretty: string;
  total_orders: number;
  total_products: number;
  total_products_with_sales: number;
  total_reviews: number;
  total_shops: number;
  total_shops_with_sales: number;
  category_title: string;
}

function CategoryTrends({ className, categoryId, isActive }: Props) {
  const [data, setData] = React.useState<CategoryAnalyticsDataType[]>([]);
  const [labels, setLabels] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          data: CategoryAnalyticsDataType[];
          labels: string[];
          total: number;
        }>
      >(`/category/analytics/` + categoryId + '?range=60')
      .then((res) => {
        setData(res.data.data);
        setLabels(res.data.labels);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in category trends');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <div
      className={clsxm(
        'flex min-w-[1200px] flex-col gap-6 overflow-scroll',
        className
      )}
    >
      <Container
        className='flex h-[500px] w-full flex-col gap-6 rounded-md bg-white px-5'
        loading={loading}
      >
        {isActive && (
          <SingleAxisAreaChart
            data={prepareDataset(data) ?? []}
            labels={labels.slice(1)}
            style={{
              width: '100%',
              // height: '400px',
              // minHeight: '400px',
            }}
            className='h-450px max-h-[470px] w-full'
          />
        )}
      </Container>
      <Table
        columnDefs={CategoryTrendstableColumnDefs as any}
        className=''
        rowData={data || []}
      />
    </div>
  );
}

export default CategoryTrends;

const prepareDataset = (data: CategoryAnalyticsDataType[]) => {
  const orders: {
    x: string;
    y: number;
  }[] = [];
  const allOrders: {
    x: string;
    y: number;
  }[] = [];
  const products: {
    x: string;
    y: number;
  }[] = [];
  const shops: {
    x: string;
    y: number;
  }[] = [];
  const reviews: {
    x: string;
    y: number;
  }[] = [];
  const shopsWithSales: {
    x: string;
    y: number;
  }[] = [];
  const productsWithSales: {
    x: string;
    y: number;
  }[] = [];

  let prevOrders = data[0]?.total_orders || 0;
  let prevReviews = data[0]?.total_reviews || 0;

  data.slice(1).forEach((item) => {
    orders.push({
      y: item.total_orders - prevOrders,
      x: item.date_pretty,
    });
    products.push({ y: item.total_products, x: item.date_pretty });
    shops.push({ y: item.total_shops, x: item.date_pretty });
    reviews.push({ y: item.total_reviews - prevReviews, x: item.date_pretty });
    shopsWithSales.push({
      y: item.total_shops_with_sales,
      x: item.date_pretty,
    });
    productsWithSales.push({
      y: item.total_products_with_sales,
      x: item.date_pretty,
    });
    allOrders.push({ y: item.total_orders, x: item.date_pretty });

    prevOrders = item.total_orders;
    prevReviews = item.total_reviews;
  });

  return [
    {
      data: orders,
      fill: true,
      borderColor: '#1f77b4',
      backgroundColor: 'rgba(31, 119, 180, 0.15)',
      label: 'Kunlik buyurtmalar',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#1f77b4',
    },
    {
      data: allOrders,
      fill: true,
      borderColor: '#1f2214',
      backgroundColor: 'rgba(0, 19, 80, 0.15)',
      label: 'Jami buyurtmalar',
      hidden: true,
      pointRadius: 3,
      pointBackgroundColor: '#1f2214',
    },
    {
      data: products,
      fill: true,
      borderColor: '#ff7f0e',
      backgroundColor: 'rgba(255, 127, 14, 0.15)',
      label: 'Tovarlar',
      hidden: true,
      pointRadius: 3,
      pointBackgroundColor: '#ff7f0e',
    },
    {
      data: shops,
      fill: true,
      borderColor: '#2ca02c',
      backgroundColor: 'rgba(44, 160, 44, 0.15)',
      label: "Do'konlar",
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#2ca02c',
    },
    {
      data: reviews,
      fill: true,
      borderColor: '#d62728',
      backgroundColor: 'rgba(214, 39, 40, 0.15)',
      label: 'Izohlar',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#d62728',
    },
    {
      data: shopsWithSales,
      fill: true,
      borderColor: '#9467bd',
      backgroundColor: 'rgba(148, 103, 189, 0.15)',
      label: "Kecha Sotuvi bo'lgan do'konlar",
      hidden: true,
      pointRadius: 3,
      pointBackgroundColor: '#9467bd',
    },
    {
      data: productsWithSales,
      fill: true,
      borderColor: 'rgb(204, 153, 255)',
      backgroundColor: 'rgba(204, 153, 255, 0.15)',
      label: "Kecha Sotuvi bo'lgan tovarlar",
      hidden: true,
      pointRadius: 3,
      pointBackgroundColor: 'rgb(204, 153, 255)',
    },
  ];
};
