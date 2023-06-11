import React from 'react';
import { BsTelegram } from 'react-icons/bs';

import Logo from '@/assets/logo/logo.svg';

function LandingHeader() {
  const headerItems = {
    Xizmatlar: '#services',
    Tariflar: '#rates',
    'Bog`lanish': '#contact',
  };

  return (
    <div className='bg-gradient h-[100px] w-full bg-[rgb(232,234,255)]'>
      <div className='layout flex items-center justify-between py-6'>
        <Logo className='h-[50px] w-56' />
        <div className=''>
          <ul className='apperance-none flex items-center justify-start gap-6 xl:gap-10'>
            {Object.entries(headerItems).map(([key, value]) => (
              <li
                key={value}
                className='link link-underline link-underline-black cursor-pointer px-2 text-xl font-semibold text-black'
              >
                {key}
              </li>
            ))}
            <div className='bg-primary flex cursor-pointer items-center justify-end gap-4 rounded-md px-6 py-2 text-white transition-all duration-200 hover:border-none hover:bg-purple-300'>
              <p>Kirish</p>
            </div>
            <div className='flex w-[240px] cursor-pointer items-center justify-end gap-4 rounded-md bg-blue-500 px-6 py-2 text-white transition-all duration-200 hover:bg-blue-200 hover:text-blue-500'>
              <BsTelegram className='text-3xl' />
              <p>Kanalga Qo'shilish</p>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LandingHeader;
