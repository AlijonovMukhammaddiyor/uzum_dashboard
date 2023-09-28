/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import { FaTelegram } from 'react-icons/fa';
import { GrLanguage } from 'react-icons/gr';
import { HiChevronDown } from 'react-icons/hi2';
import { IoExitOutline } from 'react-icons/io5';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Breadcrumb from '@/components/shared/Breadcrumb';
import Possibilities from '@/components/shared/Possibilities';
import SearchContainer from '@/components/shared/SearchContainer';

import knowledge from '@/assets/knowledge.png';
import Logo from '@/assets/logo/main_logo_only.png';
import { useContextState } from '@/context/Context';
export interface HeaderProps {
  className?: string;
}

export default function Header() {
  const { state } = useContextState();
  const [openMessage, setOpenMessage] = React.useState<boolean>(true);
  // const [search, setSearch] = React.useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
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
  const [servicesOpen, setServicesOpen] = React.useState<boolean>(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    onToggleLanguageClick(lng);
  };

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, router.asPath, { locale: newLocale });
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('closedWarning2') === 'true') {
        setClosedWarning(true);
      }
    }
  }, [state.user?.tariff]);

  return (
    <header className='fixed right-0 top-0 z-[100] h-12 w-full border-b border-slate-300 bg-white py-1'>
      <SearchContainer
        open={isSearchOpen}
        closeModal={() => setIsSearchOpen(false)}
      />
      <Possibilities
        open={servicesOpen}
        closeModal={() => setServicesOpen(false)}
      />

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

      <div className='flex h-10 items-center justify-between gap-4 p-3'>
        <div className='flex shrink-0 items-center justify-start gap-6'>
          <Image src={Logo} alt='logo' width={36} height={36} />
          {state.path && Object.keys(state.path).length >= 1 ? (
            <Breadcrumb className='flex items-center justify-start gap-2' />
          ) : (
            <div></div>
          )}
        </div>

        <div
          className='flex flex-1 cursor-pointer items-center space-x-2 border-b border-slate-700 pl-2 pr-[3px]'
          onClick={() => setIsSearchOpen(true)}
        >
          <input
            type='text'
            placeholder={
              i18n.language === 'uz'
                ? 'Xohlagan narsani qidiring...'
                : 'ищите все, что хотите...'
            }
            className='min-w-[200px] rounded-sm border-none text-sm placeholder:text-slate-500 focus:outline-none focus:ring-0'
          />
          {/* <button className='bg-primary flex items-center justify-center rounded-md px-2 py-1 text-white'>
                {i18n.language === 'uz' ? 'Tez Qidirish' : 'Быстрый Поиск'}
              </button> */}
        </div>

        <nav className='shrink-0'>
          <ul className='flex items-center justify-end space-x-5'>
            {/* Search Component */}

            <li>
              <LanguageDropdown
                i18n={i18n}
                changeLanguage={changeLanguage}
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
              />
            </li>
            {/* Telegram Consultation Link */}
            <li
              className='flex space-x-4'
              onClick={() => setServicesOpen(true)}
            >
              <div className='flex items-center space-x-2 rounded'>
                <Image
                  src={knowledge}
                  alt='knowledge'
                  width={27}
                  height={27}
                  className='mb-2'
                />
                <span className='cursor-pointer text-sm text-slate-700 hover:underline'>
                  {i18n.language === 'uz' ? 'Imkoniyatlar' : 'Возможности'}
                </span>
              </div>
            </li>
            <li className='flex space-x-4'>
              <a
                href='https://t.me/ulugbek4real'
                target='_blank'
                className='flex items-center space-x-2 rounded'
              >
                <FaTelegram className='text-xl text-blue-500' />
                <span className='cursor-pointer text-sm text-slate-700 hover:underline'>
                  {i18n.language === 'uz' ? 'Konsultatsiya' : 'Консультация'}
                </span>
              </a>
            </li>

            {/* Language Dropdown */}

            {/* User Profile Dropdown */}
            <li
              className='relative flex cursor-pointer items-center space-x-2'
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <UserProfileImage tariff={state.user?.tariff} />
              <span className='relative flex cursor-pointer items-center text-sm text-slate-700'>
                {state.user?.username?.slice(0, 10)}...
              </span>
              <HiChevronDown />
              <UserProfileDropdown
                isOpen={isOpen}
                dropdownRef={dropdownRef}
                i18n={i18n}
                state={state}
                handleUserLogout={handleUserLogout}
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

const UserProfileImage = ({ tariff }: { tariff?: string }) => {
  let imageSrc;
  switch (tariff) {
    case 'free':
      imageSrc = '/images/tariffs/free.png';
      break;
    case 'trial':
      imageSrc = '/images/tariffs/starter.png';
      break;
    default:
      imageSrc = '/images/tariffs/crown.png';
      break;
  }
  return (
    <img
      src={imageSrc}
      alt=''
      className='-left-3 -top-2 h-[24px] w-[24px] object-contain'
    />
  );
};

const UserProfileDropdown = ({
  isOpen,
  dropdownRef,
  i18n,
  state,
  handleUserLogout,
}: {
  isOpen: boolean;
  dropdownRef: any;
  i18n: any;
  state: any;
  handleUserLogout: any;
}) => {
  const router = useRouter();
  const getTariff = () => {
    if (state.user?.tariff === 'trial') {
      return i18n.language === 'uz' ? 'Sinov' : 'Пробный';
    }
    if (state.user?.tariff === 'base') {
      return i18n.language === 'uz' ? "Boshlang'ich" : 'Базовый';
    }
    if (state.user?.tariff === 'seller') {
      return i18n.language === 'uz' ? 'Sotuvchi' : 'Продавец';
    }
    if (state.user?.tariff === 'business') {
      return i18n.language === 'uz' ? 'Biznes' : 'Бизнес';
    }
    if (state.user?.tariff === 'free') {
      return i18n.language === 'uz' ? 'Bepul' : 'Бесплатный';
    }
  };

  const getPaymentDate = () => {
    if (state.user?.tariff !== 'free' && state.user?.payment_date) {
      const date = new Date(state.user?.payment_date);
      const formattedDate = new Intl.DateTimeFormat('ru-Ru', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Tashkent',
      }).format(date);
      return formattedDate;
    }

    return null;
  };
  return isOpen ? (
    <div
      ref={dropdownRef}
      className='absolute right-0 top-full z-10 mt-4 w-[180px] rounded-md border bg-white shadow-xl'
    >
      <div
        className='flex items-center justify-between gap-2 border-b p-2 hover:bg-gray-200'
        onClick={() => {
          router.push('/profile');
        }}
      >
        <p className='text-sm'>
          {i18n.language === 'uz' ? 'Tarif' : 'Тариф'}:{' '}
          <span className='text-primary'>{getTariff()}</span>
        </p>
        <BsChevronRight className='' />
      </div>

      {state.user?.tariff !== 'free' && state.user?.payment_date && (
        <div className='border-b p-2 text-sm'>
          {i18n.language === 'uz' ? 'To‘lov qilish sanasi:' : 'Дата оплаты:'}{' '}
          <p>{getPaymentDate()}</p>
        </div>
      )}

      <div
        className='flex cursor-pointer items-center justify-between p-2 hover:bg-gray-200'
        onClick={handleUserLogout}
      >
        {i18n.language === 'uz' ? 'Chiqish' : 'Выйти'}
        <IoExitOutline className='text-xl' />
      </div>
    </div>
  ) : (
    <></>
  );
};

const LanguageDropdown = ({
  i18n,
  changeLanguage,
  dropdownOpen,
  setDropdownOpen,
}: {
  i18n: any;
  changeLanguage: any;
  dropdownOpen: any;
  setDropdownOpen: any;
}) => {
  return (
    <div className='relative'>
      <div
        className='flex h-9 w-[70px] cursor-pointer items-center justify-center gap-2 border-b border-black px-2'
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <GrLanguage className='' />
        <p className='text-sm text-slate-700'>
          {i18n.language === 'uz' ? 'Uz' : 'Рус'}
        </p>
      </div>

      {dropdownOpen && (
        <div className='absolute left-0 top-full mt-2 w-[70px] rounded-sm border border-black bg-white'>
          <div
            className='cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-200'
            onClick={() => {
              changeLanguage('uz');
              setDropdownOpen(false);
            }}
          >
            Uz
          </div>
          <div
            className='cursor-pointer rounded-sm px-2 py-1 hover:bg-gray-200'
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
  );
};
