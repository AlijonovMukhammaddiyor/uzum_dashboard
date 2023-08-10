import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import API from '@/lib/api';
import logger from '@/lib/logger';

import { getNichesColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

interface CategoryNichesType {
  category__ancestors: string;
  caegory__ancestors_ru: string;
  average_product_rating: number;
  category_id: number;
  category__title: string;
  category__title_ru: string;
  date_pretty: string;
  total_orders: number;
  total_orders_amount: number;
  total_products: number;
  total_products_with_sales: number;
  total_reviews: number;
  total_shops: number;
  total_shops_with_sales: number;
}

function NichesComponent() {
  const { t, i18n } = useTranslation('categories');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [data, setData] = React.useState<CategoryNichesType[]>([]);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);

    api
      .get<
        unknown,
        AxiosResponse<{
          data: CategoryNichesType[];
        }>
      >(`/category/niches/`)
      .then((res) => {
        logger(res.data.data, 'category niches');
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in category niches');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full w-full'>
      <Container
        loading={loading}
        className='h-screen w-full border-none shadow-none'
      >
        <div className='rounded-lg bg-gray-100 p-6 shadow-md'>
          <p className='text-primary mb-4 text-center text-xl font-semibold'>
            {i18n.language === 'uz'
              ? "O'z nishingizni kashf eting"
              : 'Откройте для себя свою нишу'}
          </p>
          <p className='mb-4 text-gray-700'>
            {i18n.language === 'uz'
              ? "Nish - bu ma'lum turdagi mahsulot yoki xizmat uchun ixtisoslashgan bozor segmenti. Ushbu bo'limda siz barcha mavjud nishlarni topasiz, ularning har biri bizning keng toifadagi tuzilmamizdan kelib chiqqan."
              : 'Ниша представляет собой специализированный сегмент рынка для определенного вида продукта или услуги. В этом разделе вы найдете все доступные ниши, каждая из которых произошла из нашей обширной структуры категорий.'}
          </p>
          <p className='mb-2 ml-2 font-medium text-gray-800'>
            {i18n.language === 'uz'
              ? "To'g'ri nishni tanlash uchun:"
              : 'Чтобы выбрать правильную нишу:'}
          </p>

          <ul className='pl-6 text-gray-600'>
            <li className='mb-2 transition-all duration-200 hover:text-gray-800'>
              {i18n.language === 'uz'
                ? "1. Mavjud variantlarni ko'rib chiqing."
                : '1. Исследуйте доступные варианты.'}
            </li>
            <li className='mb-2 transition-all duration-200 hover:text-gray-800'>
              {i18n.language === 'uz'
                ? '2. Bozor talabi, raqobat va bu sohadagi ishtiyoqingiz yoki tajribangizni hisobga oling.'
                : '2. Учитывайте рыночный спрос, конкуренцию и вашу страсть или компетенцию в этой области.'}
            </li>
            <li className='mb-2 transition-all duration-200 hover:text-gray-800'>
              {i18n.language === 'uz'
                ? '3. Potentsial baholash uchun taqdim etilgan nishlarni saralang va tahlil qiling.'
                : '3. Сортируйте и анализируйте предоставленную аналитику, чтобы оценить потенциал.'}
            </li>
            <li className='transition-all duration-200 hover:text-gray-800'>
              {i18n.language === 'uz'
                ? "4. Esingizda bo'lsin, ideal joy bozor imkoniyatlarini kuchli tomonlaringiz bilan birlashtiradi."
                : '4. Помните, идеальная ниша сочетает в себе рыночные возможности и ваши сильные стороны.'}
            </li>
          </ul>
        </div>

        <Table
          columnDefs={getNichesColDefs(t2, i18n.language) as any}
          className='h-screen min-w-full'
          rowData={data}
        />
      </Container>
    </div>
  );
}

export default NichesComponent;
