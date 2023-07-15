import { AxiosResponse } from 'axios';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import SingleAxisAreaChart from '@/components/shared/SingleAxisAreaChart';

export interface HomeStatisticsContainerProps {
  className?: string;
}

interface Entry {
  x: string;
  y: number;
}

interface CategoriesReponseType {
  title: string;
  prices: Entry[];
  orders: Entry[];
  daily_orders: Entry[];
  products: Entry[];
  reviews: Entry[];
  daily_reviews: Entry[];
  shops: Entry[];
  shops_with_sales: Entry[];
  products_with_sales: Entry[];
}

function MainCategories({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<CategoriesReponseType[]>(
    []
  );

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<CategoriesReponseType[]>>('/category/main/')
      .then((res) => {
        logger(res.data, 'main categories');
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in growing product');
        setLoading(false);
      });
  }, []);

  const colors = [
    'rgba(31, 119, 180, 1)', // Blue
    'rgba(255, 127, 14, 1)', // Orange
    'rgba(44, 160, 44, 1)', // Green
    'rgba(214, 39, 40, 1)', // Red
    'rgba(148, 103, 189, 1)', // Violet
    'rgba(140, 86, 75, 1)', // Brown
    'rgba(227, 119, 194, 1)', // Pink
    'rgba(127, 127, 127, 1)', // Grey
    'rgba(188, 189, 34, 1)', // Olive
    'rgba(23, 190, 207, 1)', // Cyan
    'rgba(174, 199, 232, 1)', // Light Blue
    'rgba(255, 187, 120, 1)', // Light Orange
    'rgba(152, 223, 138, 1)', // Light Green
    'rgba(255, 152, 150, 1)', // Light Red
    'rgba(197, 176, 213, 1)', // Light Violet
    'rgba(196, 156, 148, 1)', // Light Brown
    'rgba(247, 182, 210, 1)', // Light Pink
    'rgba(199, 199, 199, 1)', // Light Grey
    'rgba(219, 219, 141, 1)', // Light Olive
  ];

  return (
    <div
      className={clsxm(
        'flex h-full w-full min-w-[1200px] flex-col gap-5 overflow-scroll',
        className
      )}
    >
      <h3 className='text-primary w-full text-center'>
        Eng katta asosiy kategoriyalarni taqqoslash
      </h3>
      <p className='text-center text-sm text-slate-500'>
        Agar siz juda batafsil tahlilni ko'rishni xohlasangiz, Kategoriya
        sahifasiga o'ting.
      </p>
      <Container
        className={clsxm(
          'flex h-max min-h-[550px] w-full flex-col items-start justify-start gap-5 overflow-x-scroll rounded-md px-2'
        )}
        // loading={loading}
      >
        <Container
          className={clsxm(
            'flex h-[530px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-2'
          )}
          loading={loading}
        >
          <SingleAxisAreaChart
            data={
              categories.map((item, i) => {
                return {
                  label: item.title,
                  data: item.orders,
                  fill: false,
                  borderColor: colors[i],
                  hidden: i % 2 === 0 || i % 3 === 0,
                };
              }) ?? []
            }
            // style={{
            //   width: '100%',
            //   height: '450px',
            // }}
            labels={getLabels(categories)}
            className='h-[500px] w-full'
            title='Jami buyurtmalar soni'
            tension={0}
          />
        </Container>
        <Container
          className={clsxm(
            'flex h-[530px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-2'
          )}
          loading={loading}
        >
          <SingleAxisAreaChart
            data={
              categories.map((item, i) => {
                return {
                  label: item.title,
                  data: item.daily_orders,
                  fill: false,
                  borderColor: colors[i],
                  hidden: i % 2 === 0 || i % 3 === 0,
                };
              }) ?? []
            }
            tension={0}
            style={{
              width: '100%',
              height: '450px',
            }}
            className='h-[500px] w-full'
            labels={getLabels(categories)}
            title='Kunlik yangi buyurtmalar soni'
          />
        </Container>
        <Container
          className={clsxm(
            'flex h-[530px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-2'
          )}
          loading={loading}
        >
          <SingleAxisAreaChart
            data={
              categories.map((item, i) => {
                return {
                  label: item.title,
                  data: item.prices,
                  fill: false,
                  borderColor: colors[i],
                  hidden: i % 2 === 0 || i % 3 === 0,
                };
              }) ?? []
            }
            tension={0}
            style={{
              width: '100%',
              height: '450px',
            }}
            className='h-[500px] w-full'
            title="Kategoriyaning o'rtacha narxlari"
            labels={getLabels(categories)}
          />
        </Container>
        <Container
          className={clsxm(
            'flex h-[530px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-2'
          )}
          loading={loading}
        >
          <SingleAxisAreaChart
            data={
              categories.map((item, i) => {
                return {
                  label: item.title,
                  data: item.products,
                  fill: false,
                  borderColor: colors[i],
                  hidden: i % 2 === 0 || i % 3 === 0,
                };
              }) ?? []
            }
            tension={0}
            style={{
              width: '100%',
              height: '450px',
            }}
            labels={getLabels(categories)}
            className='h-[500px] w-full'
            title='Jami mahsulotlar soni'
          />
        </Container>
        <Container
          className={clsxm(
            'flex h-[530px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-2'
          )}
          loading={loading}
        >
          <SingleAxisAreaChart
            data={categories.map((item, i) => {
              return {
                label: item.title,
                data: item.products_with_sales,
                fill: false,
                borderColor: colors[i],
                hidden: i % 2 === 0 || i % 3 === 0,
              };
            })}
            tension={0}
            style={{
              width: '100%',
              height: '450px',
            }}
            labels={getLabels(categories)}
            className='h-[500px] w-full'
            title='Kunlik sotuvi bo`lgan mahsulotlar soni'
          />
        </Container>
        <Container
          className={clsxm(
            'flex h-[530px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-2'
          )}
          loading={loading}
        >
          <SingleAxisAreaChart
            data={categories.map((item, i) => {
              return {
                label: item.title,
                data: item.daily_reviews,
                fill: false,
                borderColor: colors[i],
                hidden: i % 2 === 0 || i % 3 === 0,
              };
            })}
            tension={0}
            labels={getLabels(categories)}
            className='h-[500px] w-full'
            title='Kunlik yangi izohlar soni'
          />
        </Container>
        <Container
          className={clsxm(
            'flex h-[530px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-2'
          )}
          loading={loading}
        >
          <SingleAxisAreaChart
            data={categories.map((item, i) => {
              return {
                label: item.title,
                data: item.reviews,
                fill: false,
                borderColor: colors[i],
                hidden: i % 2 === 0 || i % 3 === 0,
              };
            })}
            tension={0}
            labels={getLabels(categories)}
            className='h-[500px] w-full'
            title='Jami izohlar soni'
          />
        </Container>
        <Container
          className={clsxm(
            'flex h-[530px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-2'
          )}
          loading={loading}
        >
          <SingleAxisAreaChart
            data={categories.map((item, i) => {
              return {
                label: item.title,
                data: item.shops,
                fill: false,
                borderColor: colors[i],
                hidden: i % 2 === 0 || i % 3 === 0,
              };
            })}
            tension={0}
            labels={getLabels(categories)}
            className='h-[500px] w-full'
            title='Jami sotuvchilar soni'
          />
        </Container>
        <Container
          className={clsxm(
            'flex h-[530px] w-full items-start justify-start overflow-x-scroll rounded-md bg-white px-2'
          )}
          loading={loading}
        >
          <SingleAxisAreaChart
            data={categories.map((item, i) => {
              return {
                label: item.title,
                data: item.shops_with_sales,
                fill: false,
                borderColor: colors[i],
                hidden: i % 2 === 0 || i % 3 === 0,
              };
            })}
            tension={0}
            labels={getLabels(categories)}
            className='h-[500px] w-full'
            title='Kunlik sotuvi bo`lgan sotuvchilar soni'
          />
        </Container>
      </Container>
    </div>
  );
}

function getLabels(categories: CategoriesReponseType[]) {
  const labels = new Set<string>();

  if (!categories || categories.length === 0) return [];

  // traverse through all_orders of all categories
  for (let i = 0; i < categories?.length; i++) {
    const item = categories[i];
    for (let j = 0; j < item?.orders.length; j++) {
      const order = item?.orders[j];
      labels.add(order.x);
    }
  }

  return Array.from(labels).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
}

export default MainCategories;
