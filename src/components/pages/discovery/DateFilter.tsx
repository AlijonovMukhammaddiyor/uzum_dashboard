import React from 'react';
import Datepicker from 'react-datepicker';
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

function DateFilter({
  title,
  description,
  className,
  setValues,
  min = 1684627200000,
  max = new Date().getTime(),
}: FilterProps) {
  return (
    <div className={clsxm('h-[200px] w-[400px]', className)}>
      <div className='mb-4 flex items-center justify-start gap-2 font-semibold'>
        <p className='text-lg'>{title}</p>
        <LiaQuestionCircleSolid className='h-5 w-5 cursor-pointer text-blue-700' />
      </div>
      <div className='flex w-full items-center gap-3'>
        <Datepicker
          locale='ru'
          selected={new Date(min)}
          onChange={(date) => {
            setValues({
              min: date?.getTime() || 1684627200000,
              max,
            });
          }}
          minDate={new Date(1684627200000)}
          className='w-[150px] appearance-none rounded-none border-b border-blue-700 border-l-transparent border-r-transparent border-t-transparent p-2 outline-none focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent focus:ring-0'
        />

        <HiOutlineArrowLongRight className='text-blue-700' />
        <Datepicker
          locale='ru'
          selected={new Date(max)}
          onChange={(date) => {
            setValues({
              min,
              max: date?.getTime() || new Date().getTime(),
            });
          }}
          maxDate={new Date()}
          minDate={new Date(min)}
          className='w-[150px] appearance-none rounded-none border-b border-blue-700 border-l-transparent border-r-transparent border-t-transparent p-2 outline-none focus:border-l-transparent focus:border-r-transparent focus:border-t-transparent focus:ring-0'
        />
      </div>
    </div>
  );
}

export default DateFilter;
