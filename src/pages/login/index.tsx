import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nookies from 'nookies';
import React from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import LoginComponent from '@/components/pages/login/LoginComponent';

const Login = () => {
  return (
    <div className='min-h-screen w-screen'>
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

    // get stel_token cookie for oauth.telegram.org and delete it
    const cookie = nookies.get(context);
    console.log(cookie, 'cookie');

    const stel_token = context.req.cookies['stel_token'];

    console.log(context.req.cookies, 'context.req.cookies');

    if (stel_token) {
      context.res.setHeader(
        'Set-Cookie',
        `stel_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      );
    }

    return {
      props: {
        ...(await serverSideTranslations(
          context.locale ?? 'uz',
          ['login'],
          null,
          ['uz', 'ru']
        )),
      },
    };
  } catch (e) {
    // get stel_token cookie for oauth.telegram.org and delete it
    const stel_token = context.req.cookies['stel_token'];

    if (stel_token) {
      context.res.setHeader(
        'Set-Cookie',
        `stel_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
      );
    }
    logger(e, "Can't get current user");
    return {
      props: {
        ...(await serverSideTranslations(
          context.locale ?? 'uz',
          ['login'],
          null,
          ['uz', 'ru']
        )),
      },
    };
  }
}
