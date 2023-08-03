import { AxiosResponse } from 'axios';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getSubcategoriesTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import { CategoryAnalyticsDataType } from '@/components/pages/category/slug/components/CategoryTrends';
import PieChart from '@/components/shared/PieChart';
import Table from '@/components/shared/Table';

interface Props {
  className?: string;
  categoryId: string;
  isActive: boolean;
}

function Subcategories({ className, categoryId, isActive }: Props) {
  const { t: t2, i18n } = useTranslation('tableColumns');
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
  }, [categoryId]);

  if (!isActive) return <></>;

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
            {i18n.language === 'uz'
              ? "Ichki kategoriyalar yo'q"
              : 'Нет подкатегорий'}
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
            columnDefs={
              getSubcategoriesTableColumnDefs(t2, i18n.language) as any
            }
            rowData={[...(data.data ?? [])]}
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
  const { i18n } = useTranslation('categories');
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
        type:
          i18n.language === 'uz'
            ? item.category_title.split('((')[0]
            : item.category_title_ru.split('((')[0],
        value: item.total_orders,
      });
  });

  const revenue_data = [];
  let total_revenue = 0;
  dataSorted.forEach((item) => {
    total_revenue += item.total_orders_amount;
    if (item.total_orders_amount !== 0)
      revenue_data.push({
        type:
          i18n.language === 'uz'
            ? item.category_title.split('((')[0]
            : item.category_title_ru.split('((')[0],
        value: Math.round(item.total_orders_amount * 1000),
      });
  });

  if (main.total_orders_amount - total_revenue !== 0)
    revenue_data.push({
      type:
        i18n.language === 'uz' ? 'Boshqa Kategoriyalar' : 'Другие категории',
      value: Math.round((main.total_orders_amount - total_revenue) * 1000),
    });

  if (main.total_orders - total_orders !== 0)
    orders_data.push({
      type:
        i18n.language === 'uz' ? 'Boshqa Kategoriyalar' : 'Другие категории',
      value: main.total_orders - total_orders,
    });

  const products_data = [];
  let total_products = 0;
  dataSorted.forEach((item) => {
    total_products += item.total_products;
    if (item.total_products !== 0)
      products_data.push({
        type:
          i18n.language === 'uz'
            ? item.category_title.split('((')[0]
            : item.category_title_ru.split('((')[0],
        value: item.total_products,
      });
  });

  if (main.total_products - total_products !== 0)
    products_data.push({
      type:
        i18n.language === 'uz' ? 'Boshqa Kategoriyalar' : 'Другие категории',
      value: main.total_products - total_products,
    });

  const reviews_data = [];
  let total_reviews = 0;
  dataSorted.forEach((item) => {
    total_reviews += item.total_reviews;

    if (item.total_reviews !== 0)
      reviews_data.push({
        type:
          i18n.language === 'uz'
            ? item.category_title.split('((')[0]
            : item.category_title_ru.split('((')[0],
        value: item.total_shops,
      });
  });

  if (main.total_reviews - total_reviews !== 0)
    reviews_data.push({
      type:
        i18n.language === 'uz' ? 'Boshqa Kategoriyalar' : 'Другие категории',
      value: main.total_reviews - total_reviews,
    });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation('categories');
  return (
    <div className='flex h-full w-full items-center justify-start gap-5'>
      <Container
        loading={loading}
        className={clsxm(
          'h-[600px] min-w-[1000px] overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <PieChart data={revenue_data} title={t('revenue')} labelType='outer' />
      </Container>
      <Container
        loading={loading}
        className={clsxm(
          'h-[600px] min-w-[1000px] overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <PieChart data={orders_data} title={t('orders')} labelType='outer' />
      </Container>
      <Container
        loading={loading}
        className={clsxm(
          'h-[600px] min-w-[1000px] overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <PieChart
          data={products_data}
          title={t('products')}
          labelType='outer'
        />
      </Container>
      <Container
        loading={loading}
        className={clsxm(
          'h-[600px] min-w-[1000px] overflow-scroll rounded-md bg-white p-6'
        )}
      >
        <PieChart data={reviews_data} title={t('reviews')} labelType='outer' />
      </Container>
    </div>
  );
};
