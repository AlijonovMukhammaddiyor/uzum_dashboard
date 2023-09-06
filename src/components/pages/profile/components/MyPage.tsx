import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Tabs from '@/components/shared/Tabs';

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

function MyPage({ className, user }: { className?: string; user: UserType }) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const { t, i18n } = useTranslation('sellers');
  const { t: t2 } = useTranslation('tableColumns');
  const [activeTab, setActiveTab] = React.useState<string>(
    i18n.language === 'uz' ? 'Mahsulotlar' : 'Товары'
  );

  React.useEffect(() => {
    const api = new API(null);
    api
      .get<unknown, AxiosResponse<{ data: SellerType[] }>>('/user/reports/')
      .then((res) => {
        logger(res.data, 'my shops');
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in reports');
      });
  }, []);

  const is_paid = user.tariff !== 'free';

  return (
    <div className='mt-8 w-full'>
      <div className='w-full'>
        <p className='font-primary w-full text-center font-semibold text-slate-500'>
          {i18n.language === 'uz'
            ? "Ushbu sahifada siz hisobot olish uchun tanlagan do'konlaringiz va mahsulotlarni ko'rishingiz mumkin"
            : 'На этой странице вы можете просмотреть выбранные вами магазины и товары для получения отчета'}
        </p>
      </div>
      <div className='flex w-full items-center justify-center'>
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
      </div>
    </div>
  );
}

export default MyPage;
