import { GetServerSidePropsContext } from 'next/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import API from '@/lib/api';

import Layout from '@/components/layout/Layout';
import CampaignProductsTable from '@/components/pages/campaigns/CampaignProductsTable';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

export interface HomeProps {
  user: UserType;
}

export default function Campaigns({ user }: HomeProps) {
  const { dispatch } = useContextState();
  const { t } = useTranslation('tabs');
  const { t: t2 } = useTranslation('common');

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          [t2('sidebar.campaigns')]: '/campaigns',
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <CampaignProductsTable />
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

    if (!res.is_proplus && !res.is_enterprise) {
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
