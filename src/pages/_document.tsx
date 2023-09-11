import { Head, Html, Main, NextScript } from 'next/document';
import { useTranslation } from 'next-i18next';

export default function Document() {
  const { i18n } = useTranslation(); // ru and uz

  return (
    <Html lang={i18n.language}>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200&display=swap'
          rel='stylesheet'
        />
        <meta
          name='google-site-verification'
          content='uW3Oy8QMSpgZN6xHK6D1Gr0ludeQGRMBBueMaopvKFY'
        />
        <link
          rel='shortcut icon'
          href='https://www.uzanalitika.uz/favicon.ico'
          type='image/x-icon'
        />
        <link
          rel='icon'
          href='/images/favicon-16x16.png'
          sizes='16x16'
          type='image/png'
        />
        <link
          rel='icon'
          href='/images/favicon-32x32.png'
          sizes='32x32'
          type='image/png'
        />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/images/apple-touch-icon.png'
        />
        <meta
          name='msapplication-TileImage'
          content='/images/mstile-150x150.png'
        />
        <link rel='manifest' href='/site.webmanifest' />

        <style>
          {`
            html {
              scroll-behavior: smooth;
              }`}
        </style>

        <meta
          name='description'
          content={
            i18n.language === 'uz'
              ? "Biznesingiz uchun to'liq analitika. Tashqi va ichki analitika, nish tanlash, mahsulotlar va do'konlar tahlili, taqqoslash, trendlar, narx segmentatsiyasi, banner dizayn va hokazo xizmatlar. Shuningdek, o'sayotgan mahsulotlar va kategoriyalar to'g'risidagi batafsil analitika."
              : 'Полноценные инструменты аналитики для вашего бизнеса на Uzum Market. Внешний и внутренний анализ, выбор ниши, анализ товаров и магазинов, сравнение, тенденции, ценовая сегментация и т. д. А также детальный анализ перспективных товаров и категорий.'
          }
        />
        <meta
          property='og:title'
          content={
            i18n.language === 'uz'
              ? 'UzAnalitika - UZUM market tahlili'
              : 'UzAnalitika - Аналитика UZUM маркет'
          }
        />
        <meta
          property='og:description'
          content={
            i18n.language === 'uz'
              ? "Biznesingiz uchun to'liq analitika. Tashqi va ichki analitika, nish tanlash, mahsulotlar va do'konlar tahlili, taqqoslash, trendlar, narx segmentatsiyasi, banner dizayn va hokazo xizmatlar. Shuningdek, o'sayotgan mahsulotlar va kategoriyalar to'g'risidagi batafsil analitika."
              : 'Полноценные инструменты аналитики для вашего бизнеса на Uzum Market. Внешний и внутренний анализ, выбор ниши, анализ товаров и магазинов, сравнение, тенденции, ценовая сегментация и т. д. А также детальный анализ перспективных товаров и категорий.'
          }
        />
        <meta
          property='og:image'
          content='https://www.uzanalitika.uz/images/og_new.png?v=2'
        />
        <meta property='og:url' content='https://www.uzanalitika.uz/' />
        <meta property='og:site_name' content='uzanalitika.uz' />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='uz_UZ' />
        <meta property='twitter:card' content='summary_large_image' />
        <meta
          property='twitter:title'
          content='UzAnalitika - UZUM market tahlili'
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
        <link rel='canonical' href='https://www.uzanalitika.uz/' />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'UzAnalitika',
              url: 'https://www.uzanalitika.uz/',
              logo: 'https://www.uzanalitika.uz/images/favicon.ico',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+82 10 3268 2066',
                contactType: 'Xizmatlar',
                availableLanguage: ['Uzbek', 'Russian'],
              },
              sameAs: [
                'https://www.facebook.com/UzAnalitika',
                'https://www.instagram.com/UzAnalitika',
                'https://www.twitter.com/UzAnalitika',
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Main Street',
                addressLocality: 'Tashkent',
                addressRegion: 'Tashkent Region',
                postalCode: '10000',
                addressCountry: 'UZ',
              },
            }),
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              (function() {
                var u="https://uzanalitikauz.matomo.cloud/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '1']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.async=true; g.src='//cdn.matomo.cloud/uzanalitikauz.matomo.cloud/matomo.js'; s.parentNode.insertBefore(g,s);
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
