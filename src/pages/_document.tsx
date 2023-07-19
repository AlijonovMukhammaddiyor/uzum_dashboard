import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='uz'>
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
        <style>
          {`
            html {
              scroll-behavior: smooth;
              }`}
        </style>
        <meta
          name='description'
          content="Biznesingiz uchun to'liq analitika. Tashqi va ichki analitika, nish tanlash, mahsulotlar va do'konlar tahlili, taqqoslash, trendlar, narx segmentatsiyasi, banner dizayn va hokazo xizmatlar. Shuningdek, o'sayotgan mahsulotlar va kategoriyalar to'g'risidagi batafsil analitika."
        />
        <meta
          property='og:title'
          content='UzAnalitika - Uzum bozoridagi biznesingiz uchun mukammal tahlil xizmati.'
        />
        <meta
          property='og:description'
          content="Biznesingiz uchun to'liq analitika. Tashqi va ichki analitika, nish tanlash, mahsulotlar va do'konlar tahlili, taqqoslash, trendlar, narx segmentatsiyasi, banner dizayn va hokazo xizmatlar. Shuningdek, o'sayotgan mahsulotlar va kategoriyalar to'g'risidagi batafsil analitika."
        />
        <meta
          property='og:image'
          content='https://www.uzanalitika.uz/images/og_new.png'
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
          content='https://www.uzanalitika.uz/images/og_new.png'
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
              logo: 'https://www.uzanalitika.uz/images/og_new.png',
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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
