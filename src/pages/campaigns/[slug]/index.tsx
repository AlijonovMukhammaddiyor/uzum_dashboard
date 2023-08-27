import jsonwebtoken from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';

// import { productTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import CampaignProductComponent from '@/components/pages/campaigns/CampaignProductComponent';
import Seo from '@/components/Seo';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface ProductProps {
  user: UserType;
  product_id: string;
}

function Product({ user, product_id }: ProductProps) {
  const { t, i18n } = useTranslation('products');
  const { t: t2 } = useTranslation('common');
  const [rendered, setRendered] = React.useState(false);
  const [product_title, setTitle] = React.useState<string>('');

  const [activeTab, setActiveTab] = React.useState<string>(
    t('tabs.about_product')
  );
  const { dispatch } = useContextState();

  React.useEffect(() => {
    setActiveTab(t('tabs.about_product'));

    const api = new API(null);

    api
      .get('/product/' + product_id + '/')
      .then((res) => {
        setTitle(res.data.title);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [t, i18n.language, product_id]);

  React.useEffect(() => {
    setRendered(true);
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          [t2('sidebar.campaigns')]: '/campaigns',
          [product_title]: `/campaigns/${product_title}--${product_id}`,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id, product_title]);

  if (!rendered || !product_id || !product_title) return <></>;

  return (
    <Layout>
      <Seo />
      <div className='flex w-max items-center justify-start gap-3 rounded-md border border-slate-400 px-2 py-1'>
        <p className='text-sm font-semibold'>URL:</p>
        <a
          href={`https://uzum.uz/uz/product/${product_title
            .replace(/\//g, '')
            .replace(/ /g, '-')}-${product_id}`}
          className='text-sm text-blue-500 hover:underline'
          target='_blank'
        >
          https://uzum.uz/uz/product/
          {product_title.replace(/\//g, '').replace(/ /g, '-')}-{product_id}
        </a>
      </div>
      <CampaignProductComponent product_id={product_id} />
    </Layout>
  );
}

export default Product;

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

      const slug = context.query.slug as string;
      const id = slug;
      if (!id) {
        return {
          redirect: {
            permanent: false,
            destination: '/products',
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
          product_id: id,
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
        destination: '/products',
      },
      props: {},
    };
  }
}
