import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import { GrowingProductsColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PaginatedTable from '@/components/shared/PaginatedTable';

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

function GrowingProducts({ className }: HomeStatisticsContainerProps) {
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
    let url = `/product/growing` + `?page=${page}`;
    if (sortModel) {
      url += `&column=${sortModel.colId}&order=${sortModel.sort}`;
    }

    if (filterModel) {
      const columns = Object.keys(filterModel);
      const filters = Object.values(filterModel);
      url += `&searches=${columns.join(',')}&filters=${filters
        .map((filter) => filter.filter)
        .join('---')}`;
    }

    return api.get<
      unknown,
      AxiosResponse<{ results: GrowingProductType[]; count: number }>
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
          columnDefs={GrowingProductsColDefs as any}
          className='h-[1318px] min-w-full'
          fetchData={loadData}
          setLoading={setLoading}
          rowHeight={60}
        />
      </Container>
    </div>
  );
}

export default GrowingProducts;
