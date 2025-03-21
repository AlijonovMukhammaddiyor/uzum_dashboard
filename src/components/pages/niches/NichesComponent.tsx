import { AxiosResponse } from 'axios';
import * as FileSaver from 'file-saver';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { FaFileExcel } from 'react-icons/fa';
import XLSX from 'sheetjs-style';

import API from '@/lib/api';
import logger from '@/lib/logger';

import { getNichesColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import Button from '@/components/shared/buttons/Button';
import Table from '@/components/shared/Table';

import { useContextState } from '@/context/Context';

interface CategoryNichesType {
  category__ancestors: string;
  caegory__ancestors_ru: string;
  average_product_rating: number;
  category_id: number;
  category__title: string;
  category__title_ru: string;
  date_pretty: string;
  total_orders: number;
  total_orders_amount: number;
  total_products: number;
  total_products_with_sales: number;
  total_reviews: number;
  total_shops: number;
  total_shops_with_sales: number;
  percentage_of_shops_with_sales: number;
  percentage_of_products_with_sales: number;
}

function NichesComponent() {
  const { t, i18n } = useTranslation('categories');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);
  const { state } = useContextState();
  const [data, setData] = React.useState<CategoryNichesType[]>([]);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);

    api
      .get<
        unknown,
        AxiosResponse<{
          data: CategoryNichesType[];
        }>
      >(`/category/niches/`)
      .then((res) => {
        // logger(res.data.data, 'category niches');
        const d = res.data.data;

        for (let i = 0; i < d.length; i++) {
          d[i].percentage_of_products_with_sales = Math.round(
            (d[i].total_products_with_sales / d[i].total_products) * 100
          );
          d[i].percentage_of_shops_with_sales = Math.round(
            (d[i]?.total_shops_with_sales / d[i]?.total_shops) * 100
          );
        }

        setData(d);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in category niches');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function downloadExcel() {
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    // Filter data to include only the required columns
    const filteredData = data.map((item: any) => ({
      category__title_ru:
        item.category__title_ru?.split('((')[0] ??
        item.category__title?.split('((')[0],
      total_orders_amount:
        Math.round((item.total_orders_amount * 1000) / 1000) * 1000,
      total_orders: item.total_orders,
      total_products: item.total_products,
      total_reviews: item.total_reviews,
      average_purchase_price: item.average_purchase_price,
      total_shops: item.total_shops,
      average_product_rating: item.average_product_rating,
      percentage_of_shops_with_sales: item.percentage_of_shops_with_sales,
      percentage_of_products_with_sales: item.percentage_of_products_with_sales,
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
      I1: 'Процент магазинов с продажами',
      J1: 'Процент товаров с продажами',
    };

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
      { wch: 35 }, // B: Выручка
      { wch: 35 }, // C: Заказы
      { wch: 35 }, // D: Товары
      { wch: 35 }, // E: Отзывы
      { wch: 35 }, // F: Средняя цена покупки
      { wch: 35 }, // G: Магазины
      { wch: 35 }, // H: Рейтинг товара
      { wch: 35 }, //
      { wch: 35 }, //
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
      'D',
      data.map((item: any) => item.total_products),
      orangeGradient
    );
    applyGradient(
      'G',
      data.map((item: any) => item.total_shops),
      greenGradient
    );

    // Set row heights (e.g., 40 pixels for headers and 30 for data rows)
    ws['!rows'] = [{ hpx: 40 }, ...Array(data.length).fill({ hpx: 30 })];

    // Create the workbook and save it
    const wb = { Sheets: { shops: ws }, SheetNames: ['shops'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data2 = new Blob([excelBuffer], { type: fileType });
    const currentDate = new Date().toISOString().slice(0, 10);
    FileSaver.saveAs(data2, 'Ниши_' + currentDate + fileExtension);
  }

  return (
    <div className='min-h-full w-full overflow-scroll pb-16'>
      <Button
        className='mb-3 flex items-center rounded bg-green-500 px-4 py-2 text-white transition duration-200 ease-in-out hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50'
        onClick={downloadExcel}
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
      <Container
        loading={loading}
        className='h-screen w-full border-none shadow-none'
      >
        <div className='rounded-lg bg-gray-100 p-6 shadow-md'>
          <p className='text-primary mb-4 text-center text-xl font-semibold'>
            {i18n.language === 'uz'
              ? "O'z nishingizni kashf eting"
              : 'Откройте для себя свою нишу'}
          </p>
          <p className='mb-4 text-gray-700'>
            {i18n.language === 'uz'
              ? "Nish - bu ma'lum turdagi mahsulot yoki xizmat uchun ixtisoslashgan bozor segmenti. Ushbu bo'limda siz barcha mavjud nishalarni topasiz, ularning har biri bizning keng toifadagi tuzilmamizdan kelib chiqqan."
              : 'Ниша представляет собой специализированный сегмент рынка для определенного вида продукта или услуги. В этом разделе вы найдете все доступные ниши, каждая из которых произошла из нашей обширной структуры категорий.'}
          </p>
          <p className='mb-2 ml-2 font-medium text-gray-800'>
            {i18n.language === 'uz'
              ? "To'g'ri nishni tanlash uchun:"
              : 'Чтобы выбрать правильную нишу:'}
          </p>

          <ul className='pl-6 text-gray-600'>
            <li className='mb-2 transition-all duration-200 hover:text-gray-800'>
              {i18n.language === 'uz'
                ? "1. Mavjud variantlarni ko'rib chiqing."
                : '1. Исследуйте доступные варианты.'}
            </li>
            <li className='mb-2 transition-all duration-200 hover:text-gray-800'>
              {i18n.language === 'uz'
                ? '2. Bozor talabi, raqobat va bu sohadagi ishtiyoqingiz yoki tajribangizni hisobga oling.'
                : '2. Учитывайте рыночный спрос, конкуренцию и вашу страсть или компетенцию в этой области.'}
            </li>
            <li className='mb-2 transition-all duration-200 hover:text-gray-800'>
              {i18n.language === 'uz'
                ? '3. Potentsial baholash uchun taqdim etilgan nishalarni saralang va tahlil qiling.'
                : '3. Сортируйте и анализируйте предоставленную аналитику, чтобы оценить потенциал.'}
            </li>
            <li className='transition-all duration-200 hover:text-gray-800'>
              {i18n.language === 'uz'
                ? "4. Esingizda bo'lsin, ideal nish bozor imkoniyatlarini kuchli tomonlaringiz bilan birlashtiradi."
                : '4. Помните, идеальная ниша сочетает в себе рыночные возможности и ваши сильные стороны.'}
            </li>
          </ul>
          <div className='mt-3'>
            {i18n.language === 'uz'
              ? "Faol mahsulotlar va faol do'konlar foizlari soni eng so'ngi trendlarga asosan hisoblangan. Yani bu ko'rsatkichlarni ohirgi bir necha kunga asoslangan holda taqriban chiqarilgan (oxirgi oyga asoslangan emas)."
              : 'Проценты активных продуктов и активных магазинов рассчитываются на основе последних тенденций, то есть эти показатели рассчитываются за последние несколько дней (а не за последний месяц).'}
          </div>
          <div className=''>
            {i18n.language === 'uz'
              ? "Agar siz anniq kunlik active mahsulotlar yoki do'konlarning foizlarini ohirgi oylar mobaynida ko'rmoqchi bo'lsangiz, qiziqtirgan kategoriyaning Trend bo'lidan ko'rishingiz mumkin."
              : 'Если вы хотите увидеть точные проценты ежедневных активных продуктов или магазинов за последние месяцы, вы можете щелкнуть раздел «Тенденции» интересующей вас категории.'}
          </div>
        </div>

        <Table
          isBalham={true}
          rowHeight={70}
          headerHeight={60}
          columnDefs={getNichesColDefs(t2, i18n.language) as any}
          className='h-screen min-w-full'
          rowData={data}
        />
      </Container>
    </div>
  );
}

export default NichesComponent;
