import React from 'react';
import { GiCheckMark } from 'react-icons/gi';

import Logo from '@/assets/logo/logo_only.svg';

function LandingTarifs() {
  return (
    <div className='flex w-full justify-center py-28'>
      <div className='layout flex items-start justify-between'>
        <Tarif
          title='Free'
          price='0 So`m'
          features={[
            'Ichki Analitika',
            'Tashqi Analitika',
            'Studio',
            'Taqqoslash',
          ]}
          color='primary'
          buttonTitle='Hoziroq boshlang'
        />
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
}: {
  title: string;
  price: string;
  features: string[];
  color: string;
  buttonTitle?: string;
}) {
  return (
    <div className='m-4 flex h-[400px] w-[250px] max-w-sm flex-col items-center justify-between overflow-hidden rounded-lg border border-slate-300 bg-white px-3 py-6'>
      <div className='w-full'>
        <div className='mb-2 flex items-center justify-start gap-3 text-center text-xl font-bold'>
          <Logo className='inline-block h-6 w-6' />
          {title}
        </div>
        <div className='mb-2 border-b border-slate-300 py-2 text-left text-xl font-bold'>
          {price}
        </div>
        <ul className='mt-6 flex flex-col gap-2 pl-0'>
          {features.map((feature: string) => (
            <li key={feature} className='flex items-start justify-start'>
              <GiCheckMark className='text-primary mr-2 inline-block h-5 w-5' />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className='w-full'>
        <button
          className={`bg-${color} w-full rounded px-4 py-2 text-white hover:bg-purple-700`}
        >
          {buttonTitle ? buttonTitle : `Buy ${price}` || 'Buy'}
        </button>
      </div>
    </div>
  );
}

export default LandingTarifs;
