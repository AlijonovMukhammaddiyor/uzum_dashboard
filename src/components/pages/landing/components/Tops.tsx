import axios from 'axios';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { SERVER_URL } from '@/constant/env';

function Tops() {
  const [products, setProducts] = React.useState<
    {
      product_id: number;
      product__title: string;
      orders_amount: number;
    }[]
  >([]);
  const [shops, setShops] = React.useState<
    {
      shop__title: string;
      total_revenue: number;
    }[]
  >([]);
  const { t } = useTranslation('landing');

  useEffect(() => {
    axios
      .get(SERVER_URL + '/product/top/')
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        logger(err, 'Error in getting top products');
      });
    axios
      .get(SERVER_URL + '/shop/top5/')
      .then((res) => {
        setShops(res.data);
      })
      .catch((err) => {
        logger(err, 'Error in getting top products');
      });
  }, []);
  // bg - [#E8F0F2];
  return (
    <div className='relative  w-full py-16 md:py-32'>
      <div className='layout flex flex-col justify-start gap-10 md:flex-row'>
        <div className='mx-auto flex w-11/12 flex-col items-start justify-start md:w-1/2'>
          <h3 className='mb-8'>{t('tops.products.title')}</h3>
          <div className='w-full'>
            <ul
              className={clsxm(
                'relative flex min-h-[300px] w-full flex-col gap-5'
                // products.length === 0 && 'items-center justify-center'
              )}
            >
              {products.length > 0 ? (
                products?.map((item, index) => {
                  return (
                    <ListItem
                      key={index}
                      title={item.product__title}
                      count={item.orders_amount}
                      index={index + 1}
                    />
                  );
                })
              ) : (
                <SkeletonLoader />
              )}
            </ul>
          </div>
        </div>
        <div className='mx-auto flex w-11/12 flex-col items-start justify-start md:w-1/2'>
          <h3 className='mb-8'>{t('tops.shops.title')}</h3>
          <div className='w-full'>
            <ul className='flex min-h-[300px] w-full flex-col gap-5'>
              {shops.length > 0 ? (
                shops?.map((item, index) => (
                  <ListItem
                    key={index}
                    title={item.shop__title}
                    count={item.total_revenue}
                    index={index + 1}
                    isMoney
                  />
                ))
              ) : (
                <SkeletonLoader />
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  count,
  index,
  isMoney,
}: {
  title: string;
  count: number;
  index: number;
  isMoney?: boolean;
}) {
  const { i18n } = useTranslation('landing');
  return (
    <li className='boder flex h-10 w-full items-center justify-between gap-2 border-b border-slate-300'>
      <div className='flex flex-1 items-center justify-start gap-5'>
        <p className='w-[30px] text-2xl text-blue-500'>0{index}</p>
        <div className='line-clamp-2 overflow-hidden text-sm'>{title}</div>
      </div>
      <div className='shrink-0 text-sm font-bold'>
        {!isMoney ? (
          <div className='flex items-center justify-end gap-1'>
            <p>{count?.toLocaleString()}</p>
            {i18n.language === 'uz' ? 'ta' : 'шт'}
          </div>
        ) : count * 1000 > 1000000000 ? (
          <div className='flex flex-col gap-1'>
            <p className=''>
              {(Math.round(count * 1000) / 1000000000).toFixed(1)}{' '}
              {i18n.language === 'uz' ? "mlrd so'm" : 'млрд сум'}
            </p>
          </div>
        ) : count * 1000 > 1000000 ? (
          <div className='flex flex-col gap-1'>
            <p className=''>
              {(Math.round(count * 1000) / 1000000).toFixed(1)}{' '}
              {i18n.language === 'uz' ? "mln so'm" : 'млн сум'}
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-1'>
            <p className=''>
              {(Math.round(count * 1000) / 1000).toFixed(1)}{' '}
              {i18n.language === 'uz' ? "ming so'm" : 'тыс. сум'}
            </p>
          </div>
        )}
      </div>
    </li>
  );
}

export default Tops;

function SkeletonLoader() {
  return (
    <ul
      role='status'
      className='w-full animate-pulse space-y-4 divide-y divide-gray-200 rounded p-4'
    >
      <div className='base:gap-28 flex h-8 w-full items-center justify-between gap-6'>
        <div className='flex h-full flex-1 items-center justify-start gap-5'>
          <div className='h-6 w-6 rounded-md bg-gray-300'></div>
          <div className='h-6 flex-1 rounded-md bg-gray-300'></div>
        </div>
        <div className='h-6 w-16 rounded-md bg-gray-300'></div>
      </div>
      <div className='base:gap-28 flex h-8 w-full items-center justify-between gap-6'>
        <div className='flex h-full flex-1 items-center justify-start gap-5'>
          <div className='h-6 w-6 rounded-md bg-gray-300'></div>
          <div className='h-6 flex-1 rounded-md bg-gray-300'></div>
        </div>
        <div className='h-6 w-16 rounded-md bg-gray-300'></div>
      </div>
      <div className='base:gap-28 flex h-8 w-full items-center justify-between gap-6'>
        <div className='flex h-full flex-1 items-center justify-start gap-5'>
          <div className='h-6 w-6 rounded-md bg-gray-300'></div>
          <div className='h-6 flex-1 rounded-md bg-gray-300'></div>
        </div>
        <div className='h-6 w-16 rounded-md bg-gray-300'></div>
      </div>
      <div className='base:gap-28 flex h-8 w-full items-center justify-between gap-6'>
        <div className='flex h-full flex-1 items-center justify-start gap-5'>
          <div className='h-6 w-6 rounded-md bg-gray-300'></div>
          <div className='h-6 flex-1 rounded-md bg-gray-300'></div>
        </div>
        <div className='h-6 w-16 rounded-md bg-gray-300'></div>
      </div>
      <div className='base:gap-28 flex h-8 w-full items-center justify-between gap-6'>
        <div className='flex h-full flex-1 items-center justify-start gap-5'>
          <div className='h-6 w-6 rounded-md bg-gray-300'></div>
          <div className='h-6 flex-1 rounded-md bg-gray-300'></div>
        </div>
        <div className='h-6 w-16 rounded-md bg-gray-300'></div>
      </div>
      <span className='sr-only'>Yuklanmoqda...</span>
    </ul>
  );
}
