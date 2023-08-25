import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { GrLanguage } from 'react-icons/gr';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Breadcrumb from '@/components/shared/Breadcrumb';

import crown from '@/assets/landing/crown.png';
import free from '@/assets/landing/free.png';
import star from '@/assets/landing/star.png';
import starter from '@/assets/landing/starter.png';
import Logo from '@/assets/logo/main_logo_only.png';
import { useContextState } from '@/context/Context';
export interface HeaderProps {
  className?: string;
}

export default function Header() {
  const { state } = useContextState();

  const handleUserLogout = async () => {
    try {
      const api = new API(null);
      const res = await api.logout();
      if (res) router.push('/');
    } catch (e) {
      logger(e, 'Error in Header');
      alert(e);
    }
  };
  const { t, i18n } = useTranslation('common');
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

  return (
    <header className='fixed right-0 top-0 z-[100] h-12 w-full border-b border-slate-300 bg-white py-1'>
      <div className='flex h-10 items-center justify-between gap-4 p-3'>
        <div className='flex items-center justify-start gap-6'>
          <Image src={Logo} alt='logo' width={36} height={36} />
          {state.path && Object.keys(state.path).length >= 1 ? (
            <Breadcrumb className='flex items-center justify-start gap-2' />
          ) : (
            <div></div>
          )}
        </div>

        <nav>
          <ul className='flex items-center justify-between space-x-8'>
            <li className='flex items-center justify-end gap-3'>
              <div className='bg-primary fonnt-primary mr-3 rounded-md border px-3 py-2 text-sm font-bold text-white'>
                {' '}
                {state.user?.tariff === 'free' ? (
                  <p>
                    {i18n.language === 'uz'
                      ? 'Tarif: Bepul'
                      : 'Тариф: Бесплатный'}
                  </p>
                ) : state.user?.tariff === 'trial' ? (
                  <p>
                    {i18n.language === 'uz'
                      ? 'Tarif: 1 kunlik sinov'
                      : 'Тариф: 1 дневный тест'}
                  </p>
                ) : state.user?.tariff === 'base' ? (
                  <p>
                    {i18n.language === 'uz'
                      ? "Tarif: Boshlang'ich"
                      : 'Тариф: Стартер'}
                  </p>
                ) : state.user?.tariff === 'seller' ? (
                  <p>
                    {i18n.language === 'uz'
                      ? 'Tarif: Sotuvchi'
                      : 'Тариф: Продавец'}
                  </p>
                ) : state.user?.tariff === 'business' ? (
                  <p>
                    {i18n.language === 'uz' ? 'Tarif: Biznes' : 'Тариф: Бизнес'}
                  </p>
                ) : (
                  <p>
                    {i18n.language === 'uz'
                      ? 'Tarif: Bepul'
                      : 'Тариф: Бесплатный'}
                  </p>
                )}
              </div>

              <div className='flex max-w-[200px] items-center justify-start overflow-hidden '>
                <HiOutlineUserCircle className='h-6 w-6 flex-shrink-0 rounded-full text-black' />
                <div className='ml-1 flex flex-col items-start justify-start'>
                  <span className='m-0 max-w-[200px] text-xs'>
                    {state.user?.username}
                  </span>
                </div>
                {state.user?.tariff === 'seller' ? (
                  <Image
                    src={star}
                    alt='premium-star'
                    className='ml-2 h-5 w-5'
                  />
                ) : state.user?.tariff === 'base' ? (
                  <Image
                    src={starter}
                    alt='premium-star'
                    className='ml-2 h-5 w-5'
                  />
                ) : state.user?.tariff === 'business' ? (
                  <Image
                    src={crown}
                    alt='premium-star'
                    className='ml-2 h-5 w-5'
                  />
                ) : state.user?.tariff === 'trial' ? (
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
            {state.user?.tariff !== 'trial' &&
              state.user?.tariff !== 'free' && (
                <li>
                  <div className='border-primary bg-primary flex max-w-[200px] items-center justify-start rounded-md border px-2 py-2 text-white'>
                    <p className='text-sm tracking-wide'>
                      {t('header.referralCode')}:
                    </p>
                    <div className='ml-1 flex flex-col items-start justify-start'>
                      <span className='m-0 text-sm font-bold tracking-wide'>
                        {state.user?.referral_code}
                      </span>
                    </div>
                  </div>
                </li>
              )}
            <li>
              <div className='flex h-7 w-[70px] items-center justify-center rounded-md border border-black px-2'>
                {i18n.language === 'uz' ? (
                  <div
                    className='flex cursor-pointer items-center justify-start gap-2'
                    onClick={() => changeLanguage('ru')}
                  >
                    <GrLanguage className='text-base' />
                    <p className='text-sm'>Рус</p>
                  </div>
                ) : (
                  <div
                    className='flex cursor-pointer items-center justify-start gap-2'
                    onClick={() => changeLanguage('uz')}
                  >
                    <GrLanguage className='text-base' />
                    <p className='text-sm'>Uz</p>
                  </div>
                )}
              </div>
            </li>
            {/* <li className='relative'>
              <div className='hover:text-gray-600'>
                <HiOutlineBell className='hover:text-primary h-5 w-5 flex-shrink-0 text-black' />
              </div>
            </li> */}
            <li
              onClick={() => {
                // logout
              }}
            >
              <div
                className=' hover:text-gray-600'
                onClick={() => handleUserLogout()}
              >
                <HiOutlineArrowRightOnRectangle className='hover:text-primary h-7 w-7 flex-shrink-0 cursor-pointer text-black' />
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
