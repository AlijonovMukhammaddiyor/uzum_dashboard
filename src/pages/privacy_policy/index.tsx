import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';

import PrivacyPolicy from '@/components/pages/privacy_policy/PrivacyPolicy';

export default function HomePage() {
  return (
    <div>
      {/* <Seo /> */}
      <PrivacyPolicy />
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: any }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || 'uz',
        ['landing', 'common'],
        null,
        ['uz', 'ru']
      )),
    },
  };
}
