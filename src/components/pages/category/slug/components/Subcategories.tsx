import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { SubcategoriesTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { CategoryAnalyticsDataType } from '@/components/pages/category/slug/components/CategoryTrends';
import PieChart from '@/components/shared/PieChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  categoryId: string;
}

function Subcategories({ className, categoryId }: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);

  const [data, setData] = React.useState<{
    data: CategoryAnalyticsDataType[];
    main: CategoryAnalyticsDataType;
  }>({ data: [], main: {} as CategoryAnalyticsDataType } as {
    data: CategoryAnalyticsDataType[];
    main: CategoryAnalyticsDataType;
  });

  useEffect(() => {
    const api = new API(null);
    setLoading(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          data: CategoryAnalyticsDataType[];
          main: CategoryAnalyticsDataType[];
          total: number;
        }>
      >(`/category/analytics/subcategory/` + categoryId + '?range=40')
      .then((res) => {
        setData({
          data: res.data.data,
          main: res.data.main[0],
        });
        setLoading(false);
      })
      .catch((err) => {
        logger(err, 'error in subcategories');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={clsxm(
        'flex h-full min-w-[1200px] flex-col gap-6 overflow-x-scroll',
        className
      )}
    >
      {loading ? (
        <div
          className={clsxm(
            'h-[600px] w-full min-w-[1200px] overflow-scroll rounded-md'
          )}
        >
          <SubCategoriesPieChartData
            data={data.data}
            main={data.main}
            loading={loading}
          />
        </div>
      ) : data.data.length <= 0 ? (
        <div className='flex h-full items-center justify-center'>
          <h3 className='h-full text-center text-slate-500'>
            Ichki Kategoriyalar mavjud Emas
          </h3>
        </div>
      ) : (
        <div
          className={clsxm(
            'h-[600px] w-full min-w-[1200px] overflow-scroll rounded-md'
          )}
        >
          <SubCategoriesPieChartData
            data={data.data}
            main={data.main}
            loading={loading}
          />
        </div>
      )}
      {(loading || data.data.length > 0) && (
        <Container
          loading={loading}
          className={clsxm('w-full overflow-scroll')}
        >
          <Table
            className=''
            columnDefs={SubcategoriesTableColumnDefs}
            rowData={[...(data.data ?? []), data.main]}
          />
        </Container>
      )}
    </div>
  );
}

export default Subcategories;

const SubCategoriesPieChartData = ({
  data,
  main,
  loading,
}: {
  data: CategoryAnalyticsDataType[];
  main: CategoryAnalyticsDataType;
  loading: boolean;
}) => {
  if (!data || data.length === 0) return null;

  const dataSorted = data
    .sort((a, b) => b.total_orders - a.total_orders)
    .slice(0, 10);

  const orders_data = [];
  let total_orders = 0;
  dataSorted.forEach((item) => {
    total_orders += item.total_orders;
    if (item.total_orders !== 0)
      orders_data.push({
        type: item.category_title,
        value: item.total_orders,
      });
  });

  if (main.total_orders - total_orders !== 0)
    orders_data.push({
      type: 'Boshqa Kategoriyalar',
      value: main.total_orders - total_orders,
    });

  const products_data = [];
  let total_products = 0;
  dataSorted.forEach((item) => {
    total_products += item.total_products;
    if (item.total_products !== 0)
      products_data.push({
        type: item.category_title,
        value: item.total_products,
      });
  });

  if (main.total_products - total_products !== 0)
    products_data.push({
      type: 'Boshqa Kategoriyalar',
      value: main.total_products - total_products,
    });

  const reviews_data = [];
  let total_reviews = 0;
  dataSorted.forEach((item) => {
    total_reviews += item.total_reviews;

    if (item.total_reviews !== 0)
      reviews_data.push({
        type: item.category_title,
        value: item.total_shops,
      });
  });

  if (main.total_reviews - total_reviews !== 0)
    reviews_data.push({
      type: 'Boshqa Kategoriyalar',
      value: main.total_reviews - total_reviews,
    });

  return (
    <div className='flex h-full w-full items-center justify-start gap-5'>
      <Container
        loading={loading}
        className={clsxm(
          'h-[600px] min-w-[1000px] overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <PieChart data={orders_data} title='Buyurtmalar' labelType='outer' />
      </Container>
      <Container
        loading={loading}
        className={clsxm(
          'h-[600px] min-w-[1000px] overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <PieChart data={products_data} title='Mahsulotlar' labelType='outer' />
      </Container>
      <Container
        loading={loading}
        className={clsxm(
          'h-[600px] min-w-[1000px] overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <PieChart data={reviews_data} title='Izohlar' labelType='outer' />
      </Container>
    </div>
  );
};
