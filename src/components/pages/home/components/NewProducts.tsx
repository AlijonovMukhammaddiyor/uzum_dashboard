import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import { getNewProductsColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PaginatedTable from '@/components/shared/PaginatedTable';

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

function NewProducts({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation('tableColumns');
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

  const loadData = (
    page: number,
    sortModel: {
      colId: string;
      sort: string;
    } | null,
    filterModel: {
      [key: string]: {
        filterType: string;
        type: string;
        filter: string;
      };
    } | null
  ) => {
    const api = new API(null);
    setLoading(true);
    let url = `/product/recent` + `?page=${page}`;
    if (sortModel) {
      url += `&column=${sortModel.colId}&order=${sortModel.sort}`;
    }

    if (filterModel) {
      const columns = Object.keys(filterModel);
      const filters = Object.values(filterModel);
      const joined = filters.map((filter) => filter.filter).join('---');
      url += `&searches=${columns.join(',')}&filters=${joined}`;
    }

    return api.get<
      unknown,
      AxiosResponse<{
        results: ProductsReponseType[];
        count: number;
      }>
    >(url);
  };

  return (
    <div
      className={clsxm('flex h-full w-full flex-col gap-5 pb-10', className)}
      style={{
        zoom: zoomLevel,
      }}
    >
      <Container
        className={clsxm(
          'flex w-full items-start justify-start rounded-md border-none pb-10',
          className
        )}
        loading={loading}
      >
        <PaginatedTable
          columnDefs={getNewProductsColDefs(t, i18n.language)}
          className='h-[1600px] min-w-full'
          setLoading={setLoading}
          fetchData={loadData}
          rowHeight={70}
        />
      </Container>
    </div>
  );
}

export default NewProducts;
