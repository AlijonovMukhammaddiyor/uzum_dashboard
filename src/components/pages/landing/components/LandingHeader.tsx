import Link from 'next/link';
import React from 'react';
import { BsTelegram } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';

import clsxm from '@/lib/clsxm';

import Logo from '@/assets/logo/logo.svg';

function LandingHeader() {
  const [isMobile, setIsMobile] = React.useState(false);

  const headerItems: {
    [key: string]: string;
  } = {
    Xizmatlar: '#services',
    Tariflar: "#ta'riflar",
    // 'Bog`lanish': '#contact',
  };

  return (
    <nav className='bg-gradient  w-full bg-[rgb(232,234,255)]'>
      <div className='layout flex items-center justify-between py-6'>
        <Link href='/' className='md:-ml-6'>
          <Logo className='h-[50px] w-28 sm:w-32 md:w-56' />
        </Link>
        <div className=''>
          <ul className='apperance-none flex items-center justify-between gap-5 lg:gap-10'>
            {/* Desktop navigation*/}
            {Object.entries(headerItems).map(([key, value]) => (
              <li
                key={value}
                className='link link-underline link-underline-black hidden cursor-pointer px-2 text-base font-semibold text-black md:inline xl:text-lg'
              >
                <a href={headerItems[key]}>{key}</a>
              </li>
            ))}

            <Link href='/login'>
              <div className='bg-primary flex cursor-pointer items-center justify-end gap-4 rounded-md px-4 py-2 text-white transition-all duration-200 hover:border-none hover:bg-purple-300'>
                <p className='text-sm '>Kirish</p>
              </div>
            </Link>
            <a
              href='https://t.me/uzanalitika'
              target='_blank'
              className='hidden shrink-0 cursor-pointer items-center justify-end gap-4 rounded-md bg-blue-500 px-3 py-2 text-white transition-all duration-200 hover:bg-blue-200 hover:text-blue-500 md:flex lg:px-6'
            >
              <BsTelegram className='text-xl' />
              <p className='hidden text-sm lg:inline'>Kanalga Qo'shilish</p>
            </a>

            {/* Mobile navigation */}
            <div
              onClick={() => setIsMobile(true)}
              className='-mr-5 flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1 md:hidden'
            >
              <GiHamburgerMenu className='text-2xl' />
            </div>
            <div>
              <div
                className={clsxm(
                  isMobile ? 'right-0' : '-right-full',
                  'fixed top-0 z-50 h-screen w-full bg-white transition-all md:hidden',
                  'flex flex-col items-start justify-between  pb-10'
                )}
              >
                <div className='w-full'>
                  <div className='layout flex items-center justify-between py-6 '>
                    <Link href='/'>
                      <Logo className='h-[50px] w-28 sm:w-32 md:w-56' />
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
                        <a
                          href={headerItems[key]}
                          onClick={() => setIsMobile(false)}
                        >
                          {key}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='mx-auto flex w-full justify-between gap-6 px-1'>
                  <a
                    href="#ta'riflar"
                    className='flex-1 shrink-0'
                    onClick={() => setIsMobile(false)}
                  >
                    <div className='bg-primary base:mt-0 hover:text-primary flex cursor-pointer items-center justify-center rounded-lg  py-3 text-sm text-white shadow-xl transition-all duration-200 hover:bg-purple-300 md:px-2 md:py-4 md:text-2xl xl:text-2xl'>
                      Ro'yxatdan o'ting
                    </div>
                  </a>
                  <a
                    href='https://t.me/uzanalitika'
                    target='_blank'
                    className=' flex flex-1 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 px-3 text-white transition-all duration-200 hover:bg-blue-200 hover:text-blue-500 sm:gap-4'
                  >
                    <BsTelegram className='text-xl' />
                    <p className='text-sm'>Kanalga Qo'shilish</p>
                  </a>
                </div>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default LandingHeader;
