import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import LoginComponent from '@/components/pages/login/LoginComponent';
import Seo from '@/components/Seo';

const Login = () => {
  const { i18n } = useTranslation('login');

  useEffect(() => {
    // check locale, and set it manually here
    if (i18n.language !== 'uz') {
      i18n.changeLanguage('uz');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const lang = context.locale || 'uz';

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
