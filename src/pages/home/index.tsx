import { GetServerSidePropsContext } from 'next/types';
import nookies from 'nookies';
import * as React from 'react';

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
  const cookies = nookies.get(context);

  // If the user is not authenticated
  if (!cookies.access_token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login', // redirect the user to the login page
      },
      props: {}, // add your own props here if needed
    };
  }

  // If the user is authenticated, return the usual props
  return { props: {} };
}
