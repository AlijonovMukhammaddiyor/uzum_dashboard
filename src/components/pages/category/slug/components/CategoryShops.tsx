import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getCategoryShopsTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PieChart from '@/components/shared/PieChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  categoryId: string;
  activeTab: string;
}

interface CategoryShopsType {
  title: string;
  total_orders: number;
  total_products: number;
  total_reviews: number;
  total_revenue: number;
  avg_purchase_price: number;
  average_product_rating: number;
  position: number;
}

function CategoryShops({ className, categoryId, activeTab }: Props) {
  const { t } = useTranslation('categories');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);

  const [data, setData] = React.useState<CategoryShopsType[]>([]);

  useEffect(() => {
    const api = new API(null);
    setLoading(true);

    api
      .get<
        unknown,
        AxiosResponse<{
          data: CategoryShopsType[];
        }>
      >(`/category/analytics/shops/` + categoryId + '/')
      .then((res) => {
        const data = res.data.data.sort(
          (a, b) => b.total_revenue - a.total_revenue
        );
        // give position according to total orders
        data.forEach((item, index) => {
          item.position = index + 1;
        });
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in category shops');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  if (activeTab !== 'Sotuvchilar' && activeTab !== 'Продавцы') return <></>;

  return (
    <div
      className={clsxm(
        'flex min-w-[1200px] flex-col gap-6 overflow-x-scroll',
        className
      )}
    >
      <Container
        loading={loading}
        className={clsxm(
          'flex h-[600px] w-full min-w-[1200px] flex-col items-start justify-start overflow-scroll rounded-md border bg-white p-6 shadow-lg'
        )}
      >
        <div className='flex w-full items-center justify-between'>
          <h3 className='text-primary text-base'>{t('top_10_sellers')}</h3>
          <div className='flex items-center justify-start gap-6'>
            <p className='font-bold'>{t('total_sellers')}:</p>
            <p className='text-primary font-semibold'>{data.length}</p>
          </div>
        </div>
        <PieChart data={preparePieChartData(data)} isRevenue />
      </Container>
      <Container
        loading={loading}
        className={clsxm('w-full overflow-scroll border-none')}
      >
        <Table
          className='max-h-[800px] min-h-max'
          columnDefs={getCategoryShopsTableColumnDefs(t2) as any}
          rowData={data}
        />
      </Container>
    </div>
  );
}

export default CategoryShops;

function preparePieChartData(data: CategoryShopsType[]) {
  const total_revenue = data.reduce((acc, item) => {
    return acc + item.total_revenue;
  }, 0);

  let current_revenue = 0;
  const pieChartData = data.slice(0, 10).map((item) => {
    current_revenue += item.total_revenue;
    return {
      type: item.title.split('((')[0],
      value: Math.round(item.total_revenue * 1000),
    };
  });

  if (total_revenue > current_revenue) {
    pieChartData.push({
      type: 'Boshqa sotuvchilar',
      value: Math.round((total_revenue - current_revenue) * 1000),
    });
  }

  return pieChartData;
}
