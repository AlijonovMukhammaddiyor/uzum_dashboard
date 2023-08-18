import React, { useEffect } from 'react';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';
import { LiaQuestionCircleSolid } from 'react-icons/lia';

import clsxm from '@/lib/clsxm';

interface FilterProps {
  title: string;
  description?: string;
  className?: string;
  min?: number;
  max?: number;
  setValues: (values: { min: number; max: number }) => void;
}

function Filter({
  title,
  description,
  className,
  setValues,
  min = 0,
  max = 100_000,
}: FilterProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    document.addEventListener('wheel', function (event) {
      if (
        document.activeElement &&
        (document.activeElement as HTMLInputElement).type === 'number' &&
        document.activeElement.classList.contains('noscroll')
      ) {
        (document.activeElement as HTMLInputElement).blur();
      }
    });
  }, []);

  return (
    <div className={clsxm('h-[200px] w-[400px]', className)}>
      <div className='mb-4 flex items-center justify-start gap-2 font-semibold'>
        <p className='text-lg'>{title}</p>
        <LiaQuestionCircleSolid className='h-5 w-5 cursor-pointer text-blue-700' />
      </div>
      <div className='flex w-full items-center gap-3'>
        <input
          type='number'
          min={0}
          // value={min}
          placeholder='Min'
          className='noscroll ring-none active:ring-none w-[150px] appearance-none rounded-none border-b border-blue-700 border-l-transparent border-r-transparent border-t-transparent p-2 outline-none focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent focus:ring-0'
          onChange={(e) => {
            setValues({
              min: Number(e.target.value),
              max,
            });
          }}
        />
        <HiOutlineArrowLongRight className='text-blue-700' />
        <input
          type='number'
          min={0}
          // value={max}
          placeholder='Max'
          className='noscroll ring-none active:ring-none w-[150px] appearance-none rounded-none border-b border-blue-700 border-l-transparent border-r-transparent border-t-transparent p-2 outline-none focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent focus:ring-0'
          onChange={(e) => {
            setValues({
              min,
              max: Number(e.target.value),
            });
          }}
        />
      </div>
    </div>
  );
}

export default Filter;
