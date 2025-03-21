import { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import AreaChart from '@/components/shared/AreaChart';
import SingleAxisAreaChart from '@/components/shared/SingleAxisAreaChart';

interface AboutProductProps {
  product_id: string;
  className?: string;
  isActive?: boolean;
}

interface ProductAnalyticsType {
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
    orders_money: number;
    average_purchase_price: number;
  }[];
  skus: {
    vat_rate: number;
    charity_profit: number;
    vat_amount: number;
    vat_price: number;
    payment_per_month: number;
    sku: number;
    recent_analytics: {
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
}

function SkuTest({ product_id, className, isActive }: AboutProductProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<ProductAnalyticsType | null>(
    null
  );
  const [iscreatedAfter, setIscreatedAfter] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation('products');

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
  }, [product_id]);

  return (
    <div
      className={clsxm(
        'flex h-full w-full min-w-[1200px] flex-col items-start justify-start gap-5 overflow-x-scroll pb-5',
        className
      )}
    >
      {product ? (
        product.recent_analytics.length > 1 ? (
          <Container
            className='flex w-full flex-col items-start justify-start gap-5 rounded-md bg-white p-4'
            loading={loading}
          >
            {/* {product && product.recent_analytics && ( */}
            {isActive ? (
              <AreaChart
                data={
                  prepareAllOrdersDataset(
                    product,
                    iscreatedAfter,
                    i18n.language
                  ) || []
                }
                title={t('product_totals_title')}
                labels={getLabels(product, iscreatedAfter) || []}
                style={{ width: '100%', height: '100%', maxHeight: '460px' }}
                className='h-[460px] max-h-[460px] w-full'
              />
            ) : (
              <></>
            )}

            {isActive ? (
              <AreaChart
                labels={
                  product?.recent_analytics
                    .map((item) => item.date_pretty)
                    .sort(
                      (a, b) => new Date(a).getTime() - new Date(b).getTime()
                    ) ?? []
                }
                data={
                  prepareDailyOrdersDataset(
                    product,
                    iscreatedAfter,
                    i18n.language
                  ) || []
                }
                title={t('daily_info')}
                style={{ width: '100%', height: '100%', maxHeight: '460px' }}
                className='h-[460px] max-h-[460px] w-full'
              />
            ) : (
              <></>
            )}
            {isActive ? (
              <SingleAxisAreaChart
                data={prepareSkusDecreaseDataset(product) || []}
                title={t('daily_info')}
                style={{ width: '100%', height: '100%', maxHeight: '460px' }}
                className='h-[460px] max-h-[460px] w-full'
              />
            ) : (
              <></>
            )}
            {isActive ? (
              <SingleAxisAreaChart
                data={prepareSkusAvailabilityDataset(product) || []}
                title={t('daily_info')}
                style={{ width: '100%', height: '100%', maxHeight: '460px' }}
                className='h-[460px] max-h-[460px] w-full'
              />
            ) : (
              <></>
            )}
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
    </div>
  );
}

function getLabels(data: ProductAnalyticsType | null, iscreatedAfter: boolean) {
  if (!data) return [];
  const labels =
    data?.recent_analytics
      .map((item) => item.date_pretty)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime()) ?? [];

  if (iscreatedAfter) {
    // add day before as label
    labels.push(
      new Date(new Date(data.created_at).getTime() - 86400000)
        .toISOString()
        .split('T')[0]
    );
  }

  return labels.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

function prepareDailyOrdersDataset(
  data: ProductAnalyticsType | null,
  iscreatedAfter = false,
  lang = 'uz'
) {
  if (!data) return [];

  const dataset = [];
  let prev = 0;
  if (data.recent_analytics.length > 0)
    prev = data.recent_analytics[0].orders_amount;
  let prev_rev = 0;
  if (data.recent_analytics.length > 0)
    prev_rev = data.recent_analytics[0].reviews_amount;

  let prev_revenue = 0;
  if (data.recent_analytics.length > 0)
    prev_revenue = data.recent_analytics[0].orders_money;

  let analytics = data.recent_analytics.slice();

  if (iscreatedAfter) {
    prev = 0;
    prev_rev = 0;
    analytics = data.recent_analytics;
  }

  const orders = [];
  const reviews = [];
  const revenue = [];
  const prices = [];
  for (let i = 0; i < analytics.length; i++) {
    const item = analytics[i];
    orders.push({
      x: item.date_pretty,
      y: item.orders_amount - prev,
      label: lang === 'uz' ? 'Kunlik buyurtmalar' : 'Ежедневные заказы',
    });
    prev = item.orders_amount;
    reviews.push({
      x: item.date_pretty,
      y: item.reviews_amount - prev_rev,
      label: lang === 'uz' ? 'Kunlik izohlar' : 'Ежедневные отзывы',
    });
    prev_rev = item.reviews_amount;
    prices.push({
      x: item.date_pretty,
      y: item.average_purchase_price,
      label: lang === 'uz' ? "O'rtacha sotuv narxi" : 'Средняя цена продажи',
    });

    if (item.date_pretty !== '2023-07-23')
      revenue.push({
        x: item.date_pretty,
        y: (item.orders_money - prev_revenue) * 1000,
        label: lang === 'uz' ? 'Kunlik daromad' : 'Ежедневный доход',
      });
    prev_revenue = item.orders_money;
  }

  dataset.push({
    data: orders,
    fill: true,
    borderColor: 'rgba(100, 149, 237, 1)',
    backgroundColor: 'rgba(100, 149, 237, 0.2)',
    label: lang === 'uz' ? 'Kunlik buyurtmalar' : 'Ежедневные заказы',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(100, 149, 237, 1)',
  });

  dataset.push({
    data: reviews,
    fill: true,
    hidden: false,
    borderColor: 'rgba(220, 20, 60, 1)',
    backgroundColor: 'rgba(220, 20, 60, 0.2)',
    label: lang === 'uz' ? 'Kunlik izohlar' : 'Ежедневные отзывы',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(220, 20, 60, 1)',
  });

  dataset.push({
    data: prices,
    fill: true,
    borderColor: 'rgba(255, 165, 0, 1)',
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    label: lang === 'uz' ? "O'rtacha sotuv narxi" : 'Средняя цена продажи',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 165, 0, 1)',
  });

  dataset.push({
    data: revenue,
    type: 'line' as const,
    fill: true,
    // hidden: true,
    borderColor: 'rgb(101, 40, 247)',
    backgroundColor: 'rgba(101, 40, 247, 0.2)',
    label: lang === 'uz' ? 'Kunlik daromad' : 'Ежедневный доход',
    pointRadius: 3,
    pointBackgroundColor: 'rgb(101, 40, 247)',
  });

  return dataset;
}

function prepareAllOrdersDataset(
  data: ProductAnalyticsType | null,
  iscreatedAfter: boolean,
  lang = 'uz'
) {
  if (!data) return [];

  const dataset = [];

  const analytics = data.recent_analytics;
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
  // const prices = [];
  for (let i = 0; i < analytics.length; i++) {
    const item = analytics[i];
    orders.push({
      x: item.date_pretty,
      y: item.orders_amount,
    });
    reviews.push({
      x: item.date_pretty,
      y: item.reviews_amount,
    });

    available.push({
      x: item.date_pretty,
      y: item.available_amount,
    });

    if (item.date_pretty !== '2023-07-23')
      revenue.push({
        x: item.date_pretty,
        y: item.orders_money * 1000,
      });

    // prices.push({
    //   x: item.date_pretty,
    //   y: item.average_purchase_price,
    // });
  }

  dataset.push({
    data: orders,
    fill: true,
    borderColor: 'rgba(100, 149, 237, 1)',
    backgroundColor: 'rgba(100, 149, 237, 0.2)',
    label: lang === 'uz' ? 'Jami buyurtmalar' : 'Всего заказов',
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
    label: lang === 'uz' ? 'Jami daromad' : 'Всего доход',
    pointRadius: 3,
    pointBackgroundColor: 'rgb(101, 40, 247)',
  });

  // dataset.push({
  //   data: prices,
  //   fill: true,
  //   borderColor: 'rgba(255, 165, 0, 1)',
  //   backgroundColor: 'rgba(255, 165, 0, 0.2)',
  //   label: 'O`rtacha sotuv narxi',
  //   pointRadius: 3,
  //   pointBackgroundColor: 'rgba(255, 165, 0, 1)',
  // });

  return dataset;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function prepareSkusAvailabilityDataset(
  data: ProductAnalyticsType,
  lang = 'uz'
) {
  const datasets = [];

  for (let i = 0; i < data.skus.length; i++) {
    const skuData = data.skus[i];
    const color = getRandomColor();
    const skuDataset: {
      data: {
        x: Date;
        y: number;
      }[];
      fill: boolean;
      borderColor: string;
      backgroundColor?: string;
      label: string;
      pointRadius: number;
      pointBackgroundColor: string;
    } = {
      data: [],
      fill: true,
      borderColor: color,
      backgroundColor: 'transparent',
      label: `${lang === 'uz' ? 'SKU' : 'SKU'}: ${skuData.sku}`,
      pointRadius: 3,
      pointBackgroundColor: color,
    };

    for (let j = 0; j < skuData.recent_analytics.length; j++) {
      const analyticItem = skuData.recent_analytics[j];
      skuDataset.data.push({
        x: new Date(analyticItem.date_pretty),
        y: analyticItem.available_amount,
      });
    }

    datasets.push(skuDataset);
  }

  return datasets;
}

function prepareSkusDecreaseDataset(data: ProductAnalyticsType, lang = 'uz') {
  const datasets = [];
  const lastAvailableAmounts: { [sku: number]: number } = {}; // Store the last available amount for each SKU
  const totalDecreases: { [date: string]: number } = {}; // Store total decrease for each date

  for (let i = 0; i < data.skus.length; i++) {
    const skuData = data.skus[i];
    const sku = skuData.sku;

    for (let j = 0; j < skuData.recent_analytics.length; j++) {
      const analyticItem = skuData.recent_analytics[j];
      const date = analyticItem.date_pretty;
      const currentAvailable = analyticItem.available_amount;

      // Calculate decrease
      if (lastAvailableAmounts[sku] !== undefined) {
        const decrease = lastAvailableAmounts[sku] - currentAvailable;
        totalDecreases[date] = (totalDecreases[date] || 0) + decrease;
      }

      // Update the last available amount for this SKU
      lastAvailableAmounts[sku] = currentAvailable;
    }
  }

  // Convert the totalDecreases object into the dataset format
  const totalDecreaseData = Object.entries(totalDecreases).map(
    ([date, decrease]) => ({
      x: new Date(date),
      y: decrease,
    })
  );

  datasets.push({
    data: totalDecreaseData,
    fill: false,
    borderColor: '#FF0000', // Red color for decrease
    backgroundColor: '#FF0000',
    label: lang === 'uz' ? 'Jami kamayish' : 'Общее снижение',
    pointRadius: 3,
    pointBackgroundColor: '#FF0000',
  });

  return datasets;
}
function preparePriceDataset(data: ProductAnalyticsType) {
  const dataset = [];

  for (let i = 0; i < data.skus.length; i++) {
    for (let j = 0; j < data.skus[i].recent_analytics.length; j++) {
      const item = data.skus[i].recent_analytics[j];
      dataset.push({
        x: item.date_pretty,
        y: item.purchase_price,
        label: data.skus[i].sku.toString(),
      });
    }
  }

  return dataset;
}

export default SkuTest;
