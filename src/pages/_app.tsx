import { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { useEffect, useState } from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '@/styles/globals.css';
import '@/styles/agGrid.css';
import '@/styles/loading.css';
import 'react-medium-image-zoom/dist/styles.css';
import 'react-phone-input-2/lib/style.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import 'reactjs-popup/dist/index.css';
import 'rc-slider/assets/index.css';

import ArrowLink from '@/components/shared/links/ArrowLink';

import { AuthProvider } from '@/context/Context';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

const roboto = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
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
    <AuthProvider>
      <main className={roboto.className}>
        {/* add og manually */}

        {/* <DefaultSeo
          title='UzAnalitika.Uz - Uzum bozoridagi biznesingiz uchun mukammal tahlil xizmati'
          description="Biznesingiz uchun to'liq analitika. Tashqi va ichki analitika, nish tanlash, mahsulotlar va do'konlar tahlili, taqqoslash, trendlar, narx segmentatsiyasi, banner dizayn va hokazo xizmatlar. Shuningdek, o'sayotgan mahsulotlar va kategoriyalar to'g'risidagi batafsil analitika."
          openGraph={{
            type: 'website',
            locale: 'uz_UZ',
            url: 'https://www.uzanalitika.uz/',
            site_name: 'Uzum Analitka Xizmatlari',
            images: [
              {
                url: 'https://www.uzanalitika.uz/images/og.png',
                width: 800,
                height: 600,
                alt: 'Og Image Alt',
              },
            ],
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        /> */}
        <NextNProgress color='rgb(119, 67, 219)' />
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
          <Component {...pageProps} />
        )}
      </main>
    </AuthProvider>
  );
}

export default MyApp;
