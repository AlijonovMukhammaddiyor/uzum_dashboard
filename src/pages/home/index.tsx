import { GetServerSidePropsContext } from 'next/types';
import * as React from 'react';

import API from '@/lib/api';

import Layout from '@/components/layout/Layout';
import HomeComponent from '@/components/pages/home/HomeComponent';
import Seo from '@/components/Seo';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

export interface HomeProps {
  user: UserType;
}

export default function HomePage({ user }: HomeProps) {
  const { dispatch } = useContextState();

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({ type: 'PATH', payload: { path: {} } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <Seo />
      <HomeComponent user={user} />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    // check if user is logged in
    const res = await api.getCurrentUser();
    console.log(res);

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
