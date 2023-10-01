import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import React, { useEffect } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

import Cards from '@/components/pages/landing/components/Cards';
import Features from '@/components/pages/landing/components/Features';
import Footer1 from '@/components/pages/landing/components/Footer1';
import LandingHeader from '@/components/pages/landing/components/LandingHeader';
import LandingMain from '@/components/pages/landing/components/LandingMain';
import TelegramBot from '@/components/pages/landing/components/TelegramBot';
import Tops from '@/components/pages/landing/components/Tops';

function LandingPage() {
  const [open, setOpen] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation('seo');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // get
      const referral = router.query.referral;
      if (referral) {
        localStorage.setItem('referral', referral.toString());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeof window]);

  return (
    <div className='min-w-screen relative w-full'>
      <NextSeo
        title={t('title')}
        description={t('description')}
        canonical={`https://www.uzanalitika.uz/${
          i18n.language
        }${router.asPath.replace(/\?.*/, '')}`}
        openGraph={{
          url: 'https://www.uzanalitika.uz/',
          title: t('title'),
          description: t('description'),
          images: [
            {
              url: 'https://www.uzanalitika.uz/images/og_new.png?v=2',
              width: 1200,
              height: 630,
              alt: 'Og Image Alt',
            },
          ],
          site_name: 'uzanalitika.uz',
        }}
        twitter={{
          handle: '@uzanalitika',
          site: '@uzanalitika',
          cardType: 'summary_large_image',
        }}
      />

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
