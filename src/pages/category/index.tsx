import { GetServerSidePropsContext } from 'next';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!mounted) return null;

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <CategoryTreeComponent />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    // check if user is logged in
    const res = await api.getCurrentUser();

    return {
      props: {
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
