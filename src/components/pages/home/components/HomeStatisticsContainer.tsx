import { AxiosResponse } from 'axios';
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiPurchaseTagAlt } from 'react-icons/bi';
import { BsShop } from 'react-icons/bs';
import { FiChevronRight } from 'react-icons/fi';
import { GiTakeMyMoney } from 'react-icons/gi';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { IoPersonOutline } from 'react-icons/io5';
import { LiaCommentsSolid } from 'react-icons/lia';
import Select from 'react-select';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import DataContainer from '@/components/pages/home/components/DataContainer';
import TreeMap from '@/components/pages/home/components/TreeMap';
import Button from '@/components/shared/buttons/Button';

import { UserType } from '@/types/user';

export interface HomeStatisticsContainerProps {
  className?: string;
  user: UserType;
}

function HomeStatisticsContainer({
  className,
  user,
}: HomeStatisticsContainerProps) {
  const [orders, setOrders] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [revenue, setRevenue] = React.useState<any[]>([]);
  const [reviews, setReviews] = React.useState<any[]>([]);
  const [tree, setTree] = React.useState<any[]>([]);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [shops, setShops] = React.useState<{
    shops: {
      total_shops: number;
      date_pretty: string;
    }[];
    accounts: {
      total_accounts: number;
      date_pretty: string;
    }[];
  }>({ shops: [], accounts: [] });
  const [loading, setLoading] = React.useState<{
    orders: boolean;
    products: boolean;
    revenue: boolean;
    reviews: boolean;
    shops: boolean;
    segments: boolean;
    topShops: boolean;
    topProducts: boolean;
  }>({
    orders: true,
    products: true,
    revenue: true,
    reviews: true,
    shops: true,
    segments: true,
    topShops: true,
    topProducts: true,
  });
  const draggableRef = useRef<HTMLDivElement>(null);
  const handleMouseDown = (e: any) => {
    setIsDown(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(draggableRef.current?.scrollLeft ?? 0);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: any) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = x - startX;
    if (draggableRef.current)
      draggableRef.current.scrollLeft = scrollLeft - walk;
  };
  const [isFullScreen, setIsFullScreen] = React.useState<string | null>(null);
  const { t, i18n } = useTranslation('common');
  const { t: t2 } = useTranslation('tableColumns');
  const [categoriesRevenue, setCategoriesRevenue] = React.useState<any[]>([]);
  const [currentTab, setCurrentTab] = React.useState({
    value: t('dataTable.orders_amount'),
    label: t('dataTable.orders_amount'),
  });
  const [topShops, setTopShops] = React.useState<{
    shop_with_no_sales: number;
    shops_with_no_reviews: number;
    shops_with_sales_yesterday: number;
    shops_with_reviews_yesterday: number;
    shops: any[];
  }>({
    shop_with_no_sales: 0,
    shops_with_sales_yesterday: 0,
    shops: [],
    shops_with_no_reviews: 0,
    shops_with_reviews_yesterday: 0,
  });
  const [topProducts, setTopProducts] = React.useState<{
    product_with_no_sales: number;
    products_with_no_reviews: number;
    products_with_sales_yesterday: number;
    products_with_reviews_yesterday: number;
    top_products: any[];
  }>({
    product_with_no_sales: 0,
    products_with_sales_yesterday: 0,
    top_products: [],
    products_with_no_reviews: 0,
    products_with_reviews_yesterday: 0,
  });

  React.useEffect(() => {
    const api = new API(null);
    setCurrentTab({
      value: t('dataTable.orders_amount'),
      label: t('dataTable.orders_amount'),
    });
    api
      .get<unknown, AxiosResponse<any>>('/category/segmentation/')
      .then((res) => {
        // logger(res.data, 'Segmentation');
        setTree(res.data);
        const data: {
          [key: string]: {
            title: string;
            title_ru: string;
            revenue: number;
            orders: number;
            products: number;
            shops: number;
            reviews: number;
          };
        } = {};
        const revenue = res.data.revenue.data.children;
        const orders = res.data.orders.data.children;
        const products = res.data.products.data.children;
        const shops = res.data.shops.data.children;
        const reviews = res.data.reviews.data.children;

        for (let i = 0; i < revenue.length; i++) {
          const item = revenue[i];
          const title = item.title;
          data[title] = {
            title: item.title,
            title_ru: item.title_ru,
            revenue: item.analytics,
            orders: 0,
            products: 0,
            shops: 0,
            reviews: 0,
          };
        }
        for (let i = 0; i < orders.length; i++) {
          const item = orders[i];
          const title = item.title;
          if (data[title]) {
            data[title].orders = item.analytics;
          } else {
            data[title] = {
              title: item.title,
              title_ru: item.title_ru,
              revenue: 0,
              orders: item.analytics,
              products: 0,
              shops: 0,
              reviews: 0,
            };
          }
        }
        for (let i = 0; i < products.length; i++) {
          const item = products[i];
          const title = item.title;
          if (data[title]) {
            data[title].products = item.analytics;
          } else {
            data[title] = {
              title: item.title,
              title_ru: item.title_ru,
              revenue: 0,
              orders: 0,
              products: item.analytics,
              shops: 0,
              reviews: 0,
            };
          }
        }
        for (let i = 0; i < shops.length; i++) {
          const item = shops[i];
          const title = item.title;
          if (data[title]) {
            data[title].shops = item.analytics;
          } else {
            data[title] = {
              title: item.title,
              title_ru: item.title_ru,
              revenue: 0,
              orders: 0,
              products: 0,
              shops: item.analytics,
              reviews: 0,
            };
          }
        }
        for (let i = 0; i < reviews.length; i++) {
          const item = reviews[i];
          const title = item.title;
          if (data[title]) {
            data[title].reviews = item.analytics;
          } else {
            data[title] = {
              title: item.title,
              title_ru: item.title_ru,
              revenue: 0,
              orders: 0,
              products: 0,
              shops: 0,
              reviews: item.analytics,
            };
          }
        }
        setLoading((prev) => ({ ...prev, segments: false }));
        const children = Object.values(data);
        setCategoriesRevenue(children);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in orders');
        setLoading((prev) => ({ ...prev, segments: false }));
      });

    setLoading({
      orders: true,
      reviews: true,
      shops: true,
      products: true,
      revenue: true,
      segments: true,
      topShops: true,
      topProducts: true,
    });
    api
      .get<unknown, AxiosResponse<any>>('/uzum/orders/')
      .then((res) => {
        // logger(res.data, 'Orders');
        setOrders(
          res.data.sort(
            (a: any, b: any) =>
              new Date(a.date_pretty).getTime() -
              new Date(b.date_pretty).getTime()
          )
        );
        setLoading((prev) => ({ ...prev, orders: false }));
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in orders');
        setLoading((prev) => ({ ...prev, orders: false }));
      });
    api
      .get<unknown, AxiosResponse<any>>('/uzum/reviews/')
      .then((res) => {
        // logger(res.data, 'Orders');
        setReviews(
          res.data.sort(
            (a: any, b: any) =>
              new Date(a.date_pretty).getTime() -
              new Date(b.date_pretty).getTime()
          )
        );
        setLoading((prev) => ({ ...prev, reviews: false }));
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in orders');
        setLoading((prev) => ({ ...prev, reviews: false }));
      });
    api
      .get<unknown, AxiosResponse<any>>('/uzum/revenue/')
      .then((res) => {
        setRevenue(
          res.data
            .slice(0)
            .map((item: any) => {
              return item;
              // return {
              //   ...item,
              //   total_revenue: 411_523_262.5,
              // };
            })
            .filter(
              (item: any) =>
                item.date_pretty !== '2023-06-22' &&
                item.date_pretty !== '2023-07-23'
            )
        );
        setLoading((prev) => ({ ...prev, revenue: false }));
      })
      .catch((err) => {
        logger(err, 'Error in revenue');
        setLoading((prev) => ({ ...prev, revenue: false }));
      });
    api
      .get<unknown, AxiosResponse<any>>('/uzum/products/')
      .then((res) => {
        // logger(res.data, 'Products');
        setProducts(res.data);
        setLoading((prev) => ({ ...prev, products: false }));
      })
      .catch((err) => {
        logger(err, 'Error in products');
        setLoading((prev) => ({ ...prev, products: false }));
      });
    api
      .get<unknown, AxiosResponse<any>>('/uzum/sellers/')
      .then((res) => {
        setShops(res.data);
        setLoading((prev) => ({ ...prev, shops: false }));
      })
      .catch((err) => {
        logger(err, 'Error in sellers');
        setLoading((prev) => ({ ...prev, shops: false }));
      });
    api
      .get<unknown, AxiosResponse<any>>('/shop/tops/')
      .then((res) => {
        setTopShops(res.data);
        setLoading((prev) => ({ ...prev, topShops: false }));
      })
      .catch((err) => {
        logger(err, 'Error in tops');
        setLoading((prev) => ({ ...prev, topShops: false }));
      });
    api
      .get<unknown, AxiosResponse<any>>('/product/tops/')
      .then((res) => {
        setTopProducts(res.data);
        setLoading((prev) => ({ ...prev, topProducts: false }));
      })
      .catch((err) => {
        logger(err, 'Error in top products');
        setLoading((prev) => ({ ...prev, topProducts: false }));
      });
  }, [i18n.language, t]);

  const isLoading = () => {
    if (currentTab.label === t('dataTable.shops_amount')) {
      return loading.shops;
    }
    if (currentTab.label === t('dataTable.products_amount')) {
      return loading.products;
    }
    if (currentTab.label === t('dataTable.reviews_amount')) {
      return loading.reviews;
    }
    if (currentTab.label === t('dataTable.revenue')) {
      return loading.revenue;
    }
    if (currentTab.label === t('dataTable.orders_amount')) {
      return loading.orders;
    }
    return loading.shops;
  };

  return (
    <div
      className={clsxm(
        'relative flex h-full w-full flex-col gap-10 pb-6',
        className
      )}
    >
      {isFullScreen && (
        <TreeMap
          titleField={i18n.language === 'uz' ? 'title' : 'title_ru'}
          data={getData(tree as any, isFullScreen, i18n.language)}
          min={getMinMax(tree, isFullScreen)?.min}
          max={getMinMax(tree, isFullScreen)?.max}
          open={isFullScreen === isFullScreen}
          closeModal={() => {
            setIsFullScreen(null);
          }}
          title={isFullScreen}
          main_title={getTitles(isFullScreen)}
          main_subtitle={getSubtitle(isFullScreen)}
        />
      )}
      <div className='w-full max-w-full'>
        <p className='font-primary mb-3 text-base font-bold'>
          {i18n.language === 'uz'
            ? 'Barcha kategoriyalar segmentatsiyasi'
            : 'Сегментация всех категорий'}
        </p>
        <div className='mt-2 flex w-full max-w-full items-center justify-start gap-4'>
          <Button
            className={clsxm(
              'text-primary border-primary hover:bg-primary flex flex-1 items-center justify-between gap-3 border bg-white px-3 py-2 transition-colors duration-200 hover:text-white active:shadow-inner'
            )}
            onClick={() => {
              // if (!canSee) alert(t('toPaid'));
              setIsFullScreen(t('dataTable.revenue'));
            }}
            spinnerColor='primary'
            isLoading={loading.segments}
          >
            <>
              {t('dataTable.see_segmentationsbyrevenue')}
              <FiChevronRight className='ml-2 inline-block' />
            </>
          </Button>
          <Button
            className={clsxm(
              'text-primary border-primary hover:bg-primary flex flex-1 items-center justify-between gap-3 border bg-white px-3 py-2 transition-colors duration-200 hover:text-white active:shadow-inner'
            )}
            onClick={() => {
              // if (!canSee) alert(t('toPaid'));
              setIsFullScreen(t('dataTable.orders_amount'));
            }}
            spinnerColor='primary'
            isLoading={loading.segments}
          >
            <>
              {t('dataTable.see_segmentationsbyorders_amount')}
              <FiChevronRight className='ml-2 inline-block' />
            </>
          </Button>
          <Button
            className={clsxm(
              'text-primary border-primary hover:bg-primary flex flex-1 items-center justify-between gap-3 border bg-white px-3 py-2 transition-colors duration-200 hover:text-white active:shadow-inner'
            )}
            onClick={() => {
              // if (!canSee) alert(t('toPaid'));
              setIsFullScreen(t('dataTable.products_amount'));
            }}
            spinnerColor='primary'
            isLoading={loading.segments}
          >
            <>
              {t('dataTable.see_segmentationsbyproducts_amount')}
              <FiChevronRight className='ml-2 inline-block' />
            </>
          </Button>
          <Button
            className={clsxm(
              'text-primary border-primary hover:bg-primary flex flex-1 items-center justify-between gap-3 border bg-white px-3 py-2 transition-colors duration-200 hover:text-white active:shadow-inner'
            )}
            onClick={() => {
              // if (!canSee) alert(t('toPaid'));
              setIsFullScreen(t('dataTable.shops_amount'));
            }}
            spinnerColor='primary'
            isLoading={loading.segments}
          >
            <>
              {t('dataTable.see_segmentationsbyshops_amount')}
              <FiChevronRight className='ml-2 inline-block' />
            </>
          </Button>
        </div>
      </div>

      <div className='-mt-10 w-full max-w-full'>
        <p className='font-primary py-6 pb-6 text-base font-bold'>
          {i18n.language === 'uz'
            ? 'Uzum uchun umumiy statistikalar'
            : 'Общая статистика для Uzum'}
        </p>
        <Container className='font-primary w-full border-none shadow-none'></Container>
        <div
          className='w- max-w-full gap-6'
          ref={draggableRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className='flex w-full max-w-full items-start justify-start gap-4'>
            <GeneralsContainer
              shops={shops}
              orders={orders}
              revenue={revenue}
              products={products}
              lang={i18n.language}
              reviews={reviews}
              t={t}
              title={t('dataTable.orders_amount')}
              loading={loading}
            />
            {/* </div> */}
            <GeneralsContainer
              shops={shops}
              orders={orders}
              revenue={revenue}
              products={products}
              reviews={reviews}
              lang={i18n.language}
              t={t}
              title={t('dataTable.revenue')}
              loading={loading}
            />
            <GeneralsContainer
              shops={shops}
              orders={orders}
              revenue={revenue}
              products={products}
              lang={i18n.language}
              reviews={reviews}
              loading={loading}
              t={t}
              title={t('dataTable.products_amount')}
            />
          </div>
          <div className='mt-4 flex w-full items-start justify-start gap-4'>
            <GeneralsContainer
              shops={shops}
              orders={orders}
              revenue={revenue}
              loading={loading}
              products={products}
              reviews={reviews}
              t={t}
              title={t('dataTable.shops_amount')}
              lang={i18n.language}
            />
            <GeneralsContainer
              shops={shops}
              orders={orders}
              revenue={revenue}
              products={products}
              loading={loading}
              reviews={reviews}
              t={t}
              title={t('dataTable.sellers_amount')}
              lang={i18n.language}
            />
            <GeneralsContainer
              shops={shops}
              orders={orders}
              revenue={revenue}
              products={products}
              reviews={reviews}
              lang={i18n.language}
              loading={loading}
              t={t}
              title={t('dataTable.reviews_amount')}
            />
          </div>
        </div>
      </div>
      <div className='flex items-start justify-start gap-4'>
        <SalesContainer
          title1={
            i18n.language == 'uz'
              ? "Savdosiz do'konlar soni"
              : 'Количество магазинов без продаж'
          }
          title2={
            i18n.language == 'uz'
              ? "Kecha savdo qilgan do'konlar soni"
              : 'Количество магазинов с продажами вчера'
          }
          value1={topShops.shop_with_no_sales}
          value2={topShops.shops_with_sales_yesterday}
          loading={loading.topShops}
        />
        <SalesContainer
          title1={
            i18n.language == 'uz'
              ? 'Savdosiz mahsulotlar soni'
              : 'Количество товаров без продаж'
          }
          title2={
            i18n.language == 'uz'
              ? "Kecha sotuvi bo'lgan mahsulotlar soni"
              : 'Количество товаров с продажами вчера'
          }
          value1={topProducts.product_with_no_sales}
          value2={topProducts.products_with_sales_yesterday}
          loading={loading.topProducts}
        />
      </div>
      <div className='w-full items-start justify-start gap-6'>
        <Container
          className='relative min-h-[400px] w-full max-w-full bg-white py-6 shadow-lg'
          loading={isLoading()}
        >
          <div className='w-full'>
            <div className='mb-4 w-full'>
              <p className='w-full text-center text-base font-bold'>
                {i18n.language === 'uz'
                  ? "Davr mobaynida turli xil ma'lumotlar"
                  : 'Различные данные по периодам'}
              </p>
            </div>
            <div className='flex w-full items-center justify-center gap-2'>
              <p className=''>
                {i18n.language === 'uz'
                  ? "Qaysi ma'lumotlarni ko'rishni xohlaysiz?"
                  : 'Какие данные вы хотите увидеть?'}
              </p>
              <Select
                className='z-10 w-[300px] cursor-pointer rounded-md'
                classNamePrefix='select'
                defaultValue={currentTab}
                isDisabled={false}
                isLoading={false}
                isClearable={false}
                isRtl={false}
                isSearchable={false}
                onChange={(e) => {
                  // setCurrentTab(e?.value ?? t('dataTable.orders_amount'));
                  setCurrentTab(e!);
                }}
                styles={{
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    svg: {
                      fill: 'rgba(97, 75, 195, 1)',
                    },
                  }),
                  control: (provided) => ({
                    ...provided,
                    borderColor: 'rgba(97, 75, 195, 1)',
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: 'rgba(97, 75, 195, 1)', // This changes the text color of the selected value
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: 'black', // This changes the text color of the options
                  }),
                }}
                name='color'
                options={[
                  {
                    value: t('dataTable.revenue'),
                    label: t('dataTable.revenue'),
                  },
                  {
                    value: t('dataTable.orders_amount'),
                    label: t('dataTable.orders_amount'),
                  },
                  {
                    value: t('dataTable.products_amount'),
                    label: t('dataTable.products_amount'),
                  },
                  {
                    value: t('dataTable.shops_amount'),
                    label: t('dataTable.shops_amount'),
                  },
                  {
                    value: t('dataTable.sellers_amount'),
                    label: t('dataTable.sellers_amount'),
                  },
                  {
                    value: t('dataTable.reviews_amount'),
                    label: t('dataTable.reviews_amount'),
                  },
                ]}
              />
            </div>
            {!isLoading() &&
              getCurrentDataContainer(
                currentTab.label,
                shops,
                products,
                reviews,
                revenue,
                orders,
                t,
                user,
                tree,
                isFullScreen,
                setIsFullScreen
              )}
          </div>
        </Container>
      </div>
    </div>
  );
}

function SalesContainer({
  title1,
  title2,
  value1,
  value2,
  loading,
}: {
  title1: string;
  title2: string;
  value1: number;
  value2: number;
  loading?: boolean;
}) {
  return (
    <Container
      loading={loading}
      className='flex h-[110px] min-w-[350px] flex-1 shrink-0 flex-col items-start justify-between rounded-md border bg-white p-6 shadow-lg'
    >
      {!loading ? (
        <div className='flex w-full items-center justify-between gap-4'>
          <p className='font-semibold'>{title1}</p>
          <p className='text-primary font-semibold'>
            {value1?.toLocaleString()}
          </p>
        </div>
      ) : (
        <></>
      )}
      {!loading ? (
        <div className='mt-2 flex w-full items-center justify-between gap-4'>
          <p className='font-semibold'>{title2}</p>
          <p className='text-primary font-semibold'>
            {value2?.toLocaleString()}
          </p>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}

function GeneralsContainer({
  shops,
  products,
  reviews,
  revenue,
  orders,
  t,
  title,
  lang,
  loading,
}: {
  shops: {
    shops: {
      total_shops: number;
      date_pretty: string;
    }[];
    accounts: {
      total_accounts: number;
      date_pretty: string;
    }[];
  };
  products: any;
  reviews: any;
  revenue: any;
  orders: any;
  t: any;
  title: string;
  lang: string;
  loading: {
    shops: boolean;
    products: boolean;
    reviews: boolean;
    revenue: boolean;
    orders: boolean;
  };
}) {
  const getLogo = () => {
    if (title === t('dataTable.shops_amount'))
      return <BsShop className='text-primary h-6 w-6' />;
    if (title === t('dataTable.products_amount'))
      return <HiOutlineShoppingBag className='text-primary h-6 w-6' />;
    if (title === t('dataTable.reviews_amount'))
      return <LiaCommentsSolid className='text-primary h-6 w-6' />;
    if (title === t('dataTable.revenue'))
      return <GiTakeMyMoney className='text-primary h-6 w-6' />;
    if (title === t('dataTable.orders_amount'))
      return <BiPurchaseTagAlt className='text-primary h-6 w-6' />;
    return <IoPersonOutline className='text-primary h-6 w-6' />;
  };

  const getData = () => {
    if (title === t('dataTable.shops_amount'))
      return (
        <span className=''>
          {shops.shops
            .sort(
              (a, b) =>
                new Date(b.date_pretty).getTime() -
                new Date(a.date_pretty).getTime()
            )[0]
            .total_shops.toLocaleString()}{' '}
          {lang === 'uz' ? 'ta' : 'шт'}
        </span>
      );
    if (title === t('dataTable.products_amount'))
      return (
        <span>
          {products
            .sort(
              (a: any, b: any) =>
                new Date(b.date_pretty).getTime() -
                new Date(a.date_pretty).getTime()
            )[0]
            .total_products.toLocaleString()}{' '}
          {lang === 'uz' ? 'ta' : 'шт'}
        </span>
      );
    if (title === t('dataTable.reviews_amount'))
      return (
        <span>
          {reviews
            .sort(
              (a: any, b: any) =>
                new Date(b.date_pretty).getTime() -
                new Date(a.date_pretty).getTime()
            )[0]
            .total_reviews.toLocaleString()}{' '}
          {lang === 'uz' ? 'ta' : 'шт'}
        </span>
      );
    if (title === t('dataTable.revenue')) {
      const r = revenue.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      )[0].total_revenue;
      if (r > 1000000) {
        return (
          <div>
            {`${(r / 1000000).toFixed(1)} `}
            <span className='text-base'>
              {lang === 'uz' ? "mlrd so'm" : 'млрд сум'}
            </span>
          </div>
        );
      } else if (r > 1000) {
        return (
          <span>{`${(r / 1000).toFixed(2)} ${
            lang === 'uz' ? "mln so'm" : 'млн сум'
          }`}</span>
        );
      } else {
        return (
          <span>{`${r.toFixed(2)} ${
            lang === 'uz' ? "ming so'm" : 'тыс. сум'
          }`}</span>
        );
      }
    }
    if (title === t('dataTable.orders_amount'))
      return (
        <span>
          {orders
            .sort(
              (a: any, b: any) =>
                new Date(b.date_pretty).getTime() -
                new Date(a.date_pretty).getTime()
            )[0]
            .total_orders.toLocaleString()}{' '}
          {lang === 'uz' ? 'ta' : 'шт'}
        </span>
      );
    return (
      <span>
        {shops.accounts
          .sort(
            (a: any, b: any) =>
              new Date(b.date_pretty).getTime() -
              new Date(a.date_pretty).getTime()
          )[0]
          .total_accounts.toLocaleString()}{' '}
        {lang === 'uz' ? 'ta' : 'шт'}
      </span>
    );
  };

  const getDaily = () => {
    if (title === t('dataTable.shops_amount')) {
      const temp = shops.shops.sort(
        (a, b) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      );
      const yesterday = temp[0].total_shops - temp[1].total_shops;

      return [yesterday, temp[1].total_shops];
    }
    if (title === t('dataTable.products_amount')) {
      const temp = products.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      );
      const yesterday = temp[0].total_products - temp[1].total_products;

      return [yesterday, temp[1].total_products];
    }
    if (title === t('dataTable.reviews_amount')) {
      const temp = reviews.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      );
      const yesterday = temp[0].total_reviews - temp[1].total_reviews;

      return [yesterday, temp[1].total_reviews];
    }
    if (title === t('dataTable.revenue')) {
      const temp = revenue.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      );
      const yesterday = temp[0].total_revenue - temp[1].total_revenue;

      return [yesterday, temp[1].total_revenue];
    }
    if (title === t('dataTable.orders_amount')) {
      const temp = orders.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      );
      const yesterday = temp[0].total_orders - temp[1].total_orders;

      return [yesterday, temp[1].total_orders];
    }
    const temp = shops.accounts.sort(
      (a: any, b: any) =>
        new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
    );
    const yesterday = temp[0].total_accounts - temp[1].total_accounts;

    return [yesterday, temp[1].total_accounts];
  };

  const renderDaily = () => {
    const [yesterday, dayBeforeYesterday] = getDaily();

    if (title === t('dataTable.revenue')) {
      if (yesterday > 0) {
        return (
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <div className='flex items-center justify-start gap-1'>
              <div className='text-green-500'>+</div>
              <div className='font-semibold text-green-500'>
                {yesterday > 1000000
                  ? `${(yesterday / 1000000).toFixed(1)} `
                  : yesterday > 1000
                  ? `${(yesterday / 1000).toFixed(2)} `
                  : yesterday.toFixed(2)}
              </div>
              <div className='text-sm font-semibold'>
                {yesterday > 1000000
                  ? `${lang === 'uz' ? 'mlrd' : 'млрд'}`
                  : yesterday > 1000
                  ? `${lang === 'uz' ? 'mln' : 'млн'}`
                  : `${lang === 'uz' ? '' : ''}`}
              </div>
            </div>

            <div className='flex shrink-0 items-center justify-start gap-1'>
              <div className='text-sm'>{t('comparedToYesterday')}</div>
              <div className='flex shrink-0 gap-1 text-sm font-semibold'>
                <span className='shrink-0 font-semibold'>
                  (
                  {dayBeforeYesterday > 1000000
                    ? `${(dayBeforeYesterday / 1000000).toFixed(1)} `
                    : dayBeforeYesterday > 1000
                    ? `${(dayBeforeYesterday / 1000).toFixed(2)} `
                    : dayBeforeYesterday.toFixed(2)}
                </span>
                <p className='text-sm font-semibold'>
                  {dayBeforeYesterday > 1000000
                    ? `${lang === 'uz' ? 'mlrd' : 'млрд'}`
                    : dayBeforeYesterday > 1000
                    ? `${lang === 'uz' ? 'mln' : 'млн'}`
                    : `${lang === 'uz' ? '' : ''}`}
                  )
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <div className='flex shrink-0 items-center justify-start gap-1'>
              <p className='text-green-500'>+</p>
              <p className='font-semibold text-green-500'>
                {yesterday > 1000000
                  ? `${(yesterday / 1000000).toFixed(1)}`
                  : yesterday > 1000
                  ? `${(yesterday / 1000).toFixed(2)}`
                  : `${yesterday.toFixed(2)}`}
              </p>
              <p className='text-sm font-semibold'>
                {yesterday > 1000000
                  ? `${lang === 'uz' ? "mlrd so'm" : 'млрд сум'}`
                  : yesterday > 1000
                  ? `${lang === 'uz' ? "mln so'm" : 'млн сум'}`
                  : `${lang === 'uz' ? "so'm" : 'сум'}`}
              </p>
            </div>

            <div className='flex items-center justify-start gap-1'>
              <p className='text-sm'>{t('comparedToYesterday')}</p>
              <p className='font-semibold'>
                (
                {dayBeforeYesterday > 1000000
                  ? `${(dayBeforeYesterday / 1000000).toFixed(1)} `
                  : dayBeforeYesterday > 1000
                  ? `${(dayBeforeYesterday / 1000).toFixed(2)} `
                  : dayBeforeYesterday.toFixed(2)}
              </p>
              <p className='text-sm font-semibold'>
                {dayBeforeYesterday > 1000000
                  ? `${lang === 'uz' ? "mlrd so'm" : 'млрд сум'}`
                  : dayBeforeYesterday > 1000
                  ? `${lang === 'uz' ? "mln so'm" : 'млн сум'}`
                  : `${lang === 'uz' ? "so'm" : 'сум'}`}
                )
              </p>
            </div>
          </div>
        );
      }
    }
    if (yesterday > 0) {
      return (
        <div className='flex w-full items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p className='text-green-500'>+</p>
            <p className='font-semibold text-green-500'>
              {yesterday.toLocaleString()}
            </p>
            <p className='text-sm'>{lang === 'uz' ? 'ta' : 'шт'}</p>{' '}
          </div>

          <div className='flex items-center justify-start gap-1'>
            <p className='text-sm'>{t('comparedToYesterday')}</p>
            <p className='text-sm font-semibold'>
              ({dayBeforeYesterday.toLocaleString()})
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className='flex w-full items-center justify-between gap-2'>
        <div className='flex items-center justify-start gap-1'>
          <p className='font-semibold text-red-400'>
            {yesterday.toLocaleString()}
          </p>
          <p className='text-sm'>{lang === 'uz' ? 'ta' : 'шт'}</p>{' '}
        </div>

        <div className='flex items-center justify-start gap-1'>
          <p className='text-sm'>{t('comparedToYesterday')}</p>
          <p className='text-sm font-semibold'>
            ({dayBeforeYesterday.toLocaleString()})
          </p>
        </div>
      </div>
    );
  };

  const getThisMonth = () => {
    if (title === t('dataTable.revenue')) {
      const current = revenue.sort(
        (b: any, a: any) =>
          new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
      )[0];
      const beginning = revenue.find(
        (order: any) => order.date_pretty === '2023-08-01'
      );
      const change = current.total_revenue - beginning.total_revenue;
      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p className='text-green-600'>+</p>
            <p className='font-semibold text-green-600'>
              {change > 1000000
                ? `${(change / 1000000).toFixed(1)} `
                : change > 1000
                ? `${(change / 1000).toFixed(2)} `
                : change.toFixed(2)}
            </p>
            <p className='text-sm font-semibold'>
              {change > 1000000
                ? `${lang === 'uz' ? "mlrd so'm" : 'млрд сум'}`
                : change > 1000
                ? `${lang === 'uz' ? "mln so'm" : 'млн сум'}`
                : `${lang === 'uz' ? "so'm" : 'сум'}`}
            </p>
          </div>
        </div>
      );
    } else if (title === t('dataTable.orders_amount')) {
      const current = orders.sort(
        (b: any, a: any) =>
          new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
      )[0];
      const beginning = orders.find(
        (order: any) => order.date_pretty === '2023-08-01'
      );
      const change = current.total_orders - beginning.total_orders;

      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p className='text-green-600'>+</p>
            <p className='font-semibold text-green-600'>
              {change.toLocaleString()}
            </p>
            <p className='text-sm'>{lang === 'uz' ? 'ta' : 'шт'}</p>{' '}
          </div>
        </div>
      );
    } else if (title === t('dataTable.shops_amount')) {
      // get the max shops after 2023-08-01
      const temp = shops.shops
        .filter(
          (shop: any) =>
            new Date(shop.date_pretty).getTime() >
            new Date('2023-08-01').getTime()
        )
        .sort((a: any, b: any) => b.total_shops - a.total_shops);
      const current = temp[0];

      const beginning = shops.shops.find(
        (order: any) => order.date_pretty === '2023-08-01'
      );
      const change = current.total_shops - (beginning?.total_shops || 0);
      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p className='text-green-600'>+</p>
            <p className='font-semibold text-green-600'>
              {change.toLocaleString()}
            </p>
            <p className='text-sm'>{lang === 'uz' ? 'ta' : 'шт'}</p>{' '}
          </div>
        </div>
      );
    } else if (title === t('dataTable.sellers_amount')) {
      const temp = shops.accounts
        .filter(
          (shop: any) =>
            new Date(shop.date_pretty).getTime() >
            new Date('2023-08-01').getTime()
        )
        .sort((a: any, b: any) => b.total_accounts - a.total_accounts);
      const current = temp[0];
      const beginning = shops.accounts.find(
        (order: any) => order.date_pretty === '2023-08-01'
      );
      const change = current.total_accounts - (beginning?.total_accounts || 0);
      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p className='text-green-600'>+</p>
            <p className='font-semibold text-green-600'>
              {change.toLocaleString()}
            </p>
            <p className='text-sm'>{lang === 'uz' ? 'ta' : 'шт'}</p>{' '}
          </div>
        </div>
      );
    } else if (title === t('dataTable.products_amount')) {
      const temp = products
        .filter(
          (shop: any) =>
            new Date(shop.date_pretty).getTime() >
            new Date('2023-08-01').getTime()
        )
        .sort((a: any, b: any) => b.total_products - a.total_products);
      const current = temp[0];
      const beginning = products.find(
        (order: any) => order.date_pretty === '2023-08-01'
      );
      const change = current.total_products - (beginning?.total_products || 0);
      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p className='text-green-600'>+</p>
            <p className='font-semibold text-green-600'>
              {change.toLocaleString()}
            </p>
            <p className='text-sm'>{lang === 'uz' ? 'ta' : 'шт'}</p>{' '}
          </div>
        </div>
      );
    } else if (title === t('dataTable.reviews_amount')) {
      const current = reviews.sort(
        (b: any, a: any) =>
          new Date(a.date_pretty).getTime() - new Date(b.date_pretty).getTime()
      )[0];

      const beginning = reviews.find(
        (order: any) => order.date_pretty === '2023-08-01'
      );
      const change = current.total_reviews - beginning.total_reviews;
      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p className='text-green-600'>+</p>
            <p className='font-semibold text-green-600'>
              {change.toLocaleString()}
            </p>
            <p className='text-sm'>{lang === 'uz' ? 'ta' : 'шт'}</p>{' '}
          </div>
        </div>
      );
    }
  };

  const isLoading = () => {
    if (title === t('dataTable.shops_amount')) {
      return loading.shops;
    }
    if (title === t('dataTable.products_amount')) {
      return loading.products;
    }
    if (title === t('dataTable.reviews_amount')) {
      return loading.reviews;
    }
    if (title === t('dataTable.revenue')) {
      return loading.revenue;
    }
    if (title === t('dataTable.orders_amount')) {
      return loading.orders;
    }
    return loading.shops;
  };

  return (
    <Container
      className='max-w-1/3 flex h-[200px] flex-1 shrink-0 flex-col items-start justify-between gap-6 rounded-none border-none bg-white p-4 shadow-md'
      loading={isLoading()}
    >
      {!isLoading() ? (
        <div className='flex w-full shrink-0 items-center justify-start gap-4'>
          <div className='bg-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-full'>
            {getLogo()}
          </div>
          <div className='flex flex-col items-start justify-start gap-1'>
            <div className='font-primary font-bold'>{title}</div>
            <div className='text-2xl font-semibold'>{getData()}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {!isLoading() ? (
        <div>
          <div className='mb-2 flex w-full items-center justify-start'>
            <div className='flex items-center justify-start gap-2'>
              {renderDaily()}
            </div>
          </div>
          <div className='flex items-center justify-start gap-2'>
            <div className='text-sm'>{t('InThisMonth')}</div>
            <div className='font-semibold'>{getThisMonth()}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}

function getDaily(
  data: {
    x: string;
    y: number;
  }[]
) {
  if (data.length === 0) return [];

  let prev = data[0].y;
  const res = [];
  for (let i = 1; i < data.length; i++) {
    const item = data[i];

    res.push({
      x: item.x,
      y: item.y - prev,
    });
    prev = item.y;
  }

  return res;
}

export default HomeStatisticsContainer;

function getCurrentDataContainer(
  currentTab: string,
  shops: any,
  products: any,
  reviews: any,
  revenue: any,
  orders: any,
  t: any,
  user: any,
  tree: any,
  isFullScreen: string | null,
  setIsFullScreen: any
) {
  if (currentTab === t('dataTable.revenue')) {
    return (
      <DataContainer
        user={user}
        data={tree}
        isFullScreen={isFullScreen}
        setFullScreen={setIsFullScreen}
        title={t('dataTable.revenue')}
        all={revenue[revenue.length - 1]?.total_revenue ?? 0}
        all_last={revenue[revenue.length - 2]?.total_revenue ?? 0}
        isCount={false}
        daily={
          revenue[revenue.length - 1]?.total_revenue -
            revenue[revenue.length - 2]?.total_revenue ?? 0
        }
        daily_last={
          revenue[revenue.length - 2]?.total_revenue -
            revenue[revenue.length - 3].total_revenue ?? 0
        }
        last_date={
          revenue[revenue.length - 1]?.date_pretty ?? new Date().toDateString()
        }
        data_all={revenue
          .sort(
            (a: any, b: any) =>
              new Date(a.date_pretty).getTime() -
              new Date(b.date_pretty).getTime()
          )
          .slice(1)
          .map((item: any) => ({
            x: item.date_pretty,
            y: Math.round(item.total_revenue * 1000),
          }))}
        data_daily={getDaily(
          revenue.map((item: any) => ({
            x: item.date_pretty,
            y: Math.round(item.total_revenue * 1000),
          }))
        )}
        all_color='#78C1F3'
        daily_color='#ff7f0e'
      />
    );
  } else if (currentTab === t('dataTable.orders_amount')) {
    return (
      <DataContainer
        user={user}
        data={tree}
        isFullScreen={isFullScreen}
        setFullScreen={setIsFullScreen}
        title={t('dataTable.orders_amount')}
        all={orders[orders.length - 1]?.total_orders ?? 0}
        all_last={orders[orders.length - 2]?.total_orders ?? 0}
        isCount={true}
        daily={
          orders[orders.length - 1]?.total_orders -
            orders[orders.length - 2]?.total_orders ?? 0
        }
        daily_last={
          orders[orders.length - 2]?.total_orders -
            orders[orders.length - 3].total_orders ?? 0
        }
        last_date={
          orders[orders.length - 1]?.date_pretty ?? new Date().toDateString()
        }
        data_all={orders
          .sort(
            (a: any, b: any) =>
              new Date(a.date_pretty).getTime() -
              new Date(b.date_pretty).getTime()
          )
          .slice(1)
          .map((item: any) => ({
            x: item.date_pretty,
            y: item.total_orders,
          }))}
        data_daily={getDaily(
          orders.map((item: any) => ({
            x: item.date_pretty,
            y: item.total_orders,
          }))
        )}
        all_color='#78C1F3'
        daily_color='#ff7f0e'
      />
    );
  }
  if (currentTab === t('dataTable.shops_amount')) {
    return (
      <DataContainer
        user={user}
        data={tree}
        isFullScreen={isFullScreen}
        setFullScreen={setIsFullScreen}
        title={t('dataTable.shops_amount')}
        all={shops.shops[shops.shops.length - 1]?.total_shops ?? 0}
        all_last={shops.shops[shops.shops.length - 2]?.total_shops ?? 0}
        isCount={true}
        daily={
          shops.shops[shops.shops.length - 1]?.total_shops -
            shops.shops[shops.shops.length - 2]?.total_shops ?? 0
        }
        daily_last={
          shops.shops[shops.shops.length - 2]?.total_shops -
            shops.shops[shops.shops.length - 3].total_shops ?? 0
        }
        last_date={
          shops.shops[shops.shops.length - 1]?.date_pretty ??
          new Date().toDateString()
        }
        data_all={shops.shops
          .sort(
            (a: any, b: any) =>
              new Date(a.date_pretty).getTime() -
              new Date(b.date_pretty).getTime()
          )
          .slice(1)
          .map((item: any) => ({
            x: item.date_pretty,
            y: item.total_shops,
          }))}
        data_daily={getDaily(
          shops.shops.map((item: any) => ({
            x: item.date_pretty,
            y: item.total_shops,
          }))
        )}
        all_color='#78C1F3'
        daily_color='#ff7f0e'
      />
    );
  } else if (currentTab === t('dataTable.sellers_amount')) {
    return (
      <DataContainer
        user={user}
        data={tree}
        // isFullScreen={isFullScreen}
        // setFullScreen={setIsFullScreen}
        title={t('dataTable.sellers_amount')}
        all={shops.accounts[shops.accounts.length - 1]?.total_accounts ?? 0}
        all_last={
          shops.accounts[shops.accounts.length - 2]?.total_accounts ?? 0
        }
        isCount={true}
        daily={
          shops.accounts[shops.accounts.length - 1]?.total_accounts -
            shops.accounts[shops.accounts.length - 2]?.total_accounts ?? 0
        }
        daily_last={
          shops.accounts[shops.accounts.length - 2]?.total_accounts -
            shops.accounts[shops.accounts.length - 3].total_accounts ?? 0
        }
        last_date={
          shops.accounts[shops.accounts.length - 1]?.date_pretty ??
          new Date().toDateString()
        }
        data_all={
          shops.accounts.length > 0
            ? shops.accounts
                .sort(
                  (a: any, b: any) =>
                    new Date(a.date_pretty).getTime() -
                    new Date(b.date_pretty).getTime()
                )
                .slice(1)
                .map((item: any) => ({
                  x: item.date_pretty,
                  y: item.total_accounts,
                }))
            : []
        }
        data_daily={
          getDaily(
            shops.accounts.map((item: any) => ({
              x: item.date_pretty,
              y: item.total_accounts,
            }))
          ) ?? []
        }
        all_color='#78C1F3'
        daily_color='#ff7f0e'
      />
    );
  } else if (currentTab === t('dataTable.products_amount')) {
    return (
      <DataContainer
        user={user}
        data={tree}
        isFullScreen={isFullScreen}
        setFullScreen={setIsFullScreen}
        title={t('dataTable.products_amount')}
        all={products[products.length - 1]?.total_products ?? 0}
        all_last={products[products.length - 2]?.total_products ?? 0}
        isCount={true}
        daily={
          products[products.length - 1]?.total_products -
            products[products.length - 2]?.total_products ?? 0
        }
        daily_last={
          products[products.length - 2]?.total_products -
            products[products.length - 3].total_products ?? 0
        }
        last_date={
          products[products.length - 1]?.date_pretty ??
          new Date().toDateString()
        }
        data_all={products
          .sort(
            (a: any, b: any) =>
              new Date(a.date_pretty).getTime() -
              new Date(b.date_pretty).getTime()
          )
          .slice(1)
          .map((item: any) => ({
            x: item.date_pretty,
            y: item.total_products,
          }))}
        data_daily={getDaily(
          products.map((item: any) => ({
            x: item.date_pretty,
            y: item.total_products,
          }))
        )}
        all_color='#78C1F3'
        daily_color='#ff7f0e'
      />
    );
  } else if (currentTab === t('dataTable.reviews_amount')) {
    return (
      <DataContainer
        user={user}
        data={tree}
        isFullScreen={isFullScreen}
        setFullScreen={setIsFullScreen}
        title={t('dataTable.reviews_amount')}
        all={reviews[reviews.length - 1]?.total_reviews ?? 0}
        all_last={reviews[reviews.length - 2]?.total_reviews ?? 0}
        isCount={true}
        daily={
          reviews[reviews.length - 1]?.total_reviews -
            reviews[reviews.length - 2]?.total_reviews ?? 0
        }
        daily_last={
          reviews[reviews.length - 2]?.total_reviews -
            reviews[reviews.length - 3].total_reviews ?? 0
        }
        last_date={
          reviews[reviews.length - 1]?.date_pretty ?? new Date().toDateString()
        }
        data_all={reviews
          .sort(
            (a: any, b: any) =>
              new Date(a.date_pretty).getTime() -
              new Date(b.date_pretty).getTime()
          )
          .slice(1)
          .map((item: any) => ({
            x: item.date_pretty,
            y: item.total_reviews,
          }))}
        data_daily={getDaily(
          reviews.map((item: any) => ({
            x: item.date_pretty,
            y: item.total_reviews,
          }))
        )}
        all_color='#78C1F3'
        daily_color='#ff7f0e'
      />
    );
  }
}

function getData(
  data: {
    revenue: {
      data: any;
    };
    orders: {
      data: any;
    };
    products: {
      data: any;
    };
    shops: {
      data: any;
    };
    reviews: {
      data: any;
    };
  },
  title: string,
  lang: string
) {
  if (!data.orders) return [];

  if (title === 'Daromad miqdori' || title === 'Выручка') {
    return data.revenue.data;
  }
  if (title === 'Buyurtmalar soni' || title === 'Продаж') {
    return data.orders.data;
  }
  if (title === 'Mahsulotlar soni' || title === 'Продукты') {
    return data.products.data;
  }
  if (title === "Do'konlar soni" || title === 'Магазины') {
    return data.shops.data;
  }
  if (title === 'Izohlar soni' || title === 'Отзывы') {
    return data.reviews.data;
  }
}

function getMinMax(data: any, title: string) {
  if (!data.orders) return [];

  if (title === 'Daromad miqdori' || title === 'Выручка') {
    return data.revenue.min_max;
  }
  if (title === 'Buyurtmalar soni' || title === 'Продаж') {
    return data.orders.min_max;
  }
  if (title === 'Mahsulotlar soni' || title === 'Продукты') {
    return data.products.min_max;
  }
  if (title === "Do'konlar soni" || title === 'Магазины') {
    return data.shops.min_max;
  }
  if (title === 'Izohlar soni' || title === 'Отзывы') {
    return data.reviews.min_max;
  }
}

function getTitles(title: string) {
  if (title === 'Daromad miqdori') {
    return "Quyida barcha kategoriyalarning daromad miqdori va shu daromadga qarab ularning ulushi ko'rsatilgan.";
  }
  if (title === 'Buyurtmalar soni') {
    return "Quyida barcha kategoriyalarning buyurtmalar soni va shu buyurtmalar soniga qarab ularning ulushi  ko'rsatilgan.";
  }
  if (title === 'Mahsulotlar soni') {
    return "Quyida barcha kategoriyalarning mahsulotlar soni va shu mahsulotlar soniga qarab ularning ulushi ko'rsatilgan.";
  }
  if (title === "Do'konlar soni") {
    return "Quyida barcha kategoriyalarning do'konlar soni va shu do'konlar soniga qarab ularning ulushi ko'rsatilgan.";
  }
  if (title === 'Izohlar soni') {
    return "Quyida barcha kategoriyalarning izohlar soni va shu izohlar soniga qarab ularning ulushi ko'rsatilgan.";
  }
  if (title === 'Выручка') {
    return 'Ниже приведены суммы доходов всех категорий и их доля исходя из этого дохода';
  }
  if (title === 'Заказы') {
    return 'Ниже указано количество заказов всех категорий и их доля в зависимости от количества заказов.';
  }
  if (title === 'Продукты') {
    return 'Ниже указано количество товаров всех категорий и их доля в зависимости от количества этих товаров.';
  }
  if (title === 'Магазины') {
    return 'Ниже указано количество магазинов всех категорий и их доля исходя из количества этих магазинов.';
  }
  if (title === 'Отзывы') {
    return 'Ниже указано количество комментариев всех категорий и их доля в зависимости от количества комментариев.';
  }
}

function getSubtitle(title: string) {
  return 'Agar ma\'lum bir kategoriyani chuqurroq o\'rganishni istasangiz, "Kategoriyalar" bo\'limiga o\'ting va shu kategoriyani tanlang.\n Если вы хотите узнать больше об определенной категории, перейдите в "Категории" и выберите эту категорию.';
}
