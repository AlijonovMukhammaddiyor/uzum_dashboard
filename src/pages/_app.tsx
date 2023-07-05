import { AppProps } from 'next/app';
import { Poppins } from 'next/font/google';
import NextNProgress from 'nextjs-progressbar';

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
  return (
    <AuthProvider>
      <main className={roboto.className}>
        <NextNProgress color='rgb(119, 67, 219)' />
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}

export default MyApp;
