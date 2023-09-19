import { GoogleOAuthProvider } from '@react-oauth/google';
import { Analytics } from '@vercel/analytics/react';
import ru from 'date-fns/locale/ru';
import { AppProps } from 'next/app';
import { Merriweather, Raleway, Ubuntu } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
import { registerLocale } from 'react-datepicker';
import { RiAlarmWarningFill } from 'react-icons/ri';
registerLocale('ru', ru);
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
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

            <meta
              property='og:title'
              content='UzAnalitika - Uzum bozoridagi biznesingiz uchun mukammal tahlil xizmati'
            />
            <meta
              property='og:description'
              content="Biznesingiz uchun to'liq analitika. Tashqi va ichki analitika, nish tanlash, mahsulotlar va do'konlar tahlili, taqqoslash, trendlar, narx segmentatsiyasi, banner dizayn va hokazo xizmatlar. Shuningdek, o'sayotgan mahsulotlar va kategoriyalar to'g'risidagi batafsil analitika."
            />
            <meta
              property='og:image'
              content='https://www.uzanalitika.uz/images/og_new.png?v=2'
            />
            <meta property='og:url' content='https://www.uzanalitika.uz/' />
            <meta property='og:site_name' content='Uzum Analitika Xizmatlari' />
            <meta property='og:type' content='website' />
            <meta property='og:locale' content='uz_UZ' />
            <meta property='twitter:card' content='summary_large_image' />
            <meta
              property='twitter:title'
              content='UzAnalitika - Uzum bozoridagi biznesingiz uchun mukammal tahlil xizmati'
            />
            <meta
              property='twitter:description'
              content="Biznesingiz uchun to'liq analitika. Tashqi va ichki analitika, nish tanlash, mahsulotlar va do'konlar tahlili, taqqoslash, trendlar, narx segmentatsiyasi, banner dizayn va hokazo xizmatlar. Shuningdek, o'sayotgan mahsulotlar va kategoriyalar to'g'risidagi batafsil analitika."
            />
            <meta
              property='twitter:image'
              content='https://www.uzanalitika.uz/images/og_new.png?v=2'
            />
            <meta property='twitter:site' content='@uzanalitika' />
            <meta property='twitter:creator' content='@uzanalitika' />
            <meta property='twitter:domain' content='uzanalitika.uz' />
            <meta property='og:image:width' content='1200' />
            <meta property='og:image:height' content='630' />
            <title>
              UzAnalitika - Uzum bozoridagi biznesingiz uchun mukammal tahlil.
            </title>
            <link rel='canonical' href='https://www.uzanalitika.uz/' />
          </Head>

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
