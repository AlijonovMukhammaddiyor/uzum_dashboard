import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { GrowingCategoriesColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

export interface HomeStatisticsContainerProps {
  className?: string;
}

interface GrowingCategoryType {
  categoryId: number;
  title: string;
  created_at: string;
  orders: {
    x: string;
    y: number;
  }[];
  average_product_rating: number;
  reviews_amount: number;
  average_purchase_price: number;
  total_shops: {
    x: string;
    y: number;
  }[];
  total_products: {
    x: string;
    y: number;
  }[];

  total_shop_with_sales: {
    x: string;
    y: number;
  }[];
  total_products_with_sales: {
    x: string;
    y: number;
  }[];
}

interface CategoriesReponseType {
  categoryId: number;
  analytics: {
    average_purchase_price: number;
    average_product_rating: number;
    category__categoryId: number;
    category__created_at: string;
    category__title: string;
    category__descendants: number;
    date_pretty: string;
    total_orders: number;
    total_products: number;
    total_shops: number;
    total_reviews: number;
    total_products_with_sales: number;
    total_shops_with_sales: number;
  }[];
}

function GrowingCategories({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<GrowingCategoryType[]>([]);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<CategoriesReponseType[]>>(
        '/category/growing/'
      )
      .then((res) => {
        logger(res.data, 'growing categories');
        setCategories(prepareTableData(res.data));
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
          columnDefs={GrowingCategoriesColDefs}
          className='h-[1290px] min-w-full'
          rowData={categories}
          setLoading={setLoading}
          rowHeight={60}
        />
      </Container>
    </div>
  );
}

export default GrowingCategories;

function prepareTableData(
  data: CategoriesReponseType[]
): GrowingCategoryType[] {
  const res = [];
  // sort according to last orders_amount

  const data_sorted = data.sort((a, b) => {
    return b.analytics[0].total_orders - a.analytics[0].total_orders;
  });

  for (let i = 0; i < data.length; i++) {
    const item = data_sorted[i];
    const analytics = item.analytics.slice(0, item.analytics.length - 1);
    let prev_orders = analytics[0].total_orders;
    const category = {
      categoryId: item.categoryId,
      title: analytics[0].category__title,
      created_at: analytics[0].category__created_at,
      orders: analytics.map((item) => {
        const res = {
          x: item.date_pretty,
          y: item.total_orders - prev_orders,
        };
        prev_orders = item.total_orders;
        return res;
      }),
      average_product_rating:
        analytics[analytics.length - 1].average_product_rating,
      reviews_amount: analytics[analytics.length - 1].total_reviews,
      total_shops: analytics.map((item) => {
        return {
          x: item.date_pretty,
          y: item.total_shops,
        };
      }),
      total_products: analytics.map((item) => {
        return {
          x: item.date_pretty,
          y: item.total_products,
        };
      }),
      total_shop_with_sales: analytics.map((item) => {
        return {
          x: item.date_pretty,
          y: item.total_shops_with_sales,
        };
      }),
      total_products_with_sales: analytics.map((item) => {
        return {
          x: item.date_pretty,
          y: item.total_products_with_sales,
        };
      }),
      average_purchase_price:
        analytics[analytics.length - 1].average_purchase_price,
    };

    res.push(category);
  }

  return res;
}
