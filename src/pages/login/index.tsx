import jsonwebtoken from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import React from 'react';

import LoginComponent from '@/components/pages/login/LoginComponent';

const Login = () => {
  const { i18n, t } = useTranslation('seo');
  const router = useRouter();

  return (
    <div className='h-full w-full'>
      <NextSeo
        title={t('title')}
        canonical={`https://www.uzanalitika.uz/${
          i18n.language
        }${router.asPath.replace(/\?.*/, '')}`}
        description={t('description')}
      />
      <LoginComponent />
    </div>
  );
};

export default Login;
// export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const refresh = context.req.cookies.refresh;
    try {
      if (!refresh) throw new Error('No refresh token');

      // SECRET_KEY should be the same secret key you used to sign the JWT.
      const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

      // To decode and verify
      const _ = jsonwebtoken.verify(refresh, SECRET_KEY as string);

      return {
        redirect: {
          permanent: false,
          destination: '/home',
        },
        props: {},
      };
    } catch (error) {
      return {
        props: {
          ...(await serverSideTranslations(
            context.locale ?? 'ru',
            ['login', 'common'],
            null,
            ['uz', 'ru']
          )),
        },
      };
    }
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(
          context.locale ?? 'ru',
          ['login', 'common'],
          null,
          ['uz', 'ru']
        )),
      },
    };
  }
}
