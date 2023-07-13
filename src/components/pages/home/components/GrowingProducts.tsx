import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { GrowingProductsColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

export interface HomeStatisticsContainerProps {
  className?: string;
}

interface GrowingProductType {
  product_id: number;
  title: string;
  category: string;
  shop: string;
  created_at: string;
  photos: string;
  orders: {
    x: string;
    y: number;
  }[];
  rating: number;
  reviews_amount: {
    x: string;
    y: number;
  }[];
  available_amount: {
    x: string;
    y: number;
  }[];
  average_purchase_price: number;
  position_in_category: number;
  position: number;
}

interface ProductsReponseType {
  product_id: number;
  analytics: {
    average_purchase_price: number;
    position_in_category: number;
    position: number;
    orders_amount: number;
    rating: number;
    reviews_amount: number;
    available_amount: number;
    date_pretty: string;
    product__category__categoryId: number;
    product__category__title: string;
    product__shop__link: number;
    product__shop__title: string;
    product__title: string;
    product__photos: string;
    product__created_at: string;
  }[];
}

function GrowingProducts({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<GrowingProductType[]>([]);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<ProductsReponseType[]>>('/product/growing/')
      .then((res) => {
        // logger(res.data, 'growing products');
        setProducts(prepareTableData(res.data));
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in growing product');
        setLoading(false);
      });
  }, []);

  return (
    <div className='flex h-full w-full flex-col gap-5'>
      <Container
        className={clsxm(
          'flex h-max min-h-[550px] w-full items-start justify-start overflow-x-scroll rounded-md px-2',
          className
        )}
        loading={loading}
      >
        <Table
          columnDefs={GrowingProductsColDefs as any}
          className='h-[1016px] min-w-full'
          rowData={products}
          setLoading={setLoading}
          rowHeight={60}
        />
      </Container>
    </div>
  );
}

export default GrowingProducts;

function prepareTableData(data: ProductsReponseType[]): GrowingProductType[] {
  const res = [];
  // sort according to last orders_amount
  const data_sorted = data.sort((a, b) => {
    return b.analytics[0].orders_amount - a.analytics[0].orders_amount;
  });

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    let prev_orders = item.analytics[0].orders_amount;
    const product = {
      product_id: item.product_id,
      title: item.analytics[0].product__title,
      category: item.analytics[0].product__category__title,
      shop: item.analytics[0].product__shop__title,
      created_at: item.analytics[0].product__created_at,
      photos: item.analytics[0].product__photos,
      orders: item.analytics.slice(1).map((item) => {
        const res = {
          x: item.date_pretty,
          y: item.orders_amount - prev_orders,
        };
        prev_orders = item.orders_amount;
        return res;
      }),
      rating: item.analytics[0].rating,
      reviews_amount: item.analytics.map((item) => ({
        x: item.date_pretty,
        y: item.reviews_amount,
      })),
      available_amount: item.analytics.map((item) => ({
        x: item.date_pretty,
        y: item.available_amount,
      })),
      average_purchase_price: item.analytics[0].average_purchase_price,
      position_in_category: item.analytics[0].position_in_category,
      position: item.analytics[0].position,
    };

    res.push(product);
  }

  return res;
}
