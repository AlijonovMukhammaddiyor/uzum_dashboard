import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';

import Layout from '@/components/layout/Layout';
import ProfileComponent from '@/components/pages/profile/ProfileComponent';
import Seo from '@/components/Seo';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface ProfileProps {
  user: UserType;
}

export default function Profile({ user }: ProfileProps) {
  const { dispatch } = useContextState();
  const { t } = useTranslation('landing');

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
      <div className='w-full rounded-md p-3'>
        <h1 className='text-2xl font-bold'>Profile</h1>
        <ProfileComponent user={user} />
      </div>
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
          'landing',
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
