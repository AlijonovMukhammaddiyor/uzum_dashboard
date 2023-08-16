import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiChevronDown } from 'react-icons/hi';
import { VscDebugBreakpointData } from 'react-icons/vsc';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getShopDailySaleColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

export interface ShopDailySalesProps {
  sellerId: number;
  className?: string;
  isActive: boolean;
}

interface Entry {
  before: number | null;
  target: number;
  change: number;
}

interface ExtendedProductAnalyticsType {
  date_pretty: string;
  average_purchase_price: Entry;
  orders: Entry;
  position: Entry;
  position_in_category: Entry;
  position_in_shop: Entry;
  available_amount: Entry;
  reviews: Entry;
  rating: Entry;
  product__product_id: number;
  product__title: string;
  product__category__title: string;
}

const ShopDailySales: React.FC<ShopDailySalesProps> = ({
  sellerId,
  className,
  isActive,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ExtendedProductAnalyticsType[]>([]);
  const { t: t2, i18n } = useTranslation('tableColumns');

  const [dates, setDates] = useState<string[]>(
    Array.from(Array(60).keys())
      .map((i) => {
        let j = i + 1;
        // check if it is after 9 am in Tashkent
        const date_in_tashkent = new Date().getUTCHours() + 5;
        const after = date_in_tashkent >= 7;

        if (!after) j++;
        // in Asia/Tashkent timezone it is 5 hours ahead of UTC
        const date = new Date(new Date().getTime() + 5 * 60 * 60 * 1000);
        date.setDate(date.getDate() - j);
        const d = date.toISOString().split('T')[0];
        return d;
      })
      .filter((d) => d !== '2023-07-22  ')
  );
  // get list of past 30 days as yyyy-mm-dd in string. do not add today
  const [date, setDate] = useState<number>(0);
  const { t } = useTranslation('sellers');
  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<ExtendedProductAnalyticsType[]>>(
        '/shop/analytics/daily/' + sellerId + `?date=${dates[date]}`
      )
      .then((res) => {
        // logger(res.data, 'Shop daily sales');
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'Error in getting competitors');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, sellerId]);

  if (!isActive) return <></>;

  return (
    <div
      className={clsxm(
        'flex min-h-full flex-col items-start justify-start overflow-scroll',
        className
      )}
    >
      <div className='mb-8 flex w-full items-center justify-end'>
        <DropDown values={dates} activeTab={date} setActiveTab={setDate} />
      </div>

      <div className='mb-10 flex items-start justify-start'>
        <VscDebugBreakpointData className='text-primary text-2xl' />
        <p className='text-sm text-slate-500'>
          {t('product_info_changed_instruction')}
        </p>
      </div>

      <Container loading={loading} className={clsxm('h-[calc(100%)] w-full')}>
        <Table
          rowData={data}
          className='h-[1000px] min-h-full'
          columnDefs={getShopDailySaleColumnDefs(t2, i18n.language)}
        />
      </Container>
    </div>
  );
};

export default ShopDailySales;
export interface DropDownProps {
  className?: string;
  values: string[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

export function DropDown({
  className,
  values,
  activeTab,
  setActiveTab,
}: DropDownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  return (
    <div
      className={clsxm(
        'flex min-h-full items-center justify-end overflow-scroll',
        className
      )}
    >
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
