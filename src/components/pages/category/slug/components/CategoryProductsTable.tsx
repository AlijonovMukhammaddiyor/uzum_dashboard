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
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
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
      value: string[] | null;
      type: string;
    }[]
  >([]);
  const [isInstantFilter, setIsInstantFilter] = React.useState<boolean>(true);
  const [instantFilter, setInstantFilter] = React.useState<string | null>(null);
  const [shouldRefetch, setShouldRefetch] = React.useState<boolean>(false);

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

  // React.useEffect(() => {
  //   const uzanalitikaDiv = document.getElementById(
  //     'categoryproducts'
  //   ) as HTMLDivElement;
  //   (uzanalitikaDiv.style as any).zoom = zoomLevel;
  // }, [zoomLevel]);

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

    if (filterModel) {
      const columns = Object.keys(filterModel);
      const filters = Object.values(filterModel);

      url += `&searches=${columns.join(',')}&filters=${filters
        .map((filter) => filter.filter)
        .join('---')}`;
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
    let url = `/product/toexcel/` + categoryId;

    if (isInstantFilter && instantFilter) {
      url += `?instant_filter=${instantFilter}`;
    } else {
      const params = makeUrlParams();
      if (params) url += '?';
      url += params;
    }
    api
      .get<unknown, AxiosResponse<Blob>>(url)
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
    console.log(data_);
    // return false;
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const data = data_.slice(0, 10000);
    // Filter data to include only the required columns
    const filteredData = data.map((item: any) => {
      return {
        product_id: item.product_id,
        product_title: item.product_title,
        product_title_ru: item.product_title_ru,
        category_title: item.category_title,
        category_title_ru: item.category_title_ru,
        shop_title: item.shop_title,
        rating: item.rating,
        orders_3_days: item.orders_3_days,
        orders_30_days: item.monthly_orders,
        orders_90_days: item.orders_90_days,
        revenue_3_days: item.revenue_3_days,
        revenue_30_days: item.monthly_revenue,
        revenue_90_days: item.revenue_90_days,
        reviews: item.reviews_amount,
        available_amount: item.product_available_amount,
        position_in_category: item.position_in_category,
        avg_purchase_price: item.avg_purchase_price,
      };
    });

    // Convert the filtered data to a sheet
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Define custom column headers in Russian
    const customHeaders = {
      A1: i18n.language === 'uz' ? 'Mahsulot ID' : 'ID товара',
      B1:
        i18n.language === 'uz' ? 'Mahsulot nomi - uz' : 'Название товара - uz',
      C1:
        i18n.language === 'uz' ? 'Mahsulot nomi - ru' : 'Название товара - ru',
      D1:
        i18n.language === 'uz'
          ? 'Kategoriya nomi - uz'
          : 'Название категории - uz',
      E1:
        i18n.language === 'uz'
          ? 'Kategoriya nomi - ru'
          : 'Название категории - ru',
      F1: i18n.language === 'uz' ? 'Magazin nomi' : 'Название магазина',
      G1: i18n.language === 'uz' ? 'Reyting' : 'Рейтинг',
      H1:
        i18n.language === 'uz'
          ? '3 kunlik zakazlar soni'
          : 'Количество заказов за 3 дня',
      I1:
        i18n.language === 'uz'
          ? '30 kunlik zakazlar soni'
          : 'Количество заказов за 30 дней',
      J1:
        i18n.language === 'uz'
          ? '90 kunlik zakazlar soni'
          : 'Количество заказов за 90 дней',
      K1: i18n.language === 'uz' ? '3 kunlik daromad' : 'Выручка за 3 дня',
      L1: i18n.language === 'uz' ? '30 kunlik daromad' : 'Выручка за 30 дней',
      M1: i18n.language === 'uz' ? '90 kunlik daromad' : 'Выручка за 90 дней',
      N1: i18n.language === 'uz' ? 'Izohlar soni' : 'Количество отзывов',
      O1: i18n.language === 'uz' ? 'Mavjud miqdor' : 'Количество в наличии',
      P1:
        i18n.language === 'uz' ? "Kategoriyadagi o'rni" : 'Позиция в категории',
      Q1:
        i18n.language === 'uz'
          ? "O'rtacha sotib olish narxi"
          : 'Средняя цена покупки',
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
      { wch: 30 }, // D: Kategoriya nomi
      { wch: 30 }, // E: Kategoriya nomi
      { wch: 30 }, // F: Magazin nomi
      { wch: 20 }, // G: Reyting
      { wch: 20 }, // H: 3 kunlik zakazlar soni
      { wch: 20 }, // I: 30 kunlik zakazlar soni
      { wch: 20 }, // J: 90 kunlik zakazlar soni
      { wch: 20 }, // K: 3 kunlik daromad
      { wch: 20 }, // L: 30 kunlik daromad
      { wch: 20 }, // M: 90 kunlik daromad
      { wch: 20 }, // N: Izohlar soni
      { wch: 20 }, // O: Mavjud miqdor
      { wch: 20 }, // P: Kategoriyadagi o'rni
      { wch: 30 }, // Q: O'rtacha sotib olish narxi
    ];

    ws['!rows'] = [
      { hpx: 40 },
      ...Array(filteredData.length).fill({ hpx: 30 }),
    ];

    // make shop title column bold
    for (let i = 0; i < filteredData.length; i++) {
      const cell = `F${i + 2}`;
      ws[cell].s = {
        font: { bold: true },
      };
    }

    const greenGradient = (value: number, min: number, max: number) => {
      if (value === 0) return 'FFFFFF'; // Return white for 0 value
      if (min === 0) {
        min = 1;
      }
      const gradient = Math.round(100 + 155 * ((max - value) / (max - min))); // Darker shades for higher values
      return `00${gradient.toString(16).padStart(2, '0')}00`;
    };

    const orangeGradient = (value: number, min: number, max: number) => {
      if (value === 0) return 'FFFFFF'; // Return white for 0 value

      if (min === 0) {
        min = 1;
      }

      const gradient = Math.round(220 - 50 * ((value - min) / (max - min)));
      return `FF${gradient.toString(16).padStart(2, '0')}A5`;
    };

    const blueGradient = (value: number, min: number, max: number) => {
      if (value === 0) return 'FFFFFF'; // Return white for 0 value

      if (min === 0) {
        min = 1;
      }

      // Adjusting the gradient to produce a more noticeable blue range
      const gradient = Math.round(255 * ((max - value) / (max - min)));
      return `0000${gradient.toString(16).padStart(2, '0')}`;
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
      'I',
      filteredData.map((item: any) => item.orders_30_days),
      greenGradient
    );
    applyGradient(
      'L',
      filteredData.map((item: any) => item.revenue_30_days),
      orangeGradient
    );

    applyGradient(
      'Q',
      filteredData.map((item: any) => item.avg_purchase_price),
      greenGradient
    );

    applyGradient(
      'G',
      filteredData.map((item: any) => item.rating),
      orangeGradient
    );

    // Create the workbook and save it
    const wb = { Sheets: { products: ws }, SheetNames: ['products'] };
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

    if (nameFilters.length > 0)
      nameFilters.forEach((filter) => {
        if (filter.value)
          params += `&${filter.type}=${filter.value.join('---')}`;
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
      id='categoryproducts'
      style={{
        zoom: zoomLevel,
      }}
    >
      <Container
        className={clsxm(
          'h-[70px] w-full min-w-[1200px] overflow-hidden rounded-md border-none shadow-none'
        )}
        loading={loadingTopProducts}
      >
        <div className='flex items-center justify-end gap-3'>
          <div className='flex h-full flex-1 items-center justify-end gap-4 rounded-md bg-white p-5 shadow-md'>
            <p className='font-semibold'>{t('products_count')}:</p>
            <p className='text-primary font-semibold'>
              {totalProducts?.toLocaleString()}
            </p>
          </div>
        </div>
        <div className='flex h-[calc(100%-24px)] w-full flex-1 items-start justify-start p-3'>
          {/* <PieChart data={topProductsData} labelType='spider' />
           */}
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
        <div className='flex w-full items-center justify-between rounded-t-md py-5'>
          <p className='font-semibold'>
            {i18n.language === 'uz' ? 'Tez Filtrlar' : 'Мгновенные фильтры'}
          </p>
          <div className='flex items-center justify-end gap-8'>
            <div className='flex items-center justify-start gap-2'>
              <p className='text-xs font-semibold'>
                {i18n.language === 'uz'
                  ? "Eng ko'p tushum keltirgan 100 ta"
                  : '100 товаров с наибольшей выручкой'}
              </p>
              <Switch
                height={16}
                width={32}
                handleDiameter={14}
                onColor='#17594A'
                offColor='#c3c1c9'
                onChange={(e) => {
                  if (state.user?.tariff === 'free') {
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
              <p className='text-xs font-semibold'>
                {i18n.language === 'uz'
                  ? "Eng so'nggi sotuvga qo'shilgan 100 ta"
                  : 'Последние 100 товаров, добавленных в продажу'}
              </p>
              <Switch
                height={16}
                width={32}
                handleDiameter={14}
                onColor='#17594A'
                offColor='#c3c1c9'
                onChange={(e) => {
                  if (state.user?.tariff === 'free') {
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
              <p className='text-[10px] font-semibold'>
                {i18n.language === 'uz'
                  ? '30 kunlik yuqori daromadli 100 ta'
                  : '100 товаров с максимальной выручкой за 30 дней'}
              </p>
              <Switch
                height={16}
                width={32}
                handleDiameter={14}
                onColor='#17594A'
                offColor='#c3c1c9'
                onChange={(e) => {
                  if (state.user?.tariff === 'free') {
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

export default CategoryProductsTable;
