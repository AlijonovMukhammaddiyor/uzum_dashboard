import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import API from '@/lib/api';

// import { productTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import NichesComponent from '@/components/pages/niches/NichesComponent';
import Seo from '@/components/Seo';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface NichesProps {
  user: UserType;
}

export default function Niches({ user }: NichesProps) {
  const { dispatch } = useContextState();
  const { t } = useTranslation('common');

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          [t('sidebar.niches')]: '/niches',
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <Seo />
      <NichesComponent />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    // check if user is logged in
    const res = await api.getCurrentUser();
    if (!res) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {},
      };
    }

    if (!res.is_proplus && !res.is_enterprise && !res.is_pro) {
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
