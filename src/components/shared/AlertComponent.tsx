import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { GrClose } from 'react-icons/gr';

import clsxm from '@/lib/clsxm';

export const RenderAlert = ({
  buttonTitle,
  alertSubtitle,
  alertTitle,
  buttonLink,
}: {
  buttonTitle?: string;
  buttonLink?: string;
  alertSubtitle?: string;
  alertTitle: string;
}) => {
  // const t2 = t;
  toast.custom((t) => (
    <div
      className={clsxm(
        `tracling-wide duration-300, relative flex w-1/2 min-w-[800px] justify-between  gap-3 overflow-hidden rounded-lg border border-yellow-400 bg-yellow-300 px-5 py-3  shadow-lg transition-all`,
        !alertSubtitle ? 'items-center' : 'items-start'
      )}
    >
      <span className='flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 text-xl text-white'>
        !
      </span>

      <div className='flex flex-1 flex-col justify-between gap-4'>
        <div className='flex w-full  shrink-0 items-center justify-between'>
          <span className='text-md w-[calc(100%-150px)] shrink-0 font-medium'>
            {alertTitle}
          </span>
          {buttonLink && buttonTitle && (
            <Link
              href={buttonLink}
              target='_blank'
              className='rounded-md border border-yellow-500 bg-blue-500 px-2 py-1  text-sm text-white '
              onClick={() => toast.remove(t.id)}
            >
              {buttonTitle}
            </Link>
          )}
        </div>
        {alertSubtitle && (
          <div className='text-left text-sm'>
            <span>{alertSubtitle}</span>
          </div>
        )}
      </div>

      <GrClose
        className='cursor-pointer text-sm   text-gray-500'
        onClick={() => toast.remove(t.id)}
      />
    </div>
  ));
};
