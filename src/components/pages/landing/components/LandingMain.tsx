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
    <div className=' base:h-auto  base:bg-white  min-h-screen w-full overflow-hidden'>
      <div className='layout relative flex h-full  items-center justify-between  pb-10'>
        <div className=' base:gap-20 flex h-full flex-col  justify-start gap-10  py-5'>
          <div className='base:text-start  mt-36 flex flex-col justify-center '>
            <h1 className='font-primary text_gradient text-5xl font-extrabold tracking-wider md:text-6xl '>
              {t('main.title.line1.part1')}{' '}
            </h1>
            <h1 className=' font-primary  text-5xl font-extrabold tracking-wider  md:text-6xl'>
              {t('main.title.line1.part2')}
            </h1>
            <h1 className='font-primary text-5xl font-extrabold tracking-wider  md:text-6xl '>
              {t('main.title.line2.part1')}{' '}
              <span className=' text-black'>
                {t('main.title.line2.part2')}!
              </span>
            </h1>
            <p className='mt-12 w-4/5 text-base md:text-xl lg:text-xl'>
              {t('main.subtitle.line1')}
            </p>
            <p className='  w-4/5 text-base md:block md:text-xl lg:text-xl'>
              {t('main.subtitle.line2')}
            </p>
          </div>
          <div className='base:hidden relative h-1/3 w-full items-center justify-center overflow-hidden'>
            <Image
              src={futbolka}
              alt='futbolka'
              width={500}
              className='absolute bottom-2 left-2 w-[160px] rounded-md shadow-2xl'
            />
            <Image
              src={graph}
              alt='graph'
              width={500}
              className='absolute right-2 top-2 w-[160px]  rounded-md shadow-2xl'
            />
            <div className='flex h-full w-full items-center justify-center'>
              <Image
                priority
                src={dashboard}
                alt='dashboard'
                className='shadow-3xl mx-auto my-auto w-[90%] rounded-md object-contain'
              />
            </div>
          </div>
          <div className='w-full '>
            <div className='base:flex-row flex w-full flex-col items-center justify-start gap-4'>
              <Link href='#services' className=' base:w-auto w-full'>
                <div className=' base:mt-0 text-primary border-primary base:w-[240px] mx-auto  flex w-full  cursor-pointer items-center justify-center rounded-lg border-2 px-4 py-3 text-sm shadow-xl transition-all duration-200 hover:border-purple-300 hover:text-purple-300 md:px-3  '>
                  <p>{t('main.button.learn')}</p>
                </div>
              </Link>
              <Link href='/register' className='base:w-auto w-full'>
                <div className='bg-primary base:mt-0 border-primary hover:bg-secondary base:w-[240px] mx-auto flex w-full  cursor-pointer items-center justify-center rounded-lg border-2 px-4 py-3 text-sm text-white shadow-xl transition-all duration-200 md:px-3 '>
                  <p>{t('main.button.signup')}</p>
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
            className='all_side_shadow  rounded-md object-contain'
          />
          {/* <Image
            src={futbolka}
            alt='futbolka'
            width={1500}
            className='all_side_shadow1 absolute -bottom-10 left-[70px] z-50  w-[200px] rounded-md'
          /> */}
          <Image
            src={graph}
            alt='graph'
            width={1500}
            className='all_side_shadow absolute -right-[150px] -top-10 z-50 w-[300px] rounded-md'
          />
        </div>
      </div>
    </div>
  );
}

export default LandingMain;
