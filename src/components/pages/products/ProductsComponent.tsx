import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { CategoryProductTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { ProductAnalyticsViewType } from '@/components/pages/category/slug/components/CategoryProductsTable';
import RangeChartProducts from '@/components/pages/products/slug/components/RangeChartProducts';
import PaginatedTable from '@/components/shared/PaginatedTable';

function ProductsComponent() {
  const [loading, setLoading] = React.useState(false);
  const [loadingSegmentation, setLoadingSegmentation] = React.useState(false);
  const [products, setProducts] = React.useState<
    {
      from: number;
      to: number;
      total_orders: number;
      total_shops: number;
      total_products: number;
      total_revenue: number;
      total_reviews: number;
    }[]
  >([]);

  React.useEffect(() => {
    const api = new API(null);
    setLoadingSegmentation(true);
    api
      .get<unknown, AxiosResponse<any>>('/product/segments/?segments_count=20')
      .then((res) => {
        // setTopProducts(res.data.products);
        const data = res.data;
        setProducts(data.data);

        setLoadingSegmentation(false);
      })
      .catch((err) => {
        logger(err, 'Error in products segmentation');
        setLoadingSegmentation(false);
      });
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
    <div className='min-h-full w-full min-w-[1300px] overflow-scroll'>
      <Container
        loading={loadingSegmentation}
        title="Mahsulotlar narx, buyurtmalar va do'konlar soni bo'yicha segmentatsiyasi"
        explanation='Mahsulotlar narx, buyurtmalar, do`konlar bo`yicha segmentatsiyasi'
        className={clsxm(
          'mb-5 h-[530px] w-full shrink-0 overflow-scroll rounded-md bg-white px-5 py-3'
        )}
        titleContainerStyle={{
          marginBottom: '10px',
        }}
      >
        <RangeChartProducts
          data={products ?? []}
          style={{
            height: '440px',
            width: '100%',
          }}
        />
      </Container>
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
