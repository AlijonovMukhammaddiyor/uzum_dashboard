import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { AiOutlineInstagram } from 'react-icons/ai';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBell,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Breadcrumb from '@/components/shared/Breadcrumb';

import free from '@/assets/landing/free.png';
import star from '@/assets/landing/star.png';
import starter from '@/assets/landing/starter.png';
import { useContextState } from '@/context/Context';

export interface HeaderProps {
  className?: string;
}

export default function Header() {
  const router = useRouter();
  const { state } = useContextState();
  const [showPaymentNotification, setShowPaymentNotification] =
    React.useState(true);

  const handleUserLogout = async () => {
    try {
      const api = new API(null);
      const res = await api.logout();
      if (res) router.push('/login');
    } catch (e) {
      logger(e, 'Error in Header');
      alert(e);
    }
  };

  const is_paid = state.user?.is_pro || state.user?.is_proplus;

  return (
    <header className='w-full bg-transparent'>
      <div className='flex h-14 items-center justify-between gap-4 p-3'>
        {state.path && Object.keys(state.path).length >= 2 ? (
          <Breadcrumb className='flex items-center justify-start gap-2' />
        ) : !is_paid ? (
          showPaymentNotification ? (
            <div className='relative mt-3 flex  items-center justify-between rounded-md bg-gradient-to-r from-purple-500 to-blue-500 p-2 px-4 py-1 text-white'>
              <div className='flex items-center justify-start gap-3'>
                <p className='text-sm'>
                  Hozirda to'lov tizimini ishga tushirish jarayonida ishlaymiz.
                  To'lov qilish uchun iltimos, biz bilan bog'laning.
                </p>
                <a
                  href='https://instagram.com/uzanalitika?igshid=MzNlNGNkZWQ4Mg=='
                  target='_blank'
                >
                  <button className='instagram-btn flex items-center justify-start gap-2 rounded-md bg-white px-3 py-1 text-white'>
                    Instagram
                    <AiOutlineInstagram className='h-6 w-6' />
                  </button>
                </a>
              </div>
              {/* <button
                className='absolute right-1 top-1'
                onClick={() => setShowPaymentNotification(false)}
              >
                <HiOutlineX className='h-5 w-5 text-white' />
              </button> */}
            </div>
          ) : (
            <div></div>
          )
        ) : (
          <div></div>
        )}

        <nav>
          <ul className='flex items-center justify-between space-x-8'>
            <li>
              <div className='flex max-w-[200px] items-center justify-start '>
                <HiOutlineUserCircle className='h-6 w-6 flex-shrink-0 rounded-full text-black' />
                <div className='ml-1 flex flex-col items-start justify-start'>
                  <span className='m-0 text-xs'>{state.user?.username}</span>
                </div>
                {state.user?.is_proplus ? (
                  <Image
                    src={star}
                    alt='premium-star'
                    className='ml-2 h-5 w-5'
                  />
                ) : state.user?.is_pro ? (
                  <Image
                    src={starter}
                    alt='premium-star'
                    className='ml-2 h-5 w-5'
                  />
                ) : (
                  <Image
                    src={free}
                    alt='premium-star'
                    className='ml-2 h-5 w-5'
                  />
                )}
              </div>
            </li>
            {is_paid && (
              <li>
                <div className='flex max-w-[200px] items-center justify-start rounded-md border border-slate-400 bg-purple-100 px-2 py-1 '>
                  <p className='text-sm'>Taklif kod:</p>
                  <div className='ml-1 flex flex-col items-start justify-start'>
                    <span className='m-0 text-xs'>
                      {state.user?.referral_code}
                    </span>
                  </div>
                </div>
              </li>
            )}
            <li className='relative'>
              <div className='hover:text-gray-600'>
                <HiOutlineBell className='hover:text-primary h-5 w-5 flex-shrink-0 text-black' />
              </div>
            </li>
            <li
              onClick={() => {
                // logout
              }}
            >
              <div
                className='hover:text-gray-600'
                onClick={() => handleUserLogout()}
              >
                <HiOutlineArrowRightOnRectangle className='hover:text-primary h-6 w-6 flex-shrink-0 cursor-pointer text-black' />
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
