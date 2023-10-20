import { AxiosResponse } from 'axios';
import * as FileSaver from 'file-saver';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FaFileExcel } from 'react-icons/fa';
import XLSX from 'sheetjs-style';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getCategoryProductTableForProductsColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { RenderAlert } from '@/components/shared/AlertComponent';
import Button from '@/components/shared/buttons/Button';
import Table from '@/components/shared/Table';

import { useContextState } from '@/context/Context';

export interface HomeStatisticsContainerProps {
  className?: string;
}

interface ProductsReponseType {
  average_purchase_price: number;
  position_in_category: number;
  position: number;
  orders_amount: number;
  rating: number;
  reviews_amount: number;
  available_amount: number;
  date_pretty: string;
  product__category__categoryId: number;
  product__category__title: string;
  product__shop__link: number;
  product__shop__title: string;
  product__title: string;
  product__photos: string;
  product__created_at: string;
  product__product_id: number;
}

function WeeklyBestProducts({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation('tableColumns');
  const [data, setData] = React.useState<ProductsReponseType[]>([]);
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);
  const { state } = useContextState();
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
    const url = `/product/` + `?weekly=${true}&offset=0&limit=100`;
    api
      .get<
        unknown,
        AxiosResponse<{
          results: ProductsReponseType[];
          count: number;
        }>
      >(url)
      .then((res) => {
        setLoading(false);
        setData(res.data.results);
      })
      .catch((err) => {
        setLoading(false);
        logger(err, 'error in weekly best products');
      });
  }, []);

  function downloadExcel(data_: any) {
    // return false;
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const data = data_.slice(0, 10000);
    // Filter data to include only the required columns
    const filteredData = data.map((item: any) => {
      return {
        product_id: item.product_id,
        product_title: item.product_title.split('((')[0],
        product_title_ru: item.product_title_ru.split('((')[0],
        category_title: item.category_title.split('((')[0],
        category_title_ru: item.category_title_ru.split('((')[0],
        shop_title: item.shop_title.split('((')[0],
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

  return (
    <div
      className={clsxm('flex h-full w-full flex-col gap-5 pb-10', className)}
      style={{
        zoom: zoomLevel,
      }}
    >
      <Container
        className={clsxm(
          'relative h-max min-h-[550px] w-full items-start justify-start overflow-x-scroll rounded-md border-none',
          className
        )}
        loading={loading}
      >
        <div className='absolute right-3 top-0'>
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
              downloadExcel(data);
            }}
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
        <p className='w-full py-4 text-center text-base font-semibold'>
          {i18n.language === 'uz'
            ? "Quyidagi jadvalda oxirgi 7 kun ichida eng ko'p tushum keltirgan 100 ta mahsulotlar ro'yhati keltirilgan"
            : 'В таблице ниже представлен список 100 продуктов, которые за последние 7 дней принесли наибольший доход'}
        </p>
        <Table
          columnDefs={getCategoryProductTableForProductsColumnDefs(
            t,
            i18n.language
          )}
          className='h-[1520px] min-w-full'
          setLoading={setLoading}
          headerHeight={60}
          rowData={data ?? []}
          isBalham={true}
          rowHeight={80}
        />
      </Container>
    </div>
  );
}

export default WeeklyBestProducts;
