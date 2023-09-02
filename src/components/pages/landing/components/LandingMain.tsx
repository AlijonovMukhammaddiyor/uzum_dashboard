import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
// import to double right icon from react icons
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { FaExpandAlt } from 'react-icons/fa';
import { ImShrink2 } from 'react-icons/im';
import Zoom from 'react-medium-image-zoom';
import { Carousel } from 'react-responsive-carousel';
import Popup from 'reactjs-popup';

import clsxm from '@/lib/clsxm';

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
    <div className='bg-primary min-h-screen w-full overflow-hidden md:py-48'>
      <div className='layout relative flex h-full items-start justify-between gap-10  pb-10'>
        <div className='base:gap-20 base:w-1/2 flex h-full w-full flex-col justify-start gap-10  py-5'>
          <div className='base:text-start mt-28 flex max-w-full flex-col justify-center md:mt-12  '>
            <div className='flex max-w-full'>
              <h1 className='font-primary text_gradient base:leading-[50px] text-[36px] font-extrabold leading-[40px] lg:text-[52px]'>
                Специализированная аналитика для маркетплейса Uzum
              </h1>
            </div>
            <p className='mt-6 w-full text-base text-white md:w-4/5 md:text-xl lg:text-xl'>
              Откройте для себя высокодоходные сегменты, следите за актуальными
              тенденциями, отслеживайте эффективность продаж, выводите ваши
              товары на пик популярности и укрепляйте позиции на маркетплейсе с
              помощью наших передовых аналитических решений
            </p>
          </div>

          <div className='base:hidden max-w-ful relative w-full rounded-md bg-transparent'>
            <p className='font-primary mb-6 w-[270px] rounded-md bg-black px-3 py-1 text-center text-base text-white'>
              {i18n.language === 'uz'
                ? 'Xizmatlarimizdan namunalar...'
                : 'Примеры наших услуг...'}
            </p>
            <div
              onClick={() => {
                setOpen(true);
              }}
              className='absolute right-3 top-16 z-[100] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-25'
            >
              <FaExpandAlt
                className='h-5 w-5 cursor-pointer text-black'
                onClick={() => {
                  setOpen(true);
                }}
              />
            </div>
            <Carousel
              autoPlay
              infiniteLoop
              showStatus={false}
              showThumbs={false}
              interval={5000}
              className='relative'
            >
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  priority
                  src={growing}
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
                  priority
                  src={product}
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
                <Image
                  src={best}
                  alt='Best Image'
                  className='rounded-md'
                  priority
                />
                <p className='legend'>
                  {i18n.language === 'uz'
                    ? 'Haftaning eng yaxshi mahsulotlari'
                    : 'Лучшие продукты недели'}
                </p>
              </div>

              <div>
                <Image
                  priority
                  src={filters}
                  alt='Growing Image'
                  className='rounded-md'
                />
                <p className='legend'>
                  {i18n.language === 'uz'
                    ? "O'zingiz istagan daromadli mahsulotlarni toping"
                    : 'Найдите самые прибыльные продукты'}
                </p>
              </div>

              <div>
                <Image src={main} alt='Growing Image' className='rounded-md' />
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
          <div className='w-full '>
            <div className='base:flex-row flex w-full flex-col items-center justify-start gap-4'>
              <Link href='/register' className='base:w-auto w-full'>
                <div
                  className={clsxm(
                    'base:mt-0 mx-auto flex w-full shrink-0 cursor-pointer items-center justify-center border-white bg-white',
                    'text-primary relative rounded-sm border-2 py-3 pl-3 pr-9 text-[18px] shadow-xl transition-all duration-200'
                  )}
                >
                  <p className=''>{t('main.button.signup')}</p>
                  <AiOutlineDoubleRight className='absolute right-2 ml-2 h-5 w-5' />
                </div>
              </Link>
              {/* <div className='bg-primary hover:text-primary mt-10 flex cursor-pointer items-center justify-center rounded-lg px-6 py-4 text-3xl text-white transition-all duration-200 hover:bg-purple-300'>
              <p>Kirish</p>
            </div> */}
            </div>
            {/* <p className='ml-2 mt-2 text-slate-500 md:mt-1'>
              3 kun davomida bepul sinab ko'ring
            </p> */}
          </div>
        </div>
        <div className='base:inline relative mt-20 hidden h-[500px] min-h-[500px] w-3/4 rounded-md bg-transparent'>
          <p className='font-primary mb-6 w-[270px] rounded-md bg-black px-3 py-1 text-center text-base text-white'>
            {i18n.language === 'uz'
              ? 'Xizmatlarimizdan namunalar...'
              : 'Примеры наших услуг...'}
          </p>
          <div
            onClick={() => {
              setOpen(true);
            }}
            className='absolute right-3 top-16 z-[100] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-25'
          >
            <FaExpandAlt
              className='h-5 w-5 cursor-pointer text-black'
              onClick={() => {
                setOpen(true);
              }}
            />
          </div>
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showThumbs={false}
            interval={5000}
            className='relative'
          >
            <div>
              <Zoom>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={growing}
                  alt='Growing Image'
                  className='rounded-md'
                />
              </Zoom>
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
              <Image src={best} alt='Best Image' className='rounded-md' />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? 'Haftaning eng yaxshi mahsulotlari'
                  : 'Лучшие продукты недели'}
              </p>
            </div>

            <div>
              <Image src={filters} alt='Growing Image' className='rounded-md' />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? "O'zingiz istagan daromadli mahsulotlarni toping"
                  : 'Найдите самые прибыльные продукты'}
              </p>
            </div>
            <div>
              <Image src={product} alt='Growing Image' className='rounded-md' />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? 'Mahsulotlar tahlili'
                  : 'Анализ продуктов'}
              </p>
            </div>
            <div>
              <Image src={main} alt='Growing Image' className='rounded-md' />
              <p className='legend'>
                {i18n.language === 'uz'
                  ? "Umumiy ma'lumotlar"
                  : 'Общая информация'}
              </p>
            </div>
            <div>
              <Image
                src={segments}
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
        <Popup
          open={open}
          closeOnDocumentClick={false}
          onClose={() => setOpen(false)}
          contentStyle={{
            width: '100vw',
            height: '100vh',
            overflow: 'scroll',
            // padding: '50px 0 0 0',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999999999,
          }}
        >
          <div
            onClick={() => {
              setOpen(false);
            }}
            className='absolute right-10 top-16 z-[10000] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-25'
          >
            <ImShrink2
              className='h-5 w-5 cursor-pointer text-black'
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
          <Carousel
            autoPlay
            infiniteLoop
            showStatus={false}
            showThumbs={false}
            interval={5000}
            className='mt-[100px]'
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
                className='rounded-md'
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
        </Popup>
      </div>
    </div>
  );
}

export default LandingMain;
