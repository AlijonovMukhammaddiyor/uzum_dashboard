import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import React from 'react';

import futbolka from '@/assets/futbolka.png';
import graph from '@/assets/graph.png';
import dashboard from '@/assets/home_umumiy.png';

function LandingMain() {
  const { t } = useTranslation('landing');
  //
  return (
    <div className=' base:h-auto  base:bg-white h-[calc(100vh-98px)] w-full overflow-hidden'>
      <div className='layout relative flex h-full flex-col items-center justify-between  pb-10'>
        <div className='base:justify-center base:gap-20 flex h-full flex-col justify-center gap-10 py-5 2xl:justify-center '>
          <div className='base:text-center pr-10'>
            <h1 className='font-primary base:mb-2 base:leading-10 mb-4 text-6xl font-extrabold leading-[3.3rem] tracking-wider md:text-6xl '>
              {t('main.title.line1.part1')}{' '}
              <span className='text_gradient '>
                {t('main.title.line1.part2')}
              </span>
            </h1>
            <h1 className='font-primary text_gradient first-letter: base:leading-10 base:py-4 mb-6 text-6xl font-extrabold leading-[3.3rem] tracking-wider md:text-6xl '>
              {t('main.title.line2.part1')}{' '}
              <span className=' text-black'>
                {t('main.title.line2.part2')}!
              </span>
            </h1>
            <p className='mt-4 text-base md:mt-0 md:text-xl lg:text-xl'>
              {t('main.subtitle.line1')}
            </p>
            <p className='base:max-w-[80%]  mx-auto text-base md:block md:text-xl lg:text-xl'>
              {t('main.subtitle.line2')}
            </p>
          </div>
          <div className='base:bottom-[370px] base:top-[300px] base:left-[500px] base:w-[900px] base:hidden bottom-[290px] right-0 h-1/3 w-full overflow-hidden lg:-right-40  lg:left-[700px]'>
            <Image
              priority
              src={dashboard}
              alt='dashboard'
              className='h-full w-full object-contain '
            />
          </div>
          <div className='w-full '>
            <div className='base:flex-row flex w-full flex-col items-center justify-around gap-8 '>
              <Link href='/register' className=' w-full'>
                <div className='bg-primary base:mt-0 hover:text-primary base:w-[320px] mx-auto flex w-full cursor-pointer items-center justify-center rounded-lg border px-4 py-3 text-lg text-white shadow-xl transition-all duration-200 hover:border-purple-800 hover:bg-white md:px-3  md:text-xl'>
                  <p>{t('main.button.signup')}</p>
                </div>
              </Link>
              <Link href='#services' className='base:inline hidden w-full'>
                <div className=' base:mt-0 hover:bg-primary base:w-[320px] text-primary  mx-auto flex  w-full cursor-pointer items-center justify-center rounded-lg border border-purple-800 px-4 py-3 text-lg shadow-xl transition-all duration-200 hover:text-white md:px-3  md:text-xl'>
                  <p>{t('main.button.learn')}</p>
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
        <div className='base:flex all_side_shadow relative  mt-12 hidden w-3/5 rounded-md'>
          <Image
            src={dashboard}
            alt='dashboard'
            // width={1500}
            className='all_side_shadow z-10 h-full w-full rounded-md  object-contain'
          />
          <Image
            src={futbolka}
            alt='futbolka'
            width={1500}
            className='all_side_shadow1 absolute -left-[100px]  bottom-0 z-50 w-[300px] rounded-md'
          />
          <Image
            src={graph}
            alt='graph'
            width={1500}
            className='all_side_shadow absolute -right-[150px] -top-10 w-[300px] rounded-md'
          />
        </div>
      </div>
    </div>
  );
}

export default LandingMain;
