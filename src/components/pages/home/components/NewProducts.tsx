import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import { NewProductsColDefs } from '@/components/columnDefs';
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

      url += `&searches=${columns.join(',')}&filters=${filters
        .map((filter) => filter.filter)
        .join(',')}`;
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
    <div className='flex h-full w-full flex-col gap-5'>
      <Container
        className={clsxm(
          'flex h-max min-h-[550px] w-full items-start justify-start overflow-x-scroll rounded-md px-2',
          className
        )}
        loading={loading}
      >
        <PaginatedTable
          columnDefs={NewProductsColDefs as any}
          className='h-[1016px] min-w-full'
          setLoading={setLoading}
          fetchData={loadData}
        />
      </Container>
    </div>
  );
}

export default NewProducts;
