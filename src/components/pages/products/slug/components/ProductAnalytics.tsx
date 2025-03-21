import { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFileExcel } from 'react-icons/fa';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import { getDayBefore } from '@/lib/helper';
import logger from '@/lib/logger';

import { getProductAnalyticssColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import {
  getActiveDateRangeHandler,
  getDateRangeString,
} from '@/components/pages/category/slug/components/CategoryTrends';
import { RenderAlert } from '@/components/shared/AlertComponent';
import AreaChart from '@/components/shared/AreaChart';
import Button from '@/components/shared/buttons/Button';
import Table from '@/components/shared/Table';

import { useContextState } from '@/context/Context';

interface AboutProductProps {
  product_id: string;
  className?: string;
  isActive?: boolean;
  product: ProductAnalyticsType | null;
  setProduct: React.Dispatch<React.SetStateAction<ProductAnalyticsType | null>>;
}

export interface ProductAnalyticsType {
  adult: boolean;
  bonus_product: boolean;
  skus_count: number;

  recent_analytics: {
    date_pretty: string;
    position_in_category: number;
    available_amount: number;
    position_in_shop: number;
    position: number;
    orders_amount: number;
    rating: number;
    reviews_amount: number;
    daily_revenue: number;
    real_orders_amount: number;
    average_purchase_price: number;
  }[];
  skus: {
    vat_rate: number;
    charity_profit: number;
    vat_amount: number;
    vat_price: number;
    payment_per_month: number;
    sku: number;
    characteristics: string;
    recent_analytics: {
      orders_amount: number;
      orders_money: number;
      date_pretty: string;
      available_amount: number;
      created_at: string;
      purchase_price: number;
      full_price: number;
    }[];
  }[];
  description: string;
  product_id: number;
  title: string;
  created_at: string;
  characteristics: string;
}

function ProductAnalytics({
  product_id,
  className,
  isActive,
  product,
  setProduct,
}: AboutProductProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [iscreatedAfter, setIscreatedAfter] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation('tableColumns');
  const { state } = useContextState();
  const [activeDateRange, setActiveDateRange] = React.useState<number>(3);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<ProductAnalyticsType>>(
        '/product/analytics/' + product_id + '/'
      )
      .then((res) => {
        // check if it is created less than 2 days ago
        const created_at_gt =
          new Date(res.data.created_at).getTime() + 172800000 >
          new Date().getTime();
        setIscreatedAfter(created_at_gt);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting competitors');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id]);

  return (
    <Container
      className={clsxm(
        'flex h-full min-h-screen w-full min-w-[1200px] flex-col items-start justify-start gap-5 overflow-x-scroll border-none pb-5 shadow-none',
        className
      )}
      loading={loading}
    >
      {product ? (
        product.recent_analytics.length > 1 ? (
          <Container
            className='flex w-full flex-col items-start justify-start gap-5 rounded-md border-none p-4 shadow-none'
            loading={loading}
          >
            <div className='flex  w-full items-center justify-end gap-0 '>
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
            {/* {product && product.recent_analytics && ( */}
            {isActive ? (
              <AreaChart
                tension={0}
                data={
                  prepareAllOrdersDataset(
                    product,
                    iscreatedAfter,
                    i18n.language,
                    activeDateRange
                  ) || []
                }
                labels={
                  getLabels(product, iscreatedAfter, activeDateRange) || []
                }
                style={{ width: '100%', height: '100%', maxHeight: '460px' }}
                className='h-[460px] max-h-[460px] w-full'
              />
            ) : (
              <></>
            )}
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
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
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
              isBalham={true}
              rowHeight={70}
              headerHeight={60}
              rowData={product?.recent_analytics
                .sort(
                  (a, b) =>
                    new Date(a.date_pretty).getTime() -
                    new Date(b.date_pretty).getTime()
                )
                .reverse()
                .slice(0, activeDateRange)}
              columnDefs={getProductAnalyticssColDefs(t, i18n.language)}
              className='h-[1200px]'
              withCheckbox
            />
          </Container>
        ) : (
          <div className=''>
            <p>
              {i18n.language === 'uz'
                ? 'Yangi mahsulot: ushbu mahsulot atiga 1 kun oldin sotuvga chiqqan.'
                : 'Новый продукт: Этот продукт был выпущен всего 1 день назад.'}
            </p>
          </div>
        )
      ) : (
        <></>
      )}
    </Container>
  );
}

function getLabels(
  data: ProductAnalyticsType | null,
  iscreatedAfter: boolean,
  activeDateRange: number
) {
  if (!data) return [];
  const labels =
    data?.recent_analytics
      .map((item) => getDayBefore(item.date_pretty))
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) ?? [];

  if (iscreatedAfter) {
    // add day before as label
    labels.push(
      new Date(new Date(data.created_at).getTime() - 86400000)
        .toISOString()
        .split('T')[0]
    );
  }

  return labels
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .slice(Math.max(labels.length - activeDateRange, 0), labels.length);
}

// function prepareDailyOrdersDataset(
//   data: ProductAnalyticsType | null,
//   iscreatedAfter = false,
//   lang = 'uz'
// ) {
//   if (!data) return [];

//   const dataset = [];
//   let prev = 0;
//   if (data.recent_analytics.length > 0)
//     prev = data.recent_analytics[0].orders_amount;
//   let prev_rev = 0;
//   if (data.recent_analytics.length > 0)
//     prev_rev = data.recent_analytics[0].reviews_amount;

//   let prev_revenue = 0;
//   if (data.recent_analytics.length > 0)
//     prev_revenue = Math.round(data.recent_analytics[0].orders_money);

//   let analytics = data.recent_analytics.slice();

//   if (iscreatedAfter) {
//     prev = 0;
//     prev_rev = 0;
//     analytics = data.recent_analytics;
//   }

//   const orders = [];
//   const reviews = [];
//   const revenue = [];
//   const prices = [];
//   for (let i = 0; i < analytics.length; i++) {
//     const item = analytics[i];
//     orders.push({
//       x: item.date_pretty,
//       y: item.orders_amount - prev,
//       label: lang === 'uz' ? 'Kunlik buyurtmalar' : 'Ежедневные заказы',
//     });
//     prev = item.orders_amount;
//     reviews.push({
//       x: item.date_pretty,
//       y: item.reviews_amount - prev_rev,
//       label: lang === 'uz' ? 'Kunlik izohlar' : 'Ежедневные отзывы',
//     });
//     prev_rev = item.reviews_amount;
//     prices.push({
//       x: item.date_pretty,
//       y: Math.round(item.average_purchase_price / 1000) * 1000,
//       label: lang === 'uz' ? "O'rtacha sotuv narxi" : 'Средняя цена продажи',
//     });

//     if (item.date_pretty !== '2023-07-23')
//       revenue.push({
//         x: item.date_pretty,
//         y: Math.round(item.orders_money - prev_revenue) * 1000,
//         label: lang === 'uz' ? 'Kunlik tushum' : 'Ежедневный доход',
//       });
//     prev_revenue = item.orders_money;
//   }

//   dataset.push({
//     data: orders,
//     fill: true,
//     borderColor: 'rgba(100, 149, 237, 1)',
//     backgroundColor: 'rgba(100, 149, 237, 0.2)',
//     label: lang === 'uz' ? 'Kunlik buyurtmalar' : 'Ежедневные заказы',
//     pointRadius: 3,
//     pointBackgroundColor: 'rgba(100, 149, 237, 1)',
//   });

//   dataset.push({
//     data: reviews,
//     fill: true,
//     hidden: false,
//     borderColor: 'rgba(220, 20, 60, 1)',
//     backgroundColor: 'rgba(220, 20, 60, 0.2)',
//     label: lang === 'uz' ? 'Kunlik izohlar' : 'Ежедневные отзывы',
//     pointRadius: 3,
//     pointBackgroundColor: 'rgba(220, 20, 60, 1)',
//   });

//   dataset.push({
//     data: prices,
//     fill: true,
//     borderColor: 'rgba(255, 165, 0, 1)',
//     backgroundColor: 'rgba(255, 165, 0, 0.2)',
//     label: lang === 'uz' ? "O'rtacha sotuv narxi" : 'Средняя цена продажи',
//     pointRadius: 3,
//     pointBackgroundColor: 'rgba(255, 165, 0, 1)',
//   });

//   dataset.push({
//     data: revenue,
//     type: 'line' as const,
//     fill: true,
//     // hidden: true,
//     borderColor: 'rgb(101, 40, 247)',
//     backgroundColor: 'rgba(101, 40, 247, 0.2)',
//     label: lang === 'uz' ? 'Kunlik tushum' : 'Ежедневный доход',
//     pointRadius: 3,
//     pointBackgroundColor: 'rgb(101, 40, 247)',
//   });

//   return dataset;
// }

function prepareAllOrdersDataset(
  data: ProductAnalyticsType | null,
  iscreatedAfter: boolean,
  lang = 'uz',
  activeDateRange = 3
) {
  if (!data) return [];

  const dataset = [];

  let analytics = data.recent_analytics;
  analytics = analytics
    .sort(
      (b, a) =>
        new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
    )
    .slice(0, activeDateRange)
    .reverse();
  const orders = [];
  const revenue = [];
  if (iscreatedAfter) {
    orders.push({
      // for x, get day before in YYYY-MM-DD format
      x: new Date(new Date(data.created_at).getTime() - 86400000)
        .toISOString()
        .split('T')[0],
      y: 0,
    });
  }
  const reviews = [];
  const available = [];
  const orders2 = [];
  // const prices = [];
  for (let i = 0; i < analytics.length; i++) {
    const item = analytics[i];
    orders2.push({
      x: getDayBefore(item.date_pretty),
      y: item.orders_amount,
    });
    orders.push({
      x: getDayBefore(item.date_pretty),
      y: item.real_orders_amount,
    });
    reviews.push({
      x: getDayBefore(item.date_pretty),
      y: item.reviews_amount,
    });

    available.push({
      x: getDayBefore(item.date_pretty),
      y: item.available_amount,
    });

    if (item.date_pretty !== '2023-07-23')
      revenue.push({
        x: getDayBefore(item.date_pretty),
        y: item.daily_revenue,
      });
  }

  dataset.push({
    data: orders,
    fill: true,
    borderColor: 'rgba(100, 149, 237, 1)',
    backgroundColor: 'rgba(100, 149, 237, 0.2)',
    label: lang === 'uz' ? 'Kunlik Sotuv Soni' : 'Ежедневные продажи',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(100, 149, 237, 1)',
  });

  dataset.push({
    data: reviews,
    fill: true,
    hidden: false,
    borderColor: 'rgba(220, 20, 60, 1)',
    backgroundColor: 'rgba(220, 20, 60, 0.2)',
    label: lang === 'uz' ? 'Jami izohlar' : 'Всего отзывов',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(220, 20, 60, 1)',
  });

  dataset.push({
    data: available,
    fill: true,
    borderColor: 'rgba(0, 128, 0, 1)',
    backgroundColor: 'rgba(0, 128, 0, 0.2)',
    label: lang === 'uz' ? 'Jami mavjud miqdor' : 'Всего доступно',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(0, 128, 0, 1)',
  });

  dataset.push({
    data: revenue,
    fill: true,
    // hidden: true,
    type: 'line' as const,
    borderColor: 'rgba(101, 40, 247, 1)',
    backgroundColor: 'rgba(101, 40, 247, 0.2)',
    label: lang === 'uz' ? 'Kunlik Tushum' : 'Ежедневный доход',
    pointRadius: 3,
    pointBackgroundColor: 'rgb(101, 40, 247)',
  });

  dataset.push({
    data: orders2,
    fill: true,
    borderColor: 'rgba(255, 165, 0, 1)',
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    label: lang === 'uz' ? 'Tranzaksiyalar soni' : 'К-во транзакций',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 165, 0, 1)',
  });

  return dataset;
}

export default ProductAnalytics;
