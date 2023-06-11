import React from 'react';
import { RiArrowLeftDownFill, RiArrowRightUpFill } from 'react-icons/ri';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/shared/links/UnstyledLink';

export interface StatisticsContainerProps {
  className?: string;
  number: number; // current statistics number
  title: string;
  subtitle?: string;
  before: number; // past statistics number: based on this number, we will calculate the percentage of the current number
}

function StatisticsContainer({
  className,
  number,
  title,
  subtitle,
  before,
}: StatisticsContainerProps) {
  const percentage = calculatePercentage();

  function calculatePercentage() {
    const percentage = Math.round(((number - before) / before) * 100);

    // convert to string
    const percentageString = '+' + percentage.toString() + '%';
    if (percentage < 0) {
      return percentageString.replace('+', '-');
    }
    if (percentage === 0) {
      return '0%';
    }
    return percentageString;
  }

  return (
    <UnstyledLink
      href='#'
      className={clsxm(
        'flex h-[100px] w-[400px] items-center justify-between rounded-lg border border-gray-200 bg-white p-3 shadow hover:bg-gray-100',
        className
      )}
    >
      <div className='flex flex-col items-start justify-between'>
        <p className='font-primary text-base font-bold'>{title}</p>
        <p className='font-primary text-sm text-slate-400'>{subtitle}</p>
      </div>
      <div className='flex items-end justify-between gap-1'>
        <p className='text-primary text-2xl font-bold'>{number}</p>
        <div className='flex items-center'>
          {
            // if percentage is negative, then show red arrow
            // if percentage is positive, then show green arrow
            // if percentage is zero, do not show any arrow
            percentage.includes('-') ? (
              <RiArrowLeftDownFill className='text-red-500' />
            ) : percentage.includes('+') ? (
              <RiArrowRightUpFill className='text-green-500' />
            ) : (
              ''
            )
          }
          <span
            className={clsxm(
              'font-primary',
              percentage.includes('-')
                ? 'text-red-500'
                : percentage.includes('+')
                ? 'text-green-500'
                : 'text-gray-500'
            )}
          >
            {/* remove + or - as we are alrady showing arrows*/}
            {percentage.includes('-')
              ? percentage.replace('-', '')
              : percentage.includes('+')
              ? percentage.replace('+', '')
              : percentage}
          </span>
        </div>
      </div>
    </UnstyledLink>
  );
}

export default StatisticsContainer;
