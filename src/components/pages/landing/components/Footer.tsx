import React from 'react';
import { BsTelegram } from 'react-icons/bs';
// import email icon
import { HiOutlineMail } from 'react-icons/hi';

function Footer() {
  const headerItems: {
    [key: string]: string;
  } = {
    Xizmatlar: '#services',
    Tariflar: "#ta'riflar",
  };
  return (
    <div className='h-[200px] w-full bg-black'>
      <div className='layout flex h-full items-end justify-between py-6 pb-16'>
        <ul className='apperance-none flex items-center justify-between gap-5 lg:gap-10'>
          {Object.entries(headerItems).map(([key, value]) => (
            <li
              key={value}
              className='cursor-pointer px-2 text-base font-semibold text-white md:inline '
            >
              <a href={headerItems[key]}>{key}</a>
            </li>
          ))}
        </ul>
        <div className='flex items-center justify-end'>
          <a href='https://t.me/uzumanalitika_official' target='_blank'>
            <BsTelegram className='h-8 w-8 cursor-pointer text-white ' />
          </a>
          <a href='mailto: uzumanalitika@gmail.com'>
            <HiOutlineMail className='ml-4 h-8 w-8 cursor-pointer text-white' />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
