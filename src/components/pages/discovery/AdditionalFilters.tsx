import { useTranslation } from 'next-i18next';
import React from 'react';

import TextFilter from '@/components/pages/discovery/TextFilter';
export interface HomeStatisticsContainerProps {
  className?: string;
  filters: {
    value: string | null;
    type: string;
  }[];
  setFilters: React.Dispatch<
    React.SetStateAction<
      {
        value: string | null;
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

  const setFilter = (type: string, value: string | null) => {
    const newFilters = filters.filter((filter) => filter.type !== type);
    if (value) {
      newFilters.push({ type, value });
    }
    setFilters(newFilters);
  };

  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-0 divide-y-4'>
      <div className='pb-3 text-lg'>
        {i18n.language === 'uz'
          ? "Malum bir mahsulot(lar)ni so'zlar orqali topish uchun quyidagi filtrlardan foydalaning"
          : 'Используйте следующие фильтры для поиска конкретного продукта (продуктов) по словам'}
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 py-3'>
          <p className='text-lg font-semibold'>
            {i18n.language === 'uz' ? 'Mahsulot nomi' : 'Название продукта'}
          </p>
        </div>
        <div className='flex py-3 pl-5'>
          <TextFilter
            setValues={setFilter}
            type={i18n.language === 'uz' ? 'product_title' : 'product_title_ru'}
            value={getFilter(
              filters,
              i18n.language === 'uz' ? 'product_title' : 'product_title_ru'
            )}
          />
        </div>
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 py-3'>
          <p className='text-lg font-semibold'>
            {i18n.language === 'uz' ? 'Kategoriya nomi' : 'Название категории'}
          </p>
        </div>
        <div className='flex py-3 pl-5'>
          <TextFilter
            setValues={setFilter}
            type={
              i18n.language === 'uz' ? 'category_title' : 'category_title_ru'
            }
            value={getFilter(
              filters,
              i18n.language === 'uz' ? 'category_title' : 'category_title_ru'
            )}
          />
        </div>
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 py-3'>
          <p className='text-lg font-semibold'>
            {' '}
            {i18n.language === 'uz' ? "Do'kon nomi" : 'Название магазина'}
          </p>
        </div>
        <div className='flex py-3 pl-5'>
          <TextFilter
            setValues={setFilter}
            type='shop_title'
            value={getFilter(filters, 'shop_title')}
          />
        </div>
      </div>
    </div>
  );
}

function getFilter(
  filters: {
    value: string | null;
    type: string;
  }[],
  type: string
) {
  const filter = filters.find((filter) => filter.type === type);
  if (filter) {
    return filter.value;
  }
  return null;
}
export default AdditionalProductsFilter;
