import { useTranslation } from 'next-i18next';
import React from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

import clsxm from '@/lib/clsxm';

import AdditionalProductsFilter from '@/components/pages/discovery/AdditionalFilters';
import Filter from '@/components/pages/discovery/Filter';
import Button from '@/components/shared/buttons/Button';

import { useContextState } from '@/context/Context';
interface HomeStatisticsContainerProps {
  filters: {
    min: number | null;
    max: number | null;
    type: string;
  }[];
  setShouldRefetch: () => void;
  setFilters: React.Dispatch<
    React.SetStateAction<
      {
        min: number | null;
        max: number | null;
        type: string;
      }[]
    >
  >;
  nameFilters: {
    value: string[] | null;
    type: string;
  }[];
  setNameFilters: React.Dispatch<
    React.SetStateAction<
      {
        value: string[] | null;
        type: string;
      }[]
    >
  >;
  loading?: boolean;
}

function CategoryProductsFilters({
  filters,
  setFilters,
  loading,
  nameFilters,
  setShouldRefetch,
  setNameFilters,
}: HomeStatisticsContainerProps) {
  const { i18n } = useTranslation('common');
  const { state } = useContextState();

  const setFilter = (type: string, min: number | null, max: number | null) => {
    const newFilters = filters.filter((filter) => filter.type !== type);
    if (min || max) {
      newFilters.push({ type, min, max });
    }
    setFilters(newFilters);
  };
  return (
    <div>
      {' '}
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 pt-6'>
          <p className='font-semibold'>
            {i18n.language === 'uz'
              ? "Sotuv soniga ko'ra filtrlash"
              : 'Фильтрация по количеству продаж'}
          </p>
        </div>
        <div className='flex py-6 pl-5'>
          <Filter
            min={getFilter(filters, 'diff_orders_amount')[0]}
            type='diff_orders_amount'
            max={getFilter(filters, 'diff_orders_amount')[1]}
            title={
              i18n.language === 'uz'
                ? 'Oxirgi 30 kundagi sotuvlar soni'
                : 'Кол-во продаж за последние 30 дней'
            }
            setValues={setFilter}
            isDisabled={
              state.user?.tariff === 'free'
                ? true
                : state.user?.tariff === 'trial'
                ? true
                : false
            }
          />
          <Filter
            title={
              i18n.language === 'uz' ? 'Jami sotuvlar soni' : 'Всего продаж'
            }
            setValues={setFilter}
            type='orders_amount'
            min={getFilter(filters, 'orders_amount')[0]}
            max={getFilter(filters, 'orders_amount')[1]}
          />
        </div>
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 py-6'>
          <p className='font-semibold'>
            {/* Daromad miqdoriga ko'ra filtrlash
             */}
            {i18n.language === 'uz'
              ? "Tushum miqdoriga ko'ra filtrlash"
              : 'Фильтрация по объему дохода'}
          </p>
        </div>
        <div className='flex py-6 pl-5'>
          <Filter
            title={
              i18n.language === 'uz'
                ? 'Oxirgi 30 kundagi daromadmiqdori'
                : 'Объем дохода за последние 30 дней'
            }
            setValues={setFilter}
            type='diff_orders_money'
            min={getFilter(filters, 'diff_orders_money')[0]}
            max={getFilter(filters, 'diff_orders_money')[1]}
            isDisabled={
              state.user?.tariff === 'free'
                ? true
                : state.user?.tariff === 'trial'
                ? true
                : false
            }
          />
          <Filter
            title={
              i18n.language === 'uz'
                ? 'Jami daromad miqdori'
                : 'Общий объем дохода'
            }
            setValues={setFilter}
            type='orders_money'
            min={getFilter(filters, 'orders_money')[0]}
            max={getFilter(filters, 'orders_money')[1]}
          />
        </div>
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 py-6'>
          <p className='font-semibold'>
            {/* Izohlar soniga ko'ra filtrlash */}
            {i18n.language === 'uz'
              ? "Izohlar soniga ko'ra filtrlash"
              : 'Фильтрация по количеству отзывов'}
          </p>
        </div>
        <div className='flex py-6 pl-5'>
          <Filter
            title={
              i18n.language === 'uz'
                ? 'Oxirgi 30 kundagi izohlar soni'
                : 'Кол-во отзывов за последние 30 дней'
            }
            setValues={setFilter}
            type='diff_reviews_amount'
            min={getFilter(filters, 'diff_reviews_amount')[0]}
            max={getFilter(filters, 'diff_reviews_amount')[1]}
            isDisabled={
              state.user?.tariff === 'free'
                ? true
                : state.user?.tariff === 'trial'
                ? true
                : false
            }
          />
          <Filter
            title={
              i18n.language === 'uz' ? 'Jami izohlar soni' : 'Всего отзывов'
            }
            setValues={setFilter}
            type='reviews_amount'
            min={getFilter(filters, 'reviews_amount')[0]}
            max={getFilter(filters, 'reviews_amount')[1]}
          />
        </div>
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 py-6'>
          <p className='font-semibold'>
            {i18n.language === 'uz'
              ? "Narxiga ko'ra filtrlash"
              : 'Фильтрация по цене'}
          </p>
        </div>
        <div className='flex py-6 pl-5'>
          <Filter
            title=''
            setValues={setFilter}
            type='avg_purchase_price'
            min={getFilter(filters, 'avg_purchase_price')[0]}
            max={getFilter(filters, 'avg_purchase_price')[1]}
          />
        </div>
      </div>
      <AdditionalProductsFilter
        filters={nameFilters}
        setFilters={setNameFilters}
      />
      <div className='flex w-full items-center justify-end gap-7'>
        <Button
          onClick={() => {
            setFilters([]);
            setNameFilters([]);
          }}
          className={clsxm(
            `w-[150px] rounded border border-black px-4 py-2 text-black`
          )}
          rightIcon={AiOutlineClear}
          rightIconClassName='text-black ml-1'
        >
          <>{i18n.language === 'uz' ? 'Tozalash' : 'Очистить'}</>
        </Button>
        <Button
          onClick={() => {
            setShouldRefetch();
          }}
          className={clsxm(
            `w-[150px] rounded bg-purple-700 px-4 py-2 text-white hover:bg-purple-800`
          )}
          isLoading={loading}
          spinnerColor='primary'
          rightIcon={BsSearch}
          rightIconClassName='text-white ml-1'
        >
          <>{i18n.language === 'uz' ? 'Qidirish' : 'Найти'}</>
        </Button>
      </div>
    </div>
  );
}

export default CategoryProductsFilters;

function getFilter(
  filters: {
    min: number | null;
    max: number | null;
    type: string;
  }[],
  type: string
) {
  const filter = filters.find((filter) => filter.type === type);
  if (filter) {
    return [filter.min, filter.max];
  }

  return [null, null];
}
