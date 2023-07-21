import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import LoginComponent from '@/components/pages/login/LoginComponent';
import Seo from '@/components/Seo';

const Login = () => {
  return (
    <div className='min-h-screen w-screen'>
      <Seo />
      <LoginComponent />
    </div>
  );
};

export default Login;
// export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = new API(context);
    const res = await api.getCurrentUser();

    if (res) {
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
        ...(await serverSideTranslations(
          context.locale ?? 'uz',
          ['common', 'login'],
          null,
          ['uz', 'ru']
        )),
      },
    };
  } catch (e) {
    logger(e, "Can't get current user");
    return {
      props: {
        ...(await serverSideTranslations(
          context.locale ?? 'uz',
          ['common', 'login'],
          null,
          ['uz', 'ru']
        )),
      },
    };
  }
}
