import React from 'react';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import { BsPlus } from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';
import { HiMinus } from 'react-icons/hi';

import clsxm from '@/lib/clsxm';

import MixedChart from '@/components/pages/home/components/SmallAxisCharts';

interface Props {
  title: string;
  all_title?: string;
  daily_title?: string;
  all: number;
  daily: number;
  all_last: number;
  daily_last: number;
  isCount?: boolean;
  last_date?: string;
  data_all: {
    x: string;
    y: number;
  }[];
  data_daily: {
    x: string;
    y: number;
  }[];
  all_color?: string;
  daily_color?: string;
  isFullScreen?: string | null;
  setFullScreen?: React.Dispatch<React.SetStateAction<string | null>>;
}

function DataContainer({
  title,
  all,
  daily,
  all_last,
  daily_last,
  last_date,
  data_all,
  data_daily,
  all_color,
  daily_color,
  isCount = true,
  isFullScreen = null,
  setFullScreen,
}: Props) {
  return (
    <div className='border-border h-[500px] min-h-[500px] w-[750px] min-w-[750px] rounded-xl border px-6 py-4 shadow-md'>
      {/* {isFullScreen && isFullScreen === title && <FullScreenContainer setFullScreen={setFullScreen} />} */}
      <div className='mb-8 flex items-center justify-between'>
        <h3
          className='font-primary text-base'
          style={{
            color: daily_color,
          }}
        >
          {title}
        </h3>
        <button
          className='flex cursor-not-allowed items-center justify-between gap-3 rounded-lg px-3 py-1 text-white shadow-inner'
          style={{
            backgroundColor: daily_color,
          }}
          onClick={() => {
            setFullScreen &&
              setFullScreen(isFullScreen === title ? null : title);
          }}
        >
          Batafsil ko'rish
          <FiChevronRight className='ml-2 inline-block' />
        </button>
      </div>
      <div className='flex h-[400px] w-full flex-col items-start justify-start gap-5'>
        <div className='flex w-full max-w-full items-center justify-start gap-5'>
          <div className=''>
            <div className='flex max-w-full items-center justify-start gap-6'>
              <p className='font-primary text-sm font-bold'>Jami: </p>
              <p className='-ml-4 shrink-0 text-2xl font-bold'>
                {isCount
                  ? all.toLocaleString()
                  : Math.round(all / 1000000) + ' mlrd'}
                <span className='text-sm font-normal'>
                  {isCount ? ' ta' : " so'm"}
                </span>
              </p>

              <div
                className={clsxm(
                  '-ml-3 flex shrink-0 items-center  justify-start gap-1 rounded-2xl bg-opacity-25 px-2 py-1',
                  Number(all) > Number(all_last) ? 'bg-green-600' : 'bg-red-600'
                )}
              >
                {Number(all) > Number(all_last) ? (
                  <BsPlus className='h-5 w-5 text-green-600' />
                ) : (
                  <HiMinus className='h-5 w-5 text-red-600' />
                )}
                <p
                  className={clsxm(
                    'text-xs',
                    Number(all) > Number(all_last)
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {isCount
                    ? Math.abs(all - all_last).toLocaleString()
                    : Math.abs(all - all_last) / 1000000 > 1
                    ? (Math.abs(all - all_last) / 1000000).toFixed(2) + ' mlrd'
                    : (Math.abs(all - all_last) / 1000).toFixed(2) + ' mln'}
                </p>
              </div>

              <p className='font-primary ml-10 text-sm font-bold '>Kechagi: </p>
              <p className='-ml-4 shrink-0 text-2xl font-bold '>
                {isCount
                  ? daily.toLocaleString()
                  : Math.abs(daily) / 1000000 > 1
                  ? Math.abs(daily / 1000000).toFixed(1) + ' mlrd'
                  : Math.abs(daily / 1000).toFixed(1) + ' mln'}
                <span className='text-sm font-normal'>
                  {isCount ? ' ta' : " so'm"}
                </span>
              </p>

              <div
                className={clsxm(
                  '-ml-3 flex shrink-0 items-center  justify-start gap-1 rounded-2xl bg-opacity-25 px-2 py-1',
                  Number(daily) > Number(daily_last)
                    ? 'bg-green-600'
                    : 'bg-red-600'
                )}
              >
                {Number(daily) > Number(daily_last) ? (
                  <BiTrendingUp className='h-5 w-5 text-green-600' />
                ) : (
                  <BiTrendingDown className='h-5 w-4 text-red-600' />
                )}
                <p
                  className={clsxm(
                    'text-xs',
                    Number(daily) > Number(daily_last)
                      ? 'text-green-600'
                      : 'text-red-600'
                  )}
                >
                  {calculateChange(daily, daily_last)} %
                </p>
              </div>
            </div>

            <p className='text-sm text-slate-500'>
              Yangilangan sana: {last_date}
            </p>
          </div>
        </div>
        <div className='h-[300px] w-full flex-1'>
          <MixedChart
            data={[
              {
                type: 'line',
                data: data_daily,
                borderColor: daily_color,
                label: 'Kunlik',
              },
              {
                type: 'bar',
                data: data_all,
                backgroundColor: all_color,
                label: 'Jami',
              },
            ]}
            labels={data_daily.map((d) => d.x)}
          />
        </div>
      </div>
    </div>
  );
}

function calculateChange(current: number, last: number) {
  if (last === 0) return 0;

  return (Math.abs((current - last) / last) * 100).toFixed(2);
}

export default DataContainer;
