import { GoogleOAuthProvider } from '@react-oauth/google';
import { Analytics } from '@vercel/analytics/react';
import ru from 'date-fns/locale/ru';
import { AppProps } from 'next/app';
import { Merriweather, Raleway, Ubuntu } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { appWithTranslation, SSRConfig, useTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import { RiAlarmWarningFill } from 'react-icons/ri';
registerLocale('ru', ru);
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DefaultSeo } from 'next-seo';

import '@/styles/colors.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import '@/styles/globals.css';
import '@/styles/agGrid.css';
import '@/styles/loading.css';
// import 'antd/dist/antd.css';
import 'react-medium-image-zoom/dist/styles.css';
import 'react-phone-input-2/lib/style.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'reactjs-popup/dist/index.css';
import 'rc-slider/assets/index.css';
import 'intro.js/introjs.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import ArrowLink from '@/components/shared/links/ArrowLink';
import Tour from '@/components/Tour';

// const Tour = dynamic(() => import('../components/Tour'), { ssr: false });
import { GOOGLE_CLIENT_ID } from '@/constant/env';
import { AuthProvider } from '@/context/Context';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

// const roboto = Poppins({
//   subsets: ['latin'],
//   weight: ['100', '300', '400', '500', '700', '900'],
//   style: ['normal', 'italic'],
//   display: 'swap',
// });

const merri = Merriweather({
  subsets: ['cyrillic', 'latin', 'latin-ext'],
  weight: ['300', '400', '900', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-merri',
});

const ubuntu = Ubuntu({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-ubuntu',
});

const raleway = Raleway({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-raleway',
});

function MyApp({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { i18n } = useTranslation('seo');

  const router = useRouter();

  const checkMobile = () => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );
    const isScreenWidthSmall = window.innerWidth < 800; // adjust this as per your requirement

    setIsMobile(mobile || isScreenWidthSmall);
  };

  useEffect(() => {
    if (
      router.pathname !== '/' &&
      !router.pathname.startsWith('/login') &&
      !router.pathname.startsWith('/register')
    ) {
      checkMobile();
      window.addEventListener('resize', checkMobile);

      return () => {
        // cleanup the event listener on component unmount
        window.removeEventListener('resize', checkMobile);
      };
    }
  }, [router.pathname]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <main
          className={`${ubuntu.variable} ${merri.variable} ${raleway.variable}`}
          style={{
            minHeight: '100%',
            minWidth: '100%',
          }}
        >
          <Tour />
          <Head>
            <meta
              name='viewport'
              // it must be 0.8 intial-scale for all
              content='width=device-width, initial-scale=0.8, maximum-scale=1.0, viewport-fit=cover'
            />
            <meta
              name='google-site-verification'
              content='uW3Oy8QMSpgZN6xHK6D1Gr0ludeQGRMBBueMaopvKFY'
            />
          </Head>

          <DefaultSeo
            title='Сервис Аналитика UZUM Market - №1 UZUM Аналитика в Узбекистане'
            titleTemplate='UzAnalitika | %s'
            defaultTitle='UzAnalitika'
            description='Аналитика UZUM MARKET. Внешняя и внутренняя аналитика, выбор ниши, анализ продуктов и магазинов, трендов, ценовая сегментация и другие услуги. А также подробная аналитика по растущим продуктам и категориям. '
            canonical={`https://www.uzanalitika.uz/${
              i18n.language
            }${router.asPath.replace(/\?.*/, '')}`}
            openGraph={{
              url: 'https://www.uzanalitika.uz/',
              title:
                'Сервис Аналитика UZUM Market - №1 UZUM Аналитика в Узбекистане',
              description:
                'Полный аналитика для вашего бизнеса на маркетплейсе UZUM. Внешняя и внутренняя аналитика, выбор ниши, анализ продуктов и магазинов, трендов, ценовая сегментация и другие услуги. А также подробная аналитика по растущим продуктам и категориям.',
              images: [
                {
                  url: 'https://www.uzanalitika.uz/images/og_new.png?v=2',
                  width: 1200,
                  height: 630,
                  alt: 'UzAnalitika - Сервис Аналитика UZUM Market',
                },
              ],
              site_name: 'uzanalitika.uz',
              locale: 'ru_RU',
            }}
            languageAlternates={[
              {
                href: 'https://www.uzanalitika.uz/uz',
                hrefLang: 'uz',
              },
              {
                href: 'https://www.uzanalitika.uz/ru',
                hrefLang: 'ru',
              },
            ]}
            twitter={{
              handle: '@uzanalitika',
              site: '@uzanalitika',
              cardType: 'summary_large_image',
            }}
          />

          <NextNProgress color='rgb(119, 67, 219)' height={8} />
          {isMobile &&
          router.pathname !== '/' &&
          !router.pathname.startsWith('/login') &&
          !router.pathname.startsWith('/register') ? (
            <div>
              <main>
                <section className='bg-white'>
                  <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
                    <RiAlarmWarningFill
                      size={60}
                      className='drop-shadow-glow animate-flicker text-red-500'
                    />
                    <h2 className='mt-8 text-3xl md:text-6xl'>
                      Iltimos kompyuter orqali kiring!
                    </h2>
                    <ArrowLink className='mt-4 md:text-lg' href='/'>
                      Bosh Sahifaga Qaytish
                    </ArrowLink>
                  </div>
                </section>
              </main>
            </div>
          ) : (
            <>
              <Component {...pageProps} />
              <Analytics />
            </>
          )}
        </main>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default appWithTranslation(MyApp);

export const getStaticProps = async (ctx: {
  locale: string;
}): Promise<{ props: SSRConfig }> => ({
  props: {
    ...(await serverSideTranslations(ctx.locale, ['landing', 'common', 'seo'])),
  },
});
