import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import React from 'react';
import Popup from 'reactjs-popup';

import opportunities from '@/assets/opportunities.jpg';

function Possibilities({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal: () => void;
}) {
  const { i18n } = useTranslation('common');
  const isUz = i18n.language === 'uz';

  return (
    <Popup
      open={open}
      className='z-[99999]'
      closeOnDocumentClick
      onClose={closeModal}
      contentStyle={{
        zIndex: 99999,
        width: '70%',
        height: '90%',
        overflow: 'auto',
        padding: '2rem',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        position: 'relative',
      }}
    >
      <div className='flex items-center justify-evenly'>
        <Image
          src={opportunities}
          width={600}
          height={500}
          alt='Opportunities'
        />
        <div className='relative mx-auto max-w-3xl space-y-8 rounded-lg bg-white p-6'>
          <div className='mb-6 text-center'>
            <h2 className='mb-2 text-3xl font-extrabold text-gray-900'>
              {isUz
                ? '🔍 UzAnalitika Orqali Qanday Imkoniyatlar Bor?'
                : '🔍Какие возможности предлагает "UzAnalitika?"'}
            </h2>
          </div>

          <p className='text-xl text-gray-600'>
            {isUz
              ? "Eng asosiy xizmatlarimizdan ba'zilari:"
              : 'Некоторые из наших основных услуг:'}
          </p>

          <ul className='space-y-4 pl-5'>
            {/* Features go here */}
            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz ? 'Tovar tanlash' : 'Выбор товара'}
            </li>
            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz ? 'Nisha tanlash' : 'Выбор ниши'}
            </li>
            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz
                ? "O'z do'konlaringiz va Raqobatchilarni analiz qilish(har bir kategoriya bo'yicha)"
                : 'Анализ ваших магазинов и конкурентов (по каждой категории)'}
            </li>
            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz
                ? "Eng so'nggi trendlarni ko'rish"
                : 'Просмотр последних трендов'}
            </li>
            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz
                ? 'Mahsulotning keng qamrovli tahlili'
                : 'Детальный анализ продукта'}
            </li>
            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz
                ? 'Haftaning eng yaxshi mahsulotlari'
                : 'Лучшие продукты недели'}
            </li>
            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz
                ? 'Oyning eng yaxshi mahsulotlari'
                : 'Лучшие продукты месяца'}
            </li>
            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz
                ? "Alohida eng o'sayotgan 100 ta mahsulotlar va kategoriyalarni ko'rish"
                : 'Просмотрите отдельно топ-100 товаров и категорий, продажи которых растут быстрее всего'}
            </li>
            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz
                ? "Tanlangan mahsulotlar va do'konlar bo'yicha kunlik hisobotlar"
                : 'Ежедневные отчеты по выбранным продуктам и магазинам'}
            </li>

            <li className='flex items-center'>
              <span className='mr-2 text-lg'>📌</span>{' '}
              {isUz
                ? "va boshqa ko'plab imkoniyatlar..."
                : 'и множество других возможностей...'}
            </li>
          </ul>

          <p className='mt-6 text-center text-gray-700'>
            {isUz
              ? "❓ Agar sizda bularni qanday qilish borasida savollar yoki qiyinchiliklar bo'lsa:"
              : '❓ Если у вас есть вопросы или проблемы с этим:'}
            <span className='ml-2 block cursor-pointer text-blue-600 underline hover:text-blue-500'>
              <a
                href='https://t.me/uzum_uzanalitika'
                target='_blank'
                rel='noreferrer'
              >
                {isUz
                  ? "Telegram orqali biz bilan bog'laning"
                  : 'Свяжитесь с нами через Telegram'}
              </a>
            </span>
          </p>
        </div>
      </div>
    </Popup>
  );
}

export default Possibilities;
