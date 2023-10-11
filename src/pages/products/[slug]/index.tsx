import jsonwebtoken from 'jsonwebtoken';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import logger from '@/lib/logger';

// import { productTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import ProductComponent from '@/components/pages/products/slug/ProductComponent';
import { RenderAlert } from '@/components/shared/AlertComponent';
import Tabs from '@/components/shared/Tabs';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface ProductProps {
  user: UserType;
  product_id: string;
}

function Product({ user, product_id }: ProductProps) {
  const { t, i18n } = useTranslation('products');
  const { t: t2 } = useTranslation('tabs');
  const [rendered, setRendered] = React.useState(false);
  const [product_title, setTitle] = React.useState<string>('');
  const [activeTab, setActiveTab] = React.useState<string>(
    t('tabs.about_product')
  );
  const { dispatch } = useContextState();
  const [notAllowedTab, setNotAllowedTab] = React.useState<string>('');
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
    if (notAllowedTab && user?.tariff === 'trial')
      RenderAlert({
        alertTitle: t2('tariffs.not_allowed'),
        // alertSubtitle: t('home.new_products.info'),
        buttonTitle: t2('tariffs.tariffs'),
        buttonLink: '/profile',
      });
    setNotAllowedTab('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notAllowedTab, user?.tariff]);

  React.useEffect(() => {
    setRendered(true);
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          Mahsulotlar: '/products',
          [product_title]: `/products/${product_id}`,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product_id, product_title]);

  if (!rendered || !product_id || !product_title) return <></>;

  const isPaid = user.tariff !== 'free' && user.tariff !== 'trial';

  return (
    <Layout>
      <NextSeo
        title={product_title}
        canonical={`https://www.uzanalitika.uz/${
          i18n.language
        }${router.asPath.replace(/\?.*/, '')}`}
      />
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
          {product_title
            .replace(/\//g, '')
            .replace(/ /g, '-')
            .replace(/,/g, '')}
          -{product_id}
        </a>
      </div>

      <Tabs
        tabs={[
          t('tabs.about_product'),
          t('tabs.sku_analytics'),
          t('tabs.graph_analysis'),
          t('tabs.similar_products'),
          t('tabs.position'),
          // 'Test',
        ]}
        setNotAllowedTab={setNotAllowedTab}
        premiumTabs={[t('tabs.position'), t('tabs.sku_analytics')]}
        disbaledTabs={isPaid ? [] : [t('tabs.position')]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4 '
      />
      <ProductComponent
        product_id={product_id}
        activeTab={activeTab}
        user={user}
      />
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

      if (decoded.user.tariff === 'free') {
        return {
          redirect: {
            destination: context.req.headers.referer || '/products', // Redirect back to the current page
            permanent: false,
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

      return {
        props: {
          ...(await serverSideTranslations(context.locale || 'uz', [
            'common',
            'tabs',
            'products',
            'tableColumns',
          ])),
          user: decoded.user,
          product_id: id,
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
        destination: '/products',
      },
      props: {},
    };
  }
}
