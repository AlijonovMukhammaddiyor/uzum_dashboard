import Router from 'next/router';
import React from 'react';
import { GiCheckMark } from 'react-icons/gi';

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
    <div id="ta'riflar" className='flex w-full justify-center py-28'>
      <div className='layout '>
        <div className='flex flex-wrap items-center justify-around gap-10 '>
          <Tarif
            title='Bepul'
            price='0 So`m/Oy'
            features={[
              '3 kunlik obuna',
              'Ichki Analitika',
              'Tashqi Analitika',
              'Studio',
              'Taqqoslash',
            ]}
            color='primary'
            buttonTitle='Hoziroq boshlang'
            sendToRegister={sendToRegister}
          />

          <Tarif
            title='Premium'
            price='500 000 So`m/Oy'
            features={[
              'Ichki Analitika',
              'Tashqi Analitika',
              'Studio',
              'Taqqoslash',
            ]}
            color='primary'
            buttonTitle='Hoziroq boshlang'
            isPro
            sendToRegister={sendToRegister}
          />
          <div className='bg-linear-dark m-4 w-[400px] rounded-md p-5 text-center shadow-xl'>
            <p className='font-primary text-center text-2xl text-white'>
              <span className='text-4xl'>🎉</span> Har bir taklif qilgan
              do'stingiz uchun 50 000 so'm chegirmaga ega bo'ling
            </p>
            <p className='mt-5  text-[#000]'>
              Agar siz bizning xizmatimizni yoqtirgan bo'lsangiz va uni
              boshqalarga ham tavsiya qilmoqchi bo'lsangiz, siz uchun ajoyib
              mukofotimiz bor.
            </p>
            <p className='mt-5 text-[#000]'>
              Ha bu shunday oson! Do'stingiz Premium tarifiga obuna bo'lgandan
              so'ng, sizga 50 000 so'm chegirma beriladi. Siz bu chegirmalarni
              kelgusi oylarning obunasi uchun ishlatishingiz mumkin.
            </p>
          </div>
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
  return (
    <div
      className={clsxm(
        'flex h-[500px] max-h-[500px] w-[280px] min-w-[220px] shrink-0 flex-col items-center justify-between overflow-hidden rounded-lg border border-slate-300 bg-white',
        isPro && 'bg-gradient',
        'border-2 border-blue-500'
      )}
    >
      <div className='w-full'>
        <div className='mb-2 flex items-center justify-between gap-3 border-b-2 border-blue-500 bg-blue-100 px-6 py-5 text-center text-xl font-bold'>
          <div className='flex items-center justify-start gap-3'>
            <Logo className='inline-block h-6 w-6' />
            <p>{title}</p>
          </div>
          <div className='text-2xl font-bold'>{price}</div>
        </div>
        <ul className='mt-6 flex flex-col gap-2 pl-6'>
          {features.map((feature: string) => (
            <li key={feature} className='flex items-start justify-start'>
              <GiCheckMark className='text-primary mr-2 inline-block h-5 w-5' />
              {feature}
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
          disabled={isProPlus}
        >
          {buttonTitle ? buttonTitle : `Buy ${price}` || 'Buy'}
        </Button>
      </div>
    </div>
  );
}

export default LandingTarifs;
