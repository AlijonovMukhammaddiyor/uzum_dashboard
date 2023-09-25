import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTelegramPlane } from 'react-icons/fa';

import Cards from '@/components/pages/landing/components/Cards';
import Features from '@/components/pages/landing/components/Features';
import Footer1 from '@/components/pages/landing/components/Footer1';
import LandingHeader from '@/components/pages/landing/components/LandingHeader';
import LandingMain from '@/components/pages/landing/components/LandingMain';
import TelegramBot from '@/components/pages/landing/components/TelegramBot';
import Tops from '@/components/pages/landing/components/Tops';
function LandingPage() {
  const { t, i18n } = useTranslation('landing');
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // get
      const referral = router.query.referral;
      console.log(referral);
      if (referral) {
        localStorage.setItem('referral', referral.toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);

  return (
    <div className='min-w-screen relative w-full'>
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
      {!open && <LandingHeader />}
      <LandingMain open={open} setOpen={setOpen} />
      <TelegramBot />
      {/* <SectionOverview /> */}
      {/* <Cards /> */}
      {/* <SectionWhy /> */}
      <Cards />
      <Features />
      {/* <SectionFeatures /> */}
      <Tops />
      {/* <Referral /> */}
      <Footer1 />
    </div>
  );
}

export default LandingPage;
