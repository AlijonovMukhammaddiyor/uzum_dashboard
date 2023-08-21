import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';
// import to double right icon from react icons
import { AiOutlineDoubleRight } from 'react-icons/ai';

import clsxm from '@/lib/clsxm';

import graph from '@/assets/graph2.png';
import dashboard from '@/assets/landing/Dashboard.png';
import Pia from '@/assets/landing/piegrapgh.png';

function LandingMain() {
  const { t } = useTranslation('landing');
  //
  return (
    <div className=' base:bg-white w-full overflow-hidden md:py-48 2xl:h-auto'>
      <div className='layout relative flex h-full items-center justify-between gap-10  pb-10'>
        <div className=' base:gap-20 base:w-1/2 flex h-full w-full flex-col justify-start gap-10  py-5'>
          <div className='base:text-start mt-28 flex max-w-full flex-col justify-center md:mt-12  '>
            <div className='flex max-w-full'>
              <h1 className='font-primary text_gradient text-[42px] font-extrabold leading-[45px] lg:text-[42px]'>
                Специализированная аналитика для маркетплейса Uzum
              </h1>
              {/* <h1 className='font-primary text_gradient text-4xl font-extrabold tracking-wider lg:text-4xl '></h1>
              <h1 className='font-primary text_gradient text-4xl font-extrabold tracking-wider lg:text-4xl '></h1> */}
            </div>

            {/* <h1 className=' font-primary  text-5xl font-extrabold tracking-wider  lg:text-5xl'>
              1. Осознание
            </h1>
            <h1 className='font-primary ml-24  text-5xl font-extrabold tracking-wider lg:text-5xl'>
              2. Оптимизация
            </h1>
            <h1 className='font-primary ml-48  text-5xl font-extrabold tracking-wider lg:text-5xl'>
              3. Рост
            </h1> */}
            <p className='mt-6 w-full text-base text-slate-600 md:w-4/5 md:text-xl lg:text-xl'>
              Откройте для себя высокодоходные сегменты, следите за актуальными
              тенденциями, отслеживайте эффективность продаж, выводите ваши
              товары на пик популярности и укрепляйте позиции на маркетплейсе с
              помощью наших передовых аналитических решений
            </p>
            {/* <p className='  w-4/5 text-base md:block md:text-xl lg:text-xl'>
              {t('main.subtitle.line2')}
            </p> */}
          </div>
          <div className='base:hidden relative mt-10 h-1/3 w-full max-w-full items-center justify-center '>
            <Image
              src={Pia}
              alt='futbolka'
              width={500}
              className='all_side_shadow1 absolute -bottom-5 right-2 min-w-[150px] max-w-[180px] rounded-md border'
            />
            <Image
              src={graph}
              alt='graph'
              width={500}
              className='absolute -left-2 -top-10 w-[60%] rounded-md shadow-xl'
            />
            <div className='flex h-full w-full items-center justify-center'>
              <Image
                priority
                src={dashboard}
                alt='dashboard'
                className='soft_shadow mx-auto my-auto w-[100%] rounded-md object-contain'
              />
            </div>
          </div>
          <div className='w-full '>
            <div className='base:flex-row flex w-full flex-col items-center justify-start gap-4'>
              <Link href='#services' className=' base:w-auto w-full'>
                <div
                  className={clsxm(
                    'base:mt-0 text-primary border-primary hover:bg-primary  mx-auto flex  w-full cursor-pointer items-center justify-center',
                    'rounded-lg border-2 py-3 text-[18px] shadow-xl transition-all duration-200 hover:text-white md:px-3  '
                  )}
                >
                  <p>{t('main.button.learn')}</p>
                </div>
              </Link>
              <Link href='/register' className='base:w-auto w-full'>
                <div
                  className={clsxm(
                    'bg-primary base:mt-0 border-primary mx-auto flex w-full shrink-0 cursor-pointer items-center justify-center',
                    'relative rounded-lg border-2 py-3 pl-3 pr-9 text-[18px] text-white shadow-xl transition-all duration-200 hover:bg-[#453685]'
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
        <div className='base:flex relative mt-12 hidden h-[500px] min-h-[500px] w-3/4 rounded-md bg-transparent'>
          <Image
            src={dashboard}
            alt='dashboard'
            className='h-auto w-full max-w-full rounded-md object-cover object-left'
          />
          <Image
            src={Pia}
            alt='futbolka'
            width={1500}
            className='all_side_shadow1 absolute -bottom-16 -right-5 z-50 w-[250px]  max-w-[45%] rounded-md'
          />
          <Image
            src={graph}
            alt='graph'
            width={1500}
            className='all_side_shadow1 absolute -left-[30px] -top-10 z-50 w-[650px] min-w-[400px] max-w-[65%] rounded-md'
          />
        </div>
      </div>
    </div>
  );
}

export default LandingMain;
