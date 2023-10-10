import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFileExcel } from 'react-icons/fa';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getSubcategoriesTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import {
  CategoryAnalyticsDataType,
  getActiveDateRangeHandler,
  getDateRangeString,
} from '@/components/pages/category/slug/components/CategoryTrends';
import { RenderAlert } from '@/components/shared/AlertComponent';
import Button from '@/components/shared/buttons/Button';
import DoughnutEcharts from '@/components/shared/DoughnutEcharts';
import Table from '@/components/shared/Table';

import { useContextState } from '@/context/Context';

interface Props {
  className?: string;
  categoryId: string;
  isActive: boolean;
}

interface SubcategoryType {
  category_id: number;
  category_title: string;
  category_title_ru: string;
  orders_3_days: number;
  orders_7_days: number;
  orders_30_days: number;
  orders_60_days: number;
  orders_90_days: number;
  orders_120_days: number;
  revenue_3_days: number;
  revenue_7_days: number;
  revenue_30_days: number;
  revenue_60_days: number;
  revenue_90_days: number;
  revenue_120_days: number;
  total_products: number;
  total_shops: number;
}

function Subcategories({ className, categoryId, isActive }: Props) {
  const { t: t2, i18n } = useTranslation('tableColumns');
  const { t } = useTranslation('categories');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<string>(t2('revenue'));
  const [activeDateRange, setActiveDateRange] = React.useState<number>(3);
  const { state } = useContextState();
  const [data, setData] = React.useState<{
    data: SubcategoryType[];
    main: CategoryAnalyticsDataType;
  }>({ data: [], main: {} as CategoryAnalyticsDataType } as {
    data: SubcategoryType[];
    main: CategoryAnalyticsDataType;
  });
  const [zoomLevel, setZoomLevel] = React.useState(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.75); // 90% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          data: SubcategoryType[];
          main: CategoryAnalyticsDataType[];
          total: number;
        }>
      >(`/category/analytics/subcategory/` + categoryId + '?range=40')
      .then((res) => {
        setData({
          data: res.data.data,
          main: res.data.main[0],
        });
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in subcategories');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (!isActive) return null;

  const getData = () => {
    // consider tab, and activeDateRange

    if (tab === t('revenue')) {
      const index = 'revenue_' + activeDateRange + '_days';
      return data.data.map((item: { [key: string]: any }) => ({
        name:
          i18n.language === 'uz'
            ? item.category_title.split('((')[0]
            : item.category_title_ru.split('((')[0],
        value: item[index] ?? 0,
      }));
    } else if (tab === t('orders')) {
      const index = 'orders_' + activeDateRange + '_days';
      return data.data.map((item: { [key: string]: any }) => ({
        name:
          i18n.language === 'uz'
            ? item.category_title.split('((')[0]
            : item.category_title_ru.split('((')[0],
        value: item[index] ?? 0,
      }));
    } else if (tab === t('products')) {
      return data.data.map((item: { [key: string]: any }) => ({
        name:
          i18n.language === 'uz'
            ? item.category_title.split('((')[0]
            : item.category_title_ru.split('((')[0],
        value: item.total_products ?? 0,
      }));
    } else {
      return data.data.map((item: { [key: string]: any }) => ({
        name:
          i18n.language === 'uz'
            ? item.category_title.split('((')[0]
            : item.category_title_ru.split('((')[0],
        value: item.total_shops ?? 0,
      }));
    }
  };

  const makeTableData = () => {
    const revenue_index = 'revenue_' + activeDateRange + '_days';
    const orders_index = 'orders_' + activeDateRange + '_days';

    return data.data.map((item: { [key: string]: any }) => ({
      ...item,
      revenue: item[revenue_index] ?? 0,
      orders: item[orders_index] ?? 0,
    }));
  };

  return loading || data?.data.length > 0 ? (
    <Container
      className={clsxm(
        'flex h-full min-h-full w-full min-w-[1200px] max-w-full flex-col gap-6 overflow-hidden border-none shadow-none',
        className
      )}
      id='subcategories'
      loading={loading}
    >
      <div className='mb-4 flex items-center justify-between'>
        {/* Tabs on the top-left */}
        <div className='flex gap-0'>
          {[t('revenue'), t('orders'), t('products'), t('shops')].map(
            (tab_) => (
              <button
                className={clsxm(
                  'border border-gray-300 px-4 py-1 transition-colors',
                  tab === tab_ ? 'bg-primary text-white' : 'bg-white'
                )}
                key={tab_}
                onClick={() => setTab(tab_)}
              >
                {tab_}
              </button>
            )
          )}
        </div>

        {/* Date range options on the top-right */}
        {tab === t('revenue') || tab === t('orders') ? (
          <div className='flex gap-0'>
            {[
              i18n.language === 'ru' ? '3 дня' : '3 kun',
              i18n.language === 'ru' ? '7 дней' : '7 kun',
              i18n.language === 'ru' ? '30 дней' : '30 kun',
              i18n.language === 'ru' ? '60 дней' : '60 kun',
              i18n.language === 'ru' ? '90 дней' : '90 kun',
              i18n.language === 'ru' ? '120 дней' : '120 kun',
            ].map((dateRange) => (
              <button
                key={dateRange}
                className={clsxm(
                  'border border-gray-300 px-4 py-1 transition-colors',
                  getDateRangeString(activeDateRange, i18n) === dateRange
                    ? 'bg-primary text-white'
                    : 'bg-white'
                )}
                onClick={() => {
                  const days = getActiveDateRangeHandler(dateRange);
                  if (
                    days >= 7 &&
                    (state.user?.tariff === 'free' ||
                      state.user?.tariff === 'trial')
                  ) {
                    RenderAlert({
                      alertTitle:
                        i18n.language === 'uz'
                          ? "Foydalanish uchun boshqa tarifga o'ting"
                          : 'Для использования перейдите на другой тариф',
                      alertSubtitle: '',
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                      buttonLink: '/profile',
                    });
                    return;
                  }
                  if (days > 60 && state.user?.tariff === 'base') {
                    RenderAlert({
                      alertTitle:
                        i18n.language === 'uz'
                          ? "Foydalanish uchun Sotuvchi tarifiga o'ting"
                          : 'Для использования перейдите на Продавец тариф',
                      alertSubtitle: '',
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                      buttonLink: '/profile',
                    });
                    return;
                  }
                  if (days > 90 && state.user?.tariff === 'base') {
                    RenderAlert({
                      alertTitle:
                        i18n.language === 'uz'
                          ? "Foydalanish uchun Biznes tarifiga o'ting"
                          : 'Для использования перейдите на Бизнес тариф',
                      alertSubtitle: '',
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                      buttonLink: '/profile',
                    });
                    return;
                  }
                  setActiveDateRange(getActiveDateRangeHandler(dateRange));
                }}
              >
                {dateRange}
              </button>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
      <DoughnutEcharts
        data={getData()}
        loading={loading}
        style={{
          width: '100%',
          height: '600px',
        }}
      />
      <div className='flex w-full items-center justify-end'>
        <Button
          className='flex transform items-center justify-center space-x-2 rounded-md bg-green-500 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-green-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'
          onClick={() => {
            if (
              state.user?.tariff === 'free' ||
              state.user?.tariff === 'trial'
            ) {
              RenderAlert({
                alertTitle:
                  i18n.language === 'uz'
                    ? "Excel faylga yuklab olish uchun boshqa tarifga o'ting"
                    : 'Для загрузки в Excel перейдите на другой тариф',
                alertSubtitle: '',
                buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                buttonLink: '/profile',
              });
              return;
            }
            // exportToExcel();
          }}
          // isLoading={loading}
          spinnerColor='rgb(126 34 206)'
        >
          {/* {loading ? (
          <Spinner size='24px' />
        ) : ( */}
          <>
            <FaFileExcel className='h-5 w-5' />
            <p>{i18n.language === 'uz' ? 'Yuklab olish' : 'Скачать'}</p>
          </>
          {/* )} */}
        </Button>
      </div>
      {loading || data.data.length > 0 ? (
        <Table
          isBalham
          headerHeight={60}
          className=''
          columnDefs={getSubcategoriesTableColumnDefs(t2, i18n.language) as any}
          rowHeight={80}
          rowData={makeTableData()}
        />
      ) : (
        <></>
      )}
    </Container>
  ) : (
    // otherwise say there is not subcategories
    <div className='flex h-full items-center justify-center'>
      <p>
        {i18n.language === 'uz'
          ? 'Ichki kategoriyalar mavjud emas'
          : 'Нет подкатегорий'}
      </p>
    </div>
  );
}

export default Subcategories;
