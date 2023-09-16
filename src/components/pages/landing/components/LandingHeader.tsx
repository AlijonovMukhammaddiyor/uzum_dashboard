import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { BsTelegram } from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { GrLanguage } from 'react-icons/gr';

import clsxm from '@/lib/clsxm';

import logo from '@/assets/landing/main.png';

function LandingHeader() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [isVisible, setIsVisible] = React.useState(true);
  const [prevScrollY, setPrevScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (prevScrollY > currentScrollY || currentScrollY < 75) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollY]);

  const { t, i18n } = useTranslation('landing');
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

  const headerItems: {
    [key: string]: string;
  } = {
    [i18n.language === 'uz' ? 'Xizmatlar' : 'Инструменты']: '#services',
    [i18n.language === 'uz' ? 'Konsalting' : 'Консалтинг']:
      'https://t.me/Alijonov_md',
    [i18n.language === 'uz' ? "Bog'lanish" : 'Контакты']:
      'https://t.me/uzum_uzanalitika',
    // [i18n.language === 'uz' ? 'Qanday boshlash?' : 'Как начать?']: '#start',
  };

  return (
    <nav
      className={clsxm(
        'z-[10000] w-full bg-white pt-2 transition-all duration-500',
        !isVisible ? '-top-full' : ''
      )}
    >
      <div className='layout base:px-10 z-[10000] flex items-center justify-between rounded-xl px-4 py-3'>
        <Link href='/' className=''>
          <Image
            src={logo}
            alt='logo'
            width={200}
            height={50}
            className='w-32 sm:w-32 md:w-56'
          />
        </Link>
        <ul className='apperance-none flex items-center justify-between gap-5 lg:gap-10'>
          {Object.entries(headerItems).map(([key, value]) => (
            <li
              key={value}
              className='link link-underline link-underline-black font-primary base:inline hidden cursor-pointer px-2 text-base text-black'
            >
              <a href={headerItems[key]}>{key}</a>
            </li>
          ))}

          {/* Mobile navigation */}

          <div
            className={clsxm(
              isMobile ? 'right-0' : '-right-full',
              'base:hidden flex flex-col items-start  justify-between  pb-10',
              'fixed top-0 z-50 h-screen w-full bg-white transition-all'
            )}
          >
            <div
              className={clsxm(
                // isMobile ? 'right-0' : '-right-full',
                'base:hidden flex flex-col items-start  justify-between  pb-10',
                'fixed top-0 z-50 h-screen w-full bg-white transition-all'
              )}
            >
              <div className='w-full'>
                <div className='layout flex items-center justify-between py-6 '>
                  <Link href='/'>
                    {/* <Logo className='h-[50px] w-28 sm:w-32 md:w-56' /> */}
                    <Image
                      src={logo}
                      alt='logo'
                      width={200}
                      height={50}
                      className='w-32 sm:w-32 md:w-48'
                    />
                  </Link>
                  <div
                    onClick={() => setIsMobile(false)}
                    className='base:hidden flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1'
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
                {/* <a
                    href="#ta'riflar"
                    className='flex-1 shrink-0'
                    onClick={() => {
                      setIsMobile(false);
                    }}
                  > */}
                <Link href='/register' className='flex-1'>
                  <div className='base:mt-0  bg-primary flex cursor-pointer items-center justify-center rounded-lg px-3 py-4 text-sm text-white shadow-xl transition-all duration-200 md:px-6 md:py-4 md:text-2xl xl:text-2xl'>
                    {t('header.button.signup')}
                  </div>
                </Link>
                <a
                  href='https://t.me/uzum_uzanalitika'
                  target='_blank'
                  className=' flex min-w-max  flex-1 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 px-3 text-white transition-all duration-200 sm:gap-4'
                >
                  <BsTelegram className='text-xl' />
                  <p className='text-sm'>{t('header.button.telegram')}</p>
                </a>
              </div>
            </div>
          </div>
        </ul>

        <div className='flex items-center justify-end gap-6'>
          <div className='relative'>
            <div
              className='flex h-9 w-[70px] cursor-pointer items-center justify-center gap-2 border-b border-black px-2'
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <GrLanguage className='text-xl' />
              <p className='text-sm'>{i18n.language === 'uz' ? 'Uz' : 'Рус'}</p>
            </div>

            {dropdownOpen && (
              <div className='absolute left-0 top-full mt-2 w-[70px] rounded-md border border-black bg-white'>
                <div
                  className='cursor-pointer px-2 py-1 hover:bg-gray-200'
                  onClick={() => {
                    changeLanguage('uz');
                    setDropdownOpen(false);
                  }}
                >
                  Uz
                </div>
                <div
                  className='cursor-pointer px-2 py-1 hover:bg-gray-200'
                  onClick={() => {
                    changeLanguage('ru');
                    setDropdownOpen(false);
                  }}
                >
                  Рус
                </div>
              </div>
            )}
          </div>
          <Link href='/login'>
            <div className='bg-primary hover:border-primary hover:text-primary flex cursor-pointer items-center justify-end gap-4 rounded-full border-2 px-5 py-2 text-white transition-all duration-200 hover:bg-transparent md:px-7  md:py-3'>
              <p className='text-sm '>{t('header.button.kirish')}</p>
            </div>
          </Link>
          <div
            onClick={() => setIsMobile(true)}
            className='base:hidden flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-1'
          >
            <GiHamburgerMenu className='text-2xl' />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LandingHeader;
