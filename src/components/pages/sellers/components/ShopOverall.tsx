import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { ShopOverallColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import AreaChart from '@/components/shared/AreaChart';
import LineChart from '@/components/shared/LineChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  sellerId: number;
  isActive?: boolean;
}

interface SellerType {
  average_order_price: number;
  average_purchase_price: number;
  date_pretty: string;
  num_categories: number;
  position: number;
  rating: number;
  total_orders: number;
  total_products: number;
  total_reviews: number;
  total_revenue: number;
}

function ShopOverall({ className, sellerId, isActive }: Props) {
  const [data, setData] = React.useState<SellerType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<SellerType[]>>(
        `/shop/analytics/` + sellerId + '?range=60'
      )
      .then((res) => {
        setData(res.data.slice(0));
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in shop overall');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsxm(
        'flex min-w-[1200px] flex-col gap-6 overflow-scroll',
        className
      )}
    >
      <Container
        className='flex h-[520px] w-full flex-col rounded-md bg-slate-100 px-5 py-2'
        loading={loading}
        title="Sotuvchining kinlik daromadi, buyurtmalari, izohlari, va mahsulotlari soni, hamda o'rtacha mahsulot narxi"
        titleContainerStyle={{
          marginBottom: '10px',
        }}
      >
        {isActive && (
          <AreaChart
            labels={data.slice(1).map((item) => item.date_pretty)}
            data={prepareDataset(data)}
            style={{ height: '440px', maxHeight: '440px' }}
            className='h-[440px] max-h-[440px]'
          />
        )}
      </Container>
      <Container
        className='mt-4 flex h-[350px] w-full flex-col rounded-md bg-slate-100 p-5'
        loading={loading}
      >
        <div className='flex w-full items-center justify-center'>
          <p className='text-primary'>
            Sotuvchining pozitsiyasi (sotuv miqdori bo`yicha)
          </p>
        </div>
        {isActive && (
          <LineChart
            data={data.map((item) => {
              return {
                y: item.position,
                x: item.date_pretty,
                label: 'Pozitsiya',
              };
            })}
            style={{
              height: '300px',
              maxHeight: '300px',
              minHeight: '300px',
              width: '100%',
            }}
            isStep
            xAxisTitle='Sana'
            yAxisTitle='Pozitsiya'
          />
        )}
      </Container>
      <Container
        className='mt-10 flex h-[1000px] w-full flex-col gap-6 rounded-md bg-white'
        loading={loading}
      >
        <Table
          columnDefs={ShopOverallColumnDefs}
          rowData={data}
          className='h-[1200px] min-w-full'
        />
      </Container>
    </div>
  );
}

export default ShopOverall;

function prepareDataset(data: SellerType[]) {
  const orders: {
    y: number;
    x: string;
  }[] = [];
  const products: {
    y: number;
    x: string;
  }[] = [];
  const reviews: {
    y: number;
    x: string;
  }[] = [];
  const price: {
    y: number;
    x: string;
  }[] = [];

  const revenue: {
    y: number;
    x: string;
  }[] = [];

  let prevOrders = data[0]?.total_orders || 0;
  let prevReviews = data[0]?.total_reviews || 0;
  let prevRevenue = data[0]?.total_revenue || 0;

  data.slice(1).forEach((item) => {
    orders.push({ y: item.total_orders - prevOrders, x: item.date_pretty });
    products.push({ y: item.total_products, x: item.date_pretty });
    reviews.push({ y: item.total_reviews - prevReviews, x: item.date_pretty });
    price.push({
      y: item.average_purchase_price,
      x: item.date_pretty,
    });
    revenue.push({
      y: Math.ceil((item.total_revenue - prevRevenue) * 1000),
      x: item.date_pretty,
    });

    prevRevenue = item.total_revenue;
    prevOrders = item.total_orders;
    prevReviews = item.total_reviews;
  });

  return [
    {
      data: orders,
      fill: true,
      borderColor: 'rgb(62, 199, 11)',
      backgroundColor: 'rgba(62, 199, 11, 0.25)',
      label: 'Buyurtmalar',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: 'rgb(62, 199, 11)',
    },
    {
      data: products,
      fill: true,
      borderColor: '#ff7f0e',
      backgroundColor: 'rgba(255, 127, 14, 0.25)',
      label: 'Tovarlar',
      hidden: true,
      pointRadius: 3,
      pointBackgroundColor: '#ff7f0e',
    },
    {
      data: reviews,
      fill: true,
      borderColor: '#d62728',
      backgroundColor: 'rgba(214, 39, 40, 0.25)',
      label: 'Izohlar',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#d62728',
    },
    {
      data: price,
      fill: true,
      borderColor: '#9467bd',
      backgroundColor: 'rgba(148, 103, 189, 0.25)',
      label: "O'rtacha narx",
      hidden: true,
      pointRadius: 3,
      pointBackgroundColor: '#9467bd',
    },
    {
      data: revenue,
      fill: true,
      borderColor: '#8c564b',
      backgroundColor: 'rgba(140, 86, 75, 0.25)',
      label: 'Daromad',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#8c564b',
    },
  ];
}
