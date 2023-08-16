import React from 'react';
// import instagram icon
import { AiOutlineInstagram } from 'react-icons/ai';
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
        <div className='flex items-center justify-end gap-3'>
          <a
            href='https://instagram.com/uzanalitika?igshid=MzNlNGNkZWQ4Mg=='
            target='_blank'
          >
            <AiOutlineInstagram className='h-10 w-10 cursor-pointer text-white ' />
          </a>
          <a href='https://t.me/uzum_uzanalitika' target='_blank'>
            <BsTelegram className='h-8 w-8 cursor-pointer text-white ' />
          </a>
          <a href='mailto: uzanalitika@gmail.com'>
            <HiOutlineMail className='h-8 w-8 cursor-pointer text-white' />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
