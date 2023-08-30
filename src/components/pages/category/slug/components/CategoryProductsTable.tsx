import { AxiosResponse } from 'axios';
import * as FileSaver from 'file-saver';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFileExcel } from 'react-icons/fa';
import Switch from 'react-switch';
import XLSX from 'sheetjs-style';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getCategoryProductTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import CategoryProductsFilters from '@/components/pages/category/slug/components/CategoryProductsFilters';
import { RenderAlert } from '@/components/shared/AlertComponent';
import Button from '@/components/shared/buttons/Button';
import InfiniteTable from '@/components/shared/InfiniteTable';

import { useContextState } from '@/context/Context';

export interface Props {
  activeTab?: string;
  categoryId: string;
  className?: string;
}

export interface ProductAnalyticsViewType {
  badges: string;
  date_pretty: string;
  orders_amount: number;
  position_in_category: number;
  product_available_amount: number;
  product_characteristics: string;
  product_id: number;
  product_title: string;
  rating: number;
  reviews_amount: number;
  shop_link: string;
  shop_title: string;
  sku_analytics: string;
  category_title: string;
  avg_purchase_price: number;
}

function CategoryProductsTable({ categoryId, className, activeTab }: Props) {
  const { t, i18n } = useTranslation('tableColumns');
  const { t: t2 } = useTranslation('categories');
  const { state } = useContextState();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [topProductsData, setTopProductsData] = React.useState<
    {
      type: string;
      value: number;
    }[]
  >([]);
  const [loadingTopProducts, setLoadingTopProducts] =
    React.useState<boolean>(false);
  const [totalOrders, setTotalOrders] = React.useState<number>(0);
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const [childrenCount, setChildrenCount] = React.useState<number>(0);
  const [revenue, setRevenue] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);
  const [filters, setFilters] = React.useState<
    {
      max: number | null;
      min: number | null;
      type: string;
    }[]
  >([]);
  const [nameFilters, setNameFilters] = React.useState<
    {
      value: string | null;
      type: string;
    }[]
  >([]);
  const [isInstantFilter, setIsInstantFilter] = React.useState<boolean>(true);
  const [instantFilter, setInstantFilter] = React.useState<string | null>(null);
  const [shouldRefetch, setShouldRefetch] = React.useState<boolean>(false);

  React.useEffect(() => {
    const api = new API(null);
    setLoadingTopProducts(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          products: {
            product_id: number;
            product_title: string;
            product_title_ru: string;
            orders_amount: number;
            orders_money: number;
          }[];
          total_orders: number;
          total_revenue: number;
          total_products: number;
          descendants: number;
        }>
      >('/category/products/top/' + categoryId)
      .then((res) => {
        // setTopProducts(res.data.products);
        const products = res.data.products;
        let sum = 0;
        const data = products
          .filter((product) => product.orders_money > 0)
          .map((product) => {
            sum += product.orders_money;
            return {
              type:
                i18n.language === 'uz'
                  ? product.product_title
                  : product.product_title_ru ?? product.product_title,
              value: Math.round(product.orders_money),
            };
          });
        // if (res.data.total_products > 10)
        //   data.push({
        //     type: t2('other_products'),
        //     value: Math.round(res.data.total_revenue - sum),
        //   });

        setTopProductsData(data);
        setTotalProducts(res.data.total_products);
        setChildrenCount(res.data.descendants);
        setTotalOrders(res.data.total_orders);
        setRevenue(res.data.total_revenue);

        // setTotalOrders(res.data.total_orders);
        setLoadingTopProducts(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting top products');
        setLoadingTopProducts(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, i18n.language]);

  const loadData = (
    startRow: number,
    endRow: number,
    sortModel: {
      colId: string;
      sort: string;
    } | null,
    filterModel: {
      [key: string]: {
        filterType: string;
        type: string;
        filter: string;
      };
    } | null
  ) => {
    const api = new API(null);
    setLoading(true);
    let url =
      `/category/products/` +
      categoryId +
      `?offset=${startRow}&limit=${endRow - startRow}`;
    if (sortModel) {
      url += `&column=${sortModel.colId}&order=${sortModel.sort}`;
    }

    if (isInstantFilter && instantFilter) {
      url += `&instant_filter=${instantFilter}`;
    } else {
      const params = makeUrlParams();
      url += params;
    }

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

  const exportToExcel = () => {
    const api = new API(null);
    setLoading(true);
    if (state.user?.tariff === 'free' || state.user?.tariff === 'trial') {
      setLoading(false);
      return alert(
        i18n?.language === 'uz'
          ? "Bu funktsiyadan foydalanish uchun boshqa tarifga o'ting"
          : 'Для использования этой функции перейдите на другой тариф'
      );
    }
    api
      .get<unknown, AxiosResponse<Blob>>('/product/toexcel/' + categoryId)
      .then((res) => {
        // download res.data as excel file
        // logger(res, 'Response from export to excel');
        downloadExcel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in export to excel');
        setLoading(false);
      });
  };

  function downloadExcel(data_: any) {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const data = data_.slice(0, 10000);
    // Filter data to include only the required columns
    const filteredData = data.slice(0, 10000).map((item: any) => ({
      product_id: item.product_id,
      title_ru: item.product_title_ru,
      title: item.product_title,
      category_title_ru: item.category_title_ru ?? item.category_title,
      shop_title: item.shop_title,
      revenue: Math.round((item.orders_money * 1000) / 1000) * 1000,
      monthly_revenue:
        Math.round((item.diff_orders_money * 1000) / 1000) * 1000,
      weekly_revenue:
        Math.round((item.weekly_orders_money * 1000) / 1000) * 1000,
      orders: item.orders_amount,
      monthly_orders_amount: item.diff_orders_amount,
      weekly_orders_amount: item.weekly_orders_amount,
      reviews_amount: item.reviews_amount,
      monthly_reviews_amount: item.diff_reviews_amount,
      weekly_reviews_amount: item.weekly_reviews_amount,
      position_in_subcategory: item.position_in_category,
      available_in_stock: item.product_available_amount,
      rating: item.rating,
      average_purchase_price: Math.round(item.avg_purchase_price / 1000) * 1000,
    }));

    // Convert the filtered data to a sheet
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Define custom column headers in Russian
    const customHeaders = {
      A1: 'ID товара',
      B1: 'Название товара',
      C1: 'Mahsulot nomi',
      D1: 'Название категории',
      E1: 'Название магазина',
      F1: 'Выручка',
      G1: 'Выручка (месяц)',
      H1: 'Выручка (неделя)',
      I1: 'Заказы',
      J1: 'Заказы (месяц)',
      K1: 'Заказы (неделя)',
      L1: 'Отзывы',
      M1: 'Отзывы (месяц)',
      N1: 'Отзывы (неделя)',
      O1: 'Позиция в подкатегории',
      P1: 'Количество в наличии',
      Q1: 'Рейтинг',
      R1: 'Средняя цена покупки',
    };

    // Map custom headers to the sheet
    for (const key in customHeaders) {
      const key_: keyof typeof customHeaders = key as any;
      ws[key_].v = customHeaders[key_];
      ws[key_].s = {
        fill: { patternType: 'solid', fgColor: { rgb: '000000' } }, // Black background color for headers
        font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 14 }, // White text with larger font size
        alignment: {
          horizontal: 'center',
          vertical: 'center',
          wrapText: true,
        },
      };
    }

    ws['!cols'] = [
      { wch: 12 }, // A: ID товара
      { wch: 60 }, // B: Название товара
      { wch: 60 }, // C: Mahsulot nomi
      { wch: 40 }, // D: Название категории
      { wch: 30 }, // E: Название магазина
      { wch: 20 }, // F: Выручка
      { wch: 20 }, // G: Выручка (месяц)
      { wch: 20 }, // H: Выручка (неделя)
      { wch: 20 }, // I: Заказы
      { wch: 20 }, // J: Заказы (месяц)
      { wch: 20 }, // K: Заказы (неделя)
      { wch: 20 }, // L: Отзывы
      { wch: 20 }, // M: Отзывы (месяц)
      { wch: 20 }, // N: Отзывы (неделя)
      { wch: 30 }, // O: Позиция в категории
      { wch: 30 }, // P: Количество в наличии
      { wch: 15 }, // Q: Рейтинг
      { wch: 25 }, // R: Средняя цена покупки
    ];

    ws['!rows'] = [
      { hpx: 40 },
      ...Array(filteredData.length).fill({ hpx: 30 }),
    ];

    const greenGradient = (value: number, min: number, max: number) => {
      if (min === 0) {
        min = 1;
      }
      const gradient = Math.round(100 + 155 * ((max - value) / (max - min))); // Darker shades for higher values
      return `00${gradient.toString(16).padStart(2, '0')}00`;
    };

    const orangeGradient = (value: number, min: number, max: number) => {
      if (min === 0) {
        min = 1;
      }

      const gradient = Math.round(220 - 50 * ((value - min) / (max - min)));
      return `FF${gradient.toString(16).padStart(2, '0')}A5`;
    };

    const applyGradient = (
      column: string,
      data: any[],
      gradientFunction: (value: number, min: number, max: number) => string
    ) => {
      const maxVal = Math.max(...data);
      const minVal = Math.min(...data);
      console.log(maxVal, minVal, column);
      for (let i = 0; i < data.length; i++) {
        const cell = `${column}${i + 2}`;
        ws[cell].s = {
          fill: {
            patternType: 'solid',
            fgColor: { rgb: gradientFunction(data[i], minVal, maxVal) },
          },
          border: {
            // Setting borders for each cell
            top: { style: 'thin', color: { auto: 1 } },
            bottom: { style: 'thin', color: { auto: 1 } },
            left: { style: 'thin', color: { auto: 1 } },
            right: { style: 'thin', color: { auto: 1 } },
          },
          font: { sz: 12 }, // Setting a standard font size
          alignment: {
            horizontal: 'center',
            vertical: 'center',
          },
        };
      }
    };

    applyGradient(
      'J',
      filteredData.map((item: any) => item.orders),
      orangeGradient
    );
    applyGradient(
      'L',
      filteredData.map((item: any) => item.reviews_amount),
      greenGradient
    );
    applyGradient(
      'G',
      filteredData.map((item: any) => item.monthly_revenue),
      greenGradient
    );

    // Create the workbook and save it
    const wb = { Sheets: { shops: ws }, SheetNames: ['shops'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data2 = new Blob([excelBuffer], { type: fileType });
    const currentDate = new Date().toISOString().slice(0, 10);
    FileSaver.saveAs(data2, 'продукты_' + currentDate + fileExtension);
  }

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
      if (filter.value) params += `&${filter.type}__icontains=${filter.value}`;
    });

    return params;
  };

  if (activeTab !== 'Tovarlar' && activeTab !== 'Товары') return <></>;

  return (
    <div
      className={clsxm(
        'flex h-full w-full min-w-[1200px] flex-col items-start justify-start gap-5 overflow-x-scroll',
        className
      )}
    >
      <Container
        className={clsxm(
          'h-[70px] w-full min-w-[1200px] overflow-hidden rounded-md border-none shadow-none'
        )}
        loading={loadingTopProducts}
      >
        <div className='flex items-center justify-between gap-3'>
          <div className='flex h-full flex-1 items-center justify-between gap-4 rounded-md bg-white p-5 shadow-md'>
            <p className='font-semibold'>{t('revenue')}:</p>
            <p className='text-primary font-semibold'>
              {revenue / 1000000 > 1 ? (
                <span>{(revenue / 1000000).toFixed(1)} mlrd so'm</span>
              ) : revenue / 1000 > 1 ? (
                <span>{(revenue / 1000).toFixed(1)} mln so'm</span>
              ) : (
                <span>{Number(revenue.toFixed(1)).toLocaleString()} so'm</span>
              )}
            </p>
          </div>
          <div className='flex h-full flex-1 items-center justify-between gap-4 rounded-md bg-white p-5 shadow-md'>
            <p className='font-semibold'>{t('products_count')}:</p>
            <p className='text-primary font-semibold'>
              {totalProducts?.toLocaleString()}
            </p>
          </div>
          <div className='flex h-full flex-1 items-center justify-between gap-4 rounded-md bg-white p-5 shadow-md'>
            <p className='font-semibold'>{t('orders')}:</p>
            <p className='text-primary font-semibold'>
              {totalOrders?.toLocaleString()}
            </p>
          </div>
          {childrenCount > 0 && (
            <div className='flex h-full flex-1 items-center justify-between gap-4 rounded-md bg-white p-5 shadow-md'>
              <p className='font-semibold'>{t('subcategories_count')}:</p>
              <p className='text-primary font-semibold'>
                {childrenCount?.toLocaleString()}
              </p>
            </div>
          )}
        </div>
        <div className='flex h-[calc(100%-24px)] w-full flex-1 items-start justify-start p-3'>
          {/* <PieChart data={topProductsData} labelType='spider' />
           */}

          {/* <TreeMapChart
            data={prepareTreeData(topProductsData, i18n.language)}
            min={Math.min(...topProductsData.map((product) => product.value))}
            max={Math.max(...topProductsData.map((product) => product.value))}
            title={t('revenue')}
            colors={['#FFC107', '#FF9800', '#FF5722', '#F44336', '#E91E63']}
          /> */}
        </div>
      </Container>
      <div className=''>
        <Button
          className='flex items-center rounded bg-green-500 px-4 py-2 text-white transition duration-200 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'
          onClick={() => {
            if (
              state.user?.tariff === 'free' ||
              state.user?.tariff === 'trial'
            ) {
              RenderAlert({
                alertTitle:
                  i18n.language === 'uz'
                    ? "Excel faylga yuklab olish uchun boshqa tarifga o'ting"
                    : 'Для загрузки в Excel перейдите на другой тариф',
                alertSubtitle: '',
                buttonTitle: i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                buttonLink: '/profile',
              });
              return;
            }
            exportToExcel();
          }}
          isLoading={loading}
          spinnerColor='rgb(126 34 206)'
        >
          <FaFileExcel className='mr-2' />
          <p>
            {i18n.language === 'uz'
              ? 'Mahsulotlarni Excelga yuklash'
              : 'Загрузить товары в Excel'}
          </p>
        </Button>
      </div>
      <Container
        loading={loading}
        className={clsxm('w-full border-none shadow-none')}
      >
        <div className='mb-4 flex w-full items-center justify-between rounded-md bg-white p-5'>
          <p className='font-semibold'>
            {i18n.language === 'uz' ? 'Tez Filtrlar' : 'Мгновенные фильтры'}
          </p>
          <div className='flex items-center justify-end gap-8'>
            <div className='flex items-center justify-start gap-2'>
              <p className='text-sm font-semibold'>
                {i18n.language === 'uz'
                  ? "Eng ko'p daromad keltirgan 100 ta"
                  : '100 товаров с наибольшей выручкой'}
              </p>
              <Switch
                onColor='#614bc3'
                offColor='#c3c1c9'
                onChange={(e) => {
                  if (
                    state.user?.tariff === 'free' ||
                    state.user?.tariff === 'trial'
                  ) {
                    RenderAlert({
                      alertTitle:
                        i18n.language === 'uz'
                          ? "Bu sahifadan foydalanish uchun boshqa tarifga o'ting"
                          : 'Для использования этой страницы перейдите на другой тариф',
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                      buttonLink: '/profile',
                    });
                    return;
                  }

                  setIsInstantFilter(e);
                  if (!e) setInstantFilter(null);
                  else setInstantFilter('revenue');

                  setShouldRefetch(!shouldRefetch);
                }}
                checked={instantFilter === 'revenue'}
              />
            </div>
            <div className='flex items-center justify-start gap-2'>
              <p className='text-sm font-semibold'>
                {i18n.language === 'uz'
                  ? "Eng so'nggi sotuvga qo'shilgan 100 ta"
                  : 'Последние 100 товаров, добавленных в продажу'}
              </p>
              <Switch
                onColor='#614bc3'
                offColor='#c3c1c9'
                onChange={(e) => {
                  if (
                    state.user?.tariff === 'free' ||
                    state.user?.tariff === 'trial'
                  ) {
                    RenderAlert({
                      alertTitle:
                        i18n.language === 'uz'
                          ? "Bu sahifadan foydalanish uchun boshqa tarifga o'ting"
                          : 'Для использования этой страницы перейдите на другой тариф',
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                      buttonLink: '/profile',
                    });
                    return;
                  }

                  setIsInstantFilter(e);
                  if (!e) setInstantFilter(null);
                  else setInstantFilter('created_at');

                  setShouldRefetch(!shouldRefetch);
                }}
                checked={instantFilter === 'created_at'}
              />
            </div>
            <div className='flex items-center justify-start gap-2'>
              <p className='text-sm font-semibold'>
                {i18n.language === 'uz'
                  ? '30 kunlik yuqori daromadli 100 ta'
                  : '100 товаров с максимальной выручкой за 30 дней'}
              </p>
              <Switch
                onColor='#614bc3'
                offColor='#c3c1c9'
                onChange={(e) => {
                  if (
                    state.user?.tariff === 'free' ||
                    state.user?.tariff === 'trial'
                  ) {
                    RenderAlert({
                      alertTitle:
                        i18n.language === 'uz'
                          ? "Bu sahifadan foydalanish uchun boshqa tarifga o'ting"
                          : 'Для использования этой страницы перейдите на другой тариф',
                      buttonTitle:
                        i18n.language === 'uz' ? 'Tariflar' : 'Тарифы',
                      buttonLink: '/profile',
                    });
                    return;
                  }
                  setIsInstantFilter(e);
                  if (!e) setInstantFilter(null);
                  else setInstantFilter('monthly_revenue');

                  setShouldRefetch(!shouldRefetch);
                }}
                checked={instantFilter === 'monthly_revenue'}
              />
            </div>
          </div>
        </div>
        <div className='mb-4 w-full rounded-md bg-white p-5'>
          <CategoryProductsFilters
            filters={filters}
            setShouldRefetch={() => {
              setShouldRefetch(!shouldRefetch);
              setIsInstantFilter(false);
              setInstantFilter(null);
            }}
            setFilters={setFilters}
            nameFilters={nameFilters}
            setNameFilters={setNameFilters}
          />
        </div>

        <p className='mb-4 font-semibold'>
          {i18n.language === 'uz' ? 'Mahsulotlar' : 'Товары'} ({count})
        </p>
        <InfiniteTable
          columnDefs={
            getCategoryProductTableColumnDefs(t, i18n.language) as any
          }
          rowHeight={90}
          setCount={setCount}
          className='h-[1016px] min-w-full'
          fetchData={loadData}
          setLoading={setLoading}
          shouldRefetch={shouldRefetch}
        />
      </Container>
    </div>
  );
}

function prepareTreeData(
  products: {
    type: string;
    value: number;
  }[],
  lang: string
) {
  const res: {
    title: string;
    children: {
      title: string;
      analytics: number;
    }[];
  } = {
    title: lang === 'uz' ? 'Mahsulotlar' : 'Товары',
    children: [],
  };

  for (const product of products) {
    res.children.push({
      title: product.type,
      analytics: product.value,
    });
  }

  return res;
}
export default CategoryProductsTable;
