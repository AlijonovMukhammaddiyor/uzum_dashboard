import { AxiosResponse } from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { VscDebugBreakpointData } from 'react-icons/vsc';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { CategoryProductsColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import LineChart from '@/components/shared/LineChart';
import StateckedColumnChart from '@/components/shared/StackedColumnChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  sellerId: number;
}

interface CategoryType {
  categoryId: number;
  title: string;
  orders_amount: number;
  reviews_amount: number;
  products_amount: number;
}

interface CategoryDataType {
  date: string;
  category_id: number;
  data: {
    orders_amount: number;
    reviews_amount: number;
    products_count: number;
  };
}

interface CategoryProductData {
  latest_product_analytics_date: string;
  title: string;
  photos: string;
  product_id: number;
}

function ShopCategories({ className, sellerId }: Props) {
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

  return (
    <div
      className={clsxm(
        'flex h-full w-full flex-col items-start justify-start gap-8',
        className
      )}
    >
      <div className='flex w-full items-center justify-start gap-2'>
        <VscDebugBreakpointData className='text-primary text-2xl' />
        <p className='text-sm'>
          Quyida sotuvchi kategoriyalari ro'yxati keltirilgan. Sotuvchining
          ushbu kategoriyalarga oid ma'lumotlarini ko'rish uchun quyidagi
          kategoriyalardan birini tanlang.
        </p>
      </div>
      <Container
        loading={loading}
        className='flex h-[250px] w-full items-start justify-start overflow-x-scroll border-b border-slate-400 bg-transparent'
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
          'flex w-full flex-col items-start justify-start gap-5 overflow-x-scroll bg-slate-100 p-5',
          !showCategoryData ? 'h-[250px]' : 'h-[1500px]'
        )}
      >
        {showCategoryData && (
          <p className='text-primary w-full text-center'>
            <span className='font-semibold text-black'>
              {categoryId
                ? data.find((c) => c.categoryId === categoryId)?.title
                : ''}{' '}
            </span>
            kategoriya bo'yicha ma'lumotlar
          </p>
        )}
        {/* <p className='mb-3 w-full text-center text-xs text-gray-400'>
          * Ma'lum bir chiziqni yashirish yoki ko'rsatish uchun quyidagi
          nomlardan tegishli nom ustiga bosing.
        </p> */}
        {showCategoryData && (
          <LineChart
            data={getAllOrdersData(categoryData)}
            yAxisTitle='Jami buyurtmalar soni'
            xAxisTitle='Sana'
            style={{
              width: '100%',
              height: '250px',
            }}
          />
        )}
        {showCategoryData && (
          // <LineChart
          //   data={getDailyOrdersData(categoryData)}
          //   yAxisTitle='kunlik buyurtmalar soni'
          //   xAxisTitle='Sana'
          //   style={{
          //     width: '100%',
          //     height: '250px',
          //   }}
          // />
          <StateckedColumnChart
            data={getDailyOrdersData(categoryData)}
            style={{
              width: '100%',
              height: '250px',
            }}
            sliderEnd={1}
          />
        )}
        {showCategoryData && (
          <LineChart
            data={getAllProductsData(categoryData)}
            yAxisTitle='Jami mahsulotlar soni'
            xAxisTitle='Sana'
            style={{
              width: '100%',
              height: '250px',
            }}
          />
        )}
        {showCategoryData && (
          <LineChart
            data={getAllReviewsData(categoryData)}
            yAxisTitle='Jami izohlar Soni'
            xAxisTitle='Sana'
            style={{
              width: '100%',
              height: '250px',
            }}
          />
        )}
        {showCategoryData && (
          <LineChart
            data={getDailyReviewsData(categoryData)}
            yAxisTitle='Kunlik izohlar soni'
            xAxisTitle='Sana'
            style={{
              width: '100%',
              height: '250px',
            }}
          />
        )}
      </Container>
      {categoryId && categoryProducts.length > 0 && (
        <Container
          loading={loadingCategory}
          className=' flex w-full flex-col items-start justify-start overflow-x-scroll'
        >
          <div className='mb-6 flex w-full items-center justify-start gap-2'>
            <p className='text-primary font-semibold'>
              Sotuvchining ushbu kategoriyaga oid mahsulotlari ro'yxati
            </p>
          </div>
          <Table
            rowData={categoryProducts || []}
            columnDefs={CategoryProductsColDefs}
            className='h-[1000px] w-full'
          />
        </Container>
      )}
    </div>
  );
}

function getAllOrdersData(data: CategoryDataType[]) {
  const dataset = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    dataset.push({
      x: element.date.slice(0, 10),
      y: element.data.orders_amount,
      label: 'Barcha buyurtmalar soni',
    });
  }

  return dataset;
}

function getDailyOrdersData(data: CategoryDataType[]) {
  const dataset = [];

  let prev = data[0].data.orders_amount;

  for (let i = 1; i < data.length; i++) {
    const element = data[i];
    dataset.push({
      x: element.date.slice(0, 10),
      y: element.data.orders_amount - prev,
      type: 'Kunlik buyurtmalar soni',
    });
    prev = element.data.orders_amount;
  }

  return dataset;
}

function getDailyReviewsData(data: CategoryDataType[]) {
  const dataset = [];

  let prev = data[0].data.reviews_amount;

  for (let i = 1; i < data.length; i++) {
    const element = data[i];
    dataset.push({
      x: element.date.slice(0, 10),
      y: element.data.reviews_amount - prev,
      label: 'Kunlik izohlar soni',
    });

    prev = element.data.reviews_amount;
  }

  return dataset;
}

function getAllReviewsData(data: CategoryDataType[]) {
  const dataset = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    dataset.push({
      x: element.date.slice(0, 10),
      y: element.data.reviews_amount,
      label: 'Barcha izohlar soni',
    });
  }

  return dataset;
}

function getAllProductsData(data: CategoryDataType[]) {
  const dataset = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    let products = element.data.products_count;
    if (element.date.slice(0, 10) === '2023-06-22') {
      if (i !== 0) products = data[i - 1].data.products_count;
      else products = data[i + 1].data.products_count;
    }
    dataset.push({
      x: element.date.slice(0, 10),
      y: products,
      label: 'Barcha mahsulotlar soni',
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

  return (
    <div
      className={clsxm(
        'm-4 flex min-w-max flex-1 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-white shadow-lg',
        categoryId === category.categoryId ? 'bg-primary' : 'bg-white'
      )}
    >
      <Link href={`/category/${category.title}--${category.categoryId}`}>
        <h2
          className={clsxm(
            'mb-4 text-base font-bold text-blue-500 hover:underline',
            categoryId === category.categoryId ? 'text-white' : ''
          )}
        >
          {category.title}
        </h2>
      </Link>
      <p
        className={clsxm(
          categoryId === category.categoryId ? 'text-white' : 'text-black'
        )}
      >
        <strong>Buyurtmalar soni:</strong>{' '}
        {category.orders_amount.toLocaleString()}
      </p>
      <p
        className={clsxm(
          categoryId === category.categoryId ? 'text-white' : 'text-black'
        )}
      >
        <strong>Izohlar soni:</strong>{' '}
        {category.reviews_amount.toLocaleString()}
      </p>
      <p
        className={clsxm(
          categoryId === category.categoryId ? 'text-white' : 'text-black'
        )}
      >
        <strong>Mahsulotlar soni:</strong>{' '}
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
        Tanlash
      </button>
    </div>
  );
};
