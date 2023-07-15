import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import AreaChart from '@/components/shared/AreaChart';
import LineChart from '@/components/shared/LineChart';

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

function ProductAnalytics({
  product_id,
  className,
  isActive,
}: AboutProductProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [product, setProduct] = React.useState<ProductAnalyticsType | null>(
    null
  );
  const [iscreatedAfter, setIscreatedAfter] = React.useState<boolean>(false);

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
        'flex h-full w-full min-w-[1200px] flex-col items-start justify-start gap-5 overflow-x-scroll',
        className
      )}
    >
      <Container
        className='flex w-full flex-col items-start justify-start gap-5 rounded-md bg-white p-4'
        loading={loading}
      >
        {/* {product && product.recent_analytics && ( */}
        {isActive && (
          <AreaChart
            data={prepareAllOrdersDataset(product, iscreatedAfter) || []}
            title="Mahsulotning barcha sotuv va mavjud miqdorlarining quyidagi davr
            davomida o'zgarishi"
            labels={getLabels(product, iscreatedAfter) || []}
            style={{ width: '100%', height: '100%', maxHeight: '460px' }}
            className='h-[460px] max-h-[460px] w-full'
          />
        )}
        {/* )} */}

        {/* {product && product.recent_analytics && ( */}
        {isActive && (
          <AreaChart
            labels={
              product?.recent_analytics
                .map((item) => item.date_pretty)
                .sort(
                  (a, b) => new Date(a).getTime() - new Date(b).getTime()
                ) ?? []
            }
            data={prepareDailyOrdersDataset(product, iscreatedAfter) || []}
            title="Kunlik ma'lumotlar"
            style={{ width: '100%', height: '100%', maxHeight: '460px' }}
            className='h-[460px] max-h-[460px] w-full'
          />
        )}

        <div className='mt-8 flex w-full items-center justify-start'>
          <p className='w-full text-center text-sm'>
            * Mahsulotning Uzumdagi barcha mahsulotlar orasida poziytsiyasi
            (buyurtmalar soniga ko`ra)
          </p>
          <p></p>
        </div>
        {product && product.recent_analytics && isActive && (
          <LineChart
            data={
              product.recent_analytics.map((item) => ({
                x: item.date_pretty,
                y: item.position,
                label: 'Pozitsiya',
              })) || []
            }
            isStep
            // yAxisTitle='Kunlik buyurtmalar soni'
            xAxisTitle=''
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '300px',
              minHeight: '300px',
            }}
          />
        )}
        <div className='mt-8 flex w-full items-center justify-start'>
          <p className='w-full text-center text-sm'>
            * Mahsulotning o'zining kategoriyasidagi poziytsiyasi (buyurtmalar
            soniga ko`ra)
          </p>
          <p></p>
        </div>
        {product && isActive && (
          <LineChart
            data={
              product.recent_analytics.map((item) => ({
                x: item.date_pretty,
                y: item.position_in_category,
                label: 'Pozitsiya',
              })) || []
            }
            isStep
            // yAxisTitle='Kunlik buyurtmalar soni'
            xAxisTitle=''
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '300px',
              minHeight: '300px',
            }}
          />
        )}
        <div className='mt-8 flex w-full items-center justify-start'>
          <p className='w-full text-center text-sm'>
            * do'kondagi mahsulotlar orasidagi poziytsiyasi (buyurtmalar soniga
            ko`ra)
          </p>
          <p></p>
        </div>
        {product && isActive && (
          <LineChart
            data={
              product.recent_analytics.map((item) => ({
                x: item.date_pretty,
                y: item.position_in_shop,
                label: 'Pozitsiya',
              })) || []
            }
            isStep
            yAxisTitle='Kunlik buyurtmalar soni'
            xAxisTitle=''
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '300px',
              minHeight: '300px',
            }}
          />
        )}
      </Container>
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

function fillLabels(labels: string[]) {
  const start_date = new Date(labels[0]);
  const end_date = new Date(labels[labels.length - 1]);

  // from start date to end date, check if there is a label for each day
  const current_date = new Date(start_date);
  while (current_date <= end_date) {
    const date_str = current_date.toISOString().split('T')[0];
    if (!labels.includes(date_str)) {
      labels.push(date_str);
    }
    current_date.setDate(current_date.getDate() + 1);
  }

  return labels.sort();
}

function prepareDailyOrdersDataset(
  data: ProductAnalyticsType | null,
  iscreatedAfter = false
) {
  if (!data) return [];

  const dataset = [];
  let prev = data.recent_analytics[0].orders_amount;
  let prev_rev = data.recent_analytics[0].reviews_amount;

  let analytics = data.recent_analytics.slice(1);

  if (iscreatedAfter) {
    prev = 0;
    prev_rev = 0;
    analytics = data.recent_analytics;
  }

  const orders = [];
  const reviews = [];
  const prices = [];
  for (let i = 0; i < analytics.length; i++) {
    const item = analytics[i];
    orders.push({
      x: item.date_pretty,
      y: item.orders_amount - prev,
      label: 'Kunlik buyurtmalar soni',
    });
    prev = item.orders_amount;
    reviews.push({
      x: item.date_pretty,
      y: item.reviews_amount - prev_rev,
      label: 'Kunlik izohlar soni',
    });
    prev_rev = item.reviews_amount;
    prices.push({
      x: item.date_pretty,
      y: item.average_purchase_price,
      label: data.skus.length > 1 ? "O'rtacha sotuv narxi" : 'Sotuv narxi',
    });
  }

  dataset.push({
    data: orders,
    fill: true,
    borderColor: 'rgba(100, 149, 237, 1)',
    backgroundColor: 'rgba(100, 149, 237, 0.2)',
    label: 'Kunlik buyurtmalar soni',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(100, 149, 237, 1)',
  });

  dataset.push({
    data: reviews,
    fill: true,
    hidden: true,
    borderColor: 'rgba(220, 20, 60, 1)',
    backgroundColor: 'rgba(220, 20, 60, 0.2)',
    label: 'Kunlik izohlar soni',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(220, 20, 60, 1)',
  });

  dataset.push({
    data: prices,
    fill: true,
    borderColor: 'rgba(255, 165, 0, 1)',
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    label: data.skus.length > 1 ? "O'rtacha sotuv narxi" : 'Sotuv narxi',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 165, 0, 1)',
  });

  return dataset;
}

function prepareAllOrdersDataset(
  data: ProductAnalyticsType | null,
  iscreatedAfter: boolean
) {
  if (!data) return [];

  const dataset = [];

  const analytics = data.recent_analytics;
  const orders = [];
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
    label: 'Jami buyurtmalar soni',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(100, 149, 237, 1)',
  });

  dataset.push({
    data: reviews,
    fill: true,
    hidden: true,
    borderColor: 'rgba(220, 20, 60, 1)',
    backgroundColor: 'rgba(220, 20, 60, 0.2)',
    label: 'Jami izohlar soni',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(220, 20, 60, 1)',
  });

  dataset.push({
    data: available,
    fill: true,
    borderColor: 'rgba(0, 128, 0, 1)',
    backgroundColor: 'rgba(0, 128, 0, 0.2)',
    label: 'Jami mavjud soni',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(0, 128, 0, 1)',
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

function prepareSkusDataset(data: ProductAnalyticsType) {
  const dataset = [];

  for (let i = 0; i < data.skus.length; i++) {
    for (let j = 0; j < data.skus[i].recent_analytics.length; j++) {
      const item = data.skus[i].recent_analytics[j];
      dataset.push({
        x: item.date_pretty,
        y: item.available_amount,
        label: data.skus[i].sku.toString(),
      });
    }
  }

  return dataset;
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

export default ProductAnalytics;
