import { GetServerSidePropsContext } from 'next/types';
import * as React from 'react';

import { API } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import HomeComponent from '@/components/pages/home/HomeComponent';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  return (
    <Layout path={{ Umumiy: '/' }}>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />
      <HomeComponent />
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const api = API.createServerApi(context);
    // const res = await api.get('/api/user');

    // Return the data that was fetched from the API
    return {
      props: {
        // data: res.data,
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
