import { useTranslation } from 'next-i18next';
import React from 'react';

import DateFilter from '@/components/pages/discovery/DateFilter';
import Filter from '@/components/pages/discovery/Filter';

import { useContextState } from '@/context/Context';
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
  const { state } = useContextState();
  const setFilter = (type: string, min: number | null, max: number | null) => {
    console.log(type, min, max);
    const newFilters = filters.filter((filter) => filter.type !== type);
    if (min || max) {
      newFilters.push({ type, min, max });
    }
    setFilters(newFilters);
  };

  return (
    <div className='flex h-full w-full flex-col items-start justify-start gap-0 divide-y-4'>
      <div className='pb-3'>
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
            min={getFilter(filters, 'monthly_orders')[0]}
            type='monthly_orders'
            max={getFilter(filters, 'monthly_orders')[1]}
            title={
              i18n.language === 'uz'
                ? 'Oxirgi 30 kundagi sotuvlar soni'
                : 'Кол-во продаж за последние 30 дней'
            }
            isDisabled={
              state.user?.tariff === 'free'
                ? true
                : state.user?.tariff === 'trial'
                ? true
                : false
            }
            setValues={setFilter}
          />
          <Filter
            title={
              i18n.language === 'uz'
                ? 'Sotuvlar soni(90kun)'
                : 'Кол-во продаж(90дней)'
            }
            setValues={setFilter}
            type='orders_90_days'
            min={getFilter(filters, 'orders_90_days')[0]}
            max={getFilter(filters, 'orders_90_days')[1]}
          />
        </div>
      </div>
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 py-6'>
          <p className='text-base font-semibold'>
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
                ? 'Oxirgi 30 kundagi tushum miqdori'
                : 'Объем дохода за последние 30 дней'
            }
            setValues={setFilter}
            type='monthly_revenue'
            min={getFilter(filters, 'monthly_revenue')[0]}
            max={getFilter(filters, 'monthly_revenue')[1]}
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
                ? 'Tushum miqdori(90kun)'
                : 'Объем дохода(90дней)'
            }
            setValues={setFilter}
            type='revenue_90_days'
            min={getFilter(filters, 'revenue_90_days')[0]}
            max={getFilter(filters, 'revenue_90_days')[1]}
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
      <div className='flex w-full items-start justify-start gap-5 divide-x-4'>
        <div className='flex w-[300px] items-start justify-start gap-2 py-6'>
          <p className='text-base font-semibold'>
            {i18n.language === 'uz'
              ? "Reytingga ko'ra filtrlash"
              : 'Фильтрация по рейтингу'}
          </p>
        </div>
        <div className='flex py-6 pl-5'>
          <Filter
            title=''
            setValues={setFilter}
            type='rating'
            min={getFilter(filters, 'rating')[0]}
            max={getFilter(filters, 'rating')[1]}
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
