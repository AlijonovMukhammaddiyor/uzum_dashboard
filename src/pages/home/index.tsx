import jsonwebtoken from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

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
  const { t } = useTranslation('tabs');

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
          [t('home.overview')]: '/home',
        },
      },
    });
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

      console.log('decoded', decoded);

      if (!decoded.user) {
        try {
          // remove refresh and access token from cookies and redirect to login
          context.res.setHeader(
            'Set-Cookie',
            'refresh=; access=; HttpOnly; Path=/; Max-Age=0'
          );

          return {
            redirect: {
              permanent: false,
              destination: '/login',
            },
            props: {},
          };
        } catch (e) {
          logger(e, 'Error in redirect');
        }
      }

      const { locale } = context;

      return {
        props: {
          ...(await serverSideTranslations(locale ?? '', [
            'common',
            'tabs',
            'tableColumns',
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
