import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import TextFilter from '@/components/pages/discovery/TextFilter';
export interface HomeStatisticsContainerProps {
  className?: string;
  filters: {
    value: string[] | null;
    type: string;
  }[];
  setFilters: React.Dispatch<
    React.SetStateAction<
      {
        value: string[] | null;
        type: string;
      }[]
    >
  >;
}

function AdditionalProductsFilter({
  filters,
  setFilters,
}: HomeStatisticsContainerProps) {
  const { t, i18n } = useTranslation('common');
  const [inputValue, setInputValue] = useState<string>('');

  const setFilter = (type: string, value: string[] | null) => {
    const existingFilter = filters.find((filter) => filter.type === type);
    let newFilters = [...filters];

    if (existingFilter) {
      newFilters = filters.filter((filter) => filter.type !== type);
      if (value) {
        newFilters.push({ type, value });
      }
    } else if (value) {
      newFilters.push({ type, value: value });
    }

    setFilters(newFilters);
  };

  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-0 divide-y-4'>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] shrink-0 items-start justify-start gap-2 py-3'>
          <p className='font-semibold'>
            {i18n.language === 'uz'
              ? "Mahsulot nomi o'z ichiga oladi"
              : 'Название продукта включает в себя'}
          </p>
        </div>
        <div className='flex py-3 pl-5'>
          <TextFilter
            setValues={setFilter}
            type={
              i18n.language === 'uz'
                ? 'product_title_include'
                : 'product_title_include_ru'
            }
            value={getFilter(
              filters,
              i18n.language === 'uz'
                ? 'product_title_include'
                : 'product_title_include_ru'
            )}
          />
        </div>
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 py-3'>
          <p className='font-semibold'>
            {i18n.language === 'uz'
              ? "Mahsulot nomi o'z ichiga olmaydi"
              : 'Название продукта исключает'}
          </p>
        </div>
        <div className='flex py-3 pl-5'>
          <TextFilter
            setValues={setFilter}
            type={
              i18n.language === 'uz'
                ? 'product_title_exclude'
                : 'product_title_exclude_ru'
            }
            value={getFilter(
              filters,
              i18n.language === 'uz'
                ? 'product_title_exclude'
                : 'product_title_exclude_ru'
            )}
          />
        </div>
      </div>
    </div>
  );
}

function getFilter(
  filters: {
    value: string[] | null;
    type: string;
  }[],
  type: string
) {
  const filter = filters.find((filter) => filter.type === type);
  if (filter) {
    return filter.value ?? [];
  }
  return [];
}
export default AdditionalProductsFilter;
