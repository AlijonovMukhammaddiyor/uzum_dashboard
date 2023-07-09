import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { CategoryShopsTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PieChart from '@/components/shared/PieChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  categoryId: string;
}

interface CategoryShopsType {
  shop_title: string;
  shop_link: string;
  total_orders: number;
  total_products: number;
  total_reviews: number;
  avg_purchase_price: number;
  average_product_rating: number;
  position: number;
}

function CategoryShops({ className, categoryId }: Props) {
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
          (a, b) => b.total_orders - a.total_orders
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
  }, []);

  return (
    <div
      className={clsxm(
        'flex min-w-[1200px] flex-col gap-6 overflow-x-scroll',
        className
      )}
    >
      {/* <SubCategoriesPieChart /> */}
      {/* <DropDown
        values={['7 Kun', '14 Kun', '30 Kun', '60 Kun', '90 Kun']}
        activeTab={0}
        setActiveTab={() => {
          //sdc
        }}
        className='-mb-3'
      /> */}
      <Container
        loading={loading}
        className={clsxm(
          'flex h-[600px] w-full min-w-[1200px] flex-col items-start justify-start overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <div className='flex w-full items-center justify-between'>
          <h3 className='text-primary text-base'>
            Kategoriyadagi Sotuvchilarning ulushlari
          </h3>
          <div className='flex items-center justify-start gap-6'>
            <p className='font-bold'>Jami Sotuvchilar Soni:</p>
            <p className='text-primary font-semibold'>{data.length}</p>
          </div>
        </div>
        <PieChart data={preparePieChartData(data)} />
      </Container>
      <Container loading={loading} className={clsxm('w-full overflow-scroll')}>
        <Table
          className='max-h-[800px] min-h-max'
          columnDefs={CategoryShopsTableColumnDefs}
          rowData={data}
        />
      </Container>
    </div>
  );
}

export default CategoryShops;

function preparePieChartData(data: CategoryShopsType[]) {
  const total_orders = data.reduce((acc, item) => {
    return acc + item.total_orders;
  }, 0);

  let current_orders = 0;
  const pieChartData = data.slice(0, 10).map((item) => {
    current_orders += item.total_orders;
    return {
      type: item.shop_title + ' ( ID: ' + item.shop_link + ')',
      value: item.total_orders,
    };
  });

  if (total_orders > current_orders) {
    pieChartData.push({
      type: 'Boshqa sotuvchilar',
      value: total_orders - current_orders,
    });
  }

  return pieChartData;
}
