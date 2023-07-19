import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';

import { CategoryProductTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { ProductAnalyticsViewType } from '@/components/pages/category/slug/components/CategoryProductsTable';
import PaginatedTable from '@/components/shared/PaginatedTable';

function ProductsComponent() {
  const [loading, setLoading] = React.useState(false);

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
    let url = `/product/` + `?page=${page}`;
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
      AxiosResponse<{
        results: ProductAnalyticsViewType[];
        count: number;
        next?: string;
        previous?: string;
      }>
    >(url);
  };

  return (
    <div className='min-h-full w-full'>
      <Container loading={loading} className='h-full w-full'>
        <PaginatedTable
          fetchData={loadData}
          setLoading={setLoading}
          columnDefs={CategoryProductTableColumnDefs as any}
          className='h-[1016px] w-full'
        />
      </Container>
    </div>
  );
}

export default ProductsComponent;
