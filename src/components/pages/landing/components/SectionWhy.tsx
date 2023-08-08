import { useTranslation } from 'next-i18next';
import React from 'react';

function SectionWhy() {
  const { t } = useTranslation('landing');
  return (
    <div className=' relative  w-full bg-white py-16 md:py-32'>
      <div className='layout flex h-full flex-col items-center justify-between gap-16 md:gap-32 lg:flex-row'>
        <div className=' flex h-full w-full flex-col justify-center overflow-hidden text-center md:w-11/12  lg:w-1/2  lg:items-start'>
          <h1 className=' font-primary text-2xl font-semibold leading-8 tracking-wider sm:text-3xl md:text-[35px] md:leading-[40px] xl:text-[43px] xl:leading-[60px]'>
            {t('why.title.line1')}
          </h1>
          <h1 className=' font-primary text-2xl font-semibold leading-8 tracking-wider sm:text-3xl md:text-[35px] md:leading-[40px] xl:text-[43px] xl:leading-[60px]'>
            {t('why.title.line2')}
          </h1>

          {/* <p className='font-primary mb-3 max-w-full text-2xl leading-[38px] tracking-wider xl:text-3xl'>
            Xizmatlarimiz orqali onlayn savdoingizni tezlashtiring va
            biznesingizni yangi darajaga ko'taring.
          </p> */}
          <p className=' font-primary mt-6 max-w-full text-lg leading-6 tracking-wider text-slate-600 md:text-2xl md:leading-[38px] xl:text-2xl'>
            {t('why.subtitle')}
          </p>
        </div>
        <div className='flex w-full flex-col items-start justify-start gap-10 md:w-1/2'>
          <ContainerItem
            title=''
            description={t('why.reason1')}
            icon=''
            color=''
            index={1}
          />
          <ContainerItem
            title=''
            description={t('why.reason2')}
            icon=''
            color=''
            index={2}
          />
          <ContainerItem
            title=''
            description={t('why.reason3')}
            icon=''
            color=''
            index={3}
          />
          <ContainerItem
            title=''
            description={t('why.reason4')}
            icon=''
            color=''
            index={4}
          />
        </div>
      </div>
    </div>
  );
}

function ContainerItem({
  description,
  index,
}: {
  title: string;
  description: string;
  icon: string;
  color: string;
  className?: string;
  index?: number;
}) {
  return (
    <div className='flex w-full items-center justify-start gap-5 rounded-md border border-slate-300 p-4 md:h-[80px]'>
      <p className='text-primary text-3xl'>{index}</p>
      <div className='text-sm'>{description}</div>
    </div>
  );
}

export default SectionWhy;
