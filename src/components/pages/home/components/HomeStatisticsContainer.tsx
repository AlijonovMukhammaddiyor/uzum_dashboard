import { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HiChevronDown } from 'react-icons/hi2';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Loading from '@/components/Loading';
import DataContainer from '@/components/pages/home/components/DataContainer';

import { UserType } from '@/types/user';

export interface HomeStatisticsContainerProps {
  className?: string;
  user: UserType;
}

function HomeStatisticsContainer({
  className,
  user,
}: HomeStatisticsContainerProps) {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [revenue, setRevenue] = React.useState<any[]>([]);
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [tree, setTree] = React.useState<any[]>([]);
  const [shops, setShops] = React.useState<{
    shops: {
      total_shops: number;
      date_pretty: string;
    }[];
    accounts: {
      total_accounts: number;
      date_pretty: string;
    }[];
  }>({ shops: [], accounts: [] });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [isFullScreen, setIsFullScreen] = React.useState<string | null>(null);

  React.useEffect(() => {
    const api = new API(null);

    api
      .get<unknown, AxiosResponse<any>>('/category/segmentation/')
      .then((res) => {
        // logger(res.data, 'Segmentation');
        setTree(res.data);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in orders');
        setLoading(false);
      });

    setLoading(true);
    api
      .get<unknown, AxiosResponse<any>>('/uzum/orders/')
      .then((res) => {
        // logger(res.data, 'Orders');
        setOrders(
          res.data.sort(
            (a: any, b: any) =>
              new Date(a.date_pretty).getTime() -
              new Date(b.date_pretty).getTime()
          )
        );
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in orders');
        setLoading(false);
      });
    api
      .get<unknown, AxiosResponse<any>>('/uzum/reviews/')
      .then((res) => {
        // logger(res.data, 'Orders');
        setReviews(
          res.data.sort(
            (a: any, b: any) =>
              new Date(a.date_pretty).getTime() -
              new Date(b.date_pretty).getTime()
          )
        );
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in orders');
        setLoading(false);
      });
    api
      .get<unknown, AxiosResponse<any>>('/uzum/revenue/')
      .then((res) => {
        setRevenue(
          res.data
            .slice(0)
            .map((item: any) => {
              return item;
              // return {
              //   ...item,
              //   total_revenue: 411_523_262.5,
              // };
            })
            .filter(
              (item: any) =>
                item.date_pretty !== '2023-06-22' &&
                item.date_pretty !== '2023-07-23'
            )
        );
      })
      .catch((err) => {
        logger(err, 'Error in revenue');
        setLoading(false);
      });
    api
      .get<unknown, AxiosResponse<any>>('/uzum/products/')
      .then((res) => {
        // logger(res.data, 'Products');
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'Error in products');
        setLoading(false);
      });
    setLoading(true);
    api
      .get<unknown, AxiosResponse<any>>('/uzum/sellers/')
      .then((res) => {
        setShops(res.data);
      })
      .catch((err) => {
        logger(err, 'Error in sellers');
        setLoading(false);
      });
  }, []);

  const { t } = useTranslation('common');

  return (
    <div
      className={clsxm(
        'relative flex h-full w-full flex-col gap-10',
        className
      )}
    >
      {loading && <Loading />}
      <div className='flex w-full flex-col items-start justify-start gap-10  xl:flex-row'>
        {orders.length > 0 && (
          <DataContainer
            user={user}
            data={tree}
            isFullScreen={isFullScreen}
            setFullScreen={setIsFullScreen}
            title={t('dataTable.orders_amount')}
            all={orders[orders.length - 1]?.total_orders ?? 0}
            all_last={orders[orders.length - 2]?.total_orders ?? 0}
            isCount={true}
            daily={
              orders[orders.length - 1]?.total_orders -
                orders[orders.length - 2]?.total_orders ?? 0
            }
            daily_last={
              orders[orders.length - 2]?.total_orders -
                orders[orders.length - 3].total_orders ?? 0
            }
            last_date={
              orders[orders.length - 1]?.date_pretty ??
              new Date().toDateString()
            }
            data_all={orders.slice(1).map((item) => ({
              x: item.date_pretty,
              y: item.total_orders,
            }))}
            data_daily={getDaily(
              orders.map((item) => ({
                x: item.date_pretty,
                y: item.total_orders,
              }))
            )}
            all_color='#aec7e8'
            daily_color='#1f77b4'
          />
        )}
        {revenue.length > 0 && (
          <DataContainer
            user={user}
            data={tree}
            isFullScreen={isFullScreen}
            setFullScreen={setIsFullScreen}
            title={t('dataTable.revenue')}
            all={revenue[revenue.length - 1]?.total_revenue ?? 0}
            all_last={revenue[revenue.length - 2]?.total_revenue ?? 0}
            isCount={false}
            daily={
              revenue[revenue.length - 1]?.total_revenue -
                revenue[revenue.length - 2]?.total_revenue ?? 0
            }
            daily_last={
              revenue[revenue.length - 2]?.total_revenue -
                revenue[revenue.length - 3].total_revenue ?? 0
            }
            last_date={
              revenue[revenue.length - 1]?.date_pretty ??
              new Date().toDateString()
            }
            data_all={revenue.slice(1).map((item) => ({
              x: item.date_pretty,
              y: Math.round(item.total_revenue * 1000),
            }))}
            data_daily={getDaily(
              revenue.map((item) => ({
                x: item.date_pretty,
                y: Math.round(item.total_revenue * 1000),
              }))
            )}
            all_color='#ffbb78'
            daily_color='#ff7f0e'
          />
        )}
      </div>
      <div className='flex w-full flex-col items-start justify-start  gap-10 xl:flex-row'>
        {shops.shops.length > 0 && (
          <DataContainer
            user={user}
            data={tree}
            isFullScreen={isFullScreen}
            setFullScreen={setIsFullScreen}
            title={t('dataTable.shops_amount')}
            all={shops.shops[shops.shops.length - 1]?.total_shops ?? 0}
            all_last={shops.shops[shops.shops.length - 2]?.total_shops ?? 0}
            isCount={true}
            daily={
              shops.shops[shops.shops.length - 1]?.total_shops -
                shops.shops[shops.shops.length - 2]?.total_shops ?? 0
            }
            daily_last={
              shops.shops[shops.shops.length - 2]?.total_shops -
                shops.shops[shops.shops.length - 3].total_shops ?? 0
            }
            last_date={
              shops.shops[shops.shops.length - 1]?.date_pretty ??
              new Date().toDateString()
            }
            data_all={shops.shops.slice(1).map((item) => ({
              x: item.date_pretty,
              y: item.total_shops,
            }))}
            data_daily={getDaily(
              shops.shops.map((item) => ({
                x: item.date_pretty,
                y: item.total_shops,
              }))
            )}
            all_color='#98df8a'
            daily_color='#2ca02c'
          />
        )}
        {shops.accounts.length > 0 && (
          <DataContainer
            user={user}
            data={tree}
            // isFullScreen={isFullScreen}
            // setFullScreen={setIsFullScreen}
            title={t('dataTable.sellers_amount')}
            all={shops.accounts[shops.accounts.length - 1]?.total_accounts ?? 0}
            all_last={
              shops.accounts[shops.accounts.length - 2]?.total_accounts ?? 0
            }
            isCount={true}
            daily={
              shops.accounts[shops.accounts.length - 1]?.total_accounts -
                shops.accounts[shops.accounts.length - 2]?.total_accounts ?? 0
            }
            daily_last={
              shops.accounts[shops.accounts.length - 2]?.total_accounts -
                shops.accounts[shops.accounts.length - 3].total_accounts ?? 0
            }
            last_date={
              shops.accounts[shops.accounts.length - 1]?.date_pretty ??
              new Date().toDateString()
            }
            data_all={
              shops.accounts.length > 0
                ? shops.accounts.slice(1).map((item) => ({
                    x: item.date_pretty,
                    y: item.total_accounts,
                  }))
                : []
            }
            data_daily={
              getDaily(
                shops.accounts.map((item) => ({
                  x: item.date_pretty,
                  y: item.total_accounts,
                }))
              ) ?? []
            }
            all_color='#ff9896'
            daily_color='#d62728'
          />
        )}
      </div>
      <div className='flex w-full flex-col items-start justify-start  gap-10 xl:flex-row'>
        {products.length > 0 && (
          <DataContainer
            user={user}
            data={tree}
            isFullScreen={isFullScreen}
            setFullScreen={setIsFullScreen}
            title={t('dataTable.products_amount')}
            all={products[products.length - 1]?.total_products ?? 0}
            all_last={products[products.length - 2]?.total_products ?? 0}
            isCount={true}
            daily={
              products[products.length - 1]?.total_products -
                products[products.length - 2]?.total_products ?? 0
            }
            daily_last={
              products[products.length - 2]?.total_products -
                products[products.length - 3].total_products ?? 0
            }
            last_date={
              products[products.length - 1]?.date_pretty ??
              new Date().toDateString()
            }
            data_all={products.slice(1).map((item) => ({
              x: item.date_pretty,
              y: item.total_products,
            }))}
            data_daily={getDaily(
              products.map((item) => ({
                x: item.date_pretty,
                y: item.total_products,
              }))
            )}
            all_color='#c5b0d5'
            daily_color='#9467bd'
          />
        )}
        {reviews.length > 0 && (
          <DataContainer
            user={user}
            data={tree}
            isFullScreen={isFullScreen}
            setFullScreen={setIsFullScreen}
            title={t('dataTable.reviews_amount')}
            all={reviews[reviews.length - 1]?.total_reviews ?? 0}
            all_last={reviews[reviews.length - 2]?.total_reviews ?? 0}
            isCount={true}
            daily={
              reviews[reviews.length - 1]?.total_reviews -
                reviews[reviews.length - 2]?.total_reviews ?? 0
            }
            daily_last={
              reviews[reviews.length - 2]?.total_reviews -
                reviews[reviews.length - 3].total_reviews ?? 0
            }
            last_date={
              reviews[reviews.length - 1]?.date_pretty ??
              new Date().toDateString()
            }
            data_all={reviews.slice(1).map((item) => ({
              x: item.date_pretty,
              y: item.total_reviews,
            }))}
            data_daily={getDaily(
              reviews.map((item) => ({
                x: item.date_pretty,
                y: item.total_reviews,
              }))
            )}
            all_color='#57C5B6'
            daily_color='#159895'
          />
        )}
      </div>
    </div>
  );
}

function getDaily(
  data: {
    x: string;
    y: number;
  }[]
) {
  if (data.length === 0) return [];

  let prev = data[0].y;
  const res = [];
  for (let i = 1; i < data.length; i++) {
    const item = data[i];

    res.push({
      x: item.x,
      y: item.y - prev,
    });
    prev = item.y;
  }

  return res;
}

export default HomeStatisticsContainer;

export interface DropDownProps {
  className?: string;
  values: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export function DropDown({
  className,
  values,
  activeTab,
  setActiveTab,
}: DropDownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <div className={clsxm('flex items-center justify-end', className)}>
      <div className='relative z-10'>
        <button
          id='dropdownDefaultButton'
          data-dropdown-toggle='dropdown'
          className='bg-primary flex w-[140px] items-center justify-between rounded-md px-3 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-0'
          type='button'
          aria-haspopup='true'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {values[activeTab]}
          <HiChevronDown className='h-4 w-4 flex-shrink-0' />
        </button>

        <div
          id='dropdown'
          className={clsxm(
            'absolute right-0 top-8 z-10 max-h-[500px] w-44 divide-y divide-gray-100 overflow-y-scroll rounded-lg bg-slate-700 shadow',
            isDropdownOpen ? 'block' : 'hidden'
          )}
        >
          <ul
            className='py-2 text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownDefaultButton'
          >
            {values.map((day, index) => (
              <li key={index}>
                <button
                  className={clsxm(
                    'flex w-full justify-between px-4 py-2 text-left text-sm leading-5',
                    activeTab === index
                      ? 'text-primary'
                      : 'text-slate-500 hover:bg-slate-300',
                    index === 0 && 'rounded-t-lg',
                    index === values.length - 1 && 'rounded-b-lg'
                  )}
                  onClick={() => {
                    setActiveTab(index);
                    setIsDropdownOpen(false);
                  }}
                >
                  {day}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
