import { GetServerSidePropsContext } from 'next/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import API from '@/lib/api';

import Layout from '@/components/layout/Layout';
import DiscoveryComponent from '@/components/pages/discovery/DiscoveryComponent';
import Seo from '@/components/Seo';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

export interface HomeProps {
  user: UserType;
}

export default function Discovery({ user }: HomeProps) {
  const { dispatch } = useContextState();
  const { t } = useTranslation('tabs');

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          [t('home.overview')]: '/home',
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <Seo />
      <DiscoveryComponent user={user} />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    // check if user is logged in
    const res = await api.getCurrentUser();
    const { locale } = context;

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
        ...(await serverSideTranslations(locale ?? '', [
          'common',
          'tabs',
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
