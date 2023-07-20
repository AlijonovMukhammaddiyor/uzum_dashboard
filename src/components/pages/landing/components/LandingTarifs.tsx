import Router from 'next/router';
import React from 'react';
import { IoCheckmarkSharp, IoCloseOutline } from 'react-icons/io5';

import clsxm from '@/lib/clsxm';

import Button from '@/components/shared/buttons/Button';

import Logo from '@/assets/logo/logo_only.svg';

function LandingTarifs() {
  const [plan, setPlan] = React.useState('Bepul');

  const sendToRegister = (plan: string) => {
    Router.push({
      pathname: '/register',
      query: {
        plan:
          plan === 'Bepul' ? 'free' : plan === 'Premium' ? 'premium' : 'basic',
      },
    });
  };

  return (
    <div id="ta'riflar" className='flex w-full justify-center  py-28'>
      <div className='md:layout w-full overflow-hidden'>
        <div className='bg-linear-dark layout mb-6 rounded-md p-5 text-center shadow-xl md:w-full'>
          <p className='font-primary text-center text-2xl text-white'>
            <span className='text-4xl'>🎉</span> Har bir taklif qilgan
            do'stingiz uchun <span className='text-3xl'>$3</span> chegirmaga ega
            bo'ling
          </p>
          <p className='mt-5  text-[#fff]'>
            Agar siz bizning xizmatimizni yoqtirgan bo'lsangiz va uni
            boshqalarga ham tavsiya qilmoqchi bo'lsangiz, siz uchun ajoyib
            mukofotimiz bor.
          </p>
          <p className='mt-5 w-full text-left text-[#fff]'>
            Ha bu shunday oson! Do'stlaringizni taklif qiling va har bir premium
            tarifiga obuna bo'lgan do'stingiz uchun, sizga $3 chegirma beriladi.
            Siz bu chegirmalarni kelgusi oylarning obunasi uchun ishlatishingiz
            mumkin.
          </p>

          <p className='mt-3 w-full text-left text-white'>
            Qanday taklif qilaman deysizmi? Ro'yhatdan o'tgandan so'ng sizga{' '}
            <span className='font-bold'>Taklif Kodi</span> beriladi. Siz bu
            kodni do'stingizga yuboring va ular ro'yhatdan o'tish paytida bu
            kodni kiritishlari kerak.
          </p>
        </div>
        <div
          className={clsxm(
            'flex w-full max-w-full flex-1 items-start gap-4 p-3',
            'no-scrollbar overflow-scroll'
            // 'flex-col md:flex-row'
          )}
        >
          <div className='flex-1'></div>

          <Tarif
            title='Bepul'
            price='$0'
            features={[
              "Umumiy ma'lumotlar",
              'Barcha mahsulotlar',
              "Barcha do'konlar",
              '24/7 doimiy yordam',
            ]}
            color='primary'
            buttonTitle='Hoziroq boshlang'
            sendToRegister={sendToRegister}
          />
          <div className='flex-1'></div>
          <Tarif
            title='Pro'
            price='$30'
            features={[
              'Oxirgi 30 kunlik',
              "Umumiy ma'lumotlar",
              'Barcha Kategoriyalar',
              'Kategoriya trendi',
              'Kategoriya mahsulotlari',
              'Ichki kategoriyalar',
              'Kategoriya narx segmentatsiyasi',
              "Kategoriya do'konlari",
              "Barcha do'konlar",
              "Do'kon tahlili",
              "Do'kon mahsulotlari",
              "Do'kon kategoriyalari",
              "Do'kon raqobatchilari",
              "Do'kon kunlik sotuvlari",
              'Barcha mahsulotlar',
              'Mahsulot tahlili',
              'Mahsulot raqobatchilari',

              '24/7 doimiy yordam',
            ]}
            color='primary'
            isPro
            buttonTitle='Hoziroq boshlang'
            sendToRegister={sendToRegister}
          />
          <div className='flex-1'></div>
          <Tarif
            title='Premium'
            price='$40'
            features={[
              "Umumiy ma'lumotlar",
              'Barcha Kategoriyalar',
              'Kategoriya trendi',
              'Kategoriya mahsulotlari',
              'Ichki kategoriyalar',
              'Kategoriya narx segmentatsiyasi',
              "Kategoriya do'konlari",
              "Barcha do'konlar",
              "Do'kon tahlili",
              "Do'kon mahsulotlari",
              "Do'kon kategoriyalari",
              "Do'kon raqobatchilari",
              "Do'kon kunlik sotuvlari",
              'Barcha mahsulotlar',
              'Mahsulot tahlili',
              'Mahsulot raqobatchilari',
              'Mahsulot raqobatchilari taqqoslash',
              'Yangi mahsulotlar',
              "O'sayotgan mahsulotlar",
              "O'sayotgan kategoriyalar",
              '24/7 doimiy yordam',
            ]}
            color='primary'
            buttonTitle='Hoziroq boshlang'
            isProPlus
            sendToRegister={sendToRegister}
          />
          <div className='flex-1'></div>
        </div>
      </div>
    </div>
  );
}

function Tarif({
  title,
  price,
  features,
  color,
  buttonTitle,
  isPro,
  sendToRegister,
  isProPlus,
}: {
  title: string;
  price: string;
  features: string[];
  color: string;
  buttonTitle?: string;
  isPro?: boolean;
  sendToRegister: (plan: string) => void;
  isProPlus?: boolean;
}) {
  const features_ = [
    "Umumiy ma'lumotlar",
    'Yangi mahsulotlar',
    "O'sayotgan mahsulotlar",
    "O'sayotgan kategoriyalar",
    'Barcha Kategoriyalar',
    'Kategoriya trendi',
    'Kategoriya mahsulotlari',
    'Ichki kategoriyalar',
    'Kategoriya narx segmentatsiyasi',
    "Kategoriya do'konlari",
    "Barcha do'konlar",
    "Do'kon tahlili",
    "Do'kon mahsulotlari",
    "Do'kon kategoriyalari",
    "Do'kon raqobatchilari",
    "Do'kon kunlik sotuvlari",
    'Barcha mahsulotlar',
    'Mahsulot tahlili',
    'Mahsulot raqobatchilari',
    'Mahsulot raqobatchilari taqqoslash',
    '24/7 doimiy yordam',
  ];

  return (
    <div
      className={clsxm(
        'flex h-[920px] max-h-[920px] w-[280px] min-w-[220px] shrink-0 flex-col items-center justify-between overflow-hidden rounded-lg border border-slate-300 bg-white',
        isProPlus && 'bg-gradient',
        'border-2 border-blue-500'
      )}
    >
      <div className='w-full'>
        <div className='mb-2 flex items-center justify-between gap-3 border-b-2 border-blue-500 bg-blue-100 px-6 py-5 text-center text-xl font-bold'>
          <div className='flex items-center justify-start gap-3'>
            <Logo className='inline-block h-6 w-6' />
            <p className='font-primary font-bold'>{title}</p>
          </div>
          <div className='text-2xl font-bold'>{price}</div>
        </div>
        <ul className='mt-6 flex flex-col gap-2 pl-6'>
          {isPro && (
            <li className='flex items-start justify-start'>
              <IoCheckmarkSharp className='mr-2 inline-block h-5 w-5 text-green-500' />
              30 kunlik ma'lumotlar
            </li>
          )}
          {isProPlus && (
            <li className='flex items-start justify-start'>
              <IoCheckmarkSharp className='mr-2 inline-block h-5 w-5 text-green-500' />
              60+ kunlik ma'lumotlar
            </li>
          )}
          {features_.map((f: string) => (
            <li key={f} className='flex items-start justify-start'>
              {/* <GiCheckMark className='text-primary mr-2 inline-block h-5 w-5' /> */}
              {features.includes(f) ? (
                <IoCheckmarkSharp className='mr-2 inline-block h-5 w-5 text-green-500' />
              ) : (
                <IoCloseOutline className='mr-2 inline-block h-5 w-5 text-red-500' />
              )}
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full px-6 py-3'>
        <Button
          onClick={() => sendToRegister(title)}
          className={clsxm(
            `bg-${color} w-full rounded px-4 py-2 text-white hover:bg-purple-700`
            // !isPro && 'bg-blue-500'
          )}
          // disabled={isProPlus}
        >
          {buttonTitle ? buttonTitle : `Buy ${price}` || 'Buy'}
        </Button>
      </div>
    </div>
  );
}

export default LandingTarifs;
