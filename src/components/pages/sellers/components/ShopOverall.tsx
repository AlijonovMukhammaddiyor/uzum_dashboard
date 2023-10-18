import { AxiosResponse } from 'axios';
import { ChartType } from 'chart.js';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import { getDayBefore } from '@/lib/helper';
import logger from '@/lib/logger';

import { getShopOverallColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import MixedChartSeller from '@/components/pages/sellers/components/MixedChartSeller';
import LineChart from '@/components/shared/LineChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  sellerId: number;
  isActive?: boolean;
}

interface SellerType {
  average_order_price: number;
  average_purchase_price: number;
  date_pretty: string;
  num_categories: number;
  position: number;
  rating: number;
  total_orders: number;
  total_products: number;
  total_reviews: number;
  total_revenue: number;
  daily_revenue: number;
  daily_orders: number;
}

function ShopOverall({ className, sellerId, isActive }: Props) {
  const { t, i18n } = useTranslation('sellers');
  const { t: t2 } = useTranslation('tableColumns');
  const [data, setData] = React.useState<SellerType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<string>(t('revenue'));

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<SellerType[]>>(
        `/shop/analytics/` + sellerId + '?range=60'
      )
      .then((res) => {
        setData(
          res.data?.map((item) => ({
            ...item,
            date_pretty: getDayBefore(item.date_pretty),
          })) || []
        );

        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in shop overall');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsxm('flex min-w-[1200px] flex-col gap-6 pb-12', className)}
    >
      <div className='flex items-center  justify-between gap-5'>
        <div className='flex gap-0'>
          {[t2('revenue'), t2('orders'), t('products')].map((tab_) => (
            <button
              className={clsxm(
                'border border-gray-300 px-4 py-1 transition-colors',
                tab === tab_ ? 'bg-primary text-white' : 'bg-white'
              )}
              key={tab_}
              onClick={() => setTab(tab_)}
            >
              {tab_}
            </button>
          ))}
        </div>

        {/* Date range options on the top-right */}
        {/* <p className='text-sm text-blue-500'>{t('select_graph_type')}</p> */}
      </div>
      <Container
        className='bg-whit flex h-[480px] w-full flex-col items-end justify-end rounded-md border-none px-5 py-2 pt-5 shadow-none'
        loading={loading}
        // title="Sotuvchining kunlik daromadi, buyurtmalari, izohlari, va mahsulotlari soni, hamda o'rtacha mahsulot narxi"
        titleContainerStyle={{
          marginBottom: '10px',
        }}
      >
        <>
          {isActive && (
            <MixedChartSeller
              data={prepareDataset(data, tab, i18n.language) as any}
              labels={data.map((item) => item.date_pretty)}
              style={{
                height: '440px',
                maxHeight: '440px',
                minHeight: '440px',
                width: '100%',
                maxWidth: '100%',
              }}
            />
          )}
        </>
      </Container>
      {null && (
        <Container
          className='mt-4 flex h-[350px] w-full flex-col rounded-md bg-white p-5'
          loading={loading}
        >
          <div className='flex w-full items-center justify-center'>
            <p className='text-primary'>{t('seller_position_by_revenue')}</p>
          </div>
          <>
            {isActive && (
              <LineChart
                data={data.map((item) => {
                  return {
                    y: item.position,
                    x: item.date_pretty,
                    label: t('position'),
                  };
                })}
                style={{
                  height: '300px',
                  maxHeight: '300px',
                  minHeight: '300px',
                  width: '100%',
                }}
                isStep
                xAxisTitle={t('date')}
                yAxisTitle={t('position')}
              />
            )}
          </>
        </Container>
      )}
      <Container
        className=' flex h-[1000px] w-full flex-col gap-6 rounded-md border-none shadow-none'
        loading={loading}
      >
        <Table
          columnDefs={getShopOverallColumnDefs(t2)}
          rowData={getData(data)}
          className='h-[1200px] min-w-full'
          isBalham={true}
          rowHeight={80}
          headerHeight={60}
        />
      </Container>
    </div>
  );
}

export default ShopOverall;

function getData(data: SellerType[]) {
  const temp = [...data];

  return temp.sort((b, a) => {
    return (
      new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
    );
  });
}

function prepareDataset(data: SellerType[], type = 'Daromad', lang = 'uz') {
  if (!data) return [];

  const data_ = data.sort((a, b) => {
    return (
      new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
    );
  });
  switch (type) {
    case 'Daromad':
    case 'Tushum':
    case 'Выручка':
      return _prepareRevenue(data_, lang);
    case 'Buyurtmalar':
    case 'Продаж':
      return _prepareOrders(data_, lang);
    case 'Mahsulotlar':
    case 'Продукты':
      return _prepareProducts(data_, lang);
    case 'O`rtacha sotuv narxi':
    case 'Средняя цена продажи':
      return _preparePrice(data_, lang);

    default:
      return _prepareReviews(data_, lang);
  }
}

/**
 * Return all orders and daily orders
 * @param orders
 */
function _prepareOrders(orders: SellerType[], lang: string) {
  const dailyOrders: {
    y: number;
    x: string;
  }[] = [];

  orders.slice(1).forEach((item) => {
    dailyOrders.push({
      y: item.daily_orders,
      x: item.date_pretty,
    });
  });

  return [
    {
      data: dailyOrders,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: '#F3AA60',
      backgroundColor: '#F3AA60',
      label:
        lang === 'uz' ? 'Kunlik buyurtmalar' : 'Ежедневное количество продаж',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#F3AA60',
    },
  ];
}

function _prepareRevenue(revenue: SellerType[], lang: string) {
  const dailyRevenue: {
    y: number;
    x: string;
  }[] = [];

  revenue.slice(1).forEach((item) => {
    dailyRevenue.push({
      y: item.daily_revenue,
      x: item.date_pretty,
    });
  });

  return [
    {
      data: dailyRevenue,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: '#75C2F6',
      backgroundColor: '#75C2F6',
      label: lang === 'uz' ? 'Kunlik daromad' : 'Ежедневная выручка',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#75C2F6',
    },
  ];
}

function _prepareProducts(products: SellerType[], lang: string) {
  const allProducts: {
    y: number;
    x: string;
  }[] = [];
  const dailyProducts: {
    y: number;
    x: string;
  }[] = [];

  let prevProducts = products[0]?.total_products || 0;

  products.slice(1).forEach((item) => {
    allProducts.push({
      y: item.total_products,
      x: item.date_pretty,
    });
    dailyProducts.push({
      y: item.total_products - prevProducts,
      x: item.date_pretty,
    });
    prevProducts = item.total_products;
  });

  return [
    {
      type: 'line' as ChartType,
      data: allProducts,
      fill: false,
      borderColor: '#1A5D1A',
      backgroundColor: '#1A5D1A',
      label: lang === 'uz' ? 'Jami mahsulotlar' : 'Общее количество продуктов',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#1A5D1A',
    },
    {
      data: dailyProducts,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: 'rgb(62, 199, 11)',
      backgroundColor: 'rgba(62, 199, 11, 0.25)',
      label:
        lang === 'uz'
          ? "Kunlik mahsulotlar soni o'zgarishi"
          : 'Ежедневное Кол-во продуктов',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: 'rgb(62, 199, 11)',
    },
  ];
}

function _prepareReviews(reviews: SellerType[], lang: string) {
  const allReviews: {
    y: number;
    x: string;
  }[] = [];
  const dailyReviews: {
    y: number;
    x: string;
  }[] = [];

  let prevReviews = reviews[0]?.total_reviews || 0;

  reviews.slice(1).forEach((item) => {
    allReviews.push({
      y: item.total_reviews,
      x: item.date_pretty,
    });
    dailyReviews.push({
      y: item.total_reviews - prevReviews,
      x: item.date_pretty,
    });
    prevReviews = item.total_reviews;
  });

  return [
    {
      data: allReviews,
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#2192FF',
      backgroundColor: '#2192FF',
      label: lang === 'uz' ? 'Jami izohlar' : 'Общее количество отзывов',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#2192FF',
    },
    {
      data: dailyReviews,
      type: 'bar' as ChartType,
      fill: true,
      borderColor: '#21E1E1',
      backgroundColor: '#21E1E1',
      label:
        lang === 'uz'
          ? 'Kunlik yangi izohlar soni'
          : 'Ежедневное количество новых отзывов',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#21E1E1',
    },
  ];
}

function _preparePrice(price: SellerType[], lang: string) {
  const allPrice: {
    y: number;
    x: string;
  }[] = [];

  price.slice(1).forEach((item) => {
    allPrice.push({
      y: item.average_purchase_price,
      x: item.date_pretty,
    });
  });

  return [
    {
      data: allPrice,
      type: 'line' as ChartType,
      fill: true,
      borderColor: '#9467bd',
      backgroundColor: 'rgba(148, 103, 189, 0.25)',
      label:
        lang === 'uz'
          ? "Do'kondagi barcha mahsulotlar o'rtacha narxi"
          : 'Средняя цена всех продуктов в магазине',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#9467bd',
    },
  ];
}
