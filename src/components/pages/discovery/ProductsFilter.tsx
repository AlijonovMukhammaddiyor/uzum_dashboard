import { useTranslation } from 'next-i18next';
import React from 'react';

import DateFilter from '@/components/pages/discovery/DateFilter';
import Filter from '@/components/pages/discovery/Filter';
export interface HomeStatisticsContainerProps {
  className?: string;
  filters: {
    min: number | null;
    max: number | null;
    type: string;
  }[];
  setFilters: React.Dispatch<
    React.SetStateAction<
      {
        min: number | null;
        max: number | null;
        type: string;
      }[]
    >
  >;
}

function ProductsFilter({ filters, setFilters }: HomeStatisticsContainerProps) {
  const { t, i18n } = useTranslation('tableColumns');

  const setFilter = (type: string, min: number | null, max: number | null) => {
    const newFilters = filters.filter((filter) => filter.type !== type);
    if (min || max) {
      newFilters.push({ type, min, max });
    }
    setFilters(newFilters);
  };

  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-0 divide-y-4'>
      <div className='pb-3 text-lg'>
        {i18n.language === 'uz'
          ? 'Kerakli mahsulotlar topish uchun quyidagi filtrlardan foydalaning'
          : 'Используйте следующие фильтры для поиска нужных товаров'}
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='w-[300px] py-3'>
          <p className='text-base font-semibold'>
            {i18n.language === 'uz' ? 'Sotuvga chiqqan sanasi' : 'Дата запуска'}
          </p>
          <p>
            {i18n.language === 'uz'
              ? "Ushbu filtrlar orqali eng so'nggi mahsulotlarni yoki ma'lum bir sanalarda (jumladan bayramlarda) sotuvga chiqqan mahsulotlarni topishingiz mumkin."
              : 'С помощью этих фильтров вы можете найти продукты, выпущенные между определенными датами, или продукты, выпущенные в особые дни (например, праздники).'}
          </p>
        </div>
        <DateFilter
          setValues={setFilter}
          min={getFilter(filters, 'product_created_at')[0]}
          max={getFilter(filters, 'product_created_at')[1]}
        />
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 pt-6'>
          <p className='text-base font-semibold'>
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
                : 'Количество продаж за последние 30 дней'
            }
            setValues={setFilter}
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
          <p className='text-base font-semibold'>
            {/* Daromad miqdoriga ko'ra filtrlash
             */}
            {i18n.language === 'uz'
              ? "Daromad miqdoriga ko'ra filtrlash"
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
          <p className='text-base font-semibold'>
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
                : 'Количество отзывов за последние 30 дней'
            }
            setValues={setFilter}
            type='diff_reviews_amount'
            min={getFilter(filters, 'diff_reviews_amount')[0]}
            max={getFilter(filters, 'diff_reviews_amount')[1]}
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
          <p className='text-base font-semibold'>
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
    </div>
  );
}

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
export default ProductsFilter;
