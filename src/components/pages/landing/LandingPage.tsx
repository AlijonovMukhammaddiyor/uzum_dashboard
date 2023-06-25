import Head from 'next/head';
import React from 'react';

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
  const [lang, setLang] = React.useState<'uz' | 'ru'>('uz');

  return (
    <div className='relative w-screen'>
      <Head>
        <title>Analitika Uzum</title>
        <link rel='icon' href='/favicon.ico' />
        {/* set lang */}
        <html lang={lang} />
      </Head>
      <div className='border-primary fixed bottom-4 right-0 z-10 flex h-9 items-center justify-center overflow-hidden rounded-l-md border bg-purple-200 bg-opacity-25'>
        <div
          className={clsxm(
            'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm',
            lang === 'uz' && 'bg-primary text-white'
          )}
          onClick={() => setLang('uz')}
        >
          Uz
        </div>
        <div
          className={clsxm(
            'relative flex h-full w-10 cursor-pointer items-center justify-center bg-white p-2 text-sm',
            lang === 'ru' && 'bg-primary text-white'
          )}
          onClick={() => setLang('ru')}
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
