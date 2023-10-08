import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import {
  getCategoryProductTableForProductsColumnDefs,
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
        try {
          // setSavedShops(res.data.shops);
          setLoading((prev) => ({ ...prev, shops: false }));
          // dispatch({
          //   type: 'FAVOURITE_SHOPS',
          //   payload: {
          //     favourite_sellers: res.data.shops,
          //   },
          // });
          setShops(res.data.shops);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in shops2222');
      });
    api
      .get<unknown, AxiosResponse<{ products: any[] }>>('/bot/products/get')
      .then((res) => {
        try {
          setLoading((prev) => ({ ...prev, products: false }));
          // dispatch({
          //   type: 'FAVOURITE_PRODUCTS',
          //   payload: {
          //     favourite_products: res.data.products,
          //   },
          // });
          setProducts(res.data.products);
        } catch (e) {
          console.log(e);
        }
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in products222');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full w-full pb-10'>
      {/* Title and Link */}
      <div className='mb-6 flex items-center justify-between'>
        <h1 className='text-2xl font-bold text-blue-600'>UzAnalitika Bot</h1>
        <a
          href='https://t.me/uzanalitikabot'
          target='_blank'
          className='underline hover:text-blue-600'
        >
          t.me/uzanalitikabot
        </a>
      </div>

      {/* Description */}
      <p className='mb-8 text-lg'>
        {i18n.language === 'uz'
          ? "Bizning bot orqali O'ZINGIZNING yoki barcha RAQOBATCHI  (1) do'konlar (2) mahsulotlarni doimiy kuzatib borishingiz mumkin boladi."
          : 'Через нашего бота вы можете постоянно следить за ВАШИМИ или всеми КОНКУРЕНТАМИ (1) магазинов (2) товаров.'}
      </p>

      {/* How the Bot Works */}
      <h2 className='mb-4 text-xl font-bold'>
        {i18n.language === 'uz' ? 'Bot Qanday Ishlaydi?' : 'Как Работает Бот?'}
      </h2>
      <ol className='mb-8 list-inside list-decimal'>
        <li>
          {i18n.language === 'uz'
            ? "Mahsulotlar yoki Sotuvchilar sahifasiga o'ting"
            : 'Перейдите на страницу Товары или Продавцы'}
        </li>
        <li>
          {i18n.language === 'uz'
            ? "O'zingiz tanlamoqchi bo'lgan mahsulot yoki sotuvchini toping"
            : 'Найдите товар или продавца, который вы хотите отслеживать'}
        </li>
        <li>
          <AiOutlineHeart className='mr-2 inline-block font-bold' />
          {i18n.language === 'uz' ? 'belgisini bosing' : 'нажмите на значок'}
        </li>
      </ol>

      {/* Automatic Report Sending */}
      <h3 className='mb-4 font-semibold'>
        {i18n.language === 'uz'
          ? 'Avtomatik Xabar Yuborish:'
          : 'Автоматическая Отправка Отчетов:'}
      </h3>
      <p className='mb-8'>
        {i18n.language === 'uz'
          ? "Sizga har kuni ertalab avtomatik ravishda xabar yuboriladi, so'rov yuborishingiz shart emas."
          : 'Вам будет автоматически отправляться отчет каждое утро, вам не нужно делать запрос.'}
      </p>

      {/* Unique Token */}
      <h2 className='mb-4 text-xl font-bold'>
        {i18n.language === 'uz'
          ? 'Sizning Maxfiy Tokeningiz'
          : 'Ваш Уникальный Токен'}
      </h2>
      <p className='mb-4'>
        {i18n.language === 'uz'
          ? 'Botga ulanish uchun quyidagi maxfiy tokeningizni ishlatishingiz kerak:'
          : 'Чтобы подключиться к боту, используйте следующий уникальный токен:'}
      </p>
      <div className='mb-4 rounded bg-gray-100 p-4'>
        <code className='font-mono text-gray-700'>{token}</code>
      </div>
      <p className='mb-8 text-red-500'>
        {i18n.language === 'uz'
          ? "Eslatma: Ushbu token maxfiy va faqat sizga ma'lum. Ushbu tokenni hech kimga bermang!"
          : 'Внимание: Этот токен является секретным и известен только вам. Не передавайте этот токен никому!'}
      </p>
      <Container
        className='mt-6 border-none shadow-none'
        loading={loading.shops}
      >
        <p className='mb-4 text-center text-xl font-bold'>
          {i18n.language === 'uz'
            ? "Siz kuzatayotgan do'konlar"
            : 'магазины, которые вы отслеживаете.'}
        </p>
        {shops?.length > 0 ? (
          <Table
            rowData={shops ?? []}
            rowHeight={75}
            headerHeight={50}
            columnDefs={getShopTableColumnDefs(t2, i18n.language)}
            className={clsxm(
              'h-[calc(500px)] w-full',
              shops?.length === 0 && 'hidden'
            )}
          />
        ) : (
          <></>
        )}
        {shops?.length === 0 ? (
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
        loading={loading.products}
      >
        <p className='mb-4 text-center text-xl font-bold'>
          {i18n.language === 'uz'
            ? 'Siz kuzatayotgan mahsulotlar'
            : 'товары, которые вы отслеживаете.'}
        </p>
        {products?.length > 0 ? (
          <Table
            rowData={products ?? []}
            rowHeight={75}
            headerHeight={50}
            columnDefs={
              getCategoryProductTableForProductsColumnDefs(
                t2,
                i18n.language
              ) as any
            }
            className={clsxm(
              'h-[calc(500px)] w-full',
              products?.length === 0 && 'hidden'
            )}
          />
        ) : (
          <></>
        )}
        {products?.length === 0 ? (
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
