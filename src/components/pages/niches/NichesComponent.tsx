import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import { getNichesColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

interface CategoryNichesType {
  category__ancestors: string;
  caegory__ancestors_ru: string;
  average_product_rating: number;
  category_id: number;
  category__title: string;
  category__title_ru: string;
  date_pretty: string;
  total_orders: number;
  total_orders_amount: number;
  total_products: number;
  total_products_with_sales: number;
  total_reviews: number;
  total_shops: number;
  total_shops_with_sales: number;
}

function NichesComponent() {
  const { t, i18n } = useTranslation('categories');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [data, setData] = React.useState<CategoryNichesType[]>([]);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);

    api
      .get<
        unknown,
        AxiosResponse<{
          data: CategoryNichesType[];
        }>
      >(`/category/niches/`)
      .then((res) => {
        logger(res.data.data, 'category niches');
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in category niches');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full w-full'>
      <Container loading={loading} className='h-full w-full'>
        {/* <PaginatedTable */}
        <Table
          columnDefs={getNichesColDefs(t2, i18n.language) as any}
          className='h-[1016px] min-w-full'
          rowData={data}
        />
      </Container>
    </div>
  );
}

export default NichesComponent;
