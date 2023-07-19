import * as React from 'react';
import { RiAlarmWarningFill } from 'react-icons/ri';

import Seo from '@/components/Seo';
import ArrowLink from '@/components/shared/links/ArrowLink';

export default function NotFoundPage() {
  return (
    <div>
      <Seo title='Mavjud emas' />
      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
            <RiAlarmWarningFill
              size={60}
              className='drop-shadow-glow animate-flicker text-red-500'
            />
            <h1 className='mt-8 text-4xl md:text-6xl'>Mavjud Emas</h1>
            <ArrowLink className='mt-4 md:text-lg' href='/'>
              Bosh Sahifaga Qaytish
            </ArrowLink>
          </div>
        </section>
      </main>
    </div>
  );
}
