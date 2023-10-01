import jsonwebtoken from 'jsonwebtoken';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import * as React from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Layout from '@/components/layout/Layout';
import TelegramComponent from '@/components/pages/telegram/TelegramComponent';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

export interface HomeProps {
  user: UserType;
}

export default function Discovery({ user }: HomeProps) {
  const { dispatch } = useContextState();
  const { t, i18n } = useTranslation('tabs');
  const router = useRouter();

  React.useEffect(() => {
    const api = new API(null);
    api
      .getCurrentUser()
      .then((res) => {
        if (res) {
          dispatch({
            type: 'USER',
            payload: {
              user: res,
            },
          });
        }
      })
      .catch((err) => {
        logger(err, 'error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          [i18n.language === 'uz' ? 'Telegram Bot' : 'Telegram Бот']:
            '/telegram',
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <NextSeo
        title={i18n?.language === 'uz' ? 'Telegram Bot' : 'Telegram Бот'}
        description={
          i18n?.language === 'uz'
            ? "Ixtiyoriy Mahsulotlar va Do'konlar haqida kunlik hisobotlar"
            : 'Ежедневные отчеты о произвольных продуктах и магазинах'
        }
        canonical={`https://www.uzanalitika.uz/${
          i18n.language
        }${router.asPath.replace(/\?.*/, '')}`}
      />
      <TelegramComponent />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const refresh = context.req.cookies.refresh;
    try {
      if (!refresh) throw new Error('No refresh token');

      // SECRET_KEY should be the same secret key you used to sign the JWT.
      const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;

      // To decode and verify
      const decoded = jsonwebtoken.verify(refresh, SECRET_KEY as string) as {
        user: UserType;
        token_type: string;
        exp: number;
        iat: number;
        jti: string;
        user_id: number;
      };

      if (decoded.user.tariff === 'free')
        return {
          redirect: {
            permanent: false,
            destination: '/home',
          },
          props: {},
        };

      return {
        props: {
          ...(await serverSideTranslations(context.locale || 'uz', [
            'common',
            'tabs',
            'tableColumns',
          ])),
          user: decoded.user,
        },
      };
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {},
      };
    }
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
