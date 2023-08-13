import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaTelegramPlane } from 'react-icons/fa';

import Footer1 from '@/components/pages/landing/components/Footer1';
import LandingHeader from '@/components/pages/landing/components/LandingHeader';
import LandingMain from '@/components/pages/landing/components/LandingMain';
import Referral from '@/components/pages/landing/components/Referral';
import SectionFeatures from '@/components/pages/landing/components/SectionFeatures';
import SectionWhy from '@/components/pages/landing/components/SectionWhy';
import Tops from '@/components/pages/landing/components/Tops';

function LandingPage() {
  const { t, i18n } = useTranslation('landing');
  const router = useRouter();

  return (
    <div className='relative w-screen'>
      <Head>
        <title>Analitika Uzum</title>
        <link rel='icon' href='/favicon.ico' />
        {/* set lang */}
        <html
          lang={
            i18n.language === 'uz' ? 'uz' : i18n.language === 'ru' ? 'ru' : 'en'
          }
        />
      </Head>

      <div className='shadow-3xl fixed bottom-5 right-5 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-500'>
        <a
          href='https://t.me/uzum_uzanalitika'
          target='_blank'
          className='items-center justify-center'
        >
          <FaTelegramPlane className='text-2xl text-white' />
        </a>
      </div>

      <LandingHeader />
      <LandingMain />
      {/* <SectionOverview /> */}
      <SectionWhy />
      <SectionFeatures />
      <Tops />
      <Referral />
      <Footer1 />
    </div>
  );
}

export default LandingPage;
