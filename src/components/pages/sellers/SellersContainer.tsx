import { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getShopTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import RangeChartShops from '@/components/pages/sellers/components/RangeChartShops';
import PaginatedTable from '@/components/shared/PaginatedTable';
import Table from '@/components/shared/Table';

import { UserType } from '@/types/user';

export interface Props {
  className?: string;
  user: UserType;
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
  total_revenue: number;
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
  diff_revenue: number;
  total_products: number;
}

function SellersTable({ className, user }: Props) {
  const { t } = useTranslation('sellers');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingTops, setLoadingTops] = React.useState<boolean>(false);
  const [tops, setTops] = React.useState<TopsType[]>([]);
  const path = window.location.pathname;
  const [myShops, setMyShops] = React.useState<SellerType[]>([]);
  const [shopsLoading, setShopsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const api = new API(null);
    setLoadingTops(true);
    api
      .get<unknown, AxiosResponse<TopsType[]>>('/shop/yesterday-tops/')
      .then((res) => {
        setTops(res.data);
        setLoadingTops(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in top 20 shops');
        setLoadingTops(false);
      });
    setShopsLoading(true);
    api
      .get<unknown, AxiosResponse<{ data: SellerType[] }>>('/shop/mine/')
      .then((res) => {
        setMyShops(res.data.data ?? []);
        setShopsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in my shops');
        setShopsLoading(false);
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
      {(user.is_pro || user.is_proplus) && myShops.length > 0 ? (
        <Container
          loading={shopsLoading}
          className={clsxm('w-full overflow-scroll border-none pt-4')}
        >
          <p className='text-primary h-10 w-full text-center'>{t('myShops')}</p>
          <Table
            columnDefs={getShopTableColumnDefs(t2)}
            className={clsxm(
              'min-w-full rounded-none',
              user.is_pro && 'h-[190px]',
              user.is_proplus && 'h-[320px]'
            )}
            rowData={myShops ?? []}
          />
        </Container>
      ) : (
        <p className='bg-primary text-centera rounded-lg p-4 text-white'>
          {t('selectShops')}
        </p>
      )}
      <Container
        loading={loadingTops}
        title={t('shops_with_top_revenue')}
        explanation={t('no_info')}
        className={clsxm(
          'h-[520px] w-full shrink-0 overflow-scroll rounded-md bg-white px-5 py-3'
        )}
      >
        <RangeChartShops
          data={tops.map((item) => ({
            title: item.title,
            total_orders: item.diff_orders,
            total_revenue: item.diff_revenue,
          }))}
          style={{
            width: '100%',
            height: 'calc(100% - 60px)',
            maxHeight: 'calc(100% - 60px)',
          }}
        />
      </Container>

      <Container
        loading={loading}
        className={clsxm('w-full overflow-scroll border-none')}
      >
        <p className='text-primary h-10 w-full text-center'>{t('allShops')}</p>
        <PaginatedTable
          columnDefs={getShopTableColumnDefs(t2)}
          className='h-[1016px] min-w-full'
          fetchData={loadData}
          setLoading={setLoading}
        />
      </Container>
    </div>
  );
}

export default SellersTable;
