import { GetServerSidePropsContext } from 'next';
import * as React from 'react';

import { API } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import CategoryComponent from '@/components/pages/category/CategoryComponent';
import Seo from '@/components/Seo';

import { CategoryInTree } from '@/types/category';

export default function Category({ data }: any) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Layout
      path={{
        Kategoriyalar: '/category',
      }}
    >
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <CategoryComponent data={data.children as CategoryInTree[]} />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = API.createServerApi(context);
    const res = await api.get('/category');

    // Return the data that was fetched from the API
    return {
      props: {
        data: res.data,
      },
    };
  } catch (error: any) {
    // Handle specific error codes or conditions
    if (error.response && error.response.status === 401) {
      return {
        redirect: {
          permanent: false,
          destination: '/login', // redirect the user to the login page
        },
        props: {}, // add your own props here if needed
      };
    }

    // Handle other errors
    // console.error('Error:', error);

    // Return an error message or other data as props
    return {
      redirect: {
        permanent: false,
        destination: '/login', // redirect the user to the login page
      },
      props: {}, // add your own props here if needed
    };
  }
}
