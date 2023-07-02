import React from 'react';
import { HiOutlineChevronRight } from 'react-icons/hi2';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/shared/links/UnstyledLink';

export interface BeradcrumbProps {
  className?: string;
  path: Record<string, string>;
  setUpdatePath?: React.Dispatch<React.SetStateAction<boolean>>;
}

function Breadcrumb({ path, setUpdatePath }: BeradcrumbProps) {
  const updatePathInLocalStorage = (
    path: Record<string, string>,
    currentKey: string
  ) => {
    // remove all keys after currentKey
    const keys = Object.keys(path);
    const index = keys.indexOf(currentKey);
    const newKeys = keys.slice(0, index + 1);
    const newPath = newKeys.reduce((acc, key) => {
      (acc as { [key: string]: string })[key] = path[key];
      return acc;
    }, {});
    setUpdatePath && setUpdatePath((prev) => !prev);
    localStorage.setItem('path', JSON.stringify(newPath));
  };

  return (
    <nav className='flex' aria-label='Breadcrumb'>
      <ol className='inline-flex items-center space-x-1 md:space-x-3'>
        {Object.entries(path).map(([key, value], index) => (
          <li key={index} className='flex items-center justify-start gap-0'>
            {index > 0 && (
              <HiOutlineChevronRight className='h-4 w-4 text-slate-500' />
            )}
            <UnstyledLink
              href={value}
              key={index}
              onClick={() => {
                updatePathInLocalStorage(path, key);
              }}
            >
              <p
                className={clsxm(
                  'ml-2 text-sm text-slate-500',
                  index == Object.entries(path).length - 1 && 'text-primary',
                  index != Object.entries(path).length - 1 && 'hover:text-black'
                )}
              >
                {key}
              </p>
            </UnstyledLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
