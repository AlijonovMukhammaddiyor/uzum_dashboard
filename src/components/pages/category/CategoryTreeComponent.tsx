import { AxiosResponse } from 'axios';
import * as FileSaver from 'file-saver';
import { NextRouter, useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FaFileExcel } from 'react-icons/fa';
import { HiChevronRight, HiMinusSm, HiPlusSm } from 'react-icons/hi';
import XLSX from 'sheetjs-style';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import Container from '@/components/layout/Container';
import { goToCategory } from '@/components/pages/category/utils';
import { RenderAlert } from '@/components/shared/AlertComponent';
import Button from '@/components/shared/buttons/Button';

import { useContextState } from '@/context/Context';

import { CategoryInTree } from '@/types/category';
import { UserType } from '@/types/user';

function CategoryTreeComponent() {
  const [data, setData] = React.useState<CategoryInTree[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const { dispatch, state } = useContextState();
  const { i18n } = useTranslation('tableColumns');
  const [activeTab, setActiveTab] = React.useState<string>(
    i18n.language === 'uz' ? 'Elektronika' : 'Электроника'
  );

  const router = useRouter();

  React.useEffect(() => {
    // fetch categories
    const api = new API(null);
    setLoading(true);
    api
      .get('/category')
      .then((res) => {
        if (res.data) {
          setData(res.data.children);
          setLoading(false);
        }
      })
      .catch((err) => {
        logger(err, 'Error in fetching categories');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      .get<unknown, AxiosResponse<Blob>>('/category/toexcel/')
      .then((res) => {
        // download res.data as excel file
        logger(res, 'Response from export to excel');
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
      category__title_ru: item.category__title ?? item.category__title,
      total_orders_amount:
        Math.round((item.total_orders_amount * 1000) / 1000) * 1000,
      total_orders: item.total_orders,
      total_products: item.total_products,
      total_reviews: item.total_reviews,
      average_purchase_price: item.average_purchase_price,
      total_shops: item.total_shops,
      average_product_rating: item.average_product_rating,
    }));

    // Convert the filtered data to a sheet
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Define custom column headers in Russian
    const customHeaders = {
      A1: 'Категория',
      B1: 'Выручка',
      C1: 'Заказы',
      D1: 'Товары',
      E1: 'Отзывы',
      F1: 'Средняя цена покупки',
      G1: 'Магазины',
      H1: 'Рейтинг товара',
    };

    // Map custom headers to the sheet
    for (const key in customHeaders) {
      const key_: keyof typeof customHeaders = key as any;
      ws[key_].v = customHeaders[key_];
      ws[key_].s = {
        fill: { patternType: 'solid', fgColor: { rgb: '000000' } }, // Black background color for headers
        font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 14 }, // White text with larger font size
        alignment: { horizontal: 'center', vertical: 'center', wrapText: true },
      };
    }

    // Set column widths
    ws['!cols'] = [
      { wch: 50 }, // A: Категория
      { wch: 25 }, // B: Выручка
      { wch: 25 }, // C: Заказы
      { wch: 25 }, // D: Товары
      { wch: 25 }, // E: Отзывы
      { wch: 25 }, // F: Средняя цена покупки
      { wch: 25 }, // G: Магазины
      { wch: 25 }, // H: Рейтинг товара
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
      'B',
      data.map((item: any) => item.total_orders_amount),
      greenGradient
    );
    applyGradient(
      'C',
      data.map((item: any) => item.total_orders),
      orangeGradient
    );
    applyGradient(
      'D',
      data.map((item: any) => item.total_products),
      greenGradient
    );
    applyGradient(
      'G',
      data.map((item: any) => item.total_shops),
      orangeGradient
    );

    // Set row heights (e.g., 40 pixels for headers and 30 for data rows)
    ws['!rows'] = [{ hpx: 40 }, ...Array(data.length).fill({ hpx: 30 })];

    // Create the workbook and save it
    const wb = { Sheets: { shops: ws }, SheetNames: ['shops'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data2 = new Blob([excelBuffer], { type: fileType });
    const currentDate = new Date().toISOString().slice(0, 10);
    FileSaver.saveAs(data2, 'Категории_' + currentDate + fileExtension);
  }

  const parents = data
    ?.map((category) =>
      i18n.language === 'uz' ? category.title : category.title_ru
    )
    .sort();

  return (
    <div className='mt-3 min-h-full w-full pb-16'>
      <div className='mb-3 flex items-center justify-start gap-6'>
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
          <p>Скачать в Excel</p>
        </Button>
      </div>

      <Container
        loading={loading}
        className='flex h-[calc(100vh-89px)] max-h-full items-start justify-start gap-4 overflow-hidden rounded-md bg-white'
      >
        <div className='relative flex h-full w-[300px] flex-col items-start justify-start gap-1 overflow-y-scroll border-b border-gray-300 bg-slate-50 p-6'>
          {parents?.map((parent, index) => (
            <ParentCategory
              name={parent}
              key={index}
              isActive={parent === activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </div>
        <div className='flex h-full flex-1 flex-col gap-6 overflow-y-scroll p-6'>
          {data?.map((category) => {
            if (i18n.language === 'uz' && category.title === activeTab) {
              return (
                <div key={category.categoryId} className='flex flex-col gap-3'>
                  <RenderChildren
                    category={category}
                    className=''
                    goToCategory={goToCategory}
                    router={router}
                    dispatch={dispatch}
                    depth={0}
                    parentPath={{
                      Kategoriyalar: '/category',
                    }}
                  />
                </div>
              );
            }
            if (i18n.language !== 'uz' && category.title_ru === activeTab) {
              return (
                <div key={category.categoryId} className='flex flex-col gap-3'>
                  <RenderChildren
                    category={category}
                    className=''
                    goToCategory={goToCategory}
                    router={router}
                    dispatch={dispatch}
                    depth={0}
                    parentPath={{
                      Kategoriyalar: '/category',
                    }}
                  />
                </div>
              );
            }
          })}
        </div>
      </Container>
    </div>
  );
}

function RenderChildren({
  category,
  className,
  goToCategory,
  router,
  dispatch,
  depth = 0,
  parentPath = {},
}: {
  category: CategoryInTree;
  className: string;
  goToCategory: (
    id: number,
    title: string,
    router: NextRouter,
    user: UserType
  ) => void;
  router: NextRouter;
  dispatch: React.Dispatch<any>;
  depth?: number;
  parentPath: Record<string, string>;
}) {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(depth === 0);
  const hasChildren = category.children && category.children.length > 0;
  const { state } = useContextState();
  const { t, i18n } = useTranslation('tableColumns');

  const categoryPath = {
    ...parentPath,
    [i18n.language === 'uz' ? category.title : category.title_ru]: `/category/${
      i18n.language === 'uz' ? `uz/${category.title}` : category.title_ru
    }--${category.categoryId}`,
  };

  return (
    <div
      className={clsxm(
        'my-2 flex flex-col items-start justify-start gap-1',
        className
      )}
      key={category.categoryId}
    >
      <div
        className='flex items-center gap-2'
        style={{ paddingLeft: `${depth * 20}px` }} // Indent children
      >
        {hasChildren && (
          <div
            className={clsxm(
              'bg-primary flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-white hover:bg-purple-600',
              isExpanded && 'bg-purple-500'
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <HiMinusSm className='cursor-pointer' />
            ) : (
              <HiPlusSm className='cursor-pointer' />
            )}
          </div>
        )}
        <p
          className={clsxm(
            'hover:text-primary group flex cursor-pointer items-center justify-start gap-2 rounded-md p-1 text-sm font-medium',
            hasChildren && 'font-semibold',
            depth === 0 && 'text-lg',
            !hasChildren && 'ml-9'
          )}
          onClick={() => {
            goToCategory(
              category.categoryId,
              i18n.language === 'uz' ? category.title : category.title_ru,
              router,
              state.user as UserType
            );
            if (state.user?.tariff !== 'free')
              dispatch({
                type: 'PATH',
                payload: { path: categoryPath },
              });
            else {
              alert(
                i18n.language === 'uz'
                  ? "Bu xizmatdan foydalanish uchun iltimos boshqa tarifiga o'ting!"
                  : 'Пожалуйста, перейдите на другой тариф, чтобы воспользоваться этой услугой!'
              );
            }
          }}
        >
          {i18n.language === 'uz' ? category.title : category.title_ru}
          <HiChevronRight
            className={clsxm(
              'group-hover:text-primary',
              depth === 0 && 'text-lg'
            )}
          />
        </p>
      </div>
      {isExpanded &&
        category.children?.map((child) => {
          return (
            <RenderChildren
              key={child.categoryId}
              category={child}
              className=''
              goToCategory={goToCategory}
              router={router}
              dispatch={dispatch}
              depth={depth + 1}
              parentPath={categoryPath}
            />
          );
        })}
    </div>
  );
}

function ParentCategory({
  name,
  isActive,
  setActiveTab,
}: {
  name: string;
  isActive: boolean;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      key={name}
      className={clsxm(
        'min-h-8 flex h-10 w-full shrink-0 cursor-pointer items-center justify-start gap-4 overflow-hidden rounded-md p-3',
        isActive && 'bg-primary text-white',
        !isActive && 'hover:bg-gray-200'
      )}
      onClick={() => setActiveTab(name)}
    >
      <div className='flex w-[250px] flex-col items-start justify-start overflow-hidden'>
        <p className='w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-sm font-semibold'>
          {name}
        </p>
      </div>
    </div>
  );
}

export default CategoryTreeComponent;
