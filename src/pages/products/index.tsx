import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import API from '@/lib/api';

// import { productTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import ProductsComponent from '@/components/pages/products/ProductsComponent';
import Seo from '@/components/Seo';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface ProductsProps {
  user: UserType;
}

export default function Products({ user }: ProductsProps) {
  const { dispatch } = useContextState();

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: null,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <Seo />
      <ProductsComponent />
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
    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'uz', [
          'common',
          'tabs',
          'products',
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
