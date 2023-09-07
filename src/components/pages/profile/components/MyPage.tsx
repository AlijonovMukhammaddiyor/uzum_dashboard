import { AxiosResponse } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import {
  getFavouriteShopTableColumnDefs,
  getWeeklyBestProductsColDefs,
} from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';
import Tabs from '@/components/shared/Tabs';

import noresults from '@/assets/no-results.webp';

import { UserType } from '@/types/user';

interface ShopsType {
  account_id: number;
  title: string;
  link: string;
}
interface SellerType {
  average_order_price: number;
  average_purchase_price: number;
  date_pretty: string;
  id: string;
  num_categories: number;
  position: number;
  rating: number;
  shop_link: string;
  total_revenue: number;
  shop_title: string;
  total_orders: number;
  total_products: number;
  total_reviews: number;
}
interface ProductsReponseType {
  average_purchase_price: number;
  position_in_category: number;
  position: number;
  orders_amount: number;
  rating: number;
  reviews_amount: number;
  available_amount: number;
  date_pretty: string;
  product__category__categoryId: number;
  product__category__title: string;
  product__shop__link: number;
  product__shop__title: string;
  product__title: string;
  product__photos: string;
  product__created_at: string;
  product__product_id: number;
}

function MyPage({ className, user }: { className?: string; user: UserType }) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { t, i18n } = useTranslation('sellers');
  const { t: t2 } = useTranslation('tableColumns');
  const [activeTab, setActiveTab] = React.useState<string>(
    i18n.language === 'uz' ? 'Mahsulotlar' : 'Товары'
  );
  const [myShops, setMyShops] = React.useState<SellerType[]>([]);
  const [savedShops, setSavedShops] = React.useState<SellerType[]>([]);
  const [selectedProducts, setSelectedProducts] = React.useState<
    ProductsReponseType[]
  >([]);

  React.useEffect(() => {
    const api = new API(null);
    api
      .get<unknown, AxiosResponse<{ shops: SellerType[] }>>('/bot/shops/get')
      .then((res) => {
        setSavedShops(res.data.shops);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in shops');
      });
    api
      .get<unknown, AxiosResponse<{ data: SellerType[] }>>('/bot/products/get')
      .then((res) => {
        logger(res.data, 'my products');
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in products');
      });
  }, []);

  const is_paid = user.tariff !== 'free';

  return (
    <div className={clsxm('mt-8 w-full', className)}>
      <div className='w-full'></div>
      <div className='flex w-full flex-col items-center justify-center'>
        <Tabs
          tabs={[
            i18n.language === 'uz' ? 'Mahsulotlar' : 'Товары',
            i18n.language === 'uz' ? "Do'konlar" : 'Магазины',
          ]}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setNotAllowedTab={() => {
            return;
          }}
          className='overflow-auto'
        />

        {/* USER_SAVED_PRODUCTS */}
        <Container
          loading={loading}
          className={clsxm(
            'w-full border-none pt-4',
            activeTab === (i18n.language === 'uz' ? 'Mahsulotlar' : 'Товары')
              ? ''
              : 'hidden',
            className
          )}
        >
          <p className='font-primary w-full text-left font-semibold text-slate-500'>
            {i18n.language === 'uz'
              ? "Ushbu sahifada siz hisobot olish uchun tanlagan mahsulotlarni ko'rishingiz mumkin"
              : 'На этой странице вы можете просмотреть выбранные вами товары для получения отчета'}
          </p>
          {selectedProducts.length > 0 ? (
            <Table
              columnDefs={getWeeklyBestProductsColDefs(t, i18n.language)}
              className={clsxm(
                'min-w-full rounded-none',
                user.tariff === 'base' &&
                  `h-[${(65 + selectedProducts.length * 45).toString()}px]`,
                user.tariff === 'seller' &&
                  `h-[${(65 + selectedProducts.length * 45).toString()}px]`
              )}
              rowData={selectedProducts ?? []}
            />
          ) : (
            <div className='mx-auto mt-10 h-[400px] w-[100%] bg-white'>
              <Image
                src={noresults}
                alt='No results'
                className='mx-auto h-[500px] w-[500px]'
              />
            </div>
          )}
        </Container>

        {/* USER_SAVED_SHOPS */}

        <Container
          loading={loading}
          className={clsxm(
            'w-full  border-none pt-4',
            activeTab === (i18n.language === 'uz' ? "Do'konlar" : 'Магазины')
              ? ''
              : 'hidden',
            className
          )}
        >
          <p className='font-primary w-full text-left font-semibold text-slate-500'>
            {i18n.language === 'uz'
              ? "Ushbu sahifada siz hisobot olish uchun tanlagan do'konlaringizni ko'rishingiz mumkin"
              : 'На этой странице вы можете просмотреть выбранные вами магазины для получения отчета'}
          </p>

          {savedShops.length > 0 ? (
            <Table
              columnDefs={getFavouriteShopTableColumnDefs(t2, i18n.language)}
              className={clsxm(
                'min-w-full rounded-none',
                user.tariff === 'base' &&
                  `h-[${(65 + savedShops.length * 45).toString()}px]`,
                user.tariff === 'seller' &&
                  `h-[${(65 + savedShops.length * 45).toString()}px]`
              )}
              rowData={savedShops ?? []}
            />
          ) : (
            <div className='mx-auto mt-10 h-[400px] w-[100%] bg-white'>
              <Image
                src={noresults}
                alt='No results'
                className='mx-auto h-[500px] w-[500px]'
              />
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default MyPage;
