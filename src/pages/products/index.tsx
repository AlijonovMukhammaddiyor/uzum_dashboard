import jsonwebtoken from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import * as React from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

// import { productTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import ProductsComponent from '@/components/pages/products/ProductsComponent';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface ProductsProps {
  user: UserType;
}

export default function Products({ user }: ProductsProps) {
  const { dispatch } = useContextState();
  const { t, i18n } = useTranslation('common');
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
          [t('sidebar.products')]: '/products',
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <NextSeo
        title={
          i18n?.language === 'uz'
            ? 'Mahsulotlar Analitikasi'
            : 'Аналитика Продуктов'
        }
        description={
          i18n?.language === 'uz'
            ? "Yangi mahsulotlarni kashf eting, tadqiqotlar o'tkazing va sabablarni o'rganing."
            : 'Найдите возможности для продуктов, проведите исследования рынка и многое другое.'
        }
        canonical={`https://www.uzanalitika.uz/${
          i18n.language
        }${router.asPath.replace(/\?.*/, '')}`}
      />
      <ProductsComponent user={user} />
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
            'products',
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
