import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BreadcrumbJsonLd } from 'next-seo';
import * as React from 'react';

import LandingPage from '@/components/pages/landing/LandingPage';

export default function HomePage() {
  const { i18n } = useTranslation('common');

  return (
    <div>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: i18n.language === 'uz' ? "Ro'yhatdan o'tish" : 'Регистрация',
            item: 'https://www.uzanalitika.uz/register',
          },
          {
            position: 2,
            name:
              i18n.language === 'uz'
                ? 'Kategoriyalar Tahlili'
                : 'Анализ Kатегорий',
            item: 'https://www.uzanalitika.uz/category',
          },
          {
            position: 3,
            name:
              i18n.language === 'uz'
                ? 'Mahsulotlar Kash Etish va Tahlil'
                : 'Исследование продукта и анализ',
            item: 'https://www.uzanalitika.uz/products',
          },
          {
            position: 4,
            name:
              i18n.language === 'uz' ? "Do'konlar Tahlili" : 'Анализ Магазинов',
            item: 'https://www.uzanalitika.uz/sellers',
          },
        ]}
      />
      <LandingPage />
    </div>
  );
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(
        context.locale || 'ru',
        ['landing', 'common', 'seo'],
        null,
        ['uz', 'ru']
      )),
    },
  };
}
