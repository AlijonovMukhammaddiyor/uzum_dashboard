import { useTranslation } from 'next-i18next';
import React from 'react';
import { FaTelegram } from 'react-icons/fa';

import Telegrambot from '@/assets/telegrambot.svg';

function TelegramBot() {
  const { i18n } = useTranslation('commmon');

  return (
    <div className='base:mt-10 bg-slate-800 py-10 md:py-20'>
      <div className='layout base:flex-row flex flex-col-reverse items-center justify-between md:gap-10'>
        <div className='base:w-[calc(60%)] base:h-[600px] relative w-full'>
          {/* <Image
            src={telegrambot}
            alt='Bot Phone'
            width={300}
            height={300}
            className='h-full w-full object-contain'
          /> */}
          <Telegrambot className='h-[400px] w-full object-contain md:h-[600px]' />
          <a
            href='https://t.me/uzanalitikabot'
            target='_blank'
            className='bg-primary base:hidden hover:text-primary border-primary mt-4 w-full cursor-pointer rounded-md border-2 px-5 py-2 text-lg text-white transition-colors duration-200 hover:bg-white sm:w-auto'
          >
            {i18n.language === 'uz'
              ? "Botga bog'lanish"
              : 'Подключитесь к боту'}
          </a>
        </div>
        <div className='base:w-[calc(40%)] flex w-full flex-col space-y-6 rounded-lg bg-gradient-to-b p-8 text-[#FFF4F4]'>
          {i18n.language === 'uz' ? (
            <h2 className='font-raleway text-2xl font-semibold leading-[40px] md:text-3xl'>
              <span className='inline items-center justify-start gap-2 font-normal text-blue-400'>
                <FaTelegram className='mr-2 inline text-3xl text-[#0088cc]' />
                Telegram Bot
              </span>{' '}
              - raqobatchilar hamda o'z do'kon va mahsulotlaringiz haqida kunlik
              hisobotlar.
            </h2>
          ) : (
            <h2 className='font-raleway text-2xl font-semibold leading-[40px] md:text-3xl'>
              <span className='items-center justify-start gap-2 font-normal text-blue-400'>
                <FaTelegram className='mr-2 inline text-3xl text-[#0088cc]' />
                Telegram Бот
              </span>{' '}
              для автоматизации мониторинга ваших магазинов и товаров, а также
              магазинов и товаров конкурентов.
            </h2>
          )}
          <p className='text-lg font-medium leading-relaxed'>
            {i18n.language === 'uz'
              ? "Shunchaki o'z telegram tokeningiz orqali botga bog'laning va doimiy ravishda kunlik hisobotlarni qabul qiling."
              : 'Просто подключитесь к боту с помощью своего токена Telegram и постоянно получайте ежедневные отчеты.'}
          </p>
          <ul className='list-inside list-disc space-y-3 pl-4'>
            <li className='text-sm'>
              {i18n.language === 'uz'
                ? "Do'kon haqida kunlik va haftalik statistikalar"
                : 'Ежедневная и еженедельная статистика о магазине'}
            </li>
            <li className='text-sm'>
              {i18n.language === 'uz'
                ? "Mahsulotlardagi narx va boshqa o'zgarishlar"
                : 'Изменения в ценах и другие изменения в товарах'}
            </li>
            <li className='text-sm'>
              {i18n.language === 'uz'
                ? 'Har bir mahsulotning kunlik sotuv soni hamda mavjud miqdori'
                : 'Ежедневное количество продаж и наличие на складе'}
            </li>
            <li className='text-sm'>
              {i18n.language === 'uz' ? "va boshqa ma'lumotlar" : 'и т.д.'}
            </li>
          </ul>
          <a
            href='https://t.me/uzanalitikabot'
            target='_blank'
            className='bg-primary base:flex hover:text-primary border-primary mt-4 hidden w-max cursor-pointer rounded-md border-2 px-5 py-2 text-lg transition-colors duration-200 hover:bg-white'
          >
            {i18n.language === 'uz'
              ? "Botga bog'lanish"
              : 'Подключитесь к боту'}
          </a>
        </div>
      </div>
    </div>
  );
}

export default TelegramBot;
