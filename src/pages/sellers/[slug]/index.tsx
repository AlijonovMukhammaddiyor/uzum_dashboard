import { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import Layout from '@/components/layout/Layout';
import ShopCategories from '@/components/pages/sellers/components/ShopCategories';
import ShopCompetitors from '@/components/pages/sellers/components/ShopCompetitors';
import ShopDailySales from '@/components/pages/sellers/components/ShopDailySales';
import ShopOverall from '@/components/pages/sellers/components/ShopOverall';
import ShopProducts from '@/components/pages/sellers/components/ShopProducts';
import Seo from '@/components/Seo';
import { RenderAlert } from '@/components/shared/AlertComponent';
import Tabs from '@/components/shared/Tabs';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';
export interface ShopsProps {
  user: UserType;
  seller: {
    seller_id: number;
    link: string;
    title: string;
    description: string;
    banner: string;
    logo: string;
    created_at: string;
    registration_date: number;
    is_owner: boolean;
  };
}
function Category({ user, seller }: ShopsProps) {
  const { t, i18n } = useTranslation('tabs');
  const [rendered, setRendered] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>(
    seller.is_owner ? t('sellers.overview') : t('sellers.goods')
  );
  const [notAllowedTab, setNotAllowedTab] = React.useState<string>('');
  const { dispatch, state } = useContextState();

  React.useEffect(() => {
    setActiveTab(seller.is_owner ? t('sellers.overview') : t('sellers.goods'));
  }, [i18n.language, t, seller.is_owner]);

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          Sotuvchilar: '/sellers',
          [seller.title]: `/sellers/${seller.link}`,
        },
      },
    });
    setRendered(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    switch (notAllowedTab) {
      case t('sellers.overview'):
        RenderAlert({
          alertTitle: t('tariffs.only_selected_shops'),
          // alertSubtitle: t('home.new_products.info'),
          buttonTitle: t('tariffs.add_shop'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      case t('sellers.daily_sales'):
        RenderAlert({
          alertTitle: t('tariffs.only_selected_shops'),

          buttonTitle: t('tariffs.add_shop'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      case t('sellers.competitors'):
        RenderAlert({
          alertTitle: t('tariffs.only_selected_shops'),

          buttonTitle: t('tariffs.add_shop'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      case t('sellers.categories'):
        RenderAlert({
          alertTitle: t('tariffs.only_selected_shops'),

          buttonTitle: t('tariffs.add_shop'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      default:
        break;
    }
  }, [notAllowedTab]);

  if (!rendered) return <></>;

  const canSee = seller.is_owner || state.user?.tariff === 'business';

  return (
    <Layout>
      <Seo />
      <div className=''>
        <div className='flex w-full items-center justify-start gap-10 '>
          <div className='flex items-center justify-start gap-3 rounded-md border border-gray-400 p-1 px-2'>
            <p className='text-sm font-semibold'>URL:</p>
            <a
              href={`https://uzum.uz/uz/${seller.link}`}
              className='text-sm text-blue-500 hover:underline'
            >
              https://uzum.uz/uz/{seller.link}
            </a>
          </div>
          {/* <div className='flex items-center justify-start gap-3 rounded-md border border-gray-400 p-1 px-2'>
            <p className='text-sm font-semibold'>
              Sotuvchining Ro'yxatdan o'tgan sanasi:
            </p>
            <p className='text-primary text-sm'>
              {new Date(seller.registration_date).toISOString().slice(0, 10)}
            </p>
          </div> */}
        </div>
        <div className='flex items-start justify-start gap-8'>
          <p></p>
        </div>
      </div>
      {!canSee && (
        <p className='top- absolute left-[330px] top-20 px-2 py-1 text-xs'>
          {i18n.language === 'uz'
            ? "Qolgan ma'lumotlarni faqatgina o'z do'konlaringiz uchun ko'rishingiz mumkin"
            : 'Вы можете просматривать остальные данные только для своих магазинов'}
        </p>
      )}
      <Tabs
        tabs={[
          t('sellers.overview'),
          t('sellers.goods'),
          t('sellers.daily_sales'),
          t('sellers.competitors'),
          t('sellers.categories'),
        ]}
        disbaledTabs={
          canSee
            ? []
            : [
                t('sellers.overview'),
                t('sellers.daily_sales'),
                t('sellers.competitors'),
                t('sellers.categories'),
              ]
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setNotAllowedTab={setNotAllowedTab}
        className='mb-6 mt-4'
      />
      <ShopOverall
        className={clsxm(activeTab === t('sellers.overview') ? '' : 'hidden')}
        sellerId={seller.seller_id}
        isActive={activeTab === t('sellers.overview') ? true : false}
      />

      <ShopProducts
        className={clsxm(activeTab === t('sellers.goods') ? '' : 'hidden')}
        sellerId={seller.seller_id}
      />

      <ShopCompetitors
        className={clsxm(
          activeTab === t('sellers.competitors') ? '' : 'hidden'
        )}
        sellerId={seller.seller_id}
        title={seller.title}
        isActive={activeTab === t('sellers.competitors') ? true : false}
      />

      <ShopDailySales
        className={clsxm(
          activeTab === t('sellers.daily_sales') ? '' : 'hidden'
        )}
        sellerId={seller.seller_id}
        isActive={activeTab === t('sellers.daily_sales') ? true : false}
      />

      <ShopCategories
        className={clsxm(activeTab === t('sellers.categories') ? '' : 'hidden')}
        sellerId={seller.seller_id}
        isActive={activeTab === t('sellers.categories') ? true : false}
      />
    </Layout>
  );
}

export default Category;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    // check if user is logged in
    const res: UserType = await api.getCurrentUser();
    if (!res) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {},
      };
    }

    if (res.tariff === 'free') {
      return {
        redirect: {
          permanent: false,
          destination: '/home',
        },
        props: {},
      };
    }

    const { slug } = context.query;

    const seller_link = slug as string;

    if (!seller_link) {
      return {
        redirect: {
          permanent: false,
          destination: '/sellers',
        },
        props: {},
      };
    }

    const seller = await api.get<
      unknown,
      AxiosResponse<{
        data: {
          seller_id: number;
          link: string;
          title: string;
          description: string;
          banner: string;
          logo: string;
          created_at: string;
        };
        labels: string[];
        total: number;
      }>
    >(`/shop/current/${seller_link}`);

    console.log(seller.data, 'seller data');

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'uz', [
          'common',
          'tabs',
          'sellers',
          'tableColumns',
        ])),
        user: res,
        seller: seller.data,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/sellers',
      },
      props: {},
    };
  }
}
