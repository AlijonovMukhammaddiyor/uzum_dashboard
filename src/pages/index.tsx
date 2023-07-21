import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import LandingPage from '@/components/pages/landing/LandingPage';

export default function HomePage() {
  return (
    <div>
      {/* <Seo /> */}
      <LandingPage />
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'uz', ['landing', 'common'])),
    },
  };
}
