import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  // HiArrowPath,
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiLanguage,
  HiOutlineBuildingStorefront,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineSquares2X2,
  HiOutlineTag,
} from 'react-icons/hi2';
import { MdOutlineCompare } from 'react-icons/md';

import clsxm from '@/lib/clsxm';

import LogoOnly from '@/assets/logo/logo_only.svg';
import logo from '@/assets/logo/logo2.png';
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
  setIsSidebarOpen,
  setActiveTab,
}: SidebarProps) {
  const [rendered, setRendered] = React.useState(false);

  React.useEffect(() => {
    setRendered(true);
  }, []);

  useEffect(() => {
    // according to the path, set the active tab
    // because the active tab is set to Umumiy always when the page is refreshed
    if (rendered) {
      const path = window.location.pathname;

      if (path.startsWith('/home')) {
        setActiveTab('Umumiy');
      } else if (path.startsWith('/category')) {
        setActiveTab('Kategoriyalar');
      } else if (path.startsWith('/sellers')) {
        setActiveTab('Sotuvchilar');
      } else if (path.startsWith('/campaigns')) {
        setActiveTab('Aksiyalar');
      } else if (path.startsWith('/products')) {
        setActiveTab('Mahsulotlar');
      } else if (path.startsWith('/words')) {
        setActiveTab('So`zlar');
      } else if (path.startsWith('/compare')) {
        setActiveTab('Taqqoslash');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendered]);

  if (!rendered) return <></>;

  return (
    <div
      className={clsxm(
        'bg-font-primary relative z-10 h-screen max-h-screen w-[240px] -translate-x-full transition-all duration-300 ease-in-out sm:translate-x-0',
        isSidebarOpen ? 'w-[240px]' : 'w-[70px]',
        className
      )}
    >
      <div
        className='bg-primary group absolute -right-4 bottom-[40px] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-sm'
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        {isSidebarOpen ? (
          <HiChevronDoubleLeft className='animated-icon duration-3000 repeat-infinite h-6 w-6 flex-shrink-0 font-bold text-white' />
        ) : (
          <HiChevronDoubleRight className='h-6 w-6 flex-shrink-0 font-bold text-white' />
        )}
      </div>

      <div className='h-full w-full overflow-y-auto bg-slate-100 px-3 py-4'>
        <div className='mb-8 flex w-full justify-center'>
          {isSidebarOpen ? (
            // <Logo className='h-10 w-36 object-contain' />
            <Image src={logo} alt='logo' width={200} height={50} />
          ) : (
            <LogoOnly className='h-10 w-10 object-contain' />
          )}
        </div>
        <ul className='h-full space-y-2 font-medium'>
          <SidebarItem
            href='/home'
            label='Umumiy'
            icon={
              <HiOutlineHome
                className={clsxm(
                  'text-primary h-6 w-6 flex-shrink-0 group-hover:text-white',
                  activeTab === 'Umumiy' && 'text-white'
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
            label='Kategoriyalar'
            icon={
              <HiOutlineSquares2X2
                className={clsxm(
                  'text-primary h-6 w-6 flex-shrink-0 group-hover:text-white',
                  activeTab === 'Kategoriyalar' && 'text-white'
                )}
              />
            }
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onClick={() => {
              setActiveTab('Kategoriyalar');
            }}
          />

          <SidebarItem
            href='/sellers'
            label='Sotuvchilar'
            icon={
              <HiOutlineBuildingStorefront
                className={clsxm(
                  'text-primary h-6 w-6 flex-shrink-0 group-hover:text-white',
                  activeTab === 'Sotuvchilar' && 'text-white'
                )}
              />
            }
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onClick={() => {
              setActiveTab('Sotuvchilar');
            }}
          />
          <SidebarItem
            href='/products'
            label='Mahsulotlar'
            icon={
              <HiOutlineShoppingBag
                className={clsxm(
                  'text-primary h-6 w-6 flex-shrink-0 group-hover:text-white',
                  activeTab === 'Mahsulotlar' && 'text-white'
                )}
              />
            }
            isSidebarOpen={isSidebarOpen}
            activeTab={activeTab}
            onClick={() => {
              setActiveTab('Mahsulotlar');
            }}
          />
          <SidebarItem
            href='/campaigns'
            label='Aksiyalar'
            icon={
              <HiOutlineTag
                className={clsxm(
                  ' h-6 w-6 flex-shrink-0 ',
                  activeTab === 'Aksiyalar' && 'text-white'
                )}
              />
            }
            activeTab={activeTab}
            isSidebarOpen={isSidebarOpen}
            onClick={() => {
              setActiveTab('Aksiyalar');
            }}
            disabled
          />

          <SidebarItem
            href='/words'
            label='So`zlar'
            icon={
              <HiLanguage
                className={clsxm(
                  'h-6 w-6 flex-shrink-0 ',
                  activeTab === 'So`zlar' && 'text-white'
                )}
              />
            }
            isSidebarOpen={isSidebarOpen}
            activeTab={activeTab}
            onClick={() => {
              setActiveTab('So`zlar');
            }}
            disabled
          />
          <div className='mt-5 h-[1px] w-full bg-slate-300'></div>
          <SidebarItem
            href='/compare'
            label='Taqqoslash'
            icon={
              <MdOutlineCompare
                className={clsxm(
                  'h-6 w-6 flex-shrink-0 ',
                  activeTab === 'Taqqoslash' && 'text-white'
                )}
              />
            }
            isSidebarOpen={isSidebarOpen}
            activeTab={activeTab}
            onClick={() => {
              setActiveTab('Taqqoslash');
            }}
            disabled
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
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  activeTab: string;
  isSidebarOpen?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const { dispatch } = useContextState();
  const router = useRouter();

  return (
    <li className={clsxm(className)} onClick={onClick}>
      <p
        onClick={() => {
          if (disabled) return;
          dispatch({
            type: 'PATH',
            payload: { path: null },
          });
          router.push(href);
        }}
        className={clsxm(
          'group flex cursor-pointer items-center rounded-lg p-2 text-black hover:bg-slate-400 hover:text-white',
          activeTab === label && 'bg-primary hover:bg-primary text-white',
          disabled &&
            'cursor-not-allowed bg-slate-100 text-slate-300 hover:bg-slate-100 hover:text-slate-300'
        )}
      >
        {icon}
        {isSidebarOpen && <span className='ml-3 text-base'>{label}</span>}
      </p>
    </li>
  );
}

export default Sidebar;
