import { AxiosResponse } from 'axios';
import { GetServerSidePropsContext } from 'next';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import Layout from '@/components/layout/Layout';
import ShopCategories from '@/components/pages/sellers/components/ShopCategories';
import ShopCompetitors from '@/components/pages/sellers/components/ShopCompetitors';
import ShopDailySales from '@/components/pages/sellers/components/ShopDailySales';
import ShopOverall from '@/components/pages/sellers/components/ShopOverall';
import ShopProducts from '@/components/pages/sellers/components/ShopProducts';
import Seo from '@/components/Seo';
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
  };
}
function Category({ user, seller }: ShopsProps) {
  const [rendered, setRendered] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>('Umumiy');
  const { dispatch } = useContextState();

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

  if (!rendered) return <></>;

  return (
    <Layout>
      <Seo />
      <div className=''>
        <div className='flex w-full items-center justify-start gap-10'>
          <div className='flex items-center justify-start gap-3 rounded-md border border-gray-400 p-1 px-2'>
            <p className='text-sm font-semibold'>URL:</p>
            <a
              href={`https://uzum.uz/uz/${seller.link}`}
              className='text-sm text-blue-500 hover:underline'
            >
              https://uzum.uz/uz/{seller.link}
            </a>
          </div>
          <div className='flex items-center justify-start gap-3 rounded-md border border-gray-400 p-1 px-2'>
            <p className='text-sm font-semibold'>
              Sotuvchining Ro'yxatdan o'tgan sanasi:
            </p>
            <p className='text-primary text-sm'>
              {new Date(seller.registration_date).toISOString().slice(0, 10)}
            </p>
          </div>
        </div>
        <div className='flex items-start justify-start gap-8'>
          <p></p>
        </div>
      </div>

      <Tabs
        tabs={[
          'Umumiy',
          'Tovarlar',
          'Raqobatchilar',
          'Kategoriyalar',
          'Kunlik Sotuv',
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4'
      />
      <ShopOverall
        className={clsxm(activeTab === 'Umumiy' ? '' : 'hidden')}
        sellerId={seller.seller_id}
      />

      <ShopProducts
        className={clsxm(activeTab === 'Tovarlar' ? '' : 'hidden')}
        sellerId={seller.seller_id}
      />

      <ShopCompetitors
        className={clsxm(activeTab === 'Raqobatchilar' ? '' : 'hidden')}
        sellerId={seller.seller_id}
        title={seller.title}
      />

      <ShopDailySales
        className={clsxm(activeTab === 'Kunlik Sotuv' ? '' : 'hidden')}
        sellerId={seller.seller_id}
      />

      <ShopCategories
        className={clsxm(activeTab === 'Kategoriyalar' ? '' : 'hidden')}
        sellerId={seller.seller_id}
      />
    </Layout>
  );
}

export default Category;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    // check if user is logged in
    const res = await api.getCurrentUser();
    const { slug } = context.query;
    if (!slug) {
      return {
        redirect: {
          permanent: false,
          destination: '/sellers',
        },
        props: {},
      };
    }

    const seller_link = (slug as string).split('--')[1];

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

    if (!res) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {},
      };
    }
    return {
      props: {
        user: res,
        seller: seller.data,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
