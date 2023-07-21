import { useTranslation } from 'next-i18next';
import React from 'react';

import clsxm from '@/lib/clsxm';

function SectionOverview() {
  const { t, i18n } = useTranslation('landing');

  return (
    <div className='mt-6  w-full py-16 md:py-28'>
      <div className='md:layout flex h-full flex-col items-center justify-center gap-10'>
        <div className='flex w-full flex-col items-center justify-center'>
          <h2
            className={clsxm(
              'font-primary layout text-center text-2xl font-normal sm:text-3xl md:mb-4 md:w-[80%] md:text-[40px]',
              i18n.language === 'ru' && 'text-primary'
            )}
          >
            {t('overview.title.line1.part1')}{' '}
            <span
              className={clsxm(
                i18n.language === 'uz' ? 'text-primary' : 'text-black'
              )}
            >
              {t('overview.title.line1.part2')}
            </span>
          </h2>
          <h2 className='text-center text-2xl font-normal sm:text-3xl md:w-[80%] md:text-[40px]'>
            {t('overview.title.line2')}
          </h2>
        </div>
        <div className='no-scrollbar mt-10 flex w-full items-center gap-5 overflow-scroll px-6 md:px-0'>
          <div className='flex h-[220px] w-[250px] min-w-[250px] flex-col gap-4 rounded-lg border-2 border-blue-500 p-3 shadow-md'>
            <p className='bg-linear w-max rounded-lg px-2 py-1'>
              {t('overview.internal.title')}
            </p>
            <p className=''>{t('overview.internal.description')}</p>
          </div>
          <div className='flex-1'></div>
          <div className='flex h-[220px] w-[250px] min-w-[250px] flex-col gap-4 rounded-lg border-2 border-blue-500 p-3 shadow-md'>
            <p className='bg-linear w-max rounded-lg px-2 py-1'>
              {t('overview.external.title')}
            </p>
            <p className=''>{t('overview.external.description')}</p>
          </div>
          <div className='flex-1'></div>

          <div className='flex h-[220px] w-[250px] min-w-[250px] flex-col gap-4 rounded-lg border-2 border-blue-500 p-3 shadow-md'>
            <p className='bg-linear w-max rounded-lg px-2 py-1'>
              {t('overview.trends.title')}
            </p>
            <p className=''>{t('overview.trends.description')}</p>
          </div>
          <div className='flex-1'></div>

          <div className='flex h-[220px] w-[250px] min-w-[250px] flex-col gap-4 rounded-lg border-2 border-blue-500 p-3 shadow-md'>
            <p className='bg-linear w-max rounded-lg px-2 py-1'>
              {t('overview.studio.title')}
            </p>
            <p className=''>{t('overview.studio.description')}</p>
          </div>
          {/* <div className='flex-1'></div> */}

          {/* <div className='flex flex-col justify-evenly gap-10 md:flex-row xl:w-1/2'></div> */}
        </div>
      </div>
    </div>
  );
}

export default SectionOverview;
