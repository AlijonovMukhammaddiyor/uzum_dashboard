import Link from 'next/link';
import React from 'react';
import { BsTelegram } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

import clsxm from '@/lib/clsxm';

import Logo from '@/assets/logo/logo.svg';

function LandingHeader() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [lang, setLang] = React.useState('uz');

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
          <ul className='apperance-none flex items-center justify-between gap-5 lg:gap-10'>
            {/* Desktop navigation*/}
            {Object.entries(headerItems).map(([key, value]) => (
              <li
                key={value}
                className='link link-underline link-underline-black hidden cursor-pointer px-2 text-base font-semibold text-black md:inline xl:text-lg'
              >
                {key}
              </li>
            ))}

            <div className='border-primary flex hidden h-9 items-center justify-center overflow-hidden rounded-md border bg-purple-200 bg-opacity-25'>
              <div
                className={clsxm(
                  'relative flex h-full w-10 cursor-pointer items-center justify-center p-2 text-sm',
                  lang === 'uz' && 'bg-primary text-white'
                )}
                onClick={() => setLang('uz')}
              >
                Uz
              </div>
              <div
                className={clsxm(
                  'relative flex h-full w-10 cursor-pointer items-center justify-center p-2 text-sm',
                  lang === 'ru' && 'bg-primary text-white'
                )}
                onClick={() => setLang('ru')}
              >
                Рус
              </div>
            </div>

            <a href="#ta'riflar">
              <div className='bg-primary flex cursor-pointer items-center justify-end gap-4 rounded-md px-4 py-2 text-white transition-all duration-200 hover:border-none hover:bg-purple-300'>
                <p className='text-sm '>Kirish</p>
              </div>
            </a>
            <div className='hidden shrink-0 cursor-pointer items-center justify-end gap-4 rounded-md bg-blue-500 px-3 py-2 text-white transition-all duration-200 hover:bg-blue-200 hover:text-blue-500 md:flex lg:px-6'>
              <BsTelegram className='text-xl' />
              <p className='hidden text-sm lg:inline'>Kanalga Qo'shilish</p>
            </div>

            {/* Mobile navigation */}
            <div
              onClick={() => setIsMobile(true)}
              className='-mr-5 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1 md:hidden'
            >
              <GiHamburgerMenu className='text-2xl' />
            </div>
            <div>
              <div
                className={`${
                  isMobile ? 'right-0' : '-right-full'
                } fixed top-0 z-50 h-screen w-full bg-white transition-all md:hidden`}
              >
                <div className='layout flex items-center justify-between py-6 '>
                  <Link href='/'>
                    <Logo className='h-[50px] w-32 md:w-56' />
                  </Link>
                  <div
                    onClick={() => setIsMobile(false)}
                    className='flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1 md:hidden'
                  >
                    <GrClose className='text-xl' />
                  </div>
                </div>
                <ul className='layout flex flex-col items-start justify-center gap-5'>
                  {Object.entries(headerItems).map(([key, value]) => (
                    <li
                      key={value}
                      className='link link-underline link-underline-black cursor-pointer px-2 text-lg font-semibold text-black'
                    >
                      {key}
                    </li>
                  ))}
                  <div className='flex cursor-pointer items-center justify-end gap-4 rounded-md bg-blue-500 px-3 py-2  text-white transition-all duration-200 hover:bg-blue-200 hover:text-blue-500'>
                    <BsTelegram className='text-xl' />
                    <p className='text-xs'>Kanalga Qo'shilish</p>
                  </div>
                </ul>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LandingHeader;
