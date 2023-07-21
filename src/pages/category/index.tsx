import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import API from '@/lib/api';

import Layout from '@/components/layout/Layout';
import CategoryTreeComponent from '@/components/pages/category/CategoryTreeComponent';
import Seo from '@/components/Seo';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

export interface CategoryProps {
  user: UserType;
}

export default function Category({ user }: CategoryProps) {
  const [mounted, setMounted] = React.useState(false);
  const { dispatch } = useContextState();

  React.useEffect(() => {
    setMounted(true);
    dispatch({ type: 'USER', payload: { user } });
    dispatch({ type: 'PATH', payload: { path: null } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!mounted) return null;

  return (
    <Layout>
      <Seo />
      <CategoryTreeComponent />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    const { locale } = context;
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

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'uz', ['common'])),
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
