import { Head, Html, Main, NextScript } from 'next/document';
import { SSRConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Document() {
  const { i18n } = useTranslation(); // ru and uz

  return (
    <Html
      lang={
        i18n.language === 'uz' ? 'uz' : i18n.language === 'ru' ? 'ru' : 'en'
      }
    >
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
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='apple-mobile-web-app-title' content='UzAnalitika' />
        <meta name='application-name' content='UzAnalitika' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff'></meta>

        <meta name='msapplication-TileImage' content='/mstile-150x150.png' />
        <link rel='manifest' href='/site.webmanifest' />

        <style>
          {`
            html {
              scroll-behavior: smooth;
              }`}
        </style>
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          async
          src='https://www.googletagmanager.com/gtag/js?id=G-WKZG4TWHPK'
        />
        <script
          defer
          async
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-WKZG4TWHPK');
              `,
          }}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'UzAnalitika',
              url: 'https://www.uzanalitika.uz/',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+82 10 3268 2066',
                contactType: "Bo'glanish",
                availableLanguage: ['Uzbek', 'Russian'],
              },
            }),
          }}
        />

        <script
          defer
          async
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

export const getStaticProps = async (ctx: {
  locale: string;
}): Promise<{ props: SSRConfig }> => ({
  props: {
    ...(await serverSideTranslations(ctx.locale, ['landing', 'common', 'seo'])),
  },
});
