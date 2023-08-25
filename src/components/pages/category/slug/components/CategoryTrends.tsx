import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getCategoryTrendstableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import AreaChart from '@/components/shared/AreaChart';
import Table from '@/components/shared/Table';

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
}

function CategoryTrends({ className, categoryId, isActive }: Props) {
  const { t, i18n } = useTranslation('tableColumns');
  const { t: t2 } = useTranslation('categories');

  const [data, setData] = React.useState<CategoryAnalyticsDataType[]>([]);
  const [labels, setLabels] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<string>(t2('revenue'));

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
        setLabels(res.data.labels.slice(0));
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
      <div className='flex items-center justify-end gap-5'>
        <p className='text-xl font-bold'>
          {i18n.language === 'uz'
            ? "Qaysi ma'lumotlar ko'rsatilsin? - "
            : 'Какие данные показывать? - '}
        </p>
        <Select
          className='basic-single w-[300px] cursor-pointer rounded-md'
          classNamePrefix='select'
          defaultValue={{
            value: t2('revenue'),
            label: t2('revenue'),
          }}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={false}
          onChange={(e) => {
            setTab(e?.value ?? t2('revenue'));
          }}
          styles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              svg: {
                fill: 'white',
              },
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: 'rgba(119, 67, 219, 1)',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'white', // This changes the text color of the selected value
            }),
            option: (provided) => ({
              ...provided,
              color: 'black', // This changes the text color of the options
            }),
          }}
          name='color'
          options={[
            { value: t2('revenue'), label: t2('revenue') },
            { value: t2('orders'), label: t2('orders') },
            { value: t2('products'), label: t2('products') },
            { value: t2('shops'), label: t2('shops') },
          ]}
        />
      </div>

      <Container
        className='flex h-[500px] w-full flex-col gap-6 rounded-md bg-white px-5 pt-5'
        loading={loading}
      >
        {isActive && (
          <AreaChart
            data={prepareDataset(data, tab, i18n.language) ?? []}
            labels={labels.slice(1)}
            style={{
              width: '100%',
              // height: '400px',
              // minHeight: '400px',
            }}
            className='h-450px max-h-[470px] w-full'
          />
        )}
      </Container>
      <p className='w-full text-center text-lg font-semibold'>
        {i18n.language === 'uz'
          ? "Ushbu jadvalda yuqoridagi grafikdagi ma'lumotlar batafsil ko'rsatilgan"
          : 'В этой таблице подробно показаны данные из графика выше'}
      </p>
      <Table
        columnDefs={getCategoryTrendstableColumnDefs(t, i18n.language) as any}
        className=''
        rowHeight={80}
        headerHeight={60}
        rowData={
          data
            ? data
                .filter((a) => true)
                .sort(
                  (b, a) =>
                    new Date(a.date_pretty).getTime() -
                    new Date(b.date_pretty).getTime()
                )
            : [] || []
        }
      />
    </div>
  );
}

export default CategoryTrends;

const prepareDataset = (
  data: CategoryAnalyticsDataType[],
  tab: string,
  lang: string
) => {
  const orders: {
    x: string;
    y: number;
  }[] = [];
  const allOrders: {
    x: string;
    y: number;
  }[] = [];
  const products: {
    x: string;
    y: number;
  }[] = [];
  const shops: {
    x: string;
    y: number;
  }[] = [];
  const reviews: {
    x: string;
    y: number;
  }[] = [];
  const shopsWithSales: {
    x: string;
    y: number;
  }[] = [];
  const productsWithSales: {
    x: string;
    y: number;
  }[] = [];

  const revenue: {
    x: string;
    y: number;
  }[] = [];

  const dailyRevenue: {
    x: string;
    y: number;
  }[] = [];

  let prevOrders = data[0]?.total_orders || 0;
  let prevReviews = data[0]?.total_reviews || 0;
  let prevRevenue = data[0]?.total_orders_amount || 0;

  data.slice(1).forEach((item) => {
    orders.push({
      y: item.total_orders - prevOrders,
      x: item.date_pretty,
    });
    products.push({ y: item.total_products, x: item.date_pretty });
    shops.push({ y: item.total_shops, x: item.date_pretty });
    reviews.push({ y: item.total_reviews - prevReviews, x: item.date_pretty });
    shopsWithSales.push({
      y: item.total_shops_with_sales,
      x: item.date_pretty,
    });
    productsWithSales.push({
      y: item.total_products_with_sales,
      x: item.date_pretty,
    });
    allOrders.push({ y: item.total_orders, x: item.date_pretty });

    prevOrders = item.total_orders;
    prevReviews = item.total_reviews;

    revenue.push({
      y: Math.round(item.total_orders_amount * 1000),
      x: item.date_pretty,
    });

    dailyRevenue.push({
      y: Math.round((item.total_orders_amount - prevRevenue) * 1000),
      x: item.date_pretty,
    });

    prevRevenue = item.total_orders_amount;
  });

  if (tab === 'Daromad' || tab === 'Выручка')
    return [
      {
        data: dailyRevenue,
        fill: true,
        borderColor: 'rgb(32,178,170)',
        backgroundColor: 'rgba(32,178,170,0.15)',
        label: lang === 'uz' ? 'Kunlik daromad' : 'Дневная выручка',
        hidden: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(32,178,170)',
      },
      {
        data: revenue,
        fill: true,
        borderColor: 'rgb(34,139,34)',
        backgroundColor: 'rgba(34,139,34,0.15)',
        label: lang === 'uz' ? 'Jami daromad' : 'Вся выручка',
        hidden: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(34,139,34)',
      },
    ];

  if (tab === 'Buyurtmalar' || tab === 'Продаж')
    return [
      {
        data: orders,
        fill: true,
        borderColor: 'rgb(219,112,147)',
        backgroundColor: 'rgba(219,112,147,0.15)',
        label: lang === 'uz' ? 'Kunlik buyurtmalar' : 'Ежедневные продажи',
        hidden: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(219,112,147)',
      },
      {
        data: allOrders,
        fill: true,
        borderColor: 'rgb(128,0,128)',
        backgroundColor: 'rgba(128,0,128,0.15)',
        label: lang === 'uz' ? 'Jami buyurtmalar' : 'Все продажи',
        hidden: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(128,0,128)',
      },
      {
        data: reviews,
        fill: true,
        borderColor: 'rgb(30,144,255)',
        backgroundColor: 'rgba(30,144,255,0.15)',
        label: lang === 'uz' ? 'Izohlar' : 'Комментарии',
        hidden: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(30,144,255)',
      },
    ];

  if (tab === 'Mahsulotlar' || tab === 'Товары')
    return [
      {
        data: products,
        fill: true,
        borderColor: '#ff7f0e',
        backgroundColor: 'rgba(255, 127, 14, 0.15)',
        label: tab,
        hidden: false,
        pointRadius: 3,
        pointBackgroundColor: '#ff7f0e',
      },
      {
        data: productsWithSales,
        fill: true,
        borderColor: 'rgb(204, 153, 255)',
        backgroundColor: 'rgba(204, 153, 255, 0.15)',
        label:
          lang === 'uz'
            ? "Kecha Sotuvi bo'lgan tovarlar"
            : 'Товары, проданные вчера',
        hidden: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(204, 153, 255)',
      },
    ];

  return [
    {
      data: shops,
      fill: true,
      borderColor: 'rgb(60,179,113)',
      backgroundColor: 'rgba(60,179,113,0.15)',
      label: tab,
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: 'rgb(60,179,113)',
    },

    {
      data: shopsWithSales,
      fill: true,
      borderColor: 'rgb(70,130,180)',
      backgroundColor: 'rgba(70,130,180,0.15)',
      label:
        lang === 'uz'
          ? "Kecha sotuv bo'lgan do'konlar"
          : 'Магазины с вечерней распродажей',
      hidden: false,
      pointRadius: 3,
      pointBackgroundColor: 'rgb(70,130,180)',
    },
  ];
};
