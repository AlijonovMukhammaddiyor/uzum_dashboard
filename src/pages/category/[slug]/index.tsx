import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import API from '@/lib/api';

import Layout from '@/components/layout/Layout';
import CategoryComponent from '@/components/pages/category/slug/CategoryComponent';
import { reverseSlug } from '@/components/pages/category/utils';
import Seo from '@/components/Seo';
import Tabs from '@/components/shared/Tabs';

function Category() {
  const [rendered, setRendered] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<string>('Tovarlar');
  const [path, setPath] = React.useState<{ [key: string]: string }>({});

  React.useEffect(() => {
    setRendered(true);
    window.localStorage.getItem('path') &&
      setPath(JSON.parse(window.localStorage.getItem('path') as string));

    return () => {
      window.localStorage.removeItem('path');
    };
  }, []);

  const router = useRouter();
  const { slug } = router.query as { slug: string };

  if (!rendered) return <></>;

  const { title, id } = reverseSlug(slug);

  return (
    <Layout path={path}>
      <Seo />
      <div className='flex w-full items-center justify-start gap-3'>
        <p>URL:</p>
        <a
          href={`https://uzum.uz/uz/category/${title}-${id}`}
          className='text-sm text-blue-500 hover:underline'
        >
          https://uzum.uz/uz/category/{title}-{id}
        </a>
      </div>

      <Tabs
        tabs={[
          'Tovarlar',
          'Trend',
          'SubKategoriyalar',
          'Narxlar',
          'Do`konlar',
          'Kunlik',
        ]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className='mb-6 mt-4'
      />
      <CategoryComponent activeTab={activeTab} categoryId={id} title={title} />
    </Layout>
  );
}

export default Category;

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
    return {
      props: {
        user: res,
      },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
