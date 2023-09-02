import React from 'react';
import { useTranslation } from 'react-i18next';

import ReferSvg from '@/assets/referral.svg';

const Referral = () => {
  const { t, i18n } = useTranslation('landing');
  return (
    <div
      id='referral'
      className='relative w-full bg-[#F3F5F7]  py-16 text-center md:py-28'
    >
      {/*  */}
      <div className=' layout bg-linear-dark relative rounded-xl p-10  '>
        <div className='absolute -left-5 -top-10 flex h-24 w-24 items-center justify-center rounded-full bg-purple-300 sm:-left-10'>
          {/* <HiSpeakerphone className='rot -rotate-[20deg] text-7xl text-white' /> */}
          <span className='-rotate-45 text-4xl font-bold text-white'>
            {/* {i18n.language === 'uz' ? "30.000 so'm" : '30.000 сум'} */}
            $3
          </span>
        </div>
        <p className='font-primary  text-center text-2xl font-bold text-white sm:text-4xl'>
          {t('referral.title')}
        </p>

        <div className='flex flex-col gap-10 lg:flex-row'>
          <div className=' mx-auto flex h-[450px] items-center justify-center rounded-full sm:w-[450px] '>
            {' '}
            <ReferSvg className=' mx-auto h-[400px] w-[400px]' />
          </div>
          <div className='tracking-wid flex flex-col items-center justify-center text-base sm:text-lg'>
            <p className='mt-5 text-left text-[#fff]'>
              {t('referral.subtitle1')}
            </p>
            <p className='mt-5 w-full text-left text-[#fff]'>
              {t('referral.subtitle2')}
            </p>
            <p className='mt-3 w-full text-left text-white'>
              {t('referral.subtitle3')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
