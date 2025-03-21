import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getGrowingCategoriesColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Table from '@/components/shared/Table';

export interface HomeStatisticsContainerProps {
  className?: string;
}

interface GrowingCategoryType {
  categoryId: number;
  title: string;
  created_at: string;
  orders: {
    x: string;
    y: number;
  }[];
  average_product_rating: number;
  reviews_amount: number;
  average_purchase_price: number;
  total_shops: {
    x: string;
    y: number;
  }[];
  total_products: {
    x: string;
    y: number;
  }[];

  total_shop_with_sales: {
    x: string;
    y: number;
  }[];
  total_products_with_sales: {
    x: string;
    y: number;
  }[];
}

interface CategoriesReponseType {
  categoryId: number;
  analytics: {
    average_purchase_price: number;
    average_product_rating: number;
    category__categoryId: number;
    category__created_at: string;
    category__title: string;
    category__title_ru: string;
    category__descendants: number;
    date_pretty: string;
    total_orders: number;
    total_products: number;
    total_shops: number;
    total_reviews: number;
    total_products_with_sales: number;
    total_shops_with_sales: number;
  }[];
}

function GrowingCategories({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [categories, setCategories] = React.useState<GrowingCategoryType[]>([]);
  const { t, i18n } = useTranslation('tableColumns');
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.8); // 90% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<CategoriesReponseType[]>>(
        '/category/growing/'
      )
      .then((res) => {
        logger(res.data, 'growing categories');
        setCategories(prepareTableData(res.data, i18n.language));
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in growing product');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className='flex h-full w-full flex-col gap-5'
      style={{
        zoom: zoomLevel,
      }}
    >
      <Container
        className={clsxm('w-full rounded-md border-none pb-10', className)}
        loading={loading}
      >
        <div className='py-3'>
          <p className='text-center font-semibold'>
            {i18n.language === 'uz'
              ? "Quyidagi jadvalda eng so'ngi istiqbolli kategoriyalarni ko'rish mumkin"
              : 'В таблице ниже вы можете увидеть последние перспективные категории.'}
          </p>
          <div className='flex w-full items-center justify-center gap-3'>
            <p className='font-semibold'>
              {i18n.language === 'uz'
                ? 'Bu qanday hisoblanadi?'
                : 'Как это считается?'}
            </p>
            <p className=''>
              {i18n.language === 'uz'
                ? "Biz har kuni barcha kategoriyalar uchun oxirgi 100 kun mobaynidagi statistikalarni qayta ishlaymiz va eng o'sayotgan 20 tagacha kategpriyalarni tanlaymiz."
                : 'Каждый день мы обрабатываем статистику за последние 100 дней по всем категориям и отбираем до 20 наиболее перспективных категорий.'}
            </p>
          </div>
        </div>
        <Table
          columnDefs={getGrowingCategoriesColDefs(t, i18n.language)}
          className='h-[1700px] min-w-full'
          rowData={categories}
          setLoading={setLoading}
          rowHeight={80}
          headerHeight={60}
          isBalham={true}
        />
      </Container>
    </div>
  );
}

export default GrowingCategories;

function prepareTableData(
  data: CategoriesReponseType[],
  lang: string
): GrowingCategoryType[] {
  const res = [];
  // sort according to last orders_amount

  const data_sorted = data.sort((a, b) => {
    return b.analytics[0].total_orders - a.analytics[0].total_orders;
  });

  for (let i = 0; i < data.length; i++) {
    const item = data_sorted[i];
    const analytics = item.analytics.slice(0);
    let prev_orders = analytics[0].total_orders;
    const category = {
      categoryId: item.categoryId,
      title:
        lang === 'uz'
          ? analytics[0].category__title + '((' + item.categoryId + '))'
          : analytics[0].category__title_ru + '((' + item.categoryId + '))',
      created_at: analytics[0].category__created_at,
      orders: analytics.map((item) => {
        const res = {
          x: item.date_pretty,
          y: item.total_orders - prev_orders,
        };
        prev_orders = item.total_orders;
        return res;
      }),
      average_product_rating:
        analytics[analytics.length - 1].average_product_rating,
      reviews_amount: analytics[analytics.length - 1].total_reviews,
      total_shops: analytics.map((item) => {
        return {
          x: item.date_pretty,
          y: item.total_shops,
        };
      }),
      total_products: analytics.map((item) => {
        return {
          x: item.date_pretty,
          y: item.total_products,
        };
      }),
      total_shop_with_sales: analytics.map((item) => {
        return {
          x: item.date_pretty,
          y: item.total_shops_with_sales,
        };
      }),
      total_products_with_sales: analytics.map((item) => {
        return {
          x: item.date_pretty,
          y: item.total_products_with_sales,
        };
      }),
      average_purchase_price:
        analytics[analytics.length - 1].average_purchase_price,
    };

    res.push(category);
  }

  return res;
}
