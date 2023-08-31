import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getWeeklyBestProductsColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

export interface HomeStatisticsContainerProps {
  className?: string;
}

interface ProductsReponseType {
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
  product__product_id: number;
}

function WeeklyBestProducts({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation('tableColumns');
  const [data, setData] = React.useState<ProductsReponseType[]>([]);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    const url = `/product/` + `?weekly=${true}`;
    api
      .get<
        unknown,
        AxiosResponse<{
          results: ProductsReponseType[];
          count: number;
        }>
      >(url)
      .then((res) => {
        setLoading(false);
        setData(res.data.results);
      })
      .catch((err) => {
        setLoading(false);
        logger(err, 'error in weekly best products');
      });
  }, []);

  return (
    <div
      className={clsxm('flex h-full w-full flex-col gap-5 pb-10', className)}
    >
      <Container
        className={clsxm(
          'h-max min-h-[550px] w-full items-start justify-start overflow-x-scroll rounded-md border-none',
          className
        )}
        loading={loading}
      >
        <p className='w-full py-4 text-center text-base font-semibold'>
          {i18n.language === 'uz'
            ? "Quyidagi jadvalda oxirgi 7 kun ichida eng ko'p daromad keltirgan 100 ta mahsulotlar ro'yhati keltirilgan"
            : 'В таблице ниже представлен список 100 продуктов, которые за последние 7 дней принесли наибольший доход'}
        </p>
        <Table
          columnDefs={getWeeklyBestProductsColDefs(t, i18n.language)}
          className='h-[1520px] min-w-full'
          setLoading={setLoading}
          headerHeight={60}
          rowData={data ?? []}
          isBalham={true}
          rowHeight={80}
        />
      </Container>
    </div>
  );
}

export default WeeklyBestProducts;
