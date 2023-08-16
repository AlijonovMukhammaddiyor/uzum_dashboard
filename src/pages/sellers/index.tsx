import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import Layout from '@/components/layout/Layout';
import SellersTable from '@/components/pages/sellers/SellersContainer';
import Seo from '@/components/Seo';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';
export interface ShopsProps {
  user: UserType;
}
export default function Sellers({ user }: ShopsProps) {
  const [activeTab, setActiveTab] = React.useState<string>('Sotuvchilar');
  const { dispatch } = useContextState();
  const { i18n } = useTranslation('sellers');

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          [i18n.language === 'uz' ? "Do'konlar" : 'Магазины']: '/sellers',
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <Seo />

      {/* <Tabs
        tabs={['Sotuvchilar']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-4'
      /> */}
      <div className='overflow-scroll'>
        <SellersTable
          user={user}
          className={clsxm(activeTab === 'Sotuvchilar' ? '' : 'hidden')}
        />

        {/* <MainAnalytics
          className={clsxm(activeTab === 'Umumiy' ? '' : 'hidden')}
        /> */}
      </div>
    </Layout>
  );
}

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

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'uz', [
          'common',
          'tabs',
          'sellers',
          'tableColumns',
        ])),
        user: res,
      },
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {},
    };
  }
}
