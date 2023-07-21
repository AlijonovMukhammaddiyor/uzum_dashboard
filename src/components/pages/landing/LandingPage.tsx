import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import clsxm from '@/lib/clsxm';

import Footer from '@/components/pages/landing/components/Footer';
import LandingHeader from '@/components/pages/landing/components/LandingHeader';
import LandingMain from '@/components/pages/landing/components/LandingMain';
import LandingTarifs from '@/components/pages/landing/components/LandingTarifs';
import SectionFeatures from '@/components/pages/landing/components/SectionFeatures';
import SectionOverview from '@/components/pages/landing/components/SectionOverview';
import SectionWhy from '@/components/pages/landing/components/SectionWhy';
import Tops from '@/components/pages/landing/components/Tops';

function LandingPage() {
  const { t, i18n } = useTranslation('landing');
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

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
      <div className='border-primary fixed right-0 top-20 z-10 flex h-9 items-center justify-center overflow-hidden rounded-l-md border bg-purple-200 bg-opacity-25'>
        <div
          className={clsxm(
            'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm',
            i18n.language === 'uz' && 'bg-primary text-white'
          )}
          onClick={() => changeLanguage('uz')}
        >
          Uz
        </div>
        <div
          className={clsxm(
            'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm',
            i18n.language === 'ru' && 'bg-primary text-white'
          )}
          onClick={() => changeLanguage('ru')}
        >
          Рус
        </div>
      </div>

      <LandingHeader />
      <LandingMain />
      <SectionOverview />
      <SectionWhy />
      <SectionFeatures />
      <Tops />
      <LandingTarifs />
      <Footer />
    </div>
  );
}

export default LandingPage;
