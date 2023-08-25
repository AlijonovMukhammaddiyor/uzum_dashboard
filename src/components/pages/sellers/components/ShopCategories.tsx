import { AxiosResponse } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { VscDebugBreakpointData } from 'react-icons/vsc';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getCategoryProductsColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import LineChart from '@/components/shared/LineChart';
import StateckedColumnChart from '@/components/shared/StackedColumnChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  sellerId: number;
  isActive: boolean;
}

interface CategoryType {
  categoryId: number;
  title: string;
  title_ru: string;
  orders_amount: number;
  reviews_amount: number;
  products_amount: number;
}

interface CategoryDataType {
  date_pretty: string;
  category_id: number;
  total_orders: number;
  total_reviews: number;
  total_products: number;
  total_revenue: number;
  average_purchase_price: number;
}

interface CategoryProductData {
  latest_product_analytics_date: string;
  title: string;
  photos: string;
  product_id: number;
}

function ShopCategories({ className, sellerId, isActive }: Props) {
  const { t, i18n } = useTranslation('sellers');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCategory, setLoadingCategory] = useState<boolean>(false);
  const [data, setData] = useState<CategoryType[]>([]);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<
    CategoryProductData[]
  >([]);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<unknown, AxiosResponse<CategoryType[]>>(
        '/shop/categories/' + sellerId
      )
      .then((res) => {
        logger(res.data, 'Categories');
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'Error in getting categories');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sellerId]);

  useEffect(() => {
    const api = new API(null);

    if (!categoryId) return;
    setLoadingCategory(true);
    api
      .get<unknown, AxiosResponse<CategoryDataType[]>>(
        '/shop/category/' + sellerId + '/' + categoryId + '?range=40'
      )
      .then((res) => {
        // logger(res.data, 'Category');
        setCategoryData(res.data);
        const category_id = res.data[0].category_id;
        if (category_id === categoryId) setLoadingCategory(false);
      })
      .catch((err) => {
        logger(err, 'Error in getting category');
        setLoadingCategory(false);
      });

    api
      .get<
        unknown,
        AxiosResponse<{ data: CategoryProductData[]; total: number }>
      >('/shop/products/category/' + sellerId + '/' + categoryId)
      .then((res) => {
        // logger(res.data, 'Category Products');
        setCategoryProducts(res.data.data);
        // setLoadingCategory(false);
      })
      .catch((err) => {
        logger(err, 'Error in getting category products');
        // setLoadingCategory(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const showCategoryData = categoryId && categoryData.length > 0;

  if (!isActive) return <></>;

  return (
    <div
      className={clsxm(
        'flex min-h-full w-full shrink-0 flex-col items-start justify-start gap-8 overflow-scroll pb-16',
        className
      )}
    >
      <div className='flex w-full shrink-0 items-center justify-start gap-2'>
        <VscDebugBreakpointData className='text-primary text-2xl' />
        <p className='text-sm'>{t('select_category_instruction')}</p>
      </div>
      <Container
        loading={loading}
        className='flex h-[250px] w-full shrink-0 items-start justify-start overflow-x-scroll border-b border-slate-400 bg-transparent'
      >
        {data.map((category, i) => (
          <CategoryCard
            key={i}
            category={category}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />
        ))}
      </Container>
      <Container
        loading={loadingCategory}
        className={clsxm(
          'flex w-full shrink-0 flex-col items-start justify-start gap-5 overflow-x-scroll bg-slate-100 p-5',
          !showCategoryData ? 'h-[250px]' : 'h-[1500px]'
        )}
      >
        <>
          {showCategoryData && (
            <p className='text-primary w-full text-center'>
              <span className='font-semibold text-black'>
                {categoryId
                  ? i18n.language === 'uz'
                    ? data.find((c) => c.categoryId === categoryId)?.title
                    : data.find((c) => c.categoryId === categoryId)?.title_ru
                  : ''}{' '}
                -{' '}
              </span>
              {t('info_by_category')}
            </p>
          )}
          {/* <p className='mb-3 w-full text-center text-xs text-gray-400'>
          * Ma'lum bir chiziqni yashirish yoki ko'rsatish uchun quyidagi
          nomlardan tegishli nom ustiga bosing.
        </p> */}
          {showCategoryData && (
            <LineChart
              data={getAllOrdersData(categoryData, t('total_orders_amount'))}
              yAxisTitle={t('total_orders_amount')}
              xAxisTitle={t('date')}
              style={{
                width: '100%',
                height: '250px',
              }}
            />
          )}
          {showCategoryData && (
            <StateckedColumnChart
              data={getDailyOrdersData(categoryData, t('daily_orders_amount'))}
              style={{
                width: '100%',
                height: '250px',
                flexShrink: 0,
              }}
              sliderEnd={1}
            />
          )}
          {showCategoryData && (
            <LineChart
              data={getAllProductsData(
                categoryData,
                t('total_products_amount')
              )}
              yAxisTitle={t('total_products_amount')}
              xAxisTitle={t('date')}
              style={{
                width: '100%',
                height: '250px',
                flexShrink: 0,
              }}
            />
          )}
          {showCategoryData && (
            <LineChart
              data={getAllReviewsData(categoryData, t('total_reviews_amount'))}
              yAxisTitle={t('total_reviews_amount')}
              xAxisTitle={t('date')}
              style={{
                width: '100%',
                height: '250px',
                flexShrink: 0,
              }}
            />
          )}
          {showCategoryData && (
            <LineChart
              data={getDailyReviewsData(
                categoryData,
                t('daily_reviews_amount')
              )}
              yAxisTitle={t('daily_reviews_amount')}
              xAxisTitle={t('date')}
              style={{
                width: '100%',
                height: '250px',
                flexShrink: 0,
              }}
            />
          )}
        </>
      </Container>
      {categoryId && categoryProducts.length > 0 && (
        <Container
          loading={loadingCategory}
          className=' flex w-full shrink-0 flex-col items-start justify-start overflow-x-scroll'
        >
          <div className='mb-6 flex w-full items-center justify-start gap-2'>
            <p className='text-primary font-semibold'>
              {t('seller_product_in_category')}
            </p>
          </div>
          <Table
            rowData={categoryProducts || []}
            headerHeight={60}
            rowHeight={80}
            columnDefs={getCategoryProductsColDefs(t2, i18n.language)}
            className='h-[1000px] w-full'
          />
        </Container>
      )}
    </div>
  );
}

function getAllOrdersData(data: CategoryDataType[], label: string) {
  const dataset = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    dataset.push({
      x: element.date_pretty,
      y: element.total_orders,
      label: label,
    });
  }

  return dataset;
}

function getDailyOrdersData(data: CategoryDataType[], label: string) {
  const dataset = [];

  let prev = data[0].total_orders;

  for (let i = 1; i < data.length; i++) {
    const element = data[i];
    if (
      element.date_pretty === '2023-06-22' ||
      element.date_pretty === '2023-07-23'
    )
      continue;
    dataset.push({
      x: element.date_pretty,
      y: element.total_orders - prev,
      type: label,
    });
    prev = element.total_orders;
  }

  return dataset;
}

function getDailyReviewsData(data: CategoryDataType[], label: string) {
  const dataset = [];

  let prev = data[0].total_reviews;

  for (let i = 1; i < data.length; i++) {
    const element = data[i];
    if (
      element.date_pretty === '2023-06-22' ||
      element.date_pretty === '2023-07-23'
    )
      continue;
    dataset.push({
      x: element.date_pretty,
      y: element.total_reviews - prev,
      label: label,
    });

    prev = element.total_reviews;
  }

  return dataset;
}

function getAllReviewsData(data: CategoryDataType[], label: string) {
  const dataset = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    dataset.push({
      x: element.date_pretty,
      y: element.total_reviews,
      label: label,
    });
  }

  return dataset;
}

function getAllProductsData(data: CategoryDataType[], label: string) {
  const dataset = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let products = element.total_products;
    if (element.date_pretty === '2023-06-22') {
      if (i !== 0) products = data[i - 1].total_products;
      else products = data[i + 1].total_products;
    }
    dataset.push({
      x: element.date_pretty,
      y: products,
      label: label,
    });
  }

  return dataset;
}

export default ShopCategories;

interface CategoryCardProps {
  category: CategoryType;
  categoryId: number | null;
  setCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  categoryId,
  setCategoryId,
}) => {
  // console.log(categoryId, category.categoryId);
  const { t, i18n } = useTranslation('sellers');
  return (
    <div
      className={clsxm(
        'm-4 flex min-w-max flex-1 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-white shadow-lg',
        categoryId === category.categoryId ? 'bg-primary' : 'bg-white'
      )}
    >
      <Link
        href={`/category/${
          i18n.language === 'uz' ? category.title : category.title_ru
        }--${category.categoryId}`}
      >
        <h2
          className={clsxm(
            'mb-4 text-base font-bold text-blue-500 hover:underline',
            categoryId === category.categoryId ? 'text-white' : ''
          )}
        >
          {i18n.language === 'uz' ? category.title : category.title_ru}
        </h2>
      </Link>
      <p
        className={clsxm(
          categoryId === category.categoryId ? 'text-white' : 'text-black'
        )}
      >
        <strong>{t('orders_amount')}:</strong>{' '}
        {category.orders_amount.toLocaleString()}
      </p>
      <p
        className={clsxm(
          categoryId === category.categoryId ? 'text-white' : 'text-black'
        )}
      >
        <strong>{t('reviews_amount')}:</strong>{' '}
        {category.reviews_amount.toLocaleString()}
      </p>
      <p
        className={clsxm(
          categoryId === category.categoryId ? 'text-white' : 'text-black'
        )}
      >
        <strong>{t('products_amount')}:</strong>{' '}
        {category.products_amount.toLocaleString()}
      </p>
      <button
        className={clsxm(
          'bg-primary my-3 w-full rounded-md py-1 hover:bg-purple-800 active:shadow-inner',
          categoryId === category.categoryId
            ? 'cursor-not-allowed bg-slate-400 hover:bg-slate-400'
            : ''
        )}
        disabled={categoryId === category.categoryId}
        onClick={() => {
          if (categoryId === category.categoryId) return;
          setCategoryId(category.categoryId);
        }}
      >
        {t('select')}
      </button>
    </div>
  );
};
