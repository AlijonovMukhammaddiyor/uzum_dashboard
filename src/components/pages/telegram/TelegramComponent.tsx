import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import {
  getCategoryProductTableColumnDefs,
  getShopTableColumnDefs,
} from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

import noresults from '@/assets/no-results.webp';
import { useContextState } from '@/context/Context';

function TelegramComponent() {
  const { i18n } = useTranslation('common');
  const { t: t2 } = useTranslation('tableColumns');
  const { state, dispatch } = useContextState();
  const [loading, setLoading] = React.useState({
    shops: false,
    products: false,
    token: false,
  });
  const [token, setToken] = React.useState<string>('');
  const [products, setProducts] = React.useState<any[]>([]);
  const [shops, setShops] = React.useState<any[]>([]);

  React.useEffect(() => {
    const api = new API(null);
    setLoading({
      shops: true,
      products: true,
      token: true,
    });
    api
      .get<unknown, AxiosResponse<{ telegram_token: string }>>(
        '/users/myTelegramToken'
      )
      .then((res) => {
        // setSavedShops(res.data.shops);
        logger(res.data, 'my token');
        setToken(res.data.telegram_token);
        setLoading((prev) => ({ ...prev, token: false }));
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in token');
      });
    api
      .get<unknown, AxiosResponse<{ shops: any[] }>>('/bot/shops/get')
      .then((res) => {
        // setSavedShops(res.data.shops);
        logger(res.data, 'my shops 222');
        setLoading((prev) => ({ ...prev, shops: false }));
        // dispatch({
        //   type: 'FAVOURITE_SHOPS',
        //   payload: {
        //     favourite_sellers: res.data.shops,
        //   },
        // });
        setShops(res.data.shops);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in shops2222');
      });
    api
      .get<unknown, AxiosResponse<{ products: any[] }>>('/bot/products/get')
      .then((res) => {
        logger(res.data, 'my products222');
        setLoading((prev) => ({ ...prev, products: false }));
        // dispatch({
        //   type: 'FAVOURITE_PRODUCTS',
        //   payload: {
        //     favourite_products: res.data.products,
        //   },
        // });
        setProducts(res.data.products);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in products222');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full w-full pb-10'>
      <div className='mt-4 flex w-full items-center justify-start gap-4'>
        <p className='shrink-0 text-xl font-bold text-blue-600'>
          {i18n.language === 'uz' ? 'UzAnalitika Bot' : 'UzAnalitika Бот'}
        </p>
        <p className='text-gray-600'>-</p>
        <p className='text-gray-700'>
          {i18n.language === 'uz'
            ? "Bizning bot orqali sizga qiziq bo'lgan barcha raqobatchi yoki o'zingizning (1) do'konlaringizni (2) mahsulotlaringizni doimiy kuzatib borishingiz mumkin boladi."
            : 'Наш бот позволяет вам всегда следить за всеми вашими конкурентами или вашими (1) магазинами (2) товарами.'}
        </p>
      </div>
      <div className='mt-4 flex w-full items-start justify-start gap-4'>
        <p className='text-xl font-bold'>
          {i18n.language === 'uz'
            ? 'Bot Qanday Ishlaydi?'
            : 'Как Работает Бот?'}
        </p>
      </div>
      <div className='mt-3 w-full'>
        <p className='mb-3 text-lg font-semibold text-slate-600'>
          {i18n.language === 'uz'
            ? 'Botdan foydalanish uchun quyidagi qadamlarni bajaring:'
            : 'Чтобы воспользоваться ботом, выполните следующие шаги:'}
        </p>
        <ul className='list-disc pl-5'>
          <li className='mb-2'>
            <p className='text-gray-700'>
              {i18n.language === 'uz'
                ? "Mahsulotlar yoki Sotuvchilar sahifasiga o'ting"
                : 'Перейдите на страницу Товары или Продавцы'}
            </p>
          </li>
          <li className='mb-2'>
            <p className='text-gray-700'>
              {i18n.language === 'uz'
                ? "O'zingiz tanlamoqchi bo'lgan mahsulot yoki sotuvchini toping"
                : 'Найдите товар или продавца, который вы хотите отслеживать'}
            </p>
          </li>
          <li className='mb-2'>
            <p className='text-gray-700'>
              <AiOutlineHeart className='mr-2 inline-block font-bold' />
              {i18n.language === 'uz'
                ? 'belgisini bosing'
                : 'нажмите на значок'}
            </p>
          </li>
        </ul>
      </div>
      <div className='mt-6 w-full'>
        <p className='font-semibold text-slate-600'>
          {i18n.language === 'uz'
            ? 'Avtomatik Xabar Yuborish:'
            : 'Автоматическая Отправка Отчетов:'}
        </p>
        <p className='text-gray-700'>
          {i18n.language === 'uz'
            ? "Sizga har kuni ertalab avtomatik ravishda xabar yuboriladi, so'rov yuborishingiz shart emas."
            : 'Вам будет автоматически отправляться отчет каждое утро, вам не нужно делать запрос.'}
        </p>
      </div>
      <div className='mt-8 flex w-full items-start justify-start gap-4'>
        <p className='text-xl font-bold'>
          {i18n.language === 'uz'
            ? 'Sizning Maxfiy Tokeningiz'
            : 'Ваш Уникальный Токен'}
        </p>
      </div>

      <div className='mt-2 w-full'>
        <p className='font-semibold text-slate-600'>
          {i18n.language === 'uz'
            ? 'Botga ulanish uchun quyidagi maxfiy tokeningizni ishlatishingiz kerak:'
            : 'Чтобы подключиться к боту, используйте следующий уникальный токен:'}
        </p>
        <div className='mt-2 shrink-0 rounded-lg bg-gray-100 py-2'>
          <Container
            loading={loading.token}
            className='p-2 font-mono text-gray-700'
          >
            {/* Replace `userToken` with the variable that holds the user's token */}
            <p className='h-8 shrink-0'>{token}</p>
          </Container>
        </div>
        <p className='mt-4 text-red-500'>
          {i18n.language === 'uz'
            ? "Eslatma: Ushbu token maxfiy va faqat sizga ma'lum. Ushbu tokenni hech kimga bermang!"
            : 'Внимание: Этот токен является секретным и известен только вам. Не передавайте этот токен никому!'}
        </p>
      </div>
      <Container
        className='mt-6 border-none shadow-none'
        loading={loading.shops}
      >
        <p className='mb-4 text-center text-xl font-bold'>
          {i18n.language === 'uz'
            ? "Siz kuzatayotgan do'konlar"
            : 'магазины, которые вы отслеживаете.'}
        </p>
        {shops.length > 0 ? (
          <Table
            rowData={shops ?? []}
            rowHeight={75}
            headerHeight={50}
            columnDefs={getShopTableColumnDefs(t2, i18n.language)}
            className={clsxm(
              'h-[calc(500px)] w-full',
              products.length === 0 && 'hidden'
            )}
          />
        ) : (
          <></>
        )}
        {shops.length === 0 ? (
          <div className='mx-auto mt-10 h-[400px] w-[100%] bg-white'>
            <Image
              src={noresults}
              alt='No results'
              className='mx-auto h-[400px] w-[500px]'
            />
          </div>
        ) : (
          <></>
        )}
      </Container>
      <Container
        className='mt-10 border-none shadow-none'
        loading={loading.shops}
      >
        <p className='mb-4 text-center text-xl font-bold'>
          {i18n.language === 'uz'
            ? 'Siz kuzatayotgan mahsulotlar'
            : 'товары, которые вы отслеживаете.'}
        </p>
        {products.length > 0 ? (
          <Table
            rowData={products ?? []}
            rowHeight={75}
            headerHeight={50}
            columnDefs={
              getCategoryProductTableColumnDefs(t2, i18n.language) as any
            }
            className={clsxm(
              'h-[calc(500px)] w-full',
              products.length === 0 && 'hidden'
            )}
          />
        ) : (
          <></>
        )}
        {products.length === 0 ? (
          <div className='mx-auto mt-10 h-[400px] w-[100%] bg-white'>
            <Image
              src={noresults}
              alt='No results'
              className='mx-auto h-[400px] w-[500px]'
            />
          </div>
        ) : (
          <></>
        )}
      </Container>
      <div className='h-[80px] w-full'></div>
    </div>
  );
}

export default TelegramComponent;
