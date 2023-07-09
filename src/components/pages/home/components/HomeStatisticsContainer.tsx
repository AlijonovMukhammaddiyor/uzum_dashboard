import React from 'react';
import {
  HiChevronDown,
  HiOutlineBuildingStorefront,
  HiOutlineClipboardDocumentCheck,
  HiOutlineShoppingBag,
} from 'react-icons/hi2';
import { RiArrowLeftDownFill, RiArrowRightUpFill } from 'react-icons/ri';

import clsxm from '@/lib/clsxm';

import AreaChartComponent from '@/components/shared/AreaChartComponent';

export interface HomeStatisticsContainerProps {
  className?: string;
  statistics: {
    orders: number;
    pastOrders: number;
    products: number;
    pastProducts: number;
    shops: number;
    pastShops: number;
  };
}

function HomeStatisticsContainer({
  className,
  statistics,
}: HomeStatisticsContainerProps) {
  const [activeTab, setActiveTab] = React.useState<
    'orders' | 'products' | 'sellers'
  >('orders');
  const [activeDaysTab, setActiveDaysTab] = React.useState<number>(0);

  const calculatePercentage = (current: number, before: number) => {
    const percentage = Math.round(((current - before) / before) * 100);
    // convert to string
    const percentageString = percentage.toString() + '%';
    if (percentage < 0) {
      return (
        <div className='flex items-center'>
          <RiArrowLeftDownFill className='text-red-500' />
          <div className='text-sm text-red-500'>
            {percentageString.replace('-', '')}
          </div>
        </div>
      );
    }
    if (percentage === 0) {
      return (
        <div className='flex items-center'>
          <div className='text-slate-400'>{percentageString}</div>
        </div>
      );
    }
    return (
      <div className='flex items-center'>
        <RiArrowRightUpFill className='text-green-500' />
        <div className='text-sm text-green-500'>{percentageString}</div>
      </div>
    );
  };

  return (
    <div
      className={clsxm(
        'flex h-[500px] w-full items-start justify-start overflow-x-scroll',
        className
      )}
    >
      <div className='relative flex h-full w-[320px] flex-shrink-0 flex-col items-start justify-start bg-white'>
        <div
          className={clsxm(
            'bg-primary absolute left-0 top-0 h-[150px] w-1 transition-transform',
            activeTab === 'orders' && 'translate-y-0 transform',
            activeTab === 'products' && 'translate-y-[150px] transform',
            activeTab === 'sellers' && 'translate-y-[300px] transform'
          )}
        ></div>
        <TabItem
          title='Buyurtmalar'
          icon={
            <HiOutlineClipboardDocumentCheck className='h-6 w-6 flex-shrink-0 font-bold text-white' />
          }
          isActive={activeTab === 'orders'}
          subtitle='Kechagi buyurtmalar'
          onClick={() => setActiveTab('orders')}
          number={statistics.orders}
          tag={calculatePercentage(statistics.orders, statistics.pastOrders)}
        />
        <TabItem
          title='Mahsulotlar'
          icon={
            <HiOutlineShoppingBag className='h-6 w-6 flex-shrink-0 font-bold text-white' />
          }
          isActive={activeTab === 'products'}
          subtitle='Kechagi yangi mahsulotlar'
          onClick={() => setActiveTab('products')}
          number={statistics.products}
          tag={calculatePercentage(
            statistics.products,
            statistics.pastProducts
          )}
        />
        <TabItem
          title='Do`konlar'
          icon={
            <HiOutlineBuildingStorefront className='h-6 w-6 flex-shrink-0 font-bold text-white' />
          }
          isActive={activeTab === 'sellers'}
          subtitle='Kecha ochilgan do`konlar'
          onClick={() => setActiveTab('sellers')}
          number={statistics.shops}
          tag={calculatePercentage(statistics.shops, statistics.pastShops)}
        />
      </div>
      <div className='h-[calc(100%-20px)] w-[calc(100%-320px)] flex-1 bg-white pl-3'>
        <DropDown
          values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
          activeTab={activeDaysTab}
          setActiveTab={setActiveDaysTab}
          className=''
        />
        <div className='h-[calc(100%-18px)] w-full'>
          <AreaChartComponent />
        </div>
      </div>
    </div>
  );
}

function TabItem({
  title,
  icon,
  isActive,
  onClick,
  subtitle,
  number,
  tag,
}: {
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  subtitle?: string;
  number: number;
  tag?: React.ReactNode;
}) {
  return (
    <div
      className={clsxm(
        'flex h-[150px] w-full shrink-0 cursor-pointer flex-col items-start justify-start gap-2 p-3',
        isActive && 'bg-slate-300 bg-opacity-25',
        !isActive && 'hover:bg-gray-50'
      )}
      onClick={onClick}
    >
      <p className='font-primary text-base font-bold'>{title}</p>
      <div className='flex items-center justify-start gap-3'>
        <div className='bg-primary flex h-10 w-10 items-center justify-center rounded-full'>
          {icon}
        </div>
        <div className='flex flex-col items-start justify-between'>
          <p className='font-primary text-sm text-slate-400'>{subtitle}</p>
          <div className='flex items-center justify-start gap-3'>
            <p className='text-primary text-lg font-bold'>{number}</p>
            {tag}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeStatisticsContainer;

export interface DropDownProps {
  className?: string;
  values: string[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

export function DropDown({
  className,
  values,
  activeTab,
  setActiveTab,
}: DropDownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <div className={clsxm('flex items-center justify-end', className)}>
      <div className='relative z-10'>
        <button
          id='dropdownDefaultButton'
          data-dropdown-toggle='dropdown'
          className='bg-primary flex w-[140px] items-center justify-between rounded-md px-3 py-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-0'
          type='button'
          aria-haspopup='true'
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {values[activeTab]}
          <HiChevronDown className='h-4 w-4 flex-shrink-0' />
        </button>

        <div
          id='dropdown'
          className={clsxm(
            'absolute right-0 top-8 z-10 max-h-[500px] w-44 divide-y divide-gray-100 overflow-y-scroll rounded-lg bg-slate-700 shadow',
            isDropdownOpen ? 'block' : 'hidden'
          )}
        >
          <ul
            className='py-2 text-sm text-gray-700 dark:text-gray-200'
            aria-labelledby='dropdownDefaultButton'
          >
            {values.map((day, index) => (
              <li key={index}>
                <button
                  className={clsxm(
                    'flex w-full justify-between px-4 py-2 text-left text-sm leading-5',
                    activeTab === index
                      ? 'text-primary'
                      : 'text-slate-500 hover:bg-slate-300',
                    index === 0 && 'rounded-t-lg',
                    index === values.length - 1 && 'rounded-b-lg'
                  )}
                  onClick={() => {
                    setActiveTab(index);
                    setIsDropdownOpen(false);
                  }}
                >
                  {day}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
