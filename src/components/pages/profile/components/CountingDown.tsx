import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import clsxm from '@/lib/clsxm';

const CountingDown = ({ discountEndDate }: any) => {
  const { i18n } = useTranslation('register');
  const [isCenter, setIsCenter] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime: any = new Date();
      const timeDiff = discountEndDate - currentTime;

      if (timeDiff <= 0) {
        clearInterval(interval);
        setTimeRemaining({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        });
      } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining((prev) => ({
          ...prev,
          days: days < 10 ? '0' + days : String(days),
          hours: hours < 10 ? '0' + hours : String(hours),
          minutes: minutes < 10 ? '0' + minutes : String(minutes),
          seconds: seconds < 10 ? '0' + seconds : String(seconds),
        }));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [discountEndDate]);

  return (
    <>
      <div
        className={clsxm(
          'fixed left-0 top-0 z-[1000] h-screen w-screen  bg-neutral-900/60',
          !isCenter ? 'flex items-center justify-center' : 'hidden'
        )}
        onClick={() => setIsCenter(!isCenter)}
      ></div>
      <div
        className={clsxm(
          'absolute -right-10 top-10 z-[10] flex h-[150px] flex-col items-center justify-center  space-y-4 rounded-lg bg-purple-300 px-4 shadow-2xl transition-all duration-500',
          !isCenter
            ? 'right-1/3 top-1/3 scale-150  px-20'
            : 'h-[100px] scale-75 bg-transparent shadow-none'
        )}
      >
        <p className={clsxm('text-white', isCenter ? 'hidden' : '')}>
          {i18n.language === 'uz'
            ? 'Oylik chegirmalar 10-oktabrgacha davom etadi:'
            : 'Ежемесячные скидки действуют до 10 октября:'}
        </p>
        <div className='flex items-center justify-center gap-1 text-4xl text-gray-500'>
          <div className='relative flex h-20 w-20  items-center justify-center rounded-md bg-purple-500  text-white'>
            {timeRemaining.days}
            <span className='absolute bottom-0 right-1 text-base text-gray-300'>
              {i18n.language === 'uz' ? 'Kun' : 'День'}
            </span>
          </div>
          :
          <div className='relative flex h-20 w-20 items-center justify-center rounded-md bg-purple-500  text-white'>
            {timeRemaining.hours}
            <span className='absolute bottom-0 right-1 text-base text-gray-300'>
              {i18n.language === 'uz' ? 'Soat' : 'Час'}
            </span>
          </div>
          :
          <div className='relative flex h-20 w-20 items-center justify-center rounded-md bg-purple-500  text-white'>
            {timeRemaining.minutes}
            <span className='absolute bottom-0 right-1 text-base text-gray-300'>
              {i18n.language === 'uz' ? 'Min' : 'Мин'}
            </span>
          </div>
          :
          <div className='relative flex h-20 w-20 items-center justify-center rounded-md bg-purple-500  text-white'>
            {timeRemaining.seconds}
            <span className='absolute bottom-0 right-1 text-base text-gray-300'>
              {i18n.language === 'uz' ? 'Sek' : 'Сек'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountingDown;
