import { AxiosResponse } from 'axios';
import { ChartType } from 'chart.js';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
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
        setData(res.data.slice(0));
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
      {' '}
      <div className='flex items-center justify-end gap-5'>
        <p className='text-xl font-bold'>
          {i18n.language === 'uz'
            ? "Qaysi ma'lumotlar ko'rsatilsin? - "
            : 'Какие данные показывать? - '}
        </p>
        <Select
          // components={{ DropdownIndicator }}
          className='basic-single w-[300px] cursor-pointer rounded-md focus:outline-none focus:ring-0'
          classNamePrefix='select'
          defaultValue={{ value: t('revenue'), label: t('revenue') }}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={false}
          styles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              svg: {
                fill: 'rgba(97, 75, 195, 1)',
              },
            }),
            control: (provided) => ({
              ...provided,
              borderColor: 'rgba(97, 75, 195, 1)',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'rgba(97, 75, 195, 1)', // This changes the text color of the selected value
            }),
            option: (provided) => ({
              ...provided,
              color: 'black', // This changes the text color of the options
            }),
          }}
          onChange={(e) => {
            setTab(e?.value ?? t('revenue'));
          }}
          name='color'
          options={[
            { value: t('revenue'), label: t('revenue') },
            { value: t('orders'), label: t('orders') },
            { value: t('products'), label: t('products') },
            {
              value: t('avarage_selling_price'),
              label: t('avarage_selling_price'),
            },
            { value: t('reviews'), label: t('reviews') },
          ]}
        />
        {/* <p className='text-sm text-blue-500'>{t('select_graph_type')}</p> */}
      </div>
      <Container
        className='flex h-[480px] w-full flex-col items-end justify-end rounded-md bg-white px-5 py-2 pt-5'
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
              labels={data.slice(1).map((item) => item.date_pretty)}
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
      <p className='mt-5 w-full text-center text-lg font-semibold'>
        {i18n.language === 'uz'
          ? "Ushbu jadvalda yuqoridagi grafikdagi ma'lumotlar batafsil ko'rsatilgan"
          : 'В этой таблице подробно показаны данные из графика выше'}
      </p>
      <Container
        className=' flex h-[1000px] w-full flex-col gap-6 rounded-md bg-white'
        loading={loading}
      >
        <Table
          columnDefs={getShopOverallColumnDefs(t2)}
          rowData={data}
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

function prepareDataset(data: SellerType[], type = 'Daromad', lang = 'uz') {
  switch (type) {
    case 'Daromad':
    case 'Выручка':
      return _prepareRevenue(data, lang);
    case 'Buyurtmalar':
    case 'Продаж':
      return _prepareOrders(data, lang);
    case 'Mahsulotlar':
    case 'Продукты':
      return _prepareProducts(data, lang);
    case 'O`rtacha sotuv narxi':
    case 'Средняя цена продажи':
      return _preparePrice(data, lang);

    default:
      return _prepareReviews(data, lang);
  }
}

/**
 * Return all orders and daily orders
 * @param orders
 */
function _prepareOrders(orders: SellerType[], lang: string) {
  const allOrders: {
    y: number;
    x: string;
  }[] = [];
  const dailyOrders: {
    y: number;
    x: string;
  }[] = [];

  let prevOrders = orders[0]?.total_orders || 0;

  orders.slice(1).forEach((item) => {
    allOrders.push({ y: item.total_orders, x: item.date_pretty });
    dailyOrders.push({
      y: item.total_orders - prevOrders,
      x: item.date_pretty,
    });
    prevOrders = item.total_orders;
  });

  return [
    {
      data: allOrders,
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#FF5733',
      backgroundColor: '#FF5733',
      label: lang === 'uz' ? 'Jami buyurtmalar' : 'Общее количество продаж',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#FF5733',
    },
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
  const allRevenue: {
    y: number;
    x: string;
  }[] = [];
  const dailyRevenue: {
    y: number;
    x: string;
  }[] = [];

  let prevRevenue = revenue[0]?.total_revenue || 0;

  revenue.slice(1).forEach((item) => {
    allRevenue.push({
      y: Math.round(item.total_revenue * 1000),
      x: item.date_pretty,
    });
    dailyRevenue.push({
      y: Math.round((item.total_revenue - prevRevenue) * 1000),
      x: item.date_pretty,
    });
    prevRevenue = item.total_revenue;
  });

  return [
    {
      data: allRevenue,
      type: 'line' as ChartType,
      fill: false,
      borderColor: '#0D1282',
      backgroundColor: '#0D1282',
      label: lang === 'uz' ? 'Jami daromad' : 'Общая выручка',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: '#0D1282',
    },
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
    allProducts.push({ y: item.total_products, x: item.date_pretty });
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
          : 'Ежедневное количество продуктов',
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
    allReviews.push({ y: item.total_reviews, x: item.date_pretty });
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
    allPrice.push({ y: item.average_purchase_price, x: item.date_pretty });
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
