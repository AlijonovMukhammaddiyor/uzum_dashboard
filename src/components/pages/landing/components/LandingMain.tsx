import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
// import to double right icon from react icons
import { Carousel } from 'react-responsive-carousel';

import best from '@/assets/new_landing/best.png';
import filters from '@/assets/new_landing/filters.png';
import growing from '@/assets/new_landing/growing.png';
import main from '@/assets/new_landing/main.png';
import product from '@/assets/new_landing/product.png';
import segments from '@/assets/new_landing/segments.png';
import shop_products from '@/assets/new_landing/shop_products.png';
import shop_products_pie from '@/assets/new_landing/shop_products_pie.png';

function LandingMain({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { t, i18n } = useTranslation('landing');
  //
  return (
    <div className='h-auto w-full bg-white py-20'>
      <div className='layout mt-10 flex h-full flex-col items-center justify-between gap-10 px-5 pb-10'>
        <div className='flex flex-col items-start justify-start gap-4 md:items-center'>
          <p className='text-primary text-right text-xs md:text-base'>
            Не догадывайтесь — используйте чёткие данные для решений.
          </p>
          <div className='flex w-full flex-col items-start justify-center md:items-center'>
            <h1 className='font-merri base:text-4xl mb-2 font-bold leading-tight text-[#222] lg:text-6xl'>
              Специализированная аналитика
            </h1>
            <h1 className='font-merri base:text-4xl font-bold leading-tight text-[#222] lg:text-6xl'>
              для маркетплейса <span className='text-primary'>Uzum.uz</span>
            </h1>
          </div>

          <p className='text-base text-slate-600 md:text-center md:text-lg'>
            Откройте для себя высокодоходные сегменты, следите за актуальными
            тенденциями, и укрепляйте позиции.
          </p>
        </div>
        <div className='mt-5 flex w-full flex-col items-center justify-center gap-5 md:mt-10 md:flex-row'>
          <div className='relative w-full md:w-auto'>
            <p className='absolute -top-5 text-xs text-slate-400'>
              {i18n.language === 'uz'
                ? 'Tavsiya: Kompyuter orqali kiring.'
                : 'Совет: Войдите с компьютера.'}
            </p>
            <Link href='/register' className='w-full'>
              <button className='bg-primary hover:text-primary border-primary w-full rounded-lg border-2 px-5 py-[10px] text-white shadow-md transition duration-200 hover:bg-white active:scale-95 md:w-auto'>
                {t('main.button.signup')}
              </button>
            </Link>
          </div>

          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              backgroundColor: '#FF0000',
              padding: '10px 20px',
              borderRadius: '8px',
              position: 'relative',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
            className='hidden w-full md:flex md:w-auto'
          >
            <a
              href='https://www.youtube.com/watch?v=zsZtVNYyPEc&t=1s'
              target='_blank'
              rel='noopener noreferrer'
              style={{
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              YouTube
            </a>
            <a
              href='https://www.youtube.com/watch?v=zsZtVNYyPEc&t=1s'
              style={{
                fontSize: '12px',
                backgroundColor: 'white',
                color: '#FF0000',
                padding: '2px 4px',
                borderRadius: '4px',
              }}
            >
              {i18n.language === 'uz' ? "Qo'llanma" : 'Руководство'}
            </a>
          </div>
          <div className='aspect-ratio-wrapper md:hidden'>
            <iframe
              className='aspect-ratio-iframe'
              src='https://www.youtube.com/embed/zsZtVNYyPEc?si=UZBQQLbH7gs_PYt-'
              title='YouTube video player'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className='all_side_shadow base:p-10 hidden rounded-xl bg-slate-200 p-3 md:block'>
          <p className='font-primary mb-6 w-[270px] rounded-md bg-black px-3 py-1 text-center text-base text-white'>
            {i18n.language === 'uz'
              ? 'Xizmatlarimizdan namunalar...'
              : 'Примеры наших услуг...'}
          </p>{' '}
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showThumbs={false}
            interval={3000}
            className=''
          >
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src={growing}
                priority
                alt='Growing Image'
                className='rounded-md'
              />
              <p
                className='legend'
                style={{
                  opacity: 1,
                }}
              >
                {i18n.language === 'uz'
                  ? "O'sayotgan mahsulotlar"
                  : 'Перспективные продукты'}
              </p>
            </div>
            <div>
              <Image
                src={product}
                priority
                alt='Growing Image'
                className='rounded-md'
              />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? 'Mahsulotlar tahlili'
                  : 'Анализ продуктов'}
              </p>
            </div>
            <div>
              <Image src={best} alt='Best Image' className='rounded-md' />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? 'Haftaning eng yaxshi mahsulotlari'
                  : 'Лучшие продукты недели'}
              </p>
            </div>

            <div>
              <Image
                src={filters}
                priority
                alt='Growing Image'
                className='h-full rounded-md object-cover'
              />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? "O'zingiz istagan daromadli mahsulotlarni toping"
                  : 'Найдите самые прибыльные продукты'}
              </p>
            </div>

            <div>
              <Image
                src={main}
                priority
                alt='Growing Image'
                className='rounded-md'
              />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? "Umumiy ma'lumotlar"
                  : 'Общая информация'}
              </p>
            </div>
            <div>
              <Image
                src={segments}
                priority
                alt='Growing Image'
                className='rounded-md'
              />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? 'Kategoriyalarning Uzumdagi ulushlari'
                  : 'Успех категорий на Uzum'}
              </p>
            </div>
            <div>
              <Image
                src={shop_products_pie}
                priority
                alt='Growing Image'
                className='rounded-md'
              />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? "Do'konning eng yaxshi mahsulotlari"
                  : 'Лучшие продукты магазина'}
              </p>
            </div>
            <div>
              <Image
                src={shop_products}
                priority
                alt='Shop Products Image'
                className='rounded-md'
              />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? "Do'konning barcha mahsulotlari tahlili"
                  : 'Анализ всех продуктов магазина'}
              </p>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default LandingMain;
