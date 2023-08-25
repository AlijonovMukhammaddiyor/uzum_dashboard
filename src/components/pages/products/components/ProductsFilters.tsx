import { useTranslation } from 'next-i18next';
import React from 'react';
import { AiOutlineClear } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

import clsxm from '@/lib/clsxm';

import AdditionalProductsFilter from '@/components/pages/discovery/AdditionalFilters';
import ProductsFilter from '@/components/pages/discovery/ProductsFilter';
import Button from '@/components/shared/buttons/Button';
interface ProductsFiltersProps {
  className?: string;
  loading?: boolean;
  filters: {
    max: number | null;
    min: number | null;
    type: string;
  }[];
  setFilters: React.Dispatch<
    React.SetStateAction<
      {
        max: number | null;
        min: number | null;
        type: string;
      }[]
    >
  >;
  nameFilters: {
    value: string | null;
    type: string;
  }[];
  setNameFilters: React.Dispatch<
    React.SetStateAction<
      {
        value: string | null;
        type: string;
      }[]
    >
  >;
  getData: () => void;
  clearFilters: () => void;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProductsFilters({
  className,
  filters,
  setFilters,
  nameFilters,
  setNameFilters,
  getData,
  clearFilters,
  setLoading,
  loading,
}: ProductsFiltersProps) {
  const { i18n } = useTranslation('common');

  return (
    <div
      className={clsxm(
        'relative z-10 flex  h-full max-h-full max-w-[1100px] flex-col items-start justify-between gap-4 rounded-none border-none bg-white pb-3 shadow-none',
        className
      )}
    >
      <div className='w-full'>
        <div className='w-full'>
          <div className='z-10 flex h-16 w-full items-center justify-start gap-5 bg-slate-200 px-3 text-lg font-semibold '>
            {/* <p>Asosiy Filtrlar</p>
             */}
            <p>
              {i18n.language === 'uz' ? 'Asosiy Filtrlar' : 'Основные фильтры'}
            </p>
            <p>-</p>
            <p className='text-sm font-normal'>
              {i18n.language === 'uz'
                ? "Ushbu filtrlar orqali siz o'zingiz istagan mahsulotlarni toping"
                : 'С помощью этих фильтров вы можете найти товары, которые вам нужны'}
            </p>
          </div>
          <div
            className={clsxm(
              'flex h-full max-w-full flex-1  flex-col gap-1 overflow-y-scroll p-6 px-4 pr-4 transition-all duration-300'
            )}
          >
            <ProductsFilter filters={filters} setFilters={setFilters} />
          </div>
        </div>
        <div className='w-full'>
          <div className='z-10 flex h-16 w-full items-center justify-start gap-5 bg-slate-200 px-3 text-lg font-semibold '>
            <p>
              {i18n.language === 'uz'
                ? "Qo'shimcha Filtrlar"
                : 'Дополнительные фильтры'}
            </p>
          </div>
          <div
            className={clsxm(
              'flex h-full max-w-full flex-1 flex-col gap-1 overflow-y-scroll p-6 px-3 transition-all duration-300'
            )}
          >
            <AdditionalProductsFilter
              filters={nameFilters}
              setFilters={setNameFilters}
            />
          </div>
        </div>
      </div>

      <div className='relative flex w-full items-center justify-end gap-6 p-5'>
        <p className='absolute -top-3 right-4 text-sm text-slate-400'>
          {i18n.language === 'uz'
            ? '10,000 tagacha mahsulot'
            : 'До 10,000 товаров'}
        </p>
        <Button
          onClick={() => {
            clearFilters();
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
            getData();
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

export default ProductsFilters;
