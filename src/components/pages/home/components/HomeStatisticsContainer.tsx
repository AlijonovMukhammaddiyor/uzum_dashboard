import { AxiosResponse } from 'axios';
import React from 'react';
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
import { RenderAlert } from '@/components/shared/AlertComponent';
import Button from '@/components/shared/buttons/Button';

import { useContextState } from '@/context/Context';

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
  const [monthlyTree, setMonthlyTree] = React.useState<any[]>([]);
  const [weeklyTree, setWeeklyTree] = React.useState<any[]>([]);
  const [isFullScreen, setIsFullScreen] = React.useState<string | null>(null);
  const { t, i18n } = useTranslation('common');
  const [currentTab, setCurrentTab] = React.useState({
    value: t('dataTable.orders_amount'),
    label: t('dataTable.orders_amount'),
  });
  const { state } = useContextState();
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
    orders?: boolean;
    products?: boolean;
    revenue?: boolean;
    reviews?: boolean;
    shops?: boolean;
    segments?: boolean;
    topShops?: boolean;
    topProducts?: boolean;
    monthlySegments?: boolean;
    weeklySegments?: boolean;
  }>({
    orders: true,
    products: true,
    revenue: true,
    reviews: true,
    shops: true,
    segments: true,
    topShops: true,
    topProducts: true,
    monthlySegments: true,
    weeklySegments: true,
  });

  const [zoomLevel, setZoomLevel] = React.useState(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.75); // 90% zoom for windows less than 600px wide
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
    const uzanalitikaDiv = document.getElementById(
      'homestat'
    ) as HTMLDivElement;
    (uzanalitikaDiv.style as any).zoom = zoomLevel;
  }, [zoomLevel]);

  React.useEffect(() => {
    const api = new API(null);
    setCurrentTab({
      value: t('dataTable.orders_amount'),
      label: t('dataTable.orders_amount'),
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
      monthlySegments: true,
      weeklySegments: true,
    });

    api
      .get<unknown, AxiosResponse<any>>('/category/segmentation/monthly/')
      .then((res) => {
        // logger(res.data, 'Segmentation');
        setMonthlyTree(res.data);
        setLoading((prev) => ({ ...prev, monthlySegments: false }));
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in monthlySegments');
        setLoading((prev) => ({ ...prev, monthlySegments: false }));
      });

    api
      .get<unknown, AxiosResponse<any>>('/category/segmentation/weekly/')
      .then((res) => {
        // logger(res.data, 'Segmentation');
        setWeeklyTree(res.data);
        setLoading((prev) => ({ ...prev, weeklySegments: false }));
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in weeklySegments');
        setLoading((prev) => ({ ...prev, weeklySegments: false }));
      });

    api
      .get<unknown, AxiosResponse<any>>('/category/segmentation/')
      .then((res) => {
        // logger(res.data, 'Segmentation');
        setTree(res.data);
        setLoading((prev) => ({ ...prev, segments: false }));
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in orders');
        setLoading((prev) => ({ ...prev, segments: false }));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

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

  const isPaid =
    state?.user?.tariff === 'base' ||
    state?.user?.tariff === 'seller' ||
    state?.user?.tariff === 'business';

  return (
    <div
      className={clsxm(
        'relative flex h-full w-full flex-col gap-10 pb-6',
        className
      )}
      id='homestat'
    >
      {isFullScreen && (
        <TreeMap
          titleField={i18n.language === 'uz' ? 'title' : 'title_ru'}
          data={getData(
            tree as any,
            monthlyTree as any,
            weeklyTree as any,
            isFullScreen,
            t
          )}
          min={
            getMinMax(
              tree,
              monthlyTree as any,
              weeklyTree as any,
              isFullScreen,
              t
            )?.min
          }
          max={
            getMinMax(
              tree,
              monthlyTree as any,
              weeklyTree as any,
              isFullScreen,
              t
            )?.max
          }
          open={isFullScreen === isFullScreen}
          closeModal={() => {
            setIsFullScreen(null);
          }}
          title={isFullScreen}
          main_title={getTitles(isFullScreen)}
          main_subtitle={getSubtitle(isFullScreen)}
        />
      )}
      <div className='w-full max-w-full rounded-lg bg-gray-50 p-6 shadow'>
        <div className='w-full max-w-full'>
          <Container className='font-primary w-full border-none shadow-none'></Container>
          <div className='w- max-w-full gap-6'>
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
        <div className='mt-10 w-full'>
          <h2 className='font-primary mb-3 text-2xl font-bold'>
            {i18n.language === 'uz'
              ? 'Barcha kategoriyalar segmentatsiyasi'
              : 'Сегментация всех категорий'}
          </h2>
          <p className='font-primary mb-3 text-sm text-gray-600'>
            {i18n.language === 'uz'
              ? "Segmentatsiya grafikalari sizga qaysi kategoriyalarda turli jihatdan o'sish yoki kamayish bolganligi hamda ulardagi raqobat va daromad haqida qisqacha ma'lumot beradi. "
              : 'Графики сегментации показывают, в каких категориях произошло увеличение или уменьшение по разным параметрам, а также дают краткую информацию о конкуренции и доходе в них.'}
          </p>
        </div>
        <div className='divide-y-2 divide-gray-200'>
          <div className='py-4'>
            <h3 className='mb-2 text-lg font-bold'>
              {i18n.language === 'uz'
                ? '1. Barcha davr uchun'
                : '1. За все время'}
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {[
                [
                  'dataTable.see_segmentationsbyrevenue',
                  'dataTable.revenue',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalar hozirda eng ko'p yoki eng kam daromad olib kelmoqda?"
                    : 'В каких категориях сейчас наибольший или наименьший доход?',
                ],

                [
                  'dataTable.see_segmentationsbyorders_amount',
                  'dataTable.orders_amount',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalarda narxidan qatiy nazar, eng ko'p yoki eng oz buyurtmalar mavjud?"
                    : 'В каких категориях наибольшее или наименьшее количество заказов?',
                ],
                [
                  'dataTable.see_segmentationsbyproducts_amount',
                  'dataTable.products_amount',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalarda mahsulot turlari eng ko'p yoki eng kam? "
                    : 'В каких категориях наибольшее или наименьшее разнообразие товаров?',
                ],
                [
                  'dataTable.see_segmentationsbyshops_amount',
                  'dataTable.shops_amount',
                  i18n.language === 'uz'
                    ? 'Qaysi kategoriyalarda raqobat eng kuchli yoki eng kam?'
                    : 'В каких категориях наибольшая или наименьшая конкуренция?',
                ],
              ].map(([textKey, segment, describtion]) => (
                <div key={textKey} className='segmentation-container w-full'>
                  <p className='mt-2 text-sm italic text-gray-600'>
                    {/* some descrintion you have to tailor for each */}
                    {describtion}
                  </p>
                  <Button
                    className='text-primary border-primary hover:bg-primary flex w-full items-center justify-between gap-3 border bg-white px-3 py-2 transition-colors duration-200 hover:text-white active:shadow-inner'
                    onClick={() => {
                      // if (!canSee) alert(t('toPaid'));
                      setIsFullScreen(t(segment));
                    }}
                    spinnerColor='primary'
                    isLoading={loading.segments}
                  >
                    <>
                      {t(textKey)}
                      <FiChevronRight className='ml-2 inline-block' />
                    </>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className='py-4'>
            <h3 className='mb-2 text-lg font-bold'>
              {' '}
              {i18n.language === 'uz'
                ? '2. Oxirgi 30 kun'
                : '2. Последние 30 дней'}
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {[
                [
                  'dataTable.see_segmentationsby30dayrevenue',
                  'dataTable.30day_revenue',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalar oxirgi 30 kunda eng ko'p yoki eng kam daromad olib keldi?"
                    : 'В каких категориях самый высокий и самый низкий доход за последние 30 дней?',
                ],
                [
                  'dataTable.see_segmentationsby30dayorders_amount',
                  'dataTable.30day_orders_amount',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalarda oxirgi 30 kunda eng ko'p yoki eng oz buyurtmalar bo'ldi?"
                    : 'В каких категориях было наибольшее или наименьшее количество заказов за последние 30 дней?',
                ],
                [
                  'dataTable.see_segmentationsby30dayproducts_amount',
                  'dataTable.30day_products_amount',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalarda oxirgi 30 kunda eng ko'p yoki eng kam yangi mahsulotlar qo'shildi?"
                    : 'В каких категориях было добавлено наибольшее или наименьшее количество новых товаров за последние 30 дней?',
                ],
                [
                  'dataTable.see_segmentationsby30dayshops_amount',
                  'dataTable.30day_shops_amount',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalarda oxirgi 30 kunda eng ko'p yoki eng kam do'konlar qo'shildi?"
                    : 'В каких категориях было добавлено наибольшее или наименьшее количество новых магазинов за последние 30 дней?',
                ],
              ].map(([textKey, segment, describtion]) => (
                <div
                  key={textKey}
                  className='segmentation-container relative w-full'
                >
                  <p className='mt-2 text-sm italic text-gray-600'>
                    {/* some descrintion you have to tailor for each */}
                    {describtion}
                  </p>
                  <Button
                    className='text-primary border-primary hover:bg-primary flex w-full items-center justify-between gap-3 border bg-white px-3 py-2 transition-colors duration-200 hover:text-white active:shadow-inner'
                    onClick={() => {
                      if (!isPaid) {
                        RenderAlert({
                          alertTitle:
                            i18n.language === 'uz'
                              ? "Hozirgi tarifda ushbu ma'lumotlarni ko'rish mumkin emas. Iltimos, tarifni o'zgartiring"
                              : 'В текущем тарифе невозможно просмотреть эти данные. Пожалуйста, измените тариф',
                          alertSubtitle: '',
                          buttonTitle:
                            i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                          buttonLink: '/profile',
                        });
                        return;
                      }
                      setIsFullScreen(t(segment));
                    }}
                    spinnerColor='primary'
                    isLoading={loading.segments}
                  >
                    <>
                      {t(textKey)}
                      <div className='ga-3 flex items-center justify-end'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src='/images/tariffs/crown.png'
                          alt='crown'
                          className='right-8 top-[38px] h-5 w-5'
                        />
                        <FiChevronRight className='ml-2 inline-block' />
                      </div>
                    </>
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className='py-4'>
            <h3 className='mb-2 text-lg font-bold'>
              {i18n.language === 'uz'
                ? '3. Oxirgi 7 kun'
                : '3. Последние 7 дней'}
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {[
                [
                  'dataTable.see_segmentationsby7dayrevenue',
                  'dataTable.7day_revenue',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalar oxirgi 7 kunda eng ko'p yoki eng kam daromad olib keldi?"
                    : 'В каких категориях самый высокий и самый низкий доход за последние 7 дней?',
                ],
                [
                  'dataTable.see_segmentationsby7dayorders_amount',
                  'dataTable.7day_orders_amount',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalarda oxirgi 7 kunda eng ko'p yoki eng oz buyurtmalar bo'ldi?"
                    : 'В каких категориях было наибольшее или наименьшее количество заказов за последние 7 дней?',
                ],
                [
                  'dataTable.see_segmentationsby7dayproducts_amount',
                  'dataTable.7day_products_amount',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalarda oxirgi 7 kunda eng ko'p yoki eng kam yangi mahsulotlar qo'shildi?"
                    : 'В каких категориях было добавлено наибольшее или наименьшее количество новых товаров за последние 7 дней?',
                ],
                [
                  'dataTable.see_segmentationsby7dayshops_amount',
                  'dataTable.7day_shops_amount',
                  i18n.language === 'uz'
                    ? "Qaysi kategoriyalarda oxirgi 7 kunda eng ko'p yoki eng kam do'konlar qo'shildi?"
                    : 'В каких категориях было добавлено наибольшее или наименьшее количество новых магазинов за последние 7 дней?',
                ],
              ].map(([textKey, segment, describtion]) => (
                <div
                  key={textKey}
                  className='segmentation-container relative w-full'
                >
                  <p className='mt-2 text-sm italic text-gray-600'>
                    {/* some descrintion you have to tailor for each */}
                    {describtion}
                  </p>
                  <Button
                    className='text-primary border-primary hover:bg-primary flex w-full items-center justify-between gap-3 border bg-white px-3 py-2 transition-colors duration-200 hover:text-white active:shadow-inner'
                    onClick={() => {
                      if (!isPaid) {
                        RenderAlert({
                          alertTitle:
                            i18n.language === 'uz'
                              ? "Hozirgi tarifda ushbu ma'lumotlarni ko'rish mumkin emas. Iltimos, tarifni o'zgartiring"
                              : 'В текущем тарифе невозможно просмотреть эти данные. Пожалуйста, измените тариф',
                          alertSubtitle: '',
                          buttonTitle:
                            i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                          buttonLink: '/profile',
                        });
                        return;
                      }
                      // if (!canSee) alert(t('toPaid'));
                      setIsFullScreen(t(segment));
                    }}
                    spinnerColor='primary'
                    isLoading={loading.segments}
                  >
                    <>
                      {t(textKey)}
                      <div className='ga-3 flex items-center justify-end'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src='/images/tariffs/crown.png'
                          alt='crown'
                          className='right-8 top-[38px] h-5 w-5'
                        />
                        <FiChevronRight className='ml-2 inline-block' />
                      </div>
                    </>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
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
    shops?: boolean;
    products?: boolean;
    reviews?: boolean;
    revenue?: boolean;
    orders?: boolean;
    segments?: boolean;
  };
}) {
  const [zoomLevel, setZoomLevel] = React.useState(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.75); // 90% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            ?.total_shops.toLocaleString()}{' '}
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
            ?.total_products.toLocaleString()}{' '}
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
            ?.total_reviews.toLocaleString()}{' '}
          {lang === 'uz' ? 'ta' : 'шт'}
        </span>
      );
    if (title === t('dataTable.revenue')) {
      const r = revenue.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      )[0]?.total_revenue;
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
          <span>{`${r?.toFixed(2)} ${
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
            ?.total_orders.toLocaleString()}{' '}
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
          ?.total_accounts.toLocaleString()}{' '}
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
      const yesterday = temp[0]?.total_shops - temp[1]?.total_shops;

      return [yesterday, temp[1]?.total_shops];
    }
    if (title === t('dataTable.products_amount')) {
      const temp = products.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      );
      const yesterday = temp[0]?.total_products - temp[1]?.total_products;

      return [yesterday, temp[1]?.total_products];
    }
    if (title === t('dataTable.reviews_amount')) {
      const temp = reviews.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      );
      const yesterday = temp[0]?.total_reviews - temp[1]?.total_reviews;

      return [yesterday, temp[1]?.total_reviews];
    }
    if (title === t('dataTable.revenue')) {
      const temp = revenue.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      );
      const yesterday = temp[0]?.total_revenue - temp[1]?.total_revenue;

      return [yesterday, temp[1]?.total_revenue];
    }
    if (title === t('dataTable.orders_amount')) {
      const temp = orders.sort(
        (a: any, b: any) =>
          new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
      );
      const yesterday = temp[0]?.total_orders - temp[1]?.total_orders;

      return [yesterday, temp[1]?.total_orders];
    }
    const temp = shops.accounts.sort(
      (a: any, b: any) =>
        new Date(b.date_pretty).getTime() - new Date(a.date_pretty).getTime()
    );
    const yesterday = temp[0]?.total_accounts - temp[1]?.total_accounts;

    return [yesterday, temp[1]?.total_accounts];
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
                    : dayBeforeYesterday?.toFixed(2)}
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
                  : dayBeforeYesterday?.toFixed(2)}
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

          <div className='flex max-w-full items-center justify-start gap-1'>
            <p className='shrink-0 text-xs md:text-sm'>
              {t('comparedToYesterday')}
            </p>
            <p className='text-sm font-semibold'>
              ({dayBeforeYesterday?.toLocaleString()})
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
            ({dayBeforeYesterday?.toLocaleString()})
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
        (order: any) => order.date_pretty === '2023-08-31'
      );

      const change = current?.total_revenue - beginning?.total_revenue;
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
        (order: any) => order.date_pretty === '2023-08-31'
      );
      const change = current?.total_orders - beginning?.total_orders;

      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p
              className={clsxm(change > 0 ? 'text-green-600' : 'text-red-500')}
            >
              {change > 0 ? '+' : ''}
            </p>
            <p
              className={clsxm(
                change > 0
                  ? 'font-semibold text-green-600'
                  : 'font-semibold text-red-500'
              )}
            >
              {change.toLocaleString()}
            </p>
            <p className='text-sm'>{lang === 'uz' ? 'ta' : 'шт'}</p>{' '}
          </div>
        </div>
      );
    } else if (title === t('dataTable.shops_amount')) {
      // get the max shops after 2023-08-31
      const temp = shops.shops
        .filter(
          (shop: any) =>
            new Date(shop.date_pretty).getTime() >
            new Date('2023-08-31').getTime()
        )
        .sort((a: any, b: any) => b.total_shops - a.total_shops);
      const current = temp[0];

      const beginning = shops.shops.find(
        (order: any) => order.date_pretty === '2023-08-31'
      );
      const change = current?.total_shops - (beginning?.total_shops || 0);
      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p
              className={clsxm(change > 0 ? 'text-green-600' : 'text-red-500')}
            >
              {change > 0 ? '+' : ''}
            </p>
            <p
              className={clsxm(
                change > 0
                  ? 'font-semibold text-green-600'
                  : 'font-semibold text-red-500'
              )}
            >
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
            new Date('2023-08-31').getTime()
        )
        .sort((a: any, b: any) => b.total_accounts - a.total_accounts);
      const current = temp[0];
      const beginning = shops.accounts.find(
        (order: any) => order.date_pretty === '2023-08-31'
      );
      const change = current?.total_accounts - (beginning?.total_accounts || 0);
      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p
              className={clsxm(change > 0 ? 'text-green-600' : 'text-red-500')}
            >
              {change > 0 ? '+' : ''}
            </p>
            <p
              className={clsxm(
                change > 0
                  ? 'font-semibold text-green-600'
                  : 'font-semibold text-red-500'
              )}
            >
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
            new Date('2023-08-31').getTime()
        )
        .sort((a: any, b: any) => b.total_products - a.total_products);
      const current = temp[0];
      const beginning = products.find(
        (order: any) => order.date_pretty === '2023-08-31'
      );
      const change = current?.total_products - (beginning?.total_products || 0);
      // const change = -732;
      return (
        <div className='flex w-full flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center justify-start gap-1'>
            <p
              className={clsxm(change > 0 ? 'text-green-600' : 'text-red-500')}
            >
              {change > 0 ? '+' : ''}
            </p>
            <p
              className={clsxm(
                change > 0
                  ? 'font-semibold text-green-600'
                  : 'font-semibold text-red-500'
              )}
            >
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
        (order: any) => order.date_pretty === '2023-08-31'
      );
      const change = current?.total_reviews - beginning?.total_reviews;
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
      style={{
        height: zoomLevel === 1 ? '200px' : '265px',
      }}
    >
      {!isLoading() ? (
        <>
          <div className='flex w-full items-center gap-6'>
            <div className='bg-secondary flex h-14 w-14 items-center justify-center rounded-full'>
              {getLogo()}
            </div>
            <div className='flex flex-col gap-2'>
              <h2 className='font-primary text-lg font-semibold'>{title}</h2>
              <p className='text-3xl font-bold text-gray-700'>{getData()}</p>
            </div>
          </div>

          <div className='w-full border-t border-gray-200 pt-4'>
            <div className=' flex w-full items-center justify-start gap-4'>
              {renderDaily()}
            </div>
            <div className='flex shrink-0 items-center justify-between'>
              <p className='shrink-0 text-sm text-gray-500'>
                {t('InThisMonth')}
              </p>
              <p className='font-semibold text-gray-700'>{getThisMonth()}</p>
            </div>
          </div>
        </>
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
            orders[orders.length - 3]?.total_orders ?? 0
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
            shops.shops[shops.shops.length - 3]?.total_shops ?? 0
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
  monthlyTree: any,
  weeklyTree: any,
  title: string,
  t: any
) {
  if (!data.orders) return [];

  if (title === t('dataTable.7day_revenue')) {
    return weeklyTree.revenue.data;
  }

  if (title === t('dataTable.7day_orders_amount')) {
    return weeklyTree.orders.data;
  }

  if (title === t('dataTable.7day_products_amount')) {
    return weeklyTree.products.data;
  }

  if (title === t('dataTable.7day_shops_amount')) {
    return weeklyTree.shops.data;
  }

  if (title === t('dataTable.30day_products_amount')) {
    return monthlyTree.products.data;
  }

  if (title === t('dataTable.30day_shops_amount')) {
    return monthlyTree.shops.data;
  }

  if (title === t('dataTable.30day_revenue')) {
    return monthlyTree.revenue.data;
  }

  if (title === t('dataTable.30day_orders_amount')) {
    return monthlyTree.orders.data;
  }

  if (title === t('dataTable.revenue')) {
    return data.revenue.data;
  }
  if (title === t('dataTable.orders_amount')) {
    return data.orders.data;
  }
  if (title === t('dataTable.products_amount')) {
    return data.products.data;
  }
  if (title === t('dataTable.shops_amount')) {
    return data.shops.data;
  }
  if (title === t('dataTable.reviews_amount')) {
    return data.reviews.data;
  }
}

function getMinMax(
  data: any,
  monthlyTree: any,
  weeklyTree: any,
  title: string,
  t: any
) {
  console.log(title);

  if (!data.orders) return [];

  if (title === t('dataTable.7day_revenue')) {
    return weeklyTree.revenue.min_max;
  }

  if (title === t('dataTable.7day_orders_amount')) {
    return weeklyTree.orders.min_max;
  }

  if (title === t('dataTable.7day_products_amount')) {
    return weeklyTree.products.min_max;
  }

  if (title === t('dataTable.7day_shops_amount')) {
    return weeklyTree.shops.min_max;
  }

  if (title === t('dataTable.30day_revenue')) {
    return monthlyTree.revenue.min_max;
  }

  if (title === t('dataTable.30day_orders_amount')) {
    return monthlyTree.orders.min_max;
  }

  if (title === t('dataTable.30day_products_amount')) {
    return monthlyTree.products.min_max;
  }

  if (title === t('dataTable.30day_shops_amount')) {
    return monthlyTree.shops.min_max;
  }

  if (
    title === 'Daromad miqdori' ||
    title === 'Выручка' ||
    title === 'Tushum miqdori'
  ) {
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
  if (title === 'Daromad miqdori' || title === 'Tushum miqdori') {
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
