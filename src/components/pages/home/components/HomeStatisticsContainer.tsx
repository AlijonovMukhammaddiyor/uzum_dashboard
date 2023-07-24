import { AxiosResponse } from 'axios';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi2';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Loading from '@/components/Loading';
import DataContainer from '@/components/pages/home/components/DataContainer';

export interface HomeStatisticsContainerProps {
  className?: string;
}

function HomeStatisticsContainer({ className }: HomeStatisticsContainerProps) {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [revenue, setRevenue] = React.useState<any[]>([]);
  const [reviews, setReviews] = React.useState<any[]>([]);
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

  React.useEffect(() => {
    const api = new API(null);
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
          res.data.slice(0, res.data.length - 1).map((item: any) => {
            if (item.date_pretty !== '2023-07-05') return item;
            return {
              ...item,
              total_revenue: 411_523_262.5,
            };
          })
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

  return (
    <div
      className={clsxm(
        'relative flex h-full w-full min-w-[1600px] flex-col gap-10',
        className
      )}
    >
      {loading && <Loading />}
      <div className='flex w-full items-start justify-start gap-10'>
        {orders.length > 0 && (
          <DataContainer
            title='Buyurtmalar soni'
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
            title='Daromad miqdori'
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
      <div className='flex w-full items-start justify-start gap-10'>
        {shops.shops.length > 0 && (
          <DataContainer
            title="Do'konlar soni"
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
            title='Sotuvchilar soni'
            all={shops.accounts[shops.accounts.length - 1]?.total_accounts ?? 0}
            all_last={
              shops.accounts[shops.accounts.length - 2]?.total_accounts ?? 0
            }
            isCount={true}
            daily={
              shops.accounts[shops.accounts.length - 1]?.total_accounts - 0
            }
            daily_last={
              shops.accounts[shops.accounts.length - 2]?.total_accounts - 0
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
      <div className='flex w-full items-start justify-start gap-10'>
        {products.length > 0 && (
          <DataContainer
            title='Buyurtmalar soni'
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
            title='Izohlar soni'
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

function getLabels(
  orders: any[],
  products: any[],
  shops: {
    shops: any[];
    accounts: any[];
  }
) {
  const labels = new Set<string>();

  for (let i = 0; i < orders.length; i++) {
    const item = orders[i];
    labels.add(item.date_pretty);
  }

  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    labels.add(item.date_pretty);
  }

  for (let i = 0; i < shops.shops.length; i++) {
    const item = shops.shops[i];
    labels.add(item.date_pretty);
  }

  const res = Array.from(labels).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return res.slice(0, res.length - 1);
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

function prepareData(
  orders: any[],
  products: any[],
  shops: {
    shops: any[];
    accounts: any[];
  },
  revenue: any[]
) {
  const dataset = [];
  if (orders.length === 0) return [];

  const orders_data = [];
  const products_data = [];
  const shops_data = [];
  const accounts_data = [];
  const revenue_data = [];

  /// orders
  for (let i = 0; i < orders.length; i++) {
    const item = orders[i];
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      orders_data.push({
        x: item.date_pretty,
        y: item.total_orders,
      });
  }

  dataset.push({
    data: orders_data,
    fill: true,

    borderColor: 'rgba(70, 130, 180, 1)', // Steel Blue
    backgroundColor: 'rgba(70, 130, 180, 0.2)',
    pointBackgroundColor: 'rgba(70, 130, 180, 1)',
    label: 'Jami buyurtmalar soni',
    pointRadius: 3,
  });

  /// products
  for (let i = 0; i < products.length; i++) {
    const item = products[i];
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      products_data.push({
        x: item.date_pretty,
        y: item.total_products,
      });
  }

  for (let i = 0; i < revenue.length; i++) {
    const item = revenue[i];
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      revenue_data.push({
        x: item.date_pretty,
        y: Math.round(item.total_revenue * 1000),
      });
  }

  dataset.push({
    data: products_data,
    fill: true,
    // hidden: true,
    borderColor: 'rgba(60, 179, 113, 1)', // Medium Sea Green
    backgroundColor: 'rgba(60, 179, 113, 0.2)',
    pointBackgroundColor: 'rgba(60, 179, 113, 1)',
    label: 'Jami mahsulotlar soni',
    pointRadius: 3,
  });

  /// shops
  for (let i = 0; i < shops.shops.length; i++) {
    const item = shops.shops[i];
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      shops_data.push({
        x: item.date_pretty,
        y: item.total_shops,
      });
  }

  dataset.push({
    data: shops_data,
    fill: true,
    borderColor: 'rgba(255, 165, 0, 1)', // Orange
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    pointBackgroundColor: 'rgba(255, 165, 0, 1)',
    label: "Jami do'konlar soni",
    pointRadius: 3,
  });

  /// accounts
  for (let i = 0; i < shops.accounts.length; i++) {
    const item = shops.accounts[i];
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      accounts_data.push({
        x: item.date_pretty,
        y: item.total_accounts,
      });
  }

  dataset.push({
    data: accounts_data,
    fill: true,
    borderColor: 'rgba(243, 21, 89, 1)', // Orange
    backgroundColor: 'rgba(243, 21, 89, 0.2)',
    pointBackgroundColor: 'rgba(243, 21, 89, 1)',
    label: 'Jami sotuvchilar soni',
    pointRadius: 3,
  });
  // rgb(26, 93, 26);
  dataset.push({
    data: revenue_data,
    fill: true,
    borderColor: 'rgb(26, 93, 26)', // Orange
    backgroundColor: 'rgba(26, 93, 26, 0.2)',
    pointBackgroundColor: 'rgb(26, 93, 26)',
    label: 'Jami daromad',
    pointRadius: 3,
  });
  return dataset;
}

function prepareDailyData(
  orders: any[],
  products: any[],
  shops: {
    shops: any[];
    accounts: any[];
  },
  revenue: any[]
) {
  if (orders.length === 0 || products.length === 0) return [];

  const dataset = [];

  const orders_data = [];
  const shops_data = [];
  const products_data = [];
  const accounts_data = [];
  const revenue_data = [];

  let prev = orders[0].total_orders;
  let prev_shops = shops.shops[0].total_shops;
  let prev_products = products[0].total_products;
  let prev_accounts = shops.accounts[0].total_accounts;
  let prev_revenue = revenue[0].total_revenue;

  for (let i = 1; i < orders.length; i++) {
    const item = orders[i];
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      orders_data.push({
        x: item.date_pretty,
        y: item.total_orders - prev,
      });
    prev = item.total_orders;
  }

  for (let i = 1; i < revenue.length; i++) {
    const item = revenue[i];
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      revenue_data.push({
        x: item.date_pretty,
        y: Math.round((item.total_revenue - prev_revenue) * 1000),
      });
    prev_revenue = item.total_revenue;
  }

  for (let i = 1; i < products.length; i++) {
    const item = products[i];
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      products_data.push({
        x: item.date_pretty,
        y: item.total_products - prev_products,
      });
    prev_products = item.total_products;
  }

  for (let i = 1; i < shops.shops.length; i++) {
    const item = shops.shops[i];
    const item2 = shops.accounts[i];
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      shops_data.push({
        x: item.date_pretty,
        y: item.total_shops - prev_shops,
      });

    prev_shops = item.total_shops;
    if (item.date_pretty !== '2023-07-23' && item.date_pretty !== '2023-07-24')
      accounts_data.push({
        x: item2.date_pretty,
        y: item2.total_accounts - prev_accounts,
      });

    prev_accounts = item2.total_accounts;
  }

  dataset.push({
    data: orders_data,
    fill: true,
    borderColor: 'rgba(70, 130, 180, 1)', // Steel Blue
    backgroundColor: 'rgba(70, 130, 180, 0.2)',
    pointBackgroundColor: 'rgba(70, 130, 180, 1)',
    label: 'Kunlik buyurtmalar',
    pointRadius: 3,
  });

  dataset.push({
    data: accounts_data,
    fill: true,
    borderColor: 'rgba(243, 21, 89, 1)', // Orange
    backgroundColor: 'rgba(243, 21, 89, 0.2)',
    pointBackgroundColor: 'rgba(243, 21, 89, 1)',
    label: 'Kunlik yangi sotuvchilar soni',
    pointRadius: 3,
  });

  dataset.push({
    data: products_data,
    fill: true,
    borderColor: 'rgba(60, 179, 113, 1)', // Medium Sea Green
    backgroundColor: 'rgba(60, 179, 113, 0.2)',
    pointBackgroundColor: 'rgba(60, 179, 113, 1)',
    label: 'Kunlik yangi mahsulotlar',
    pointRadius: 3,
  });

  dataset.push({
    data: shops_data,
    fill: true,
    borderColor: 'rgba(255, 165, 0, 1)', // Orange
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    pointBackgroundColor: 'rgba(255, 165, 0, 1)',
    label: "Kunlik yangi do'konlar",
    pointRadius: 3,
  });

  dataset.push({
    data: revenue_data,
    fill: true,
    borderColor: 'rgb(26, 93, 26)',
    backgroundColor: 'rgba(26, 93, 26, 0.2)',
    pointBackgroundColor: 'rgb(26, 93, 26)',
    label: 'Kunlik daromad',
    pointRadius: 3,
  });

  return dataset;
}

export default HomeStatisticsContainer;

export interface DropDownProps {
  className?: string;
  values: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
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
