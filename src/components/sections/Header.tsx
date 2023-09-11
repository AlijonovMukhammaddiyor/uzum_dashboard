import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
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
  const [openMessage, setOpenMessage] = React.useState<boolean>(true);
  const handleUserLogout = async () => {
    try {
      const api = new API(null);
      const res = await api.logout();
      window.localStorage.clear();
      if (res) router.push('/');
    } catch (e) {
      logger(e, 'Error in Header');
      alert(e);
    }
  };
  const [closedWarning, setClosedWarning] = React.useState<boolean>(false);
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

  const is30Day =
    state.user?.tariff === 'trial'
      ? true
      : state.user?.tariff === 'free'
      ? true
      : state.user?.tariff === 'base'
      ? true
      : false;

  const isHome = router.pathname === '/home' ? true : false;
  const trialMessage =
    state.user?.referred_by === 'invest'
      ? i18n.language === 'uz'
        ? '7 kunlik sinov'
        : '7 дневный тест'
      : state.user?.referred_by === '681332'
      ? i18n.language === 'uz'
        ? '7 kunlik sinov'
        : '7 дневный тест'
      : i18n.language === 'uz'
      ? '1 kunlik sinov'
      : '1 дневный тест';

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('closedWarning2') === 'true') {
        setClosedWarning(true);
      }
    }
  }, [state.user?.tariff]);

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

        {state.user?.tariff === 'trial' && openMessage && !closedWarning && (
          <div className='absolute left-[calc(50%-300px)] top-1 w-[600px] rounded bg-yellow-300 p-6 shadow-lg'>
            {i18n.language === 'uz'
              ? "Hozirda sinov versiyasini ishlatyapsiz. Barcha mavjud xizmatlar haqida Shaxsiy kabinet sahifasida o'rganishingiz mumkin."
              : 'Вы используете пробную версию. Вы можете узнать все доступные услуги на странице Мой кабинета.'}
            <AiOutlineCloseCircle
              onClick={() => {
                setOpenMessage(false);
                setClosedWarning(true);
                window.localStorage.setItem('closedWarning2', 'true');
              }}
              className='absolute right-3 top-3 h-5 w-5 flex-shrink-0 cursor-pointer text-black hover:scale-[1.1]'
            />
          </div>
        )}

        <nav className='shrink-0'>
          <ul className='flex items-center justify-between space-x-5'>
            <li className='shrink-0'>
              <div className='youtube-btn w-[180px]'>
                <a
                  href='https://www.youtube.com/watch?v=zsZtVNYyPEc&t=1s'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <div className='youtube-icon'></div>
                  {i18n.language === 'uz' ? "Qo'llanma" : 'Руководство'}
                </a>
              </div>
            </li>
            <li className='shrink-0'>
              <a
                href='https://t.me/Alijonov_md'
                target='_blank'
                className='shadow-3xl flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-500 px-2 py-2'
              >
                <p className='text-xs font-bold text-white'>
                  {i18n.language === 'uz'
                    ? 'Trening olish(bepul)'
                    : 'Получить тренинг(бесплатно)'}
                </p>
                <p className='flex items-center justify-center'>
                  <FaTelegramPlane className='text-2xl text-white' />
                </p>
              </a>
            </li>

            <li className='flex items-center justify-end gap-3'>
              <div className='bg-primary font-primary mr-3 flex shrink-0 items-center rounded-md border px-3 py-2 text-sm font-bold text-white'>
                {state.user?.tariff === 'free' ? (
                  <p className=''>
                    {i18n.language === 'uz'
                      ? 'Tarif: Bepul'
                      : 'Тариф: Бесплатный'}
                  </p>
                ) : state.user?.tariff === 'trial' ? (
                  <p>
                    {i18n.language === 'uz'
                      ? 'Tarif: ' + trialMessage
                      : 'Тариф: ' + trialMessage}
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
                {is30Day && isHome && (
                  <li>
                    <div className='ml-2 text-white'>
                      {i18n.language === 'uz'
                        ? "  - 100 kunlik ma'lumotlar"
                        : '  - 100 дневные данные'}
                    </div>
                  </li>
                )}
              </div>
            </li>

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
            <div className='flex max-w-[200px] items-center justify-start overflow-hidden '>
              <HiOutlineUserCircle className='h-6 w-6 flex-shrink-0 rounded-full text-black' />
              <p className='ml-1 line-clamp-1 text-sm'>
                {state.user?.username?.slice(0, 10)}
                {state.user?.username && state.user?.username?.length > 15
                  ? '...'
                  : ''}
              </p>
              {state.user?.tariff === 'seller' ? (
                <Image src={star} alt='premium-star' className='ml-2 h-5 w-5' />
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
                <Image src={free} alt='premium-star' className='ml-2 h-5 w-5' />
              )}
            </div>
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
