import { AxiosResponse } from 'axios';
import * as FileSaver from 'file-saver';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaFileExcel } from 'react-icons/fa';
import XLSX from 'sheetjs-style';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getCategoryProductTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { ProductAnalyticsViewType } from '@/components/pages/category/slug/components/CategoryProductsTable';
import RangeChartProducts from '@/components/pages/products/slug/components/RangeChartProducts';
import Button from '@/components/shared/buttons/Button';
import PaginatedTable from '@/components/shared/PaginatedTable';

import { useContextState } from '@/context/Context';

function ProductsComponent() {
  const { t, i18n } = useTranslation('products');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState(false);
  const [loadingSegmentation, setLoadingSegmentation] = React.useState(false);
  const { state } = useContextState();
  const [products, setProducts] = React.useState<
    {
      from: number;
      to: number;
      total_orders: number;
      total_shops: number;
      total_products: number;
      total_revenue: number;
      total_reviews: number;
    }[]
  >([]);

  React.useEffect(() => {
    const api = new API(null);
    setLoadingSegmentation(true);
    api
      .get<unknown, AxiosResponse<any>>('/product/segments/?segments_count=20')
      .then((res) => {
        // setTopProducts(res.data.products);
        const data = res.data;
        setProducts(data.data);

        setLoadingSegmentation(false);
      })
      .catch((err) => {
        logger(err, 'Error in products segmentation');
        setLoadingSegmentation(false);
      });
  }, []);

  const loadData = (
    page: number,
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
    let url = `/product/` + `?page=${page}`;
    if (sortModel) {
      url += `&column=${sortModel.colId}&order=${sortModel.sort}`;
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
    api
      .get<unknown, AxiosResponse<Blob>>('/product/toexcel/')
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

  function downloadExcel(data: any) {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    // Filter data to include only the required columns
    const filteredData = data.map((item: any) => ({
      title_ru: item.product_title_ru,
      title: item.product_title,
      category_title_ru: item.category_title_ru ?? item.category_title,
      shop_title: item.shop_title,
      revenue: Math.round((item.orders_money * 1000) / 1000) * 1000,
      orders: item.orders_amount,
      position_in_category: item.position_in_category,
      available_in_stock: item.product_available_amount,
      rating: item.rating,
      reviews_amount: item.reviews_amount,
      average_purchase_price: Math.round(item.avg_purchase_price / 1000) * 1000,
    }));

    // Convert the filtered data to a sheet
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Define custom column headers in Russian
    const customHeaders = {
      A1: 'Название товара',
      B1: 'Mahsulot nomi',
      C1: 'Название категории',
      D1: 'Название магазина',
      E1: 'Выручка',
      F1: 'Заказы',
      G1: 'Позиция в категории',
      H1: 'Количество в наличии',
      I1: 'Рейтинг',
      J1: 'Отзывы',
      K1: 'Средняя цена покупки',
    };

    // Map custom headers to the sheet
    for (const key in customHeaders) {
      const key_: keyof typeof customHeaders = key as any;
      ws[key_] = { v: customHeaders[key_] };
    }

    // Create the workbook and save it
    const wb = { Sheets: { shops: ws }, SheetNames: ['shops'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data2 = new Blob([excelBuffer], { type: fileType });
    const currentDate = new Date().toISOString().slice(0, 10);
    FileSaver.saveAs(data2, 'продукты_' + currentDate + fileExtension);
  }

  return (
    <div className='min-h-full w-full min-w-[1300px] overflow-scroll'>
      <Container
        loading={loadingSegmentation}
        title={t('product_info')}
        explanation={t('product_info')}
        className={clsxm(
          'mb-5 h-[530px] w-full shrink-0 overflow-scroll rounded-md bg-white px-5 py-3'
        )}
        titleContainerStyle={{
          marginBottom: '10px',
        }}
      >
        <RangeChartProducts
          data={products ?? []}
          style={{
            height: '440px',
            width: '100%',
          }}
        />
      </Container>
      <Container
        loading={loading}
        className='h-full w-full border-none shadow-none'
      >
        <p className='text-primary w-full p-4 text-center text-lg'>
          {i18n.language === 'uz' ? 'Barcha mahsulotlar' : 'Все продукты'}
        </p>
        <div className=''>
          <Button
            className='mb-3 flex items-center rounded bg-green-500 px-4 py-2 text-white transition duration-200 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'
            onClick={exportToExcel}
            isLoading={loading}
            spinnerColor='rgb(126 34 206)'
            disabled={
              state.user?.tariff === 'free' || state.user?.tariff === 'trial'
                ? true
                : false
            }
          >
            <FaFileExcel className='mr-2' />
            <p>Скачать в Excel</p>
          </Button>
        </div>
        <PaginatedTable
          fetchData={loadData}
          setLoading={setLoading}
          columnDefs={
            getCategoryProductTableColumnDefs(t2, i18n.language) as any
          }
          className='h-[1016px] w-full'
        />
      </Container>
    </div>
  );
}

export default ProductsComponent;
