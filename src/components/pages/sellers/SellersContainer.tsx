import { AxiosResponse } from 'axios';
import * as FileSaver from 'file-saver';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import XLSX from 'sheetjs-style';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getShopTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Button from '@/components/shared/buttons/Button';
import InfiniteTable from '@/components/shared/InfiniteTable';
import Table from '@/components/shared/Table';

import { UserType } from '@/types/user';

export interface Props {
  className?: string;
  user: UserType;
}

interface SellerType {
  average_order_price: number;
  average_purchase_price: number;
  date_pretty: string;
  id: string;
  num_categories: number;
  rating: number;
  link: string;
  total_revenue: number;
  title: string;
  monthly_orders: number;
  monthly_revenue: number;
  monthly_transactions: number;
  quarterly_revenue: number;
  quarterly_orders: number;
  total_products: number;
  total_reviews: number;
}

interface TopsType {
  seller_id: string;
  title: string;
  diff_orders: number;
  diff_reviews: number;
  diff_revenue: number;
  total_products: number;
}

function SellersTable({ className, user }: Props) {
  const { t, i18n } = useTranslation('sellers');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingTops, setLoadingTops] = React.useState<boolean>(false);
  const [tops, setTops] = React.useState<TopsType[]>([]);
  const path = window.location.pathname;
  const [myShops, setMyShops] = React.useState<SellerType[]>([]);
  const [shopsLoading, setShopsLoading] = React.useState<boolean>(false);

  const [zoomLevel, setZoomLevel] = React.useState(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.87); // 90% zoom for windows less than 600px wide
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
    // setLoadingTops(true);
    // api
    //   .get<unknown, AxiosResponse<TopsType[]>>('/shop/yesterday-tops/')
    //   .then((res) => {
    //     setTops(res.data);
    //     setLoadingTops(false);
    //   })
    //   .catch((err) => {
    //     // console.log(err);
    //     logger(err, 'Error in top 20 shops');
    //     setLoadingTops(false);
    //   });
    setShopsLoading(true);
    api
      .get<unknown, AxiosResponse<{ data: SellerType[] }>>('/shop/mine/')
      .then((res) => {
        setMyShops(res.data.data ?? []);
        setShopsLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in my shops');
        setShopsLoading(false);
      });
  }, []);

  const exportToExcel = () => {
    const api = new API(null);

    if (user.tariff === 'free' || user.tariff === 'trial') {
      setLoading(false);
      alert(
        i18n?.language === 'uz'
          ? "Bu funktsiyadan foydalanish uchun boshqa tarifga o'ting"
          : 'Для использования этой функции перейдите на другой тариф'
      );
      return;
    }
    setLoading(true);
    api
      .get<unknown, AxiosResponse<Blob>>('/shop/toexcel/')
      .then((res) => {
        // download res.data as excel file
        downloadExcel(res.data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in export to excel');
        setLoading(false);
      });
  };

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
    let url = `/shop` + `?offset=${startRow}&limit=${endRow - startRow}`;
    if (sortModel) {
      url += `&column=${sortModel.colId}&order=${sortModel.sort}`;
    }
    if (filterModel) {
      const columns = Object.keys(filterModel);
      const filters = Object.values(filterModel);

      url += `&searches=${columns.join(',')}&filters=${filters
        .map((filter) => filter.filter)
        .join('#####')}`;
    }

    return api.get<
      unknown,
      AxiosResponse<{
        results: SellerType[];
        count: number;
        next?: string;
        previous?: string;
      }>
    >(url);
  };

  return (
    <div
      className={clsxm(
        'flex min-h-full w-full min-w-[1200px] shrink-0 flex-col items-start justify-start gap-5 pb-12',
        className
      )}
      style={{
        zoom: zoomLevel,
      }}
    >
      {user.tariff !== 'free' && user.tariff !== 'business' ? (
        myShops.length > 0 ? (
          <Container
            loading={shopsLoading}
            className={clsxm('w-full overflow-scroll border-none pt-4')}
          >
            <p className='text-primary h-10 w-full text-center'>
              {t('myShops')}
            </p>
            {user.tariff !== 'trial' ? (
              <Table
                columnDefs={getShopTableColumnDefs(t2, i18n.language)}
                className={clsxm(
                  'min-w-full rounded-none',
                  user.tariff === 'base' && 'h-[155px]',
                  user.tariff === 'seller' && 'h-[320px]'
                )}
                rowData={myShops ?? []}
              />
            ) : (
              <></>
            )}
          </Container>
        ) : (
          <></>
        )
      ) : (
        <p className='bg-primary text-centera hidden rounded-lg text-white'>
          {/* {t('selectShops')} */}
        </p>
      )}
      {/* <Container
        loading={loadingTops}
        title={t('shops_with_top_revenue')}
        explanation={t('no_info')}
        className={clsxm(
          'h-[520px] w-full shrink-0 overflow-scroll rounded-md bg-white px-5 py-3'
        )}
      >
        <RangeChartShops
          data={tops.map((item) => ({
            title: item.title,
            total_orders: item.diff_orders,
            total_revenue: item.diff_revenue,
          }))}
          style={{
            width: '100%',
            height: 'calc(100% - 60px)',
            maxHeight: 'calc(100% - 60px)',
          }}
        />
      </Container> */}

      <Container
        loading={loading}
        className={clsxm('w-full overflow-scroll border-none')}
      >
        {/* <p className='text-primary h-10 w-full text-center font-semibold'>
          {t('allShops')}
        </p> */}
        <div className='flex w-full items-center justify-start'>
          <Button
            className='mb-3 mt-6 flex items-center justify-start rounded-md bg-green-500 px-3 text-white hover:bg-green-700'
            onClick={() => {
              if (user.tariff === 'free' || user.tariff === 'trial') {
                alert(
                  i18n?.language === 'uz'
                    ? "Bu funktsiyadan foydalanish uchun boshqa tarifga o'ting"
                    : 'Для использования этой функции перейдите на другой тариф'
                );
                return;
              }
              exportToExcel();
            }}
            isLoading={loading}
            spinnerColor='rgb(126 34 206)'
            // disabled={
            //   user.tariff === 'free' || user.tariff === 'trial' ? true : false
            // }
          >
            <PiMicrosoftExcelLogoFill className='mr-2' />
            <>
              {i18n?.language === 'uz'
                ? 'Excelga yuklab olish'
                : 'Скачать в Excel'}
            </>
          </Button>
        </div>
        <InfiniteTable
          columnDefs={getShopTableColumnDefs(t2, i18n.language)}
          className='h-[1783px] min-w-full'
          headerHeight={60}
          rowHeight={80}
          fetchData={loadData}
          setLoading={setLoading}
        />
      </Container>
    </div>
  );
}

export default SellersTable;

export function downloadExcel(data: any) {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  // Filter data to include only the required columns
  const filteredData = data.map((item: any) => ({
    shop_title: item.title.split('((')[0],
    monthly_transactions: item.monthly_transactions,
    monthly_orders: item.monthly_orders,
    quarterly_orders: item.quarterly_orders,
    total_products: item.total_products,
    monthly_revenue: item.monthly_revenue,
    quarterly_revenue: item.quarterly_revenue,
    total_reviews: item.total_reviews,
    rating: item.rating,
  }));

  // Convert the filtered data to a sheet
  const ws = XLSX.utils.json_to_sheet(filteredData);

  // Define custom column headers in Russian
  const customHeaders = {
    A1: 'Название магазина',
    B1: 'Ежемесячные транзакции',
    C1: 'Продажи (30 дней)',
    D1: 'Продажи (90 дней)',
    I1: 'Кол-во товаров',
    E1: 'Выручка (30 дней)',
    F1: 'Выручка (90 дней)',
    H1: 'Кол-во Отзывы',
    G1: 'Рейтинг',
  };

  // Map custom headers to the sheet
  for (const key in customHeaders) {
    const key_: keyof typeof customHeaders = key as keyof typeof customHeaders;
    ws[key].v = customHeaders[key_];
    ws[key].s = {
      fill: { patternType: 'solid', fgColor: { rgb: '000000' } }, // Black background color for headers
      font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 14 }, // White text with larger font size
      alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
    };
  }

  ws['!cols'] = [
    { wch: 25 },
    { wch: 50 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
  ];

  const greenGradient = (value: number, min: number, max: number) => {
    const gradient = Math.round(100 + 155 * ((max - value) / (max - min))); // Darker shades for higher values
    return `00${gradient.toString(16).padStart(2, '0')}00`;
  };

  const orangeGradient = (value: number, min: number, max: number) => {
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
    'C',
    data.map((item: any) => item.monthly_orders),
    greenGradient
  );
  applyGradient(
    'I',
    data.map((item: any) => item.total_products),
    orangeGradient
  );
  applyGradient(
    'E',
    data.map((item: any) => item.monthly_revenue),
    greenGradient
  );

  // Set row heights
  ws['!rows'] = Array(data.length + 1).fill({ hpx: 30 }); // 30 pixels height for each row, adjust as needed

  // Create the workbook and save it
  const wb = { Sheets: { shops: ws }, SheetNames: ['shops'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data2 = new Blob([excelBuffer], { type: fileType });
  const currentDate = new Date().toISOString().slice(0, 10);
  FileSaver.saveAs(data2, 'Магазины_' + currentDate + fileExtension);
}
