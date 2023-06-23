import axios from 'axios';
import React, { useEffect } from 'react';

import { API } from '@/lib/api';

import { SERVER_URL } from '@/constant/env';

function Tops() {
  const [products, setProducts] = React.useState<
    {
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

  if (products.length === 0 || shops.length === 0) return <div></div>;

  console.log('products', products, 'shops', shops);

  return (
    <div className='relative w-full bg-[#F3F5F7] py-16 md:py-32'>
      <div className='layout flex flex-col justify-start gap-10 md:flex-row'>
        <div className='mx-auto flex w-11/12 flex-col items-start justify-start md:w-1/2'>
          <h3 className='mb-8'>Eng Ko'p sotilgan mahsulotlar</h3>
          <div className='w-full'>
            <ul className='flex w-full flex-col gap-5'>
              {products?.map((item, index) => (
                <ListItem
                  key={index}
                  title={item.product__title}
                  count={item.orders_amount}
                  index={index + 1}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className='mx-auto flex w-11/12 flex-col items-start justify-start md:w-1/2'>
          <h3 className='mb-8'>Eng Ko'p sotgan Do`konlar</h3>
          <div className='w-full'>
            <ul className='flex w-full flex-col gap-5'>
              {shops?.map((item, index) => (
                <ListItem
                  key={index}
                  title={item.shop__title}
                  count={item.total_orders}
                  index={index + 1}
                />
              ))}
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
    <li className='boder flex w-full items-center justify-between border-b border-slate-300'>
      <div className='flex flex-1 items-center justify-start gap-5'>
        <p className='w-[30px] text-2xl text-blue-500'>0{index}</p>
        <div className='text-sm'>{title}</div>
      </div>
      <div className='shrink-0 text-sm font-bold'>{count.toLocaleString()}</div>
    </li>
  );
}

export default Tops;
