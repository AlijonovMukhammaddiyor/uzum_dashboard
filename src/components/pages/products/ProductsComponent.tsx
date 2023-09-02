import { AxiosResponse } from 'axios';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import { getCategoryProductTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { ProductAnalyticsViewType } from '@/components/pages/category/slug/components/CategoryProductsTable';
import CategoriesSelect from '@/components/pages/discovery/CategoriesSelect';
import GrowingCategories from '@/components/pages/home/components/GrowingCategories';
import GrowingProducts from '@/components/pages/home/components/GrowingProducts';
import MonthlyBestProducts from '@/components/pages/home/components/MonthlyBestProducts';
import NewProducts from '@/components/pages/home/components/NewProducts';
import WeeklyBestProducts from '@/components/pages/home/components/WeeklyBestProducts';
import ProductsFilters from '@/components/pages/products/components/ProductsFilters';
import { RenderAlert } from '@/components/shared/AlertComponent';
import InfiniteTable from '@/components/shared/InfiniteTable';
import Tabs from '@/components/shared/Tabs';

import noresults from '@/assets/no-results.webp';

import { UserType } from '@/types/user';

interface ProductsComponentProps {
  user: UserType;
}

function ProductsComponent({ user }: ProductsComponentProps) {
  const { t, i18n } = useTranslation('tabs');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<ProductAnalyticsViewType[]>([]);
  const [total, setTotal] = React.useState(0);
  const [filters, setFilters] = React.useState<
    {
      max: number | null;
      min: number | null;
      type: string;
    }[]
  >([]);
  const [nameFilters, setNameFilters] = React.useState<
    {
      value: string[] | null;
      type: string;
    }[]
  >([]);
  const [selectedCategories, setSelectedCategories] = React.useState<
    Set<number>
  >(new Set());
  const [activeTab, setActiveTab] = React.useState<string>(t('home.overview'));
  const [notAllowedTab, setNotAllowedTab] = React.useState<string>('');
  const [shouldRefetch, setShouldRefetch] = React.useState<boolean>(false);
  const isProPlus = user.tariff === 'seller' || user.tariff === 'business';

  const [searched, setSearched] = React.useState<boolean>(false);

  useEffect(() => {
    if (loading) setSearched(true);
  }, [loading]);

  React.useEffect(() => {
    setActiveTab(t('home.overview'));
  }, [i18n.language, t]);

  React.useEffect(() => {
    switch (notAllowedTab) {
      case t('home.new_products.title'):
        RenderAlert({
          alertTitle: t('tariffs.change_tariff'),
          alertSubtitle: t('home.new_products.info'),
          buttonTitle: t('tariffs.tariffs'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      case t('home.promising_products.title'):
        RenderAlert({
          alertTitle: t('tariffs.change_tariff'),
          alertSubtitle: t('home.promising_products.info'),
          buttonTitle: t('tariffs.tariffs'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      case t('home.promising_categories.title'):
        RenderAlert({
          alertTitle: t('tariffs.change_tariff'),
          alertSubtitle: t('home.promising_categories.info'),
          buttonTitle: t('tariffs.tariffs'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      case t('home.weekly_best_products'):
        RenderAlert({
          alertTitle: t('tariffs.change_tariff'),
          alertSubtitle:
            i18n.language === 'uz'
              ? "Oxirgi 7 kun mobaynida eng ko'p daromad keltirgan mahsulotlar va ularning haftalik va oylik daromadlari"
              : 'Продукты, которые приносят наибольший доход за последние 7 дней и их еженедельный и ежемесячный доход',
          buttonTitle: t('tariffs.tariffs'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      case t('home.monthly_best_products'):
        RenderAlert({
          alertTitle: t('tariffs.change_tariff'),
          alertSubtitle:
            i18n.language === 'uz'
              ? "Oxirgi 30 kunda eng ko'p daromad keltirgan mahsulotlar va ularning oylik va haftalik daromadi"
              : 'Продукты, которые приносят наибольший доход за последние 30 дней и их еженедельный и ежемесячный доход',
          buttonTitle: t('tariffs.tariffs'),
          buttonLink: '/profile',
        });
        setNotAllowedTab('');
        break;
      default:
        break;
    }
  }, [i18n.language, notAllowedTab, t]);

  // const getData = () => {
  //   if (selectedCategories.size === 0)
  //     return alert(
  //       i18n.language === 'uz'
  //         ? 'Kategoriya(lar)ni tanlang'
  //         : 'Выберите категорию(и)'
  //     );
  //   const api = new API(null);
  //   setLoading(true);
  //   let url = `/product/`;
  //   const params = makeUrlParams();
  //   url += `?categories=${Array.from(selectedCategories).join(',')}${params}`;

  //   api
  //     .get<
  //       unknown,
  //       AxiosResponse<{ data: ProductAnalyticsViewType[]; count: number }>
  //     >(url)
  //     .then((res) => {
  //       if (res.data.count > 10000) {
  //         setLoading(false);
  //         return alert(
  //           i18n.language === 'uz'
  //             ? `Jami filtrlangan mahsulotlar soni 10 000 dan oshdi. Iltimos, qidiruv filtrlari yoki tanlangan kategoriyalarni o'zgartiring- (${res.data.count} ta mahsulot)`
  //             : `Общее количество отфильтрованных продуктов превысило 10 000. Пожалуйста, измените фильтры поиска или выбранные категории - (${res.data.count} продуктов)`
  //         );
  //       }
  //       setData(res.data.data);
  //       setTotal(res.data.count);
  //       setLoading(false);
  //     });
  // };

  const loadData = (
    startRow: number,
    endRow: number,
    sortModel: {
      colId: string;
      sort: string;
    } | null
  ) => {
    if (selectedCategories.size === 0)
      return Promise.resolve({
        results: [],
        count: 0,

        // next: '',
        // previous: '',
      }) as any;

    const api = new API(null);
    setLoading(true);
    let url = `/product/` + `?offset=${startRow}&limit=${endRow - startRow}`;
    if (sortModel) {
      url += `&column=${sortModel.colId}&order=${sortModel.sort}`;
    }

    const params = makeUrlParams();
    url += `&categories=${Array.from(selectedCategories).join(',')}${params}`;

    return api.get<
      unknown,
      AxiosResponse<{
        results: ProductAnalyticsViewType[];
        count: number;
        next?: string;
        previous?: string;
      }>
    >(url);
  };

  const clearFilters = () => {
    setFilters([]);
    setSelectedCategories(new Set());
  };

  const makeUrlParams = () => {
    // traverse through filters and make url params
    // console.log(filters, nameFilters);
    let params = '';

    filters.forEach((filter) => {
      if (filter.min && filter.max)
        params += `&${filter.type}__range=[${filter.min}, ${filter.max}]`;
      else if (filter.min) params += `&${filter.type}__gte=${filter.min}`;
      else if (filter.max) params += `&${filter.type}__lte=${filter.max}`;
    });

    nameFilters.forEach((filter) => {
      if (filter.value) params += `&${filter.type}=${filter.value.join('---')}`;
    });

    return params;
  };

  console.log(shouldRefetch);

  return (
    <div className='mt-5 min-h-full w-full min-w-[1300px]'>
      <Tabs
        tabs={[
          t('home.overview'),
          t('home.weekly_best_products'),
          t('home.monthly_best_products'),
          t('home.new_products.title'),
          t('home.promising_products.title'),
          t('home.promising_categories.title'),

          // 'Asosiy kategoriyalar',
        ]}
        premiumTabs={[
          t('home.new_products.title'),
          t('home.promising_products.title'),
          t('home.promising_categories.title'),
          t('home.weekly_best_products'),
          t('home.monthly_best_products'),
        ]}
        disbaledTabs={
          isProPlus
            ? []
            : [
                t('home.weekly_best_products'),
                t('home.monthly_best_products'),
                t('home.promising_products.title'),
                t('home.promising_categories.title'),
                t('home.new_products.title'),
              ]
        }
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setNotAllowedTab={setNotAllowedTab}
        className='mb-6 overflow-auto'
      />
      <div
        className={clsxm(
          'h-full w-full pb-10',
          activeTab === t('home.overview') ? '' : 'hidden'
        )}
      >
        <Container
          loading={false}
          loadText={
            i18n.language === 'uz'
              ? "Ma'lumotlar yuklanmoqda..."
              : 'Загрузка данных...'
          }
          className='min-h-full w-full gap-5 rounded-none border-none shadow-none'
        >
          <div className='mb-8 flex min-h-[calc(100vh-200px)] w-full items-start justify-start gap-2 bg-white'>
            <CategoriesSelect
              className='shrink-0'
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
            <ProductsFilters
              setShouldRefetch={() => {
                setShouldRefetch(!shouldRefetch);
              }}
              // getData={getData}
              clearFilters={clearFilters}
              className='flex-1 shrink-0'
              loading={loading}
              setLoading={setLoading}
              filters={filters}
              setFilters={setFilters}
              nameFilters={nameFilters}
              setNameFilters={setNameFilters}
            />
          </div>
        </Container>
        <Container
          loading={loading}
          loadText={
            i18n.language === 'uz'
              ? "Ma'lumotlar yuklanmoqda..."
              : 'Загрузка данных...'
          }
          className='h-[calc(100vh-200px) w-full rounded-none border-none shadow-none'
        >
          <p className='w-full py-3 text-center text-xl font-semibold'>
            {i18n.language === 'uz'
              ? 'Filtrlangan mahsulotlar'
              : 'Отфильтрованные продукты'}
          </p>
          <div className='flex items-center justify-between gap-6 pr-3'>
            <p className='text-lg font-semibold'>
              {i18n.language === 'uz' ? 'Jami natijalar soni: ' : 'Всего: '}
              {total.toLocaleString()}
            </p>
          </div>
          {total > 100 ? (
            <div className='flex items-center justify-between gap-6 pr-3'>
              <p className='text-center font-semibold text-slate-600'>
                {i18n.language === 'uz'
                  ? `Mahsulotlarni yaxshiroq tahlil qilish uchun qidiruv maydonini yanada toraytirishni tavsiya qilamiz`
                  : `Мы рекомендуем еще больше сузить пространство поиска, чтобы лучше анализировать продукты.`}
              </p>
            </div>
          ) : (
            <></>
          )}

          <InfiniteTable
            setTotal={setTotal}
            shouldRefetch={shouldRefetch}
            rowData={data ? (data.length > 0 ? data : null) : null}
            setLoading={setLoading}
            rowHeight={75}
            fetchData={loadData}
            headerHeight={50}
            columnDefs={
              getCategoryProductTableColumnDefs(t2, i18n.language) as any
            }
            className={clsxm(
              'h-[calc(100vh-0px)] w-full',
              total === 0 && 'hidden'
            )}
          />

          {total === 0 ? (
            <div className='mx-auto mt-10 h-[400px] w-[100%] bg-white'>
              <Image
                src={noresults}
                alt='No results'
                className='mx-auto h-[500px] w-[500px]'
              />
            </div>
          ) : (
            <></>
          )}
        </Container>
      </div>

      <WeeklyBestProducts
        className={clsxm(
          activeTab === t('home.weekly_best_products') ? 'mt-0' : 'hidden'
        )}
      />

      <MonthlyBestProducts
        className={clsxm(
          activeTab === t('home.monthly_best_products') ? 'mt-0' : 'hidden'
        )}
      />

      <NewProducts
        className={clsxm(
          activeTab === t('home.new_products.title') ? 'mt-0' : 'hidden'
        )}
      />

      {activeTab === t('home.promising_products.title') && (
        <GrowingProducts
          className={clsxm(
            activeTab === t('home.promising_products.title') ? '' : 'hidden'
          )}
        />
      )}

      {activeTab === t('home.promising_categories.title') && (
        <GrowingCategories
          className={clsxm(
            activeTab === t('home.promising_categories.title') ? '' : 'hidden'
          )}
        />
      )}
    </div>
  );
}

export default ProductsComponent;
