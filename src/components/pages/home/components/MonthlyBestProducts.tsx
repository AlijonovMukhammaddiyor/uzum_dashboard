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

function MonthlyBestProducts({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation('tableColumns');
  const [data, setData] = React.useState<ProductsReponseType[]>([]);

  const [zoomLevel, setZoomLevel] = React.useState<number>(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.8); // 90% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    const url = `/product/` + `?monthly=${true}&offset=0&limit=100`;
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
        logger(err, 'error in monthly best products');
      });
  }, []);

  return (
    <div
      className={clsxm('monthly flex h-full w-full flex-col gap-5', className)}
      style={{
        zoom: zoomLevel,
      }}
    >
      <Container
        className={clsxm('w-full rounded-md border-none', className)}
        loading={loading}
      >
        <p className='w-full py-4 text-center text-base font-semibold'>
          {i18n.language === 'uz'
            ? "Quyidagi jadvalda oxirgi 30 kun ichida eng ko'p tushum keltirgan 100 ta mahsulotlar ro'yhati keltirilgan"
            : 'В таблице ниже представлен список 100 продуктов, которые за последние 30 дней принесли наибольший доход'}
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

export default MonthlyBestProducts;
