import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFileExcel } from 'react-icons/fa';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getCategoryTrendstableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { RenderAlert } from '@/components/shared/AlertComponent';
import AreaChart from '@/components/shared/AreaChart';
import Button from '@/components/shared/buttons/Button';
import Table from '@/components/shared/Table';

import { useContextState } from '@/context/Context';

interface Props {
  className?: string;
  categoryId: string;
  isActive?: boolean;
}

export interface CategoryAnalyticsDataType {
  average_product_rating: number;
  average_purchase_price: number;
  date_pretty: string;
  total_orders: number;
  total_orders_amount: number;
  total_products: number;
  total_products_with_sales: number;
  total_reviews: number;
  total_shops: number;
  total_shops_with_sales: number;
  category_title: string;
  category_title_ru: string;
  daily_revenue: number;
  daily_orders: number;
}

function CategoryTrends({ className, categoryId, isActive }: Props) {
  const { t, i18n } = useTranslation('tableColumns');
  const { t: t2 } = useTranslation('categories');

  const [data, setData] = React.useState<CategoryAnalyticsDataType[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<string>(t2('revenue'));
  const [activeDateRange, setActiveDateRange] = React.useState<number>(3);
  const { state } = useContextState();

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          data: CategoryAnalyticsDataType[];
          labels: string[];
          total: number;
        }>
      >(`/category/analytics/` + categoryId + '?range=60')
      .then((res) => {
        setData(res.data.data.slice(0));
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in category trends');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (!isActive) return <></>;

  return (
    <div
      className={clsxm(
        'flex min-w-[1200px] flex-col gap-6 overflow-scroll',
        className
      )}
    >
      <Container
        className='flex h-[500px] w-full flex-col gap-6 rounded-md border-none bg-white pt-5 shadow-none'
        loading={loading}
      >
        <div className='mb-4 flex items-center justify-between'>
          {/* Tabs on the top-left */}
          <div className='flex gap-0'>
            {[t2('revenue'), t2('orders'), t2('products'), t2('shops')].map(
              (tab_) => (
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
              )
            )}
          </div>

          {/* Date range options on the top-right */}
          <div className='flex gap-0'>
            {[
              i18n.language === 'ru' ? '3 дня' : '3 kun',
              i18n.language === 'ru' ? '7 дней' : '7 kun',
              i18n.language === 'ru' ? '30 дней' : '30 kun',
              i18n.language === 'ru' ? '60 дней' : '60 kun',
              i18n.language === 'ru' ? '90 дней' : '90 kun',
              i18n.language === 'ru' ? '120 дней' : '120 kun',
            ].map((dateRange) => (
              <button
                key={dateRange}
                className={clsxm(
                  'border border-gray-300 px-4 py-1 transition-colors',
                  getDateRangeString(activeDateRange, i18n) === dateRange
                    ? 'bg-primary text-white'
                    : 'bg-white'
                )}
                onClick={() => {
                  const days = getActiveDateRangeHandler(dateRange);
                  if (
                    days >= 7 &&
                    (state.user?.tariff === 'free' ||
                      state.user?.tariff === 'trial')
                  ) {
                    RenderAlert({
                      alertTitle:
                        i18n.language === 'uz'
                          ? "Foydalanish uchun boshqa tarifga o'ting"
                          : 'Для использования перейдите на другой тариф',
                      alertSubtitle: '',
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                      buttonLink: '/profile',
                    });
                    return;
                  }
                  if (days > 60 && state.user?.tariff === 'base') {
                    RenderAlert({
                      alertTitle:
                        i18n.language === 'uz'
                          ? "Foydalanish uchun Sotuvchi tarifiga o'ting"
                          : 'Для использования перейдите на Продавец тариф',
                      alertSubtitle: '',
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                      buttonLink: '/profile',
                    });
                    return;
                  }
                  if (days > 90 && state.user?.tariff === 'base') {
                    RenderAlert({
                      alertTitle:
                        i18n.language === 'uz'
                          ? "Foydalanish uchun Biznes tarifiga o'ting"
                          : 'Для использования перейдите на Бизнес тариф',
                      alertSubtitle: '',
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                      buttonLink: '/profile',
                    });
                    return;
                  }
                  setActiveDateRange(getActiveDateRangeHandler(dateRange));
                }}
              >
                {dateRange}
              </button>
            ))}
          </div>
        </div>
        {isActive ? (
          <AreaChart
            data={getData(data, tab, t2, i18n.language, activeDateRange)}
            labels={data
              .map((item) => item.date_pretty)
              .slice(data.length - activeDateRange, data.length)}
            style={{
              width: '100%',
              height: '300px',
              minHeight: '300px',
            }}
            tension={0}
            className='h-380px max-h-[380px] w-full'
            withCheckbox={tab === t2('products') || tab === t2('shops')}
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-lg font-semibold'>
              {i18n.language === 'uz'
                ? "Ma'lumotlar Yuklanmoqda..."
                : 'Идет загрузка данных...'}
            </p>
          </div>
        )}
      </Container>
      <div className='flex w-full items-center justify-end'>
        <Button
          className='flex transform items-center justify-center space-x-2 rounded-md bg-green-500 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-green-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'
          onClick={() => {
            if (
              state.user?.tariff === 'free' ||
              state.user?.tariff === 'trial'
            ) {
              RenderAlert({
                alertTitle:
                  i18n.language === 'uz'
                    ? "Excel faylga yuklab olish uchun boshqa tarifga o'ting"
                    : 'Для загрузки в Excel перейдите на другой тариф',
                alertSubtitle: '',
                buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                buttonLink: '/profile',
              });
              return;
            }
            // exportToExcel();
          }}
          // isLoading={loading}
          spinnerColor='rgb(126 34 206)'
        >
          {/* {loading ? (
          <Spinner size='24px' />
        ) : ( */}
          <>
            <FaFileExcel className='h-5 w-5' />
            <p>{i18n.language === 'uz' ? 'Yuklab olish' : 'Скачать'}</p>
          </>
          {/* )} */}
        </Button>
      </div>
      <Table
        columnDefs={getCategoryTrendstableColumnDefs(t, i18n.language) as any}
        className=''
        rowHeight={80}
        headerHeight={40}
        rowData={
          data
            ? data
                .filter((a) => true)
                .sort(
                  (b, a) =>
                    new Date(a.date_pretty).getTime() -
                    new Date(b.date_pretty).getTime()
                )
                .slice(0, activeDateRange)
            : [] || []
        }
      />
    </div>
  );
}

export default CategoryTrends;

function getData(
  data: CategoryAnalyticsDataType[],
  tab: string,
  t: any,
  lang: string,
  range: number
): {
  data: { x: string; y: number }[];
  fill: boolean;
  borderColor: string;
  backgroundColor: string;
  pointRadius: number;
  pointBackgroundColor: string;
  label?: string;
}[] {
  // just [string, number][] where string is date_pretty and number is value for tab
  if (tab === t('revenue') || tab === t('orders')) {
    const res = data.map((item) => {
      if (tab === t('revenue'))
        return { x: item.date_pretty, y: item.daily_revenue };

      return { x: item.date_pretty, y: item.daily_orders };
    });

    return [
      {
        data: res.slice(res.length - range, res.length),
        fill: true,
        borderColor: 'rgb(33, 156, 144)',
        backgroundColor: 'rgba(33, 156, 144, 0.15)',
        // label: 'Kunlik daromad',
        pointRadius: 3,
        pointBackgroundColor: 'rgb(33, 156, 144)',
      },
    ];
  }

  console.log(tab);
  if (tab === t('products')) {
    const products: {
      x: string;
      y: number;
    }[] = [];
    const productsWithSales: {
      x: string;
      y: number;
    }[] = [];

    data.forEach((item) => {
      products.push({ y: item.total_products, x: item.date_pretty });
      productsWithSales.push({
        y: item.total_products_with_sales,
        x: item.date_pretty,
      });
    });

    return [
      {
        data: products.slice(products.length - range, products.length),
        fill: true,
        borderColor: 'rgb(33, 156, 144)',
        backgroundColor: 'rgba(33, 156, 144, 0.15)',
        label: lang === 'uz' ? 'Mahsulotlar' : 'Товары',
        pointRadius: 3,
        pointBackgroundColor: 'rgb(33, 156, 144)',
      },
      {
        data: productsWithSales.slice(
          productsWithSales.length - range,
          productsWithSales.length
        ),
        fill: true,
        borderColor: 'rgb(204, 153, 255)',
        backgroundColor: 'rgba(204, 153, 255, 0.15)',
        label: lang === 'uz' ? 'Mahsulotlar (sotuvda)' : 'Товары (в продаже)',
        pointRadius: 3,
        pointBackgroundColor: 'rgb(204, 153, 255)',
      },
    ];
  }

  const shops: {
    x: string;
    y: number;
  }[] = [];
  const shopsWithSales: {
    x: string;
    y: number;
  }[] = [];

  data.forEach((item) => {
    shops.push({ y: item.total_shops, x: item.date_pretty });
    shopsWithSales.push({
      y: item.total_shops_with_sales,
      x: item.date_pretty,
    });
  });

  return [
    {
      data: shops.slice(shops.length - range, shops.length),
      fill: true,
      borderColor: 'rgb(33, 156, 144)',
      backgroundColor: 'rgba(33, 156, 144, 0.15)',
      label: lang === 'uz' ? "Do'konlar" : 'Магазины',
      pointRadius: 3,
      pointBackgroundColor: 'rgb(33, 156, 144)',
    },
    {
      data: shopsWithSales.slice(shopsWithSales.length - range, shops.length),
      fill: true,
      borderColor: 'rgb(204, 153, 255)',
      backgroundColor: 'rgba(204, 153, 255, 0.15)',
      label: lang === 'uz' ? "Do'konlar (sotuvda)" : 'Магазины (в продаже)',
      pointRadius: 3,
      pointBackgroundColor: 'rgb(204, 153, 255)',
    },
  ];
}

export function getDateRangeString(range: number, i18n: any) {
  if (range === 3) return i18n.language === 'uz' ? '3 kun' : '3 дня';
  else if (range === 7) {
    return i18n.language === 'uz' ? '7 kun' : '7 дней';
  } else if (range === 30) {
    return i18n.language === 'uz' ? '30 kun' : '30 дней';
  } else if (range === 60) {
    return i18n.language === 'uz' ? '60 kun' : '60 дней';
  } else if (range === 90) {
    return i18n.language === 'uz' ? '90 kun' : '90 дней';
  } else if (range === 120) {
    return i18n.language === 'uz' ? '120 kun' : '120 дней';
  }
}

export function getActiveDateRangeHandler(range: string) {
  if (range === '3 kun' || range === '3 дня') {
    return 3;
  } else if (range === '7 kun' || range === '7 дней') {
    return 7;
  } else if (range === '30 kun' || range === '30 дней') {
    return 30;
  } else if (range === '60 kun' || range === '60 дней') {
    return 60;
  } else if (range === '90 kun' || range === '90 дней') {
    return 90;
  } else if (range === '120 kun' || range === '120 дней') {
    return 120;
  }
  return 3;
}
