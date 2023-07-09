import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import ScatterChart from '@/components/shared/Scatter';

interface TopShopsType {
  total_orders: number;
  total_products: number;
  total_reviews: number;
  shops: {
    shop__title: string;
    total_orders: number;
    total_products: number;
    total_reviews: number;
    shop__link: string;
  }[];
}

export interface MainAnalyticsProps {
  className?: string;
}

function MainAnalytics({ className }: MainAnalyticsProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [data, setData] = React.useState<TopShopsType | null>(null);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          data: TopShopsType;
        }>
      >(`/shop/treemap/`)
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in shop analytics');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsxm(
        'flex h-full w-full flex-col items-start justify-start gap-6',
        className
      )}
    >
      <div className='flex h-full w-full items-start justify-start gap-5 overflow-x-scroll'>
        <Container
          className='h-[500px] w-full min-w-full items-start justify-start gap-6 rounded-md bg-white p-1'
          loading={loading}
        >
          {data && (
            <ScatterChart
              data={
                data?.shops.map((shop) => ({
                  x: shop.total_orders,
                  y: shop.total_products,
                })) || []
              }
            />
          )}
        </Container>
      </div>
    </div>
  );
}

export default MainAnalytics;
