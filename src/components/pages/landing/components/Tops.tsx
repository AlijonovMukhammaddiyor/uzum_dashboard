import axios from 'axios';
import React, { CSSProperties, useEffect } from 'react';

import { API } from '@/lib/api';
import clsxm from '@/lib/clsxm';

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
      total_orders: number;
    }[]
  >([]);

  const override: CSSProperties = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
  };

  useEffect(() => {
    axios
      .get(SERVER_URL + API.TOP_SHOPS)
      .then((res) => {
        setShops(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(SERVER_URL + API.TOP_PRODUCTS)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className='relative w-full bg-[#E8F0F2] py-16 md:py-32'>
      <div className='layout flex flex-col justify-start gap-10 md:flex-row'>
        <div className='mx-auto flex w-11/12 flex-col items-start justify-start md:w-1/2'>
          <h3 className='mb-8'>Eng Ko'p sotilgan mahsulotlar</h3>
          <div className='w-full'>
            <ul
              className={clsxm(
                'relative flex min-h-[300px] w-full flex-col gap-5'
                // products.length === 0 && 'items-center justify-center'
              )}
            >
              {products.length > 0 ? (
                products?.map((item, index) => (
                  <ListItem
                    key={index}
                    title={item.product__title}
                    count={item.orders_amount}
                    index={index + 1}
                  />
                ))
              ) : (
                <SkeletonLoader />
              )}
            </ul>
          </div>
        </div>
        <div className='mx-auto flex w-11/12 flex-col items-start justify-start md:w-1/2'>
          <h3 className='mb-8'>Eng Ko'p sotgan Do'konlar</h3>
          <div className='w-full'>
            <ul className='flex min-h-[300px] w-full flex-col gap-5'>
              {shops.length > 0 ? (
                shops?.map((item, index) => (
                  <ListItem
                    key={index}
                    title={item.shop__title}
                    count={item.total_orders}
                    index={index + 1}
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
}: {
  title: string;
  count: number;
  index: number;
}) {
  return (
    <li className='boder flex h-10 w-full items-center justify-between gap-2 border-b border-slate-300'>
      <div className='flex flex-1 items-center justify-start gap-5'>
        <p className='w-[30px] text-2xl text-blue-500'>0{index}</p>
        <div className='line-clamp-2 overflow-hidden text-sm'>{title}</div>
      </div>
      <div className='shrink-0 text-sm font-bold'>{count.toLocaleString()}</div>
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
