import { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import { getCategoryProductTableColumnDefs } from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PaginatedTable from '@/components/shared/PaginatedTable';
import PieChart from '@/components/shared/PieChart';

export interface Props {
  activeTab?: string;
  categoryId: string;
  className?: string;
}

export interface ProductAnalyticsViewType {
  badges: string;
  date_pretty: string;
  orders_amount: number;
  position_in_category: number;
  product_available_amount: number;
  product_characteristics: string;
  product_id: number;
  product_title: string;
  rating: number;
  reviews_amount: number;
  shop_link: string;
  shop_title: string;
  sku_analytics: string;
  category_title: string;
  avg_purchase_price: number;
}

function CategoryProductsTable({ categoryId, className, activeTab }: Props) {
  const { t, i18n } = useTranslation('tableColumns');
  const { t: t2 } = useTranslation('categories');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [topProductsData, setTopProductsData] = React.useState<
    {
      type: string;
      value: number;
    }[]
  >([]);
  const [loadingTopProducts, setLoadingTopProducts] =
    React.useState<boolean>(false);
  const [totalOrders, setTotalOrders] = React.useState<number>(0);
  const [totalProducts, setTotalProducts] = React.useState<number>(0);
  const [childrenCount, setChildrenCount] = React.useState<number>(0);
  const [revenue, setRevenue] = React.useState<number>(0);

  React.useEffect(() => {
    const api = new API(null);
    setLoadingTopProducts(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          products: {
            product_id: number;
            product_title: string;
            product_title_ru: string;
            orders_amount: number;
            orders_money: number;
          }[];
          total_orders: number;
          total_revenue: number;
          total_products: number;
          descendants: number;
        }>
      >('/category/products/top/' + categoryId)
      .then((res) => {
        // setTopProducts(res.data.products);
        const products = res.data.products;
        let sum = 0;
        const data = products
          .filter((product) => product.orders_money > 0)
          .map((product) => {
            sum += product.orders_money;
            return {
              type:
                i18n.language === 'uz'
                  ? product.product_title
                  : product.product_title_ru,
              value: Math.round(product.orders_money * 1000),
            };
          });
        if (res.data.total_products > 10)
          data.push({
            type: t('other_products'),
            value: Math.round((res.data.total_revenue - sum) * 1000),
          });

        setTopProductsData(data);
        setTotalProducts(res.data.total_products);
        setChildrenCount(res.data.descendants);
        setTotalOrders(res.data.total_orders);
        setRevenue(res.data.total_revenue);

        // setTotalOrders(res.data.total_orders);
        setLoadingTopProducts(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting top products');
        setLoadingTopProducts(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

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
    let url = `/category/products/` + categoryId + `?page=${page}`;
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

  if (activeTab !== 'Tovarlar' && activeTab !== 'Товары') return <></>;

  return (
    <div
      className={clsxm(
        'flex h-full w-full min-w-[1200px] flex-col items-start justify-start gap-5 overflow-x-scroll',
        className
      )}
    >
      <Container
        className={clsxm(
          'h-[500px] w-full min-w-[1200px] overflow-hidden rounded-md bg-white p-6'
        )}
        loading={loadingTopProducts}
      >
        <div className='flex items-center justify-start gap-3'>
          <h2 className='text-primary flex-1 text-left text-base'>
            {t2('top_10_products_revenue')}
          </h2>
          <div className='flex items-center justify-between gap-4'>
            <p className='font-semibold'>{t('revenue')}:</p>
            <p className='text-primary font-semibold'>
              {revenue / 1000000 > 1 ? (
                <span>{(revenue / 1000000).toFixed(1)} mlrd so'm</span>
              ) : revenue / 1000 > 1 ? (
                <span>{(revenue / 1000).toFixed(1)} mln so'm</span>
              ) : (
                <span>{Number(revenue.toFixed(1)).toLocaleString()} so'm</span>
              )}
            </p>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <p className='font-semibold'>{t('products_count')}:</p>
            <p className='text-primary font-semibold'>
              {totalProducts?.toLocaleString()}
            </p>
          </div>
          <div className='flex items-center justify-between gap-4'>
            <p className='font-semibold'>{t('orders')}:</p>
            <p className='text-primary font-semibold'>
              {totalOrders?.toLocaleString()}
            </p>
          </div>
          {childrenCount > 0 && (
            <div className='flex items-center justify-between gap-4'>
              <p className='font-semibold'>{t('subcategories_count')}:</p>
              <p className='text-primary font-semibold'>
                {childrenCount?.toLocaleString()}
              </p>
            </div>
          )}
        </div>
        <div className='flex h-[calc(100%-24px)] w-full flex-1 items-start justify-start'>
          <PieChart data={topProductsData} labelType='spider' />
        </div>
      </Container>
      <Container loading={loading} className={clsxm('w-full overflow-scroll')}>
        <PaginatedTable
          columnDefs={
            getCategoryProductTableColumnDefs(t, i18n.language) as any
          }
          className='h-[1016px] min-w-full'
          fetchData={loadData}
          setLoading={setLoading}
        />
      </Container>
    </div>
  );
}

export default CategoryProductsTable;
