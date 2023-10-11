import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getCategoryShopsTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import DoughnutEcharts from '@/components/shared/DoughnutEcharts';
import HorizontalColumnChartHistogram from '@/components/shared/HorizontalBarchartHistogram';
import Table from '@/components/shared/Table';

import { useContextState } from '@/context/Context';

interface Props {
  className?: string;
  categoryId: string;
  activeTab: string;
}

interface CategoryShopsType {
  title: string;
  total_orders: number;
  total_products: number;
  total_reviews: number;
  total_revenue: number;
  avg_purchase_price: number;
  average_product_rating: number;
  position: number;
}

function CategoryShops({ className, categoryId, activeTab }: Props) {
  const { t, i18n } = useTranslation('categories');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);
  const { state } = useContextState();
  const [data, setData] = React.useState<CategoryShopsType[]>([]);
  const [activeDateRange, setActiveDateRange] = React.useState<number>(3);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const [tab, setTab] = React.useState(t('revenue'));

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.8); // 90% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);

    api
      .get<
        unknown,
        AxiosResponse<{
          data: CategoryShopsType[];
        }>
      >(`/category/analytics/shops/` + categoryId + '/')
      .then((res) => {
        const data = res.data.data.sort(
          (a, b) => b.total_revenue - a.total_revenue
        );
        // give position according to total orders
        data.forEach((item, index) => {
          item.position = index + 1;
        });
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in category shops');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (activeTab !== 'Sotuvchilar' && activeTab !== 'Продавцы') return <></>;

  return (
    <Container
      className={clsxm(
        'flex min-w-[1200px] flex-col gap-6 overflow-x-scroll rounded-none border-none shadow-none',
        className
      )}
      loading={loading}
    >
      <div className='flex w-full items-center justify-between'>
        <div className='flex gap-0'>
          {[t('revenue'), t('orders'), t('products')].map((tab_) => (
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
        {/* <div className='flex w-full items-center justify-end gap-0'>
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
                    buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
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
                    buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
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
                    buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
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
        </div> */}
      </div>

      <div
        className={clsxm(
          'flex w-full min-w-[1200px] flex-col items-start justify-start  overflow-y-hidden overflow-x-scroll rounded-md border-none bg-white',
          zoomLevel === 0.8 ? 'py-3' : 'py-6'
        )}
      >
        <div className='flex w-full items-center justify-between'>
          <h3 className='text-primary text-base'>{t('top_10_sellers')}</h3>
          <div className='flex items-center justify-start gap-6'>
            <p className='font-bold'>{t('total_sellers')}:</p>
            <p className='text-primary font-semibold'>{data.length}</p>
          </div>
        </div>
        <div
          className={clsxm(
            'flex min-h-[500px] w-full items-start justify-between',
            zoomLevel === 0.8 ? 'min-h-[560px]' : 'min-h-[580px]'
          )}
        >
          <DoughnutEcharts
            data={preparePieChartData(data, tab, t, i18n.language)}
            style={{
              width: '50%',
              height: '500px',
            }}
          />
          <div className='w-1/2'>
            <p className='text-center font-bold text-slate-600'>
              {i18n.language === 'uz'
                ? "Bu grafik do'konlar o'rtasida qanday taqsimlanganligini ko'rsatadi"
                : 'На этом графике показано, как общая сумма распределяется по магазинам.'}
            </p>
            {data.length > 0 && (
              <HorizontalColumnChartHistogram
                data={makeHistogramData(data, tab, t)}
                style={{
                  width: '100%',
                  height: '500px',
                }}
                withSlider={true}
              />
            )}
          </div>
        </div>
      </div>

      <Table
        isBalham={true}
        rowHeight={70}
        headerHeight={60}
        className='max-h-[800px] min-h-max'
        columnDefs={getCategoryShopsTableColumnDefs(t2, i18n.language) as any}
        rowData={data}
      />
    </Container>
  );
}

function preparePieChartData(
  data: CategoryShopsType[],
  tab: string,
  t: any,
  lang: string
) {
  const index =
    t('revenue') === tab
      ? 'total_revenue'
      : t('orders') === tab
      ? 'total_orders'
      : t('products') === tab
      ? 'total_products'
      : 'total_reviews';

  if (tab === t('products')) {
    return data
      .sort((a, b) => b.total_products - a.total_products)
      .slice(0, 20)
      .map((item) => {
        return {
          name: item.title.split('((')[0],
          value: item.total_products,
        };
      });
  }
  if (tab === t('revenue')) {
    const total_revenue = data.reduce((acc, item) => {
      return acc + item.total_revenue;
    }, 0);

    let current_revenue = 0;
    const pieChartData = data
      .sort((a, b) => b.total_revenue - a.total_revenue)
      .slice(0, 20)
      .map((item) => {
        current_revenue += item.total_revenue;
        return {
          name: item.title.split('((')[0],
          value:
            Math.round(Math.round(item.total_revenue * 1000) / 1000) * 1000,
        };
      });

    if (total_revenue > current_revenue) {
      pieChartData.push({
        name: lang === 'uz' ? 'Boshqa sotuvchilar' : 'Другие продавцы',
        value:
          Math.round(
            Math.round((total_revenue - current_revenue) * 1000) / 1000
          ) * 1000,
      });
    }
    return pieChartData;
  }

  if (tab === t('orders')) {
    const total_orders = data.reduce((acc, item) => {
      return acc + item.total_orders;
    }, 0);

    let current_orders = 0;
    const pieChartData = data
      .sort((a, b) => b.total_orders - a.total_orders)
      .slice(0, 20)
      .map((item) => {
        current_orders += item.total_orders;
        return {
          name: item.title.split('((')[0],
          value: item.total_orders,
        };
      });

    if (total_orders > current_orders) {
      pieChartData.push({
        name: lang === 'uz' ? 'Boshqa sotuvchilar' : 'Другие продавцы',
        value: total_orders - current_orders,
      });
    }
    return pieChartData;
  }

  return [];
}

function makeHistogramData(
  data: CategoryShopsType[],
  tab: string,
  t: any,
  interval = 10,
  lang = 'uz'
) {
  // make chart.js dataset for given tab
  const index =
    t('revenue') === tab
      ? 'total_revenue'
      : t('orders') === tab
      ? 'total_orders'
      : t('products') === tab
      ? 'total_products'
      : 'total_reviews';

  const arr = data.map((item) => {
    return {
      y:
        lang === 'uz'
          ? item.title.split('((')[0]
          : item.title.split('((')[1].split(')')[0],
      x: item[index],
    };
  });

  return [
    {
      label: t(tab),
      data: arr,
      backgroundColor: '#ff7f50',
    },
  ];
}

export default CategoryShops;
