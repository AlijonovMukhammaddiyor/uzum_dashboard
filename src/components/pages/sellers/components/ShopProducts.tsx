import { AxiosResponse } from 'axios';
import React from 'react';
import { useTranslation } from 'react-i18next';

import API from '@/lib/api';
import clsxm from '@/lib/clsxm';
import logger from '@/lib/logger';

import {
  getShopProductTableColumnDefs,
  getShopStoppedProductTableColumnDefs,
} from '@/components/columnDefs';
import Container from '@/components/layout/Container';
import PaginatedTable from '@/components/shared/PaginatedTable';
import PieChart from '@/components/shared/PieChart';
import Table from '@/components/shared/Table';
import Tabs from '@/components/shared/Tabs';

export interface Props {
  activeTab?: string;
  sellerId: number;
  className?: string;
}

interface ProductType {
  badges: string;
  date_pretty: string;
  orders_amount: number;
  orders_money: number;
  position_in_category: number;
  position_in_shop: number;
  position: number;
  product_available_amount: number;
  product_characteristics: string;
  product_id: number;
  product_title: string;
  product_title_ru: string;
  rating: number;
  reviews_amount: number;
  shop_link: string;
  shop_title: string;
  sku_analytics: string;
  categiry_title: string;
}

function ShopProducts({ sellerId, className }: Props) {
  const { t, i18n } = useTranslation('sellers');
  const { t: t2 } = useTranslation('tableColumns');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [activeProducts, setActiveProducts] = React.useState<string>(
    t('sellers_current_products')
  );
  const [ordersData, setOrdersData] = React.useState<
    {
      type: string;
      value: number;
    }[]
  >([]);
  const [revenueData, setRevenueData] = React.useState<
    {
      type: string;
      value: number;
    }[]
  >([]);
  const [reviewsData, setReviewsData] = React.useState<
    {
      type: string;
      value: number;
    }[]
  >([]);
  const [stoppedProductsData, setStoppedProductsData] = React.useState<
    ProductType[]
  >([]);
  const [stoopedProductsLoading, setStoppedProductsLoading] =
    React.useState<boolean>(false);
  const [notAllowedTab, setNotAllowedTab] = React.useState<string>('');

  const [loadingTopProducts, setLoadingTopProducts] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const api = new API(null);
    setLoadingTopProducts(true);
    api
      .get<
        unknown,
        AxiosResponse<{
          orders_products: ProductType[];
          reviews_products: ProductType[];
          revenue_products: ProductType[];
          total_orders: number;
          total_reviews: number;
          total_revenue: number;
        }>
      >('/shop/products/tops/' + sellerId)
      .then((res) => {
        // setTopProducts(res.data.products);

        const products = res.data.orders_products;
        let sum = 0;
        const data = products
          .filter((product) => product.orders_amount > 0)
          .map((product) => {
            sum += product.orders_amount;
            return {
              type:
                i18n.language === 'uz'
                  ? product.product_title.split('((')[0]
                  : product.product_title_ru.split('((')[0],
              value: product.orders_amount,
            };
          });
        if (res.data.total_orders - sum > 0)
          data.push({
            type: i18n.language === 'uz' ? 'Boshqa Mahsulotlar' : 'Другие',
            value: res.data.total_orders - sum,
          });

        setOrdersData(data);

        const revenue = res.data.revenue_products;
        sum = 0;
        const data2 = revenue
          .filter((product) => product.orders_money > 0)
          .map((product) => {
            sum += product.orders_money;
            return {
              type:
                i18n.language === 'uz'
                  ? product.product_title.split('((')[0]
                  : product.product_title_ru.split('((')[0],
              value: Math.round(product.orders_money * 1000),
            };
          });
        if (res.data.total_revenue - sum > 0)
          data2.push({
            type: i18n.language === 'uz' ? 'Boshqa Mahsulotlar' : 'Другие',
            value: Math.round((res.data.total_revenue - sum) * 1000),
          });

        setRevenueData(data2);

        const reviews = res.data.reviews_products;
        let sumReviews = 0;
        const dataReviews = reviews.map((product) => {
          sumReviews += product.reviews_amount;
          return {
            type:
              i18n.language === 'uz'
                ? product.product_title.split('((')[0]
                : product.product_title_ru.split('((')[0],
            value: product.reviews_amount,
          };
        });
        if (res.data.total_reviews - sumReviews > 0)
          dataReviews.push({
            type: i18n.language === 'uz' ? 'Boshqa Mahsulotlar' : 'Другие',
            value: res.data.total_reviews - sumReviews,
          });

        setReviewsData(dataReviews);
        // setTotalOrders(res.data.total_orders);
        setLoadingTopProducts(false);
      })
      .catch((err) => {
        // console.log(err);
        logger(err, 'Error in getting top products');
        setLoadingTopProducts(false);
      });

    setStoppedProductsLoading(true);
    api
      .get<unknown, AxiosResponse<ProductType[]>>(
        '/shop/products/stopped/' + sellerId + '/'
      )
      .then((res) => {
        setStoppedProductsLoading(false);
        setStoppedProductsData(res.data);
      })
      .catch((err) => {
        setStoppedProductsLoading(false);
        logger(err, 'Error in getting stopped products');
      });
  }, [i18n.language, sellerId]);
  React.useEffect(() => {
    setActiveProducts(t('sellers_current_products'));
  }, [t, i18n.language]);
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
    let url = `/shop/products/` + sellerId + `?page=${page}`;
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
        results: ProductType[];
        count: number;
        next?: string;
        previous?: string;
      }>
    >(url);
  };

  return (
    <div
      className={clsxm('h-full w-full min-w-[1200px] gap-5 pb-12', className)}
    >
      <div className='flex w-full items-start justify-start gap-5 overflow-scroll '>
        <Container
          loading={loadingTopProducts}
          className={clsxm(
            'min-w-[1100px] overflow-scroll rounded-md bg-white p-6'
          )}
        >
          <PieChart
            data={revenueData}
            title={t('most_profitable_products')}
            labelType='outer'
            style={{
              width: '100%',
              height: '500px',
              maxHeight: '500px',
            }}
          />
        </Container>
        <Container
          loading={loadingTopProducts}
          className={clsxm(
            'min-w-[1100px] overflow-scroll rounded-md bg-white p-6'
          )}
        >
          <PieChart
            data={ordersData}
            title={t('most_sold_products')}
            labelType='outer'
            style={{
              width: '100%',
              height: '500px',
              maxHeight: '500px',
            }}
          />
        </Container>
        <Container
          loading={loadingTopProducts}
          className={clsxm(
            'white min-w-[1100px] overflow-scroll rounded-md bg-white p-6'
          )}
        >
          <PieChart
            data={reviewsData}
            title={t('most_reviewed_products')}
            labelType='outer'
            style={{
              width: '100%',
              height: '500px',
              maxHeight: '500px',
            }}
          />
        </Container>
      </div>

      <Container
        loading={loading}
        className={clsxm('w-full overflow-scroll border-none px-0')}
      >
        <p className='mt-6 text-center font-semibold'>
          {i18n.language === 'uz'
            ? "Do'konning sotuvdagi va sotuvi to'xtagan mahsulotlari"
            : 'Проданные и остановленные товары магазина'}
        </p>
        <Tabs
          tabs={[t('sellers_current_products'), t('sellers_stopped_products')]}
          activeTab={activeProducts}
          setActiveTab={setActiveProducts}
          className='my-4'
          setNotAllowedTab={setNotAllowedTab}
        />

        <PaginatedTable
          isBalham={true}
          rowHeight={70}
          headerHeight={60}
          columnDefs={getShopProductTableColumnDefs(t2, i18n.language)}
          className={clsxm(
            'h-[1536px] min-w-full',
            activeProducts === t('sellers_current_products') ? '' : 'hidden'
          )}
          fetchData={loadData}
          setLoading={setLoading}
          id={sellerId}
        />
        <Table
          rowHeight={80}
          headerHeight={60}
          columnDefs={getShopStoppedProductTableColumnDefs(t2, i18n.language)}
          className={clsxm(
            'h-[1016px] min-w-full',
            activeProducts === t('sellers_stopped_products') ? '' : 'hidden'
          )}
          rowData={stoppedProductsData}
        />
      </Container>
    </div>
  );
}

export default ShopProducts;
