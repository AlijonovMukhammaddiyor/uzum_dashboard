import Link from 'next/link';
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
    <nav className='bg-gradient  w-full bg-[rgb(232,234,255)]'>
      <div className='layout flex items-center justify-between py-6'>
        <Link href='/'>
          <Logo className='h-[50px] w-32 md:w-56' />
        </Link>
        <div className=''>
          <ul className='apperance-none flex items-center justify-start gap-6 xl:gap-10'>
            {/* Desktop navigation*/}
            {Object.entries(headerItems).map(([key, value]) => (
              <li
                key={value}
                className='link link-underline link-underline-black hidden cursor-pointer px-2 text-xl font-semibold text-black md:inline'
              >
                {key}
              </li>
            ))}

            <a href="#ta'riflar">
              <div className='bg-primary flex cursor-pointer items-center justify-end gap-4 rounded-md px-6 py-2 text-white transition-all duration-200 hover:border-none hover:bg-purple-300'>
                <p>Kirish</p>
              </div>
            </a>
            <div className='flex  cursor-pointer items-center justify-end gap-4 rounded-md bg-blue-500 px-3 py-2 text-white transition-all duration-200 hover:bg-blue-200 hover:text-blue-500 lg:px-6'>
              <BsTelegram className='text-2xl' />
              <p className='hidden lg:inline'>Kanalga Qo'shilish</p>
            </div>
          </ul>
        </div>
      </div>
      {/* Mobile navigation */}
      {/* <ul className='ml-10 flex md:hidden'>
        {Object.entries(headerItems).map(([key, value]) => (
          <li
            key={value}
            className='link  link-underline link-underline-black  cursor-pointer px-2 text-xl font-semibold text-black'
          >
            {key}
          </li>
        ))}
      </ul> */}
    </nav>
  );
}

export default LandingHeader;
