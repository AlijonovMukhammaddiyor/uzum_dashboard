import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import { getBannerProductsColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

interface ProductType {
  date_pretty: string;
  average_purchase_price: number;
  position_in_category: number;
  position: number;
  orders_amount: number;
  product__category__title: string;
  product__category__categoryId: number;
  product__created_at: string;
  product__product_id: number;
  product__shop__link: string;
  product__shop__title: number;
  product__title: string;
  rating: number;
  reviews_amount: number;
  orders_money: number;
  available_amount: number;
  first_date: string;
  last_date: string;
  product__photos: string;
}

function CampaignProductsTable() {
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const { t, i18n } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<ProductType[]>>('/banner/')
      .then((res) => {
        logger(res, 'CampaignProductsTable.tsx');
        const data = res.data;
        setProducts(data);

        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'Error in CampaignProductsTable.tsx');
        setLoading(false);
      });
  }, []);

  return (
    <div className='h-full w-full'>
      <Container
        loading={loading}
        className='h-full w-full border-none bg-transparent'
      >
        {products.length > 0 ? (
          <Table
            rowData={products.sort(
              (a, b) =>
                new Date(b.first_date).getTime() -
                new Date(a.first_date).getTime()
            )}
            columnDefs={getBannerProductsColDefs(t, i18n.language)}
            className='h-[1200px]'
            withCheckbox
          />
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
}

export default CampaignProductsTable;
