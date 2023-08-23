import { useTranslation } from 'next-i18next';
import React from 'react';
import Datepicker from 'react-datepicker';
import { HiOutlineArrowLongRight } from 'react-icons/hi2';

import clsxm from '@/lib/clsxm';

interface FilterProps {
  className?: string;
  min: number | null;
  max: number | null;
  setValues: (type: string, min: number | null, max: number | null) => void;
}

function DateFilter({ className, setValues, min, max }: FilterProps) {
  const { i18n } = useTranslation('common');

  return (
    <div
      className={clsxm(
        'flex h-[150px] items-center justify-center pl-5',
        className
      )}
    >
      <div className='flex h-full items-center gap-0'>
        <Datepicker
          locale='ru'
          selected={min ? new Date(min) : null}
          onChange={(date) => {
            setValues('product_created_at', date?.getTime() || null, max);
          }}
          placeholderText={i18n.language === 'uz' ? 'Dan' : 'От'}
          minDate={new Date(1684627200000)}
          className='w-[150px] max-w-[150px] appearance-none rounded-none border-b border-blue-700 border-l-transparent border-r-transparent border-t-transparent p-2 outline-none focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent focus:ring-0'
        />
        <HiOutlineArrowLongRight className='mx-3 text-blue-700' />
        <Datepicker
          locale='ru'
          selected={max ? new Date(max) : null}
          onChange={(date) => {
            setValues('product_created_at', min, date?.getTime() || null);
          }}
          placeholderText={i18n.language === 'uz' ? 'Gacha' : 'До'}
          maxDate={new Date()}
          minDate={min ? new Date(min) : null}
          className='w-[150px] appearance-none rounded-none border-b border-blue-700 border-l-transparent border-r-transparent border-t-transparent p-2 outline-none focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent focus:ring-0'
        />
      </div>
    </div>
  );
}

export default DateFilter;
