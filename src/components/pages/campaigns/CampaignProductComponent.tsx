import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import CampaignAreaChart from '@/components/pages/campaigns/CampaignAreaChart';

interface CampaignProductComponentProps {
  product_id: string;
}

interface ProductAnalyticsType {
  available_amount: number;
  average_purchase_price: number;
  date_pretty: string;
  orders_amount: number;
  orders_money: number;
  position: number;
  position_in_category: number;
  position_in_shop: number;
  rating: number;
  reviews_amount: number;
}

function CampaignProductComponent({
  product_id,
}: CampaignProductComponentProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<ProductAnalyticsType[]>(
    [] as ProductAnalyticsType[]
  );
  const [dates, setDates] = React.useState<{
    first_date: string;
    last_date: string;
  }>({ first_date: '', last_date: '' });
  const { t, i18n } = useTranslation('common');

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          data: ProductAnalyticsType[];
          first_date: string;
          last_date: string;
        }>
      >('/banner/impact/' + product_id + '/')
      .then((res) => {
        // check if it is created less than 2 days ago
        logger(res, 'CampaignProductComponent');
        setProducts(res.data.data);
        setDates({
          first_date: res.data.first_date,
          last_date: res.data.last_date,
        });

        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting competitors');
        setLoading(false);
      });
  }, [product_id]);

  return (
    <div className='mt-10 h-full w-full'>
      <p className='w-full pb-10 text-center text-sm'>
        {i18n.language === 'uz'
          ? "Quyida reklamaning masulot sotuviga ko'rsatgan ta'sirini ko'rishingiz mumkin. Reklamaning boshlanish va tugash sanalari vertikal chiziqlar bilan ko'rsatilgan."
          : 'Ниже вы можете увидеть влияние рекламы на продажи товара. Даты начала и окончания рекламы показаны вертикальными линиями.'}
      </p>
      <Container
        className='flex min-h-[500px] w-full flex-col items-start justify-start gap-5 rounded-md bg-white p-4'
        loading={loading}
      >
        {dates.first_date ? (
          dates.last_date ? (
            <CampaignAreaChart
              data={prepareAllOrdersDataset(products, i18n.language) || []}
              // title={t('daily_info')}
              style={{ width: '100%', height: '100%', maxHeight: '460px' }}
              className='h-[460px] max-h-[460px] w-full'
              labels={products.map((item) => new Date(item.date_pretty))}
              first_date={new Date(dates.first_date)}
              last_date={new Date(dates.last_date)}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Container>
      <Container
        className='mt-6 flex min-h-[500px] w-full flex-col items-start justify-start gap-5 rounded-md bg-white p-4'
        loading={loading}
      >
        {dates.first_date ? (
          dates.last_date ? (
            <CampaignAreaChart
              data={
                prepareDailyOrdersDataset(
                  products.sort(
                    (a, b) =>
                      new Date(a.date_pretty).getTime() -
                      new Date(b.date_pretty).getTime()
                  ),
                  i18n.language
                ) || []
              }
              // title={t('daily_info')}
              style={{ width: '100%', height: '100%', maxHeight: '460px' }}
              className='h-[460px] max-h-[460px] w-full'
              labels={products.map((item) => new Date(item.date_pretty))}
              first_date={new Date(dates.first_date)}
              last_date={new Date(dates.last_date)}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Container>
      <Container
        className='mt-6 flex min-h-[500px] w-full flex-col items-start justify-start gap-5 rounded-md bg-white p-4'
        loading={loading}
      >
        {dates.first_date ? (
          dates.last_date ? (
            <CampaignAreaChart
              data={
                preparePriceDataset(
                  products.sort(
                    (a, b) =>
                      new Date(a.date_pretty).getTime() -
                      new Date(b.date_pretty).getTime()
                  )
                ) || []
              }
              // title={t('daily_info')}
              style={{ width: '100%', height: '100%', maxHeight: '460px' }}
              className='h-[460px] max-h-[460px] w-full'
              labels={products.map((item) => new Date(item.date_pretty))}
              first_date={new Date(dates.first_date)}
              last_date={new Date(dates.last_date)}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Container>
    </div>
  );
}

function preparePriceDataset(data: ProductAnalyticsType[]) {
  if (!data) return [];

  const dataset = [];
  dataset.push({
    data: data.map((item) => {
      return {
        x: new Date(item.date_pretty),
        y: item.average_purchase_price,
        label: "O'rtacha sotuv narxi",
      };
    }),
    fill: true,
    borderColor: 'rgba(255, 165, 0, 1)',
    backgroundColor: 'rgba(255, 165, 0, 0.2)',
    label: "O'rtacha sotuv narxi",
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 165, 0, 1)',
  });

  return dataset;
}

function prepareDailyOrdersDataset(data: ProductAnalyticsType[], lang: string) {
  if (!data) return [];

  const dataset = [];
  let prev = data[0].orders_amount;
  let prev_rev = data[0].reviews_amount;
  let prev_revenue = data[0].orders_money;

  const analytics = data;

  const orders = [];
  const reviews = [];
  const revenue = [];
  const prices = [];
  for (let i = 0; i < analytics.length; i++) {
    const item = analytics[i];
    orders.push({
      x: new Date(item.date_pretty),
      y: item.orders_amount - prev,
      // label: 'Kunlik buyurtmalar soni',
    });
    prev = item.orders_amount;
    reviews.push({
      x: new Date(item.date_pretty),
      y: item.reviews_amount - prev_rev,
      label: lang === 'uz' ? 'Kunlik izohlar soni' : 'Кол-во отзывов',
    });
    prev_rev = item.reviews_amount;
    prices.push({
      x: new Date(item.date_pretty),
      y: item.average_purchase_price,
      label: lang === 'uz' ? "O'rtacha sotuv narxi" : 'Средняя цена продажи',
    });

    if (item.date_pretty !== '2023-07-23')
      revenue.push({
        x: new Date(item.date_pretty),
        y: (item.orders_money - prev_revenue) * 1000,
        label: lang === 'uz' ? 'Kunlik tushum' : 'Доход за день',
      });
    prev_revenue = item.orders_money;
  }

  dataset.push({
    data: orders,
    fill: true,
    borderColor: 'rgba(100, 149, 237, 1)',
    backgroundColor: 'rgba(100, 149, 237, 0.2)',
    label:
      lang === 'uz' ? 'Kunlik yangi buyurtmalar soni' : 'Кол-во новых заказов',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(100, 149, 237, 1)',
  });

  dataset.push({
    data: reviews,
    fill: true,
    hidden: false,
    borderColor: 'rgba(255, 99, 132, 1)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    label: lang === 'uz' ? 'Kunlik yangi izohlar soni' : 'Кол-во новых отзывов',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
  });

  // dataset.push({
  //   data: prices,
  //   fill: true,
  //   borderColor: 'rgba(255, 165, 0, 1)',
  //   backgroundColor: 'rgba(255, 165, 0, 0.2)',
  //   label: "O'rtacha sotuv narxi",
  //   pointRadius: 3,
  //   pointBackgroundColor: 'rgba(255, 165, 0, 1)',
  // });

  dataset.push({
    data: revenue,
    type: 'bar' as const,
    fill: true,
    hidden: true,
    borderColor: 'rgba(255, 159, 64, 1)',
    backgroundColor: 'rgba(255, 159, 64, .4)',
    label: lang === 'uz' ? 'Kunlik tushum' : 'Доход за день',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 159, 64, 1)',
  });

  return dataset;
}

function prepareAllOrdersDataset(data: ProductAnalyticsType[], lang: string) {
  if (!data) return [];

  const dataset = [];

  const analytics = data.sort((a, b) => {
    return (
      new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
    );
  });
  const orders = [];
  const revenue = [];

  const reviews = [];
  const available = [];
  for (let i = 0; i < analytics.length; i++) {
    const item = analytics[i];
    orders.push({
      x: new Date(item.date_pretty),
      y: item.orders_amount,
    });
    reviews.push({
      x: new Date(item.date_pretty),
      y: item.reviews_amount,
    });

    available.push({
      x: new Date(item.date_pretty),
      y: item.available_amount,
    });

    if (item.date_pretty !== '2023-07-23')
      revenue.push({
        x: new Date(item.date_pretty),
        y: item.orders_money * 1000,
      });
  }

  dataset.push({
    data: orders,
    fill: true,
    borderColor: 'rgba(100, 149, 237, 1)',
    backgroundColor: 'rgba(100, 149, 237, 0.2)',
    label: lang === 'uz' ? 'Jami buyurtmalar soni' : 'Кол-во заказов',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(100, 149, 237, 1)',
  });

  dataset.push({
    data: reviews,
    fill: true,
    hidden: false,
    borderColor: 'rgba(255, 99, 132, 1)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    label: lang === 'uz' ? 'Jami izohlar soni' : 'Кол-во отзывов',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
  });

  dataset.push({
    data: available,
    fill: true,
    borderColor: 'rgba(0, 128, 0, 1)',
    backgroundColor: 'rgba(0, 128, 0, 0.2)',
    label: lang === 'uz' ? 'Jami mavjud miqdori' : 'Кол-во доступных',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(0, 128, 0, 1)',
  });

  dataset.push({
    data: revenue,
    fill: true,
    hidden: true,
    type: 'bar' as const,
    borderColor: 'rgba(255, 159, 64, 1)',
    backgroundColor: 'rgba(255, 159, 64, 0.2)',
    label: lang === 'uz' ? 'Jami tushum' : 'Доход',
    pointRadius: 3,
    pointBackgroundColor: 'rgba(255, 159, 64, 1)',
  });

  return dataset;
}

export default CampaignProductComponent;
