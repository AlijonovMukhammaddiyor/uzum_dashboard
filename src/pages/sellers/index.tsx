import jsonwebtoken from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import * as React from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Layout from '@/components/layout/Layout';
import SellersTable from '@/components/pages/sellers/SellersContainer';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';
export interface ShopsProps {
  user: UserType;
}
export default function Sellers({ user }: ShopsProps) {
  const { dispatch } = useContextState();
  const { i18n } = useTranslation('sellers');
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
          [i18n.language === 'uz' ? "Do'konlar" : 'Магазины']: '/sellers',
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <NextSeo
        title={
          i18n?.language === 'uz' ? "Do'konlar Tahlili" : 'Анализ Mагазинов'
        }
        description={
          i18n?.language === 'uz'
            ? "Do'konlarning mahsulotlari, sotuv kategoriyalari, kunlik sotuvlari, va shuningdek raqobatchilar tahlili"
            : 'Анализ товаров, категорий продаж, ежедневных продаж и конкурентов для каждого магазина.'
        }
        canonical={`https://www.uzanalitika.uz/${
          i18n.language
        }${router.asPath.replace(/\?.*/, '')}`}
      />
      <div className='w-full'>
        <SellersTable user={user} />
      </div>
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

      const { locale } = context;

      if (decoded.user.tariff === 'free' || decoded.user.tariff === 'trial')
        return {
          redirect: {
            permanent: false,
            destination: '/home',
          },
          props: {},
        };

      return {
        props: {
          ...(await serverSideTranslations(locale ?? '', [
            'common',
            'tabs',
            'tableColumns',
            'sellers',
          ])),
          user: decoded.user,
        },
      };
    } catch (error) {
      console.error('Invalid token:', error);

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
