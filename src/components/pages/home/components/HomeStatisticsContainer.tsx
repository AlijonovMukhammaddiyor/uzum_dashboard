import { AxiosResponse } from 'axios';
import React from 'react';
import { HiChevronDown } from 'react-icons/hi2';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import AreaChart from '@/components/shared/AreaChart';

export interface HomeStatisticsContainerProps {
  className?: string;
}

function HomeStatisticsContainer({ className }: HomeStatisticsContainerProps) {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [revenue, setRevenue] = React.useState<any[]>([]);
  const [shops, setShops] = React.useState<{
    shops: any[];
    accounts: any[];
  }>({ shops: [], accounts: [] });
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<any>>('/uzum/orders/')
      .then((res) => {
        // logger(res.data, 'Orders');
        setOrders(res.data);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in orders');
        setLoading(false);
      });
    api
      .get<unknown, AxiosResponse<any>>('/uzum/revenue/')
      .then((res) => {
        setRevenue(res.data);
      })
      .catch((err) => {
        logger(err, 'Error in revenue');
        setLoading(false);
      });
    setLoading(true);
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
    <div className='flex h-full w-full flex-col gap-5'>
      <Container
        className={clsxm(
          'h-max min-h-[580px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-4 py-3',
          className
        )}
        loading={loading}
        title="Uzumdagi jami buyurtmalar, mahsulotlar va do'konlar soni statistikasi"
        titleContainerStyle={{
          marginBottom: '10px',
        }}
        explanation="Bu analiz uchun qo'llanma mabjud emas"
      >
        <AreaChart
          labels={getLabels(orders, products, shops) ?? []}
          data={prepareData(orders, products, shops, revenue) ?? []}
          style={{
            width: '100%',
            height: '530px',
            // maxHeight: '500px',
          }}
          className='h-[500px] max-h-[500px] w-full'
        />
      </Container>
      <Container
        className={clsxm(
          'h-max min-h-[550px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-4 py-3',
          className
        )}
        loading={loading}
        title="Uzumdagi kunlik yangi buyurtmalar, mahsulotlar va do'konlar soni statistikasi"
        titleContainerStyle={{
          marginBottom: '10px',
        }}
        explanation="Bu analiz uchun qo'llanma mabjud emas"
      >
        <AreaChart
          labels={getLabels(orders, products, shops).slice(1) ?? []}
          data={prepareDailyData(orders, products, shops, revenue) ?? []}
          style={{
            width: '100%',
            height: '500px',
            // maxHeight: '500px',
          }}
          className='h-[500px] max-h-[500px] w-full'
        />
      </Container>
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
    if (item.date_pretty !== '2023-07-23')
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
    if (item.date_pretty !== '2023-07-23')
      products_data.push({
        x: item.date_pretty,
        y: item.total_products,
      });
  }

  for (let i = 0; i < revenue.length; i++) {
    const item = revenue[i];
    if (item.date_pretty !== '2023-07-23')
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
    if (item.date_pretty !== '2023-07-23')
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
    if (item.date_pretty !== '2023-07-23')
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
    if (item.date_pretty !== '2023-07-23')
      orders_data.push({
        x: item.date_pretty,
        y: item.total_orders - prev,
      });
    prev = item.total_orders;
  }

  for (let i = 1; i < revenue.length; i++) {
    const item = revenue[i];
    if (item.date_pretty !== '2023-07-23')
      revenue_data.push({
        x: item.date_pretty,
        y: Math.round((item.total_revenue - prev_revenue) * 1000),
      });
    prev_revenue = item.total_revenue;
  }

  for (let i = 1; i < products.length; i++) {
    const item = products[i];
    if (item.date_pretty !== '2023-07-23')
      products_data.push({
        x: item.date_pretty,
        y: item.total_products - prev_products,
      });
    prev_products = item.total_products;
  }

  for (let i = 1; i < shops.shops.length; i++) {
    const item = shops.shops[i];
    const item2 = shops.accounts[i];
    if (item.date_pretty !== '2023-07-23')
      shops_data.push({
        x: item.date_pretty,
        y: item.total_shops - prev_shops,
      });

    prev_shops = item.total_shops;
    if (item.date_pretty !== '2023-07-23')
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
