import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';

import { getGrowingProductsColDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PaginatedTable from '@/components/shared/PaginatedTable';

export interface HomeStatisticsContainerProps {
  className?: string;
}

interface GrowingProductType {
  product_id: number;
  title: string;
  category: string;
  shop: string;
  created_at: string;
  photos: string;
  orders: {
    x: string;
    y: number;
  }[];
  rating: number;
  reviews_amount: {
    x: string;
    y: number;
  }[];
  available_amount: {
    x: string;
    y: number;
  }[];
  average_purchase_price: number;
  position_in_category: number;
  position: number;
}

function GrowingProducts({ className }: HomeStatisticsContainerProps) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const { t, i18n } = useTranslation('tableColumns');
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);

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
    let url = `/product/growing` + `?page=${page}`;
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
      AxiosResponse<{ results: GrowingProductType[]; count: number }>
    >(url);
  };

  return (
    <div
      className='flex h-full w-full flex-col gap-5'
      style={{
        zoom: zoomLevel,
      }}
    >
      <Container
        className={clsxm('w-full rounded-md border-none pb-10', className)}
        loading={loading}
      >
        <div className='py-3'>
          <p className='text-center font-semibold'>
            {i18n.language === 'uz'
              ? "Quyidagi jadvalda eng so'ngi istiqbolli o'sayotgan mahsulotlarni ko'rish mumkin"
              : 'В таблице ниже вы можете увидеть последние перспективные продукты.'}
          </p>
          <div className='flex w-full items-center justify-center gap-3'>
            <p className='font-semibold'>
              {i18n.language === 'uz'
                ? 'Bu qanday hisoblanadi?'
                : 'Как это считается?'}
            </p>
            <p className=''>
              {i18n.language === 'uz'
                ? "Biz har kuni barcha mahsulotlar uchun oxirgi 2 oy mobaynidagi statistikalarni qayta ishlaymiz va eng o'sayotgan 500 tagacha mahsulotlarni tanlaymiz."
                : 'Мы анализируем ежедневную статистику за последние 2 месяца по всем товарам и отбираем до 500 наиболее перспективных товаров.'}
            </p>
          </div>
        </div>
        <PaginatedTable
          columnDefs={getGrowingProductsColDefs(t, i18n.language)}
          className='h-[1745px] min-w-full'
          fetchData={loadData}
          setLoading={setLoading}
          rowHeight={80}
        />
      </Container>
    </div>
  );
}

export default GrowingProducts;
