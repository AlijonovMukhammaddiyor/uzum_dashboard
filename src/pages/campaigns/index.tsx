import jsonwebtoken from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next/types';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import CampaignProductsTable from '@/components/pages/campaigns/CampaignProductsTable';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

export interface HomeProps {
  user: UserType;
}

export default function Campaigns({ user }: HomeProps) {
  const { dispatch } = useContextState();
  const { t } = useTranslation('tabs');
  const { t: t2 } = useTranslation('common');

  React.useEffect(() => {
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          [t2('sidebar.campaigns')]: '/campaigns',
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Layout>
      <CampaignProductsTable />
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

      if (
        decoded.user.tariff !== 'seller' &&
        decoded.user.tariff !== 'business'
      ) {
        return {
          redirect: {
            permanent: false,
            destination: context.req.headers.referer || '/home',
          },
          props: {},
        };
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
