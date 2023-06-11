import * as React from 'react';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBell,
  HiOutlineUserCircle,
} from 'react-icons/hi2';

import Breadcrumb from '@/components/shared/Breadcrumb';
import UnstyledLink from '@/components/shared/links/UnstyledLink';

export interface HeaderProps {
  className?: string;
  path: Record<string, string>;
}

export default function Header({ className, path }: HeaderProps) {
  return (
    <header className='w-full bg-transparent'>
      <div className='flex h-14 items-center justify-between p-3'>
        {path && Object.keys(path).length >= 2 ? (
          <Breadcrumb
            className='flex items-center justify-start gap-2'
            path={path}
          />
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
                  <span className='m-0 text-xs'>Mukhammaddiyor</span>
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
              <UnstyledLink href='/' className='hover:text-gray-600'>
                <HiOutlineArrowRightOnRectangle className='hover:text-primary h-6 w-6 flex-shrink-0 text-black' />
              </UnstyledLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
