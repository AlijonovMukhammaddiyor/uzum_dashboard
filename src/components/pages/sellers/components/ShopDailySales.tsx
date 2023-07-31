import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VscDebugBreakpointData } from 'react-icons/vsc';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getShopDailySaleColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { DropDown } from '@/components/pages/home/components/HomeStatisticsContainer';
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
        'flex h-[calc(100%-100px)] flex-col items-start justify-start',
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

      <Container
        loading={loading}
        className={clsxm('h-[calc(100%-100px)] w-full')}
      >
        <Table
          rowData={data}
          className='min-h-full'
          columnDefs={getShopDailySaleColumnDefs(t2, i18n.language)}
        />
      </Container>
    </div>
  );
};

export default ShopDailySales;
