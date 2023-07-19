import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { ShopsTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PaginatedTable from '@/components/shared/PaginatedTable';
import StateckedColumnChart from '@/components/shared/StackedColumnChart';

export interface Props {
  className?: string;
}

interface SellerType {
  average_order_price: number;
  average_purchase_price: number;
  date_pretty: string;
  id: string;
  num_categories: number;
  position: number;
  rating: number;
  shop_link: string;
  shop_title: string;
  total_orders: number;
  total_products: number;
  total_reviews: number;
}

interface TopsType {
  seller_id: string;
  title: string;
  diff_orders: number;
  diff_reviews: number;
  total_products: number;
}

function SellersTable({ className }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingTops, setLoadingTops] = React.useState<boolean>(false);
  const [tops, setTops] = React.useState<TopsType[]>([]);

  React.useEffect(() => {
    const api = new API(null);
    setLoadingTops(true);
    api
      .get<unknown, AxiosResponse<TopsType[]>>('/shop/yesterday-tops/')
      .then((res) => {
        setLoadingTops(false);
        setTops(res.data);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in top 20 shops');
        setLoadingTops(false);
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
    let url = `/shop` + `?page=${page}`;
    if (sortModel) {
      url += `&sort=${sortModel.colId}&order=${sortModel.sort}`;
    }
    if (filterModel) {
      const columns = Object.keys(filterModel);
      const filters = Object.values(filterModel);

      url += `&searches=${columns.join(',')}&filters=${filters
        .map((filter) => filter.filter)
        .join('#####')}`;
    }

    return api.get<
      unknown,
      AxiosResponse<{
        results: SellerType[];
        count: number;
        next?: string;
        previous?: string;
      }>
    >(url);
  };

  return (
    <div
      className={clsxm(
        'flex min-h-full w-full min-w-[1200px] flex-col items-start justify-start gap-5 overflow-x-scroll',
        className
      )}
    >
      <Container
        loading={loadingTops}
        title='Kecha eng ko`p buyurtmaga ega bo`lgan do`konlar'
        explanation='Do`konlar soni va buyurtmalar soni o`rtasidagi farq'
        className={clsxm(
          'h-[520px] w-full shrink-0 overflow-scroll rounded-md bg-white px-5 py-3'
        )}
      >
        <StateckedColumnChart
          data={prepareStackedColumnData(tops)}
          style={{
            height: '440px',
            width: '100%',
          }}
        />
      </Container>
      <Container loading={loading} className={clsxm('w-full overflow-scroll')}>
        <PaginatedTable
          columnDefs={ShopsTableColumnDefs}
          className='h-[1016px] min-w-full'
          fetchData={loadData}
          setLoading={setLoading}
        />
      </Container>
    </div>
  );
}

export default SellersTable;

function prepareStackedColumnData(tops: TopsType[]) {
  const data = [];

  for (const top of tops) {
    data.push({
      x: top.title,
      y: top.diff_reviews,
      type: 'Izohlar soni',
    });

    data.push({
      x: top.title,
      y: top.diff_orders,
      type: 'Buyurtmalar soni',
    });
  }

  return data;
}
