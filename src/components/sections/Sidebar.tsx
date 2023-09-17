import Link from 'next/link';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BsPerson } from 'react-icons/bs';
import {
  HiMagnifyingGlass,
  HiOutlineBuildingStorefront,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineSquares2X2,
  HiOutlineTag,
} from 'react-icons/hi2';
import { LiaTelegramPlane } from 'react-icons/lia';
import { MdChevronRight } from 'react-icons/md';

import clsxm from '@/lib/clsxm';

import { RenderAlert } from '@/components/shared/AlertComponent';

import { useContextState } from '@/context/Context';
export interface SidebarProps {
  className?: string;
  activeTab: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

function Sidebar({
  className,
  activeTab,
  isSidebarOpen,
  setActiveTab,
}: SidebarProps) {
  const [rendered, setRendered] = React.useState(false);
  const { t, i18n } = useTranslation('common');
  const { state } = useContextState();

  React.useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    // according to the path, set the active tab
    // because the active tab is set to Umumiy always when the page is refreshed
    if (rendered) {
      const path = window.location.pathname;

      if (path.startsWith('/home') || path.startsWith('/uz/home')) {
        setActiveTab(t('sidebar.general'));
      } else if (
        path.startsWith('/category') ||
        path.startsWith('/uz/category')
      ) {
        setActiveTab(t('sidebar.categories'));
      } else if (
        path.startsWith('/sellers') ||
        path.startsWith('/uz/sellers')
      ) {
        setActiveTab(t('sidebar.sellers'));
      } else if (
        path.startsWith('/campaigns') ||
        path.startsWith('/uz/campaigns')
      ) {
        setActiveTab(t('sidebar.campaigns'));
      } else if (
        path.startsWith('/products') ||
        path.startsWith('/uz/products')
      ) {
        setActiveTab(t('sidebar.products'));
      } else if (path.startsWith('/words') || path.startsWith('/uz/words')) {
        setActiveTab(t('sidebar.searches'));
      } else if (
        path.startsWith('/telegram') ||
        path.startsWith('/uz/telegram')
      ) {
        setActiveTab(t('sidebar.telegram'));
      } else if (
        path.startsWith('/compare') ||
        path.startsWith('/uz/compare')
      ) {
        setActiveTab(t('sidebar.compare'));
      } else if (path.startsWith('/niches') || path.startsWith('/uz/niches')) {
        setActiveTab(t('sidebar.niches'));
      } else if (
        path.startsWith('/profile') ||
        path.startsWith('/uz/profile')
      ) {
        setActiveTab(t('sidebar.profile'));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered, i18n.language, t]);

  if (!rendered) return <></>;

  return (
    <div
      className={clsxm(
        ' shadow-right group relative z-10 w-[59px] -translate-x-full bg-white  py-10 transition-all duration-300 ease-in-out hover:w-[240px] sm:translate-x-0',
        className
      )}
    >
      <div className=' box-border h-full w-full overflow-x-clip  px-3 py-4'>
        <ul className='h-full space-y-2 font-medium'>
          <SidebarItem
            href='/home'
            label={t('sidebar.general')}
            icon={
              <HiOutlineHome
                className={clsxm(
                  'h-5 w-5 flex-shrink-0 ',
                  activeTab === 'Umumiy' && 'text-white',
                  'my-fourth-step'
                )}
              />
            }
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onClick={() => {
              setActiveTab('Umumiy');
            }}
          />

          <SidebarItem
            href='/category'
            label={t('sidebar.categories')}
            icon={
              <HiOutlineSquares2X2
                className={clsxm(
                  'h-5 w-5 flex-shrink-0 ',
                  activeTab === 'Kategoriyalar' && 'text-white',
                  'my-third-step'
                )}
              />
            }
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onClick={() => {
              setActiveTab('Kategoriyalar');
            }}
            // disabled
          />

          <SidebarItem
            href='/sellers'
            label={t('sidebar.sellers')}
            icon={
              <HiOutlineBuildingStorefront
                className={clsxm(
                  'h-5 w-5 flex-shrink-0 ',
                  activeTab === 'Sotuvchilar' && 'text-white',
                  'my-second-step'
                )}
              />
            }
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onClick={() => {
              setActiveTab('Sotuvchilar');
            }}
            // disabled
          />
          <SidebarItem
            href='/products'
            label={t('sidebar.products')}
            icon={
              <HiOutlineShoppingBag
                className={clsxm(
                  'h-5 w-5 flex-shrink-0 ',
                  activeTab === 'Mahsulotlar' && 'text-white',
                  'my-first-step'
                )}
              />
            }
            isNew={true}
            isSidebarOpen={isSidebarOpen}
            activeTab={activeTab}
            onClick={() => {
              setActiveTab('Mahsulotlar');
            }}
            // disabled
          />
          <SidebarItem
            href='/telegram'
            label={t('sidebar.telegram')}
            icon={
              <LiaTelegramPlane
                className={clsxm(
                  'h-5 w-5 flex-shrink-0 ',
                  activeTab === t('sidebar.telegram') && 'text-white'
                )}
              />
            }
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onClick={() => {
              setActiveTab(t('sidebar.telegram'));
            }}
            isNew={true}
          />

          <SidebarItem
            href='/niches'
            label={t('sidebar.niches')}
            icon={
              <HiMagnifyingGlass
                className={clsxm(
                  'h-5 w-5 flex-shrink-0 ',
                  activeTab === 'Niches' && 'text-white',
                  'my-fifth-step'
                )}
              />
            }
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onClick={() => {
              setActiveTab('Niches');
            }}
            // disabled
            // alert(
            //   i18n.language === 'uz'
            //     ? "Bu sahifadan foydalanish uchun boshqa tarifga o'ting"
            //     : 'Для использования этой страницы перейдите на другой тариф'
            // );
          />
          <SidebarItem
            href='/campaigns'
            label={t('sidebar.campaigns')}
            icon={
              <HiOutlineTag
                className={clsxm(
                  'h-5 w-5 flex-shrink-0 ',
                  activeTab === 'Aksiyalar' && 'text-white',
                  'my-sixth-step'
                )}
              />
            }
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onClick={() => {
              setActiveTab('Aksiyalar');
            }}
            // disabled
          />

          <div>
            <div className='mt-5 h-[1px] w-full bg-slate-500'></div>
          </div>
          <SidebarItem
            href='/profile'
            label={t('sidebar.profile')}
            icon={
              <BsPerson
                className={clsxm(
                  'h-5 w-5 flex-shrink-0 ',
                  activeTab === 'Profile' && 'text-white'
                )}
              />
            }
            isSidebarOpen={isSidebarOpen}
            activeTab={activeTab}
            onClick={() => {
              setActiveTab('Profile');
            }}
          />
        </ul>
      </div>
    </div>
  );
}

function SidebarItem({
  href,
  label,
  icon,
  activeTab,
  isSidebarOpen,
  className,
  onClick,
  disabled,
  isNew,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeTab: string;
  isSidebarOpen?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  isNew?: boolean;
}) {
  const { dispatch, state } = useContextState();
  const { i18n } = useTranslation('common');

  const handleSidebarItemClick = (e: React.MouseEvent) => {
    if (disabled) {
      e.preventDefault();
      return;
    }

    const isFree = state.user?.tariff === 'free';

    if (
      isFree &&
      href !== '/profile' &&
      href !== '/home' &&
      href !== '/category'
    ) {
      RenderAlert({
        alertTitle:
          i18n.language === 'uz'
            ? "Bu sahifadan foydalanish uchun boshqa tarifga o'ting"
            : 'Для использования этой страницы перейдите на другой тариф',
        buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
        buttonLink: '/profile',
      });
      e.preventDefault();
      return true;
    }

    if (
      state.user?.tariff === 'trial' &&
      (href === '/campaigns' || href === '/niches')
    ) {
      RenderAlert({
        alertTitle:
          i18n.language === 'uz'
            ? "Bu sahifadan foydalanish uchun boshqa tarifga o'ting"
            : 'Для использования этой страницы перейдите на другой тариф',
        buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
        buttonLink: '/profile',
      });
      e.preventDefault();
      return true;
    }

    dispatch({
      type: 'PATH',
      payload: { path: null },
    });
  };

  return (
    <li
      className={clsxm('min-h-9 relative h-9 max-h-9', className)}
      onClick={(e) => {
        if (disabled) return;
        const flag = handleSidebarItemClick(e);
        if (flag) return;
        onClick && onClick();
      }}
    >
      <Link href={href}>
        <p
          onClick={(e) => {
            if (disabled) {
              e.preventDefault();
              return;
            }

            const isFree = state.user?.tariff === 'free';

            if (
              isFree &&
              href !== '/profile' &&
              href !== '/home' &&
              href !== '/category'
            ) {
              e.preventDefault();
              return true;
            }

            if (
              state.user?.tariff === 'trial' &&
              (href === '/campaigns' || href === '/niches')
            ) {
              e.preventDefault();
              return true;
            }
          }}
          className={clsxm(
            'group relative flex h-full flex-1 cursor-pointer items-center rounded-md px-2 text-black hover:bg-slate-400 hover:text-white',
            activeTab === label && 'bg-primary hover:bg-primary text-white',
            disabled &&
              'cursor-not-allowed bg-slate-100 text-slate-300 hover:bg-slate-100 hover:text-slate-300'
          )}
        >
          {icon}
          <span className='ml-5 w-[200px] shrink-0 text-base transition-all group-hover:block'>
            {label}
          </span>
          {/* ... other content ... */}
          {isNew && (
            <span className='absolute -left-5 -top-2 ml-2 rounded-lg bg-yellow-500 px-1 text-[10px] font-semibold text-white'>
              New
            </span>
          )}
        </p>
      </Link>

      <MdChevronRight
        className={clsxm(
          'absolute right-2 top-1/2 hidden -translate-y-1/2 transform text-black group-hover:inline',
          disabled && 'text-slate-300'
        )}
      />
      {/* {isSidebarOpen && (
        <MdChevronRight
          className={clsxm(
            'absolute right-2 top-1/2 -translate-y-1/2 transform text-black',
            disabled && 'text-slate-300'
          )}
        />
      )} */}
    </li>
  );
}

export default Sidebar;
