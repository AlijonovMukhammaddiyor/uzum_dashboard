import { useRouter } from 'next/router';
import * as React from 'react';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBell,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

import API from '@/lib/api';
import logger from '@/lib/logger';

import Breadcrumb from '@/components/shared/Breadcrumb';
import UnstyledLink from '@/components/shared/links/UnstyledLink';

import { useContextState } from '@/context/Context';

export interface HeaderProps {
  className?: string;
}

export default function Header() {
  const router = useRouter();
  const { state } = useContextState();

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

  return (
    <header className='w-full bg-transparent'>
      <div className='flex h-14 items-center justify-between p-3'>
        {state.path && Object.keys(state.path).length >= 2 ? (
          <Breadcrumb className='flex items-center justify-start gap-2' />
        ) : (
          <div></div>
        )}

        <nav>
          <ul className='flex items-center justify-between space-x-8'>
            <li>
              <UnstyledLink
                href='/'
                className='flex max-w-[200px] items-center justify-start '
              >
                <HiOutlineUserCircle className='h-6 w-6 flex-shrink-0 rounded-full text-black' />
                <div className='ml-1 flex flex-col items-start justify-start'>
                  <span className='m-0 text-xs'>{state.user?.username}</span>
                </div>
              </UnstyledLink>
            </li>
            <li className='relative'>
              <UnstyledLink href='/' className='hover:text-gray-600'>
                <HiOutlineBell className='hover:text-primary h-5 w-5 flex-shrink-0 text-black' />
                {/* <span className='bg-primary absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded-full text-[10px] text-white'>
                  3
                </span> */}
              </UnstyledLink>
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
