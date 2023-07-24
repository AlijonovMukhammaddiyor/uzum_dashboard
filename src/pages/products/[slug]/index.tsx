import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

import API from '@/lib/api';

// import { productTableColumnDefs } from '@/components/columnDefs';
import Layout from '@/components/layout/Layout';
import ProductComponent from '@/components/pages/products/slug/ProductComponent';
import Seo from '@/components/Seo';
import Tabs from '@/components/shared/Tabs';

import { useContextState } from '@/context/Context';

import { UserType } from '@/types/user';

interface ProductProps {
  user: UserType;
  product_id: string;
  product_title: string;
}

function Product({ user, product_id, product_title }: ProductProps) {
  const [rendered, setRendered] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>('Mahsulot haqida');
  const { dispatch } = useContextState();

  React.useEffect(() => {
    setRendered(true);
    dispatch({ type: 'USER', payload: { user } });
    dispatch({
      type: 'PATH',
      payload: {
        path: {
          Mahsulotlar: '/products',
          [product_title]: `/products/${product_title}--${product_id}`,
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

      <Tabs
        tabs={['Mahsulot haqida', 'Grafik Analiz', "O'xshash Mahsulotlar"]}
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
    const api = new API(context);
    // check if user is logged in
    const res = await api.getCurrentUser();
    if (!res) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {},
      };
    }
    const { slug } = context.query;
    if (!slug) {
      return {
        redirect: {
          permanent: false,
          destination: '/products',
        },
        props: {},
      };
    }

    const product_id = slug as string;

    if (!product_id) {
      return {
        redirect: {
          permanent: false,
          destination: '/products',
        },
        props: {},
      };
    }

    const product = await api.get('/product/' + product_id + '/');

    return {
      props: {
        ...(await serverSideTranslations(context.locale || 'uz', ['common'])),
        user: res,
        product_id,
        product_title: product.data.title,
      },
    };
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
