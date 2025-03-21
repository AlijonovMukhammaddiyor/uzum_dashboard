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
import CategoryTreeComponent from '@/components/pages/category/CategoryTreeComponent';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

export interface CategoryProps {
  user: UserType;
}

export default function Category({ user }: CategoryProps) {
  const [mounted, setMounted] = React.useState(false);
  const { dispatch } = useContextState();
  const { i18n } = useTranslation();
  const router = useRouter();

  React.useEffect(() => {
    setMounted(true);
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          [i18n.language === 'uz' ? 'Kategoriyalar' : 'Категории']: '/category',
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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

  if (!mounted) return null;

  return (
    <Layout>
      <NextSeo
        title={
          i18n?.language === 'uz' ? 'Kategoriyalar Tahlili' : 'Анализ Категорий'
        }
        description={
          i18n?.language === 'uz'
            ? "Har bir kategoriyadagi trendlar, mahsulotlar, va sotuvchilarni batafsil o'rganing"
            : 'Подробно изучите тренды, продукты и продавцов в каждой категории'
        }
        canonical={`https://www.uzanalitika.uz/${
          i18n.language
        }${router.asPath.replace(/\?.*/, '')}`}
      />
      <CategoryTreeComponent />
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

      return {
        props: {
          ...(await serverSideTranslations(locale ?? 'uz', [
            'common',
            'tabs',
            'tableColumns',
            'categories',
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
